var nodemailer=require('nodemailer');
module.exports=function(email,subject ,content){
var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'Nhuan.nd1997@gmail.com',
        pass:'Nh24061997@'
    }
});
var mailOptions={
    from:'Nhuan.nd1997@gmail.com',
    to:email,
    subject:subject,
    text:content
};
transporter.sendMail(mailOptions,function(err,info){
    if(err){console.log(err);}
    else{console.log('Email sent: '+ info.response);}
});}
