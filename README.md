# Dialogflow Gateway JavaScript Client

Dialogflow Gateway is a cloud-based service, which connects Dialogflow V2 Agents to the World Wide Web
This is the Official Dialogflow Gateway JavaScript Client.
It can be used both in browser and node as a replacement for the deprecated `dialogflow-javascript-client` library, by @dialogflow

## Installation

npm:

`npm install @ushacom/dialogflow-gateway-js`

Yarn:

`yarn add @ushacom/dialogflow-gateway-js`

Browser:

```html
<script src="https://unpkg.com/@ushacom/dialogflow-gateway-js@latest"></script>
```

## Examples

With Async/Await and ES Modules

```js
import { Gateway } from './index'

async () => {
    /* Connecting Dialogflow Gateway Client */
    let client = await new Gateway('dialogflow-web-v2').connect()

    /* Making Text request */
    let response = await client.request({
        session: 'test',
        queryInput: {
            text: {
                text: "Hello",
                languageCode: "en"
            }
        }
    })

    console.log(response)

    /* Getting Agent information */
    console.log(await client.get())
}
```

Same code in NodeJS (with require and promises)

```js
let { Gateway } = require('@ushacom/dialogflow-gateway-js')

new Gateway('dialogflow-web-v2').connect()
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
```

Same code in Browser. Notice, that we are using `df` scope

```js
/* Connecting Dialogflow Gateway Client */
let client = new df.Gateway('dialogflow-web-v2').connect()
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
```