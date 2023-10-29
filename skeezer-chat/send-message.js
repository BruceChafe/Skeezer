exports.handler = function (context, event, callback) {
  const phoneNumbers = event.recipients.split(',').map((x) => x.trim());
  const { message, passcode } = event;

  if (passcode !== context.PASSCODE) {
    const response = new Twilio.Response();
    response.setStatusCode(401);
    response.setBody(JSON.stringify({ error: 'Invalid passcode' })); // Convert to JSON
    return callback(null, response);
  }

  const client = context.getTwilioClient();
  const allMessageRequests = phoneNumbers.map((to) => {
    return client.messages
      .create({
        from: context.TWILIO_PHONE_NUMBER,
        to,
        body: message,
      })
      .then((msg) => {
        return { success: true, sid: msg.sid };
      })
      .catch((err) => {
        return { success: false, error: err.message };
      });
  });

  Promise.all(allMessageRequests)
    .then((result) => {
      const response = new Twilio.Response();
      response.setBody(JSON.stringify({ result })); // Convert to JSON
      return callback(null, response);
    })
    .catch((err) => {
      console.error(err);
      const response = new Twilio.Response();
      response.setStatusCode(500); // Internal server error
      response.setBody(JSON.stringify({ error: 'Failed to fetch messages' })); // Convert to JSON
      return callback(null, response);
    });
};
