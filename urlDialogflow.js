require('dotenv').config();
const request = require('request');

 // An object of options to indicate where to post to
 const hostName = "https://api.dialogflow.com/v1/query?v=20150910";
 const headerData = {
                        'content-type' : 'application/json', 
                        'Authorization': process.env.CLIENT_ACCESS_TOKEN
                    };

 const bodyData =   {
    "contexts": [
        "shop"
      ],
    "lang": "en",
    "query": "I need apples",
    "sessionId": "12345",
    "timezone": "America/New_York"
  }; 

 request.post({
    headers: headerData,
     url: hostName,
     body: bodyData, 
     json: true
 }, function (error, response, body){
     if(error){
        console.log("Error: " + error);
     }
     else{
        console.log(response.body);
        //console.log(JSON.parse(body));
     }
 });
