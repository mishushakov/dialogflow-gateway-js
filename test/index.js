let { Client } = require('./../index')

/* Connecting Dialogflow Gateway Client */
new Client('dialogflow-web-v2').connect()
.then(agent => {
    /* Making Text request */
    agent.request({
        session: 'test',
        queryInput: {
            text: {
                text: "Hello",
                languageCode: "en"
            }
        }
    }, true)
    .then(response => console.log(response.queryResult.fulfillmentMessages))
    
    /* Getting Agent information */
    agent.get().then(agent => console.log(agent))
})