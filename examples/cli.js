const { Client } = require('../index')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

/* Define variables */
const appid = 'dialogflow-web-v2' // <- Google Cloud Project ID
const session = 'dialogflow-cli' // <- Session ID
const lang = 'en' // <- Language
const endpoint = `https://${appid}.gateway.dialogflow.cloud.ushakov.co` // <- endpoint

/* Initialize client */
const client = new Client(endpoint).connect()

/* Define the loop */
const ask = () => {
    /* Ask for your message */
    readline.question('You: ', async text => {
        /* Make a request */
        try {
            const message = await client.send({
                session,
                queryInput: {
                    text: {
                        text,
                        languageCode: lang
                    }
                }
            })

            try {
                /* Parse components */
                const components = message.queryResult.fulfillmentMessages
                for (const component in components){
                /* Display Dialogflow/Webhook Messages */
                    if (components[component].text){
                        console.log(`Bot: ${components[component].text.text[0]}`)
                    }

                    /* Display Actions on Google Simple Response */
                    else if (components[component].simpleResponses){
                        console.log(`Bot: ${components[component].simpleResponses.simpleResponses[0].textToSpeech}`)
                    }

                    ask() // <- Restart the messages loop
                }
            }

            catch (e){
                console.log(e)
            }
        }

        catch (e){
            console.log(e)
        }
    })
}

ask()