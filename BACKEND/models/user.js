const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const bcrypt =require ("bcrypt");
const jwt =require("jsonwebtoken");
const crypto=require("crypto");


const UserSchema = new Schema({
    username:{
        type:String,
        required : [true ,"please enter a user name"]
    },
    email:{
        type:String,
        required : [true ," please enter email"],
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please provide a valid email"]

    },
    password:{
        type:String,
        requried:[true ,"please enter password"],
        select:false,
        minlength:6//minimum password length
    },
    resetPasswordToken :String,
    resetPasswordExpire:Date
    
})
//this is register from route

UserSchema.pre("save",async function(next){//passsword encrypt goes here
    if (!this.isModified("password")){
        next();
    }
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);//await is only can use  in async function only
    next();
})

//this is for login route
UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password ,this.password);//check the entered password and password which is return from the DB
}

//for jason web token jwt
UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE});
}
//for reset jason web token
//
UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+10*(60*1000);
    return resetToken;
}


const User =mongoose.model("User",UserSchema);
module.exports =User;