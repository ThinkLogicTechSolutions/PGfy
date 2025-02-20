require('dotenv').config();

exports.SendSMS = (body,to) => {
    try{
        const client = require('twilio')(process.env.AccountSID,process.env.AuthToken);
        client.messages.create({
            body : body,
            from : process.env.TwilioNumber,
            to : to
        })
    }catch(e){
        console.log("Error sending SMS", e);
    }
}