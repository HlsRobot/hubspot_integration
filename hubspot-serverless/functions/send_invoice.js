
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    // Here's an example of setting up some TWiML to respond to with this function
      let client = context.getTwilioClient();
    client.messages
        .create({from: 'Tree IO', body: 'Your Tree.io invoice: \n\n10 Begonias ......... 7.95x10 \n15 Azaleas ..........12,50x15 \nTotal: 267 € \n\nIssued to Paul Dune on behalf of Twilton Munich', to: event.phone})
        .then(message => {
          console.log(message.sid)
          return callback(null, message);
          });
  
    // This callback is what is returned in response to this function being invoked.
    // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
    // Or you might return JSON data to a studio flow. Don't forget it!
  };