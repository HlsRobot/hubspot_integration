
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    console.log(event);
    console.log("Customer id" + event.contact_id);
    const rp = require('request-promise');
  
    var options = {
      method: 'POST',
      url: 'https://api.hubapi.com/engagements/v1/engagements',
      qs: {hapikey: context.HUBSPOT_API_KEY},
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: 
        { engagement: 
            { active: true,
              ownerId: "87252139",
              type: 'NOTE'
            },
          associations: 
            { contactIds: [ event.contact_id ],
              ticketIds: [event.ticket_id]
            },
          metadata: { body: "<b>Message from the customer via the support line</b>: " + event.note } },
      json: true
    };
  
    rp(options)
      .then(body => {
        console.log(body);
        
        var ticket = {
          method: 'PATCH',
          url: 'https://api.hubapi.com/crm/v3/objects/tickets/' + event.ticket_id,
          qs: {hapikey: context.HUBSPOT_API_KEY},
          headers: {accept: 'application/json', 'content-type': 'application/json'},
          body: 
            {properties: {hs_pipeline_stage: "3"}},
          json: true
        }
        
        rp(ticket)
          .then(body => {
            console.log(body);
            return callback(null, body);
          });
      });
  };