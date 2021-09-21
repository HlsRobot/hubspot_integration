
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    console.log(event);
    var request = require("request");
  
    var options = {
      method: 'POST',
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
      qs: {hapikey: context.HUBSPOT_API_KEY},
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: {
        filterGroups: [{filters: [{value: event.phone, propertyName: 'phone', operator: 'EQ'}]}],
        limit: 1,
        after: 0
      },
      json: true
    };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
      return callback(null, body);
    });
  
    // This callback is what is returned in response to this function being invoked.
    // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
    // Or you might return JSON data to a studio flow. Don't forget it!
    
  };