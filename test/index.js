let { Client } = require('./../index')

/* Connecting Dialogflow Gateway Client */
new Client('dialogflow-web-v2').connect()
.then(client => {
    /* Making Text request */
    client.request({
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
    client.get().then(agent => console.log(agent))
})