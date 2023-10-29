const sendMessages = function (context, event) {
  const phoneNumbers = event.recipients.split(',').map((x) => x.trim());
  const { message, passcode } = event;

  if (passcode !== context.PASSCODE) {
    const response = new Twilio.Response();
    response.setStatusCode(401);
    response.setBody('Invalid passcode');
    return response;
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

  return Promise.all(allMessageRequests)
    .then((result) => {
      return { result };
    })
    .catch((err) => {
      console.error(err);
      return { error: 'Failed to fetch messages' };
    });
};
