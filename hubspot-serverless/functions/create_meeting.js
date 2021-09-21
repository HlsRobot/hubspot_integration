// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) { 
    console.log(event);
    var taskAttributes = JSON.parse(event.TaskAttributes);
    const rp = require('request-promise');
    
    console.log(taskAttributes);
    if (taskAttributes.channelType === 'whatsapp') {
      console.log("Customer id" + taskAttributes.contact_id);
  
      var options = {
        method: 'POST',
        url: 'https://api.hubapi.com/engagements/v1/engagements',
        qs: {hapikey: context.HUBSPOT_API_KEY},
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: 
          { engagement: 
              { active: true,
                ownerId: "87252139",
                type: 'MEETING',
                createdAt: 1625486398 - 7992,
                lastUpdated: 1625486398
              },
            associations: 
              { contactIds: [taskAttributes.contact_id],
                ticketIds: [taskAttributes.ticket]
              },
            metadata: { body: "<b>Paul Dune</b>: Hello </br> <b>Chatbot</b>: Hello Paul. Welcome to *Tree.io*🌱! I wish you a 💚*green*💚 day! Please reply *1* if you are inquiring about an existing order or reply *2* if you want to chat with an agent about a new order. </br> <b>Paul Dune</b>: 2 </br> <b>Chatbot</b>: Sure, I can help you with that! Are you searching for something specific? </br> <b>Paul Dune</b>: Pink and small </br> <b>Chatbot</b>: And when whould you like to have them (please give us at least 2 days notice)? </br> <b>Paul Dune</b>: 09.07.20201 </br> <b>Chatbot</b>: Ok. Let me see what I have in stock. </br> <b>Chatbot</b>: Azalea https://www.growjoy.com/store/pc/Bloom-a-Thon-Double-Pink-Rhododendron-Plant-Reblooming-Azalea-p5166.htm </br> <b>Chatbot</b>: Begonias https://www.growjoy.com/store/pc/Double-Cherry-Blossom-Wax-Begonia-Plant-p3962.htm </br> <b>Chatbot</b>: Chrysanthemum https://www.growjoy.com/store/pc/Destino-Pink-Belgian-Mum-Plant-p8410.htm </br> <b>Chatbot</b>: Dahlia https://www.growjoy.com/store/pc/Dahlightful-Dahlia-Lively-Lavender-Dahlia-Plant-p11047.htm </br> <b>Chatbot</b>: Did you find anything interested? Reply with *NO* if you do not want to create an order right now. </br> <b>Paul Dune</b>: I would like 10 Begonias and 15 Azaleas </br> <b>Chatbot</b>: Got it! If you still want me to redirect you to an agent please reply with *agent*. </br> <b>Paul Dune</b>: agent </br> <b>Stratos Tziallas</b>: Hello Paul! What can I do for you today? </br> <b>Paul Dune</b>: Just wanted to be sure the order is created" } },
        json: true
      };
  
      rp(options)
        .then(body => {
          console.log(body);
          return callback(null, body);
        });
    } else {
      return callback(null, "");
    }
    
  };