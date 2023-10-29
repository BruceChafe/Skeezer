const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');

const accountSid = "AC8241409e4161387061d96975cbd2ac56";
const authToken = "ab20dce1375bf3be162646b197c71fa3";
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  client.messages.create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12056714163',
    to: '+17097706182'
  })
  .then(message => {
    console.log('SMS sent:', message.sid);
    res.send('SMS sent successfully');
  })
  .catch(error => {
    console.error('Error sending SMS:', error);
    res.status(500).send('Error sending SMS');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
