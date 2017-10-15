var http = require('http'),
express = require('express'),
twilio = require('twilio'),
bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/sms', function(req, res) {    
  const twiml = new twilio.twiml.MessagingResponse();
  //TODO: Implement this according to the logic
  if (req.body.Body == 'hello') {
    twiml.message('Hi!');
  } else if(req.body.Body == 'bye') {
    twiml.message('Goodbye');
  } else {
    twiml.message('No Body param match, Twilio sends this in the request to your server.');
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, function () {
  console.log('Express server listening on port 1337');
});
