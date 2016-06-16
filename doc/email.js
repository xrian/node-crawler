/**
 * Created by public on 2016/6/7.
 */
var nodemailer = require('nodemailer');
//配置邮件
var transporter = nodemailer.createTransport('SMTP',{
  service: '163qiye',
  auth: {
    user: 'zhoujie0111@126.com',
    pass: '123456',
  }
});
//发送邮件
var sendmail = function(html){
  var option = {
    from:"zhoujie0111@126.com",
    to:"zhoujie0111@126.com,zhoujie0111@126.com",
    cc:'zhoujie0111@126.com'
  }
  option.subject = '我5年前制定的五年计划'
  option.html= html;
  transporter.sendMail(option, function(error, response){
    if(error){
      console.log("fail: " + error);
    }else{
      console.log("success: " + response.message);
    }
  });
}
//调用发送邮件
sendmail("邮件内容：<br/>My goal for 2015 is to accomplish the goals of 2014 which I should have done in 2013 because I made a promise in 2012 & planned in 2011！");