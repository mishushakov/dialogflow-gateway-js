import { Gateway } from './index'

let test = async () => {
    /* Connecting Dialogflow Gateway Client */
    let client = await new Gateway('dialogflow-web-v2').connect()

    /* Making Text request */
    let res = await client.request({
        session: 'test',
        queryInput: {
            text: {
                text: "Hello",
                languageCode: "en"
            }
        }
    })

    console.log(res)

    /* Getting Agent information */
    console.log(await client.get())
}

test()