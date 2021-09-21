
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    console.log(event);
    console.log("Customer id" + event.contact_id);
    const rp = require('request-promise');
  
    var options = {
      method: 'POST',
      url: 'https://api.hubapi.com/crm/v3/objects/tickets',
      qs: {hapikey: context.HUBSPOT_API_KEY},
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: {
        properties: {
          hs_pipeline: '0',
          hs_pipeline_stage: '1',
          hs_ticket_priority: 'HIGH',
          hubspot_owner_id: '84553538',
          subject: 'New Order for Twilton',
          content: event.content
        }
      },
      json: true
    };
  
    rp(options)
      .then(ticket_body => {
        console.log("ticket_created");
        console.log(ticket_body);
        var assotiation_contact = {
          method: 'POST',
          url: 'https://api.hubapi.com/crm/v3/associations/contact/ticket/batch/create',
          qs: {hapikey: context.HUBSPOT_API_KEY},
          headers: {accept: 'application/json', 'content-type': 'application/json'},
          body: {inputs: [{from: {id: event.contact_id}, to: {id: ticket_body.id}, type: 'contact_to_ticket'}]},
          json: true
        };
        rp(assotiation_contact)
          .then(body => {
            console.log("contact_assotiation");
            console.log(body);
            return callback(null, ticket_body);
        
        });
      }) 
      
      
  };