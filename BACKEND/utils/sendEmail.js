//email services goes here goes here
//using gmail API

const nodemailer =require("nodemailer");

const sendEmail =(options)=>{
    const transporter = nodemailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        port:465,
        secure:false,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const mailOptions ={
        from:process.env.EMAIL_FROM,
        to:options.to,
        subject : options.subject,
        html:options.text
    }
     transporter.sendMail(mailOptions,function(err ,info){
         if(err){
             console.log(err);
         }
         else{
             console.log(info);
         }
     })
}
module.exports = sendEmail;