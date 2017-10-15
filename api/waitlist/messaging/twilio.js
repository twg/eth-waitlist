const twilio = require('twilio');
 
var accountSid = 'AC54f225be9a3114668638d6ed83a4dc3a';
var authToken = '3adcc4eddcbf509392d41be19bc6421a';
var client = new twilio(accountSid, authToken);

client.messages.create({
  to:'+16478941814',
  from:'+16476993190',
  body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
  if (!error) {
    console.log('Success! The SID for this SMS message is:');
    console.log(message.sid);

    console.log('Message sent on:');
    console.log(message.dateCreated);
  } else {
    console.log('Oops! There was an error.');
  }
});