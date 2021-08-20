//JWT authentication goes here
const User =require("../models/user");
const ErrorResponse =require("../utils/errorResponse");
const sendEmail =require("../utils/sendEmail");
const crypto =require("crypto");

//when we use asynchronous function..we need try catch block.
exports.register =async(req,res,next)=>{

    const{username,email,password}=req.body;//destructure method
    //custom error handling.

    try{

        const user=await User.create({
            username , email ,password///this is password field of user.js models

        })

        sendToken(user,200,res);

    } catch(error){
        next(error);
    }
}
exports.login =async(req,res,next)=>{
    const{email,password}=req.body;
    if (!email || !password){//backend validation
        return next(new ErrorResponse("please provide an email and password",400));//throws a new error//400->bad error
    }
    try {
        const user=await User.findOne({email}).select("+password");//find password regarding email.
        if(!user){
            //true
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPasswords(password);//matching the password from the recived from request
        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials", 401));//401 for unothorized
        }
        sendToken(user , 200 , res);
        
    } catch (error) {
        res.status(500).json({//500 internel server error
        success:false,
        error:error.message
    })
   }  

 }
 const sendToken = (user , statusCode , res)=>{ //JWT get
    const token = user.getSignedToken();
    res.status(200).json({success:true , token});
}

exports.forgotpassword =async (req,res,next)=>{
    const {email} =req.body;
    try {
        const user =await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent"), 404);

     }
        const resetToken =user.getResetPasswordToken();
        await user.save();

        const resetURL =`http://localhost:3000/passwordreset/${resetToken}`;
        const message =`
        <h1>you have requested password reset</h1>
        <p>please goto the URL to reset password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a>`
         
        try {
            await sendEmail({
                to : user.email,
                subject : "Password Reset Request",
                text : message
            })

            res.status(200).json({ success : true , data : "Email Sent"});

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent") , 500);

        }

        
    } catch (error) {
        next(error);
        
    }
}
exports.resetpassword = async (req , res , next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt : Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token") , 400)
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({success : true , data : "Password reset success"});

    } catch (error) {
        next(error);
    }
}


