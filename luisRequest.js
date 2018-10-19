require('dotenv').config();
const querystring = require('querystring');
const request = require('request');
const readLine = require('readline');
/*
const result = dotenv.config();
 
if (result.error) {
    console.log("Error on the DOT ENV execution");
    throw result.error
}
else{
    console.log("ENV loaded successfully");
}
*/
const rl = readLine.createInterface(process.stdin, process.stdout);
console.log(`
             App: ${process.env.LUIS_APP_ID}
             Key: ${process.env.LUIS_SUBSCRIPTION_KEY} 
             User: ${process.env.DB_USER}
            `);
//console.log(`Process Env` + JSON.stringify(process.env));

function getLuisIntent(utterance, callback) {
    var endpoint = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";

    // Set the LUIS_APP_ID environment variable 
    // of a public sample application.    
    var luisAppId = process.env.LUIS_APP_ID;

    // Set the LUIS_SUBSCRIPTION_KEY environment variable
    // to the value of your Cognitive Services subscription key
    var queryParams = {
        "subscription-key": process.env.LUIS_SUBSCRIPTION_KEY,
        "timezoneOffset": "0",
        "verbose":  true,
        "q": utterance
    }

    var luisRequest =
        endpoint + luisAppId +
        '?' + querystring.stringify(queryParams);

    request(luisRequest,
        function (err,
            response, body) {
            if (err){
                console.log("Error: " + err);
                callback();
            }
            else {
                var data = JSON.parse(body);
				console.log(`Headers: ${JSON.stringify(response.headers)}`)
                console.log(`Response: ${response.statusCode} - ${response.statusMessage} `);
                console.log(`Query: ${data.query}`);
                console.log(`Top Intent: ${data.topScoringIntent.intent}`);
                console.log('Intents:');
                console.log(data.intents);
                console.log('Entity List:');
                console.log(...data.entities);
                callback();
            }
        });
}

rl.question("Type in the text for LUIS?", (text) => {
    let luisText = text; 
    // Pass an utterance to the sample LUIS app
    getLuisIntent(luisText, () => {
        rl.close();
    });
});

rl.on('close', () => {
    console.log("Process Exiting...");
    process.exit();
});