document.addEventListener('click', function (event) {
    if (event.target.id === 'sideBarChat') {
        event.preventDefault();
        sendSMS();
    }
})

function sendSMS() {
const accountSid = 'AC8241409e4161387061d96975cbd2ac56';
const authToken = 'ab20dce1375bf3be162646b197c71fa3';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12056714163',
     to: '+17097706182'
   })
  .then(message => console.log(message.sid));
}
