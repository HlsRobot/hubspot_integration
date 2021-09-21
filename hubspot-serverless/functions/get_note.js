
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    console.log(event);
    console.log("Ticket Number" + event.ticket);
    var request = require("request");
  
    var options = {
      method: 'GET',
      url: 'https://api.hubapi.com/engagements/v1/engagements/associated/TICKET/' + event.ticket + '/paged',
      qs: {hapikey: context.HUBSPOT_API_KEY},
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      json: true
    };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body.results);
      var result = {};
      for (let i = 0; i < body.results.length; i++) {
        if (body.results[i].engagement.type === 'NOTE') {
          result = body.results[i].engagement
        }
      }
      return callback(null, result);
    });
  
  };