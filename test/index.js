let { Client } = require('./../index')

/* Connecting Dialogflow Gateway Client */
new Client('dialogflow-web-v2').connect()
.then(agent => {
    /* Making Text request */
    let res = agent.request({
        session: 'test',
        queryInput: {
            text: {
                text: "Hello",
                languageCode: "en"
            }
        }
    })
    .then(response => console.log(response))
    
    /* Getting Agent information */
    agent.get().then(agent => console.log(agent))
})