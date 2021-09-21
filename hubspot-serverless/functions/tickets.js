
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    console.log(event);
    console.log("Customer id" + event.contact_id);
    var request = require("request");
  
    var options = {
      method: 'POST',
      url: 'https://api.hubapi.com/crm/v3/objects/tickets/search',
      qs: {hapikey: context.HUBSPOT_API_KEY},
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: {
        filterGroups: [{filters: [{value: event.contact_id, propertyName: "associations.contact", operator: 'EQ'}]}]
      },
      json: true
    };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
      return callback(null, body);
    });
    
  };