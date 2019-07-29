# Dialogflow Gateway JavaScript SDK

Dialogflow Gateway enables third-party integrations to securely access the Dialogflow V2 API

- [Documentation](https://github.com/mishushakov/dialogflow-gateway-docs)
- [Implementations](https://github.com/mishushakov/dialogflow-gateway-docs#implementations)

This is a JavaScript Client, that is compatitable with Dialogflow Gateway backends.
It can be used both in browser and node as a drop-in replacement for the deprecated `dialogflow-javascript-client` library, by Dialogflow

⚡️ Blazing-fast and super-small (<10KB)

## Installation

npm:

`npm install dialogflow-gateway`

Yarn:

`yarn add dialogflow-gateway`

Browser:

```html
<script src="https://unpkg.com/dialogflow-gateway@latest/build/bundle.js"></script>
```

## Usage

Import the library and connect to your Dialogflow Gateway Endpoint:

```js
import { Client } from 'dialogflow-gateway'

new Client('<YOUR ENDPOINT HERE>').connect()
```

## Examples

With Async/Await and ES Modules on [Dialogflow Gateway Hosted by Ushakov](https://dialogflow.cloud.ushakov.co)

```js
import { Client } from 'dialogflow-gateway'

async () => {
    /* Connecting Dialogflow Gateway Client */
    let client = await new Client('https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co').connect()

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

Same code with require and promises

```js
const { Client } = require('dialogflow-gateway')

/* Connecting Dialogflow Gateway Client */
new Client('https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co').connect()
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
```

Same code in Browser. Notice, that we are using the `df` scope

```js
/* Connecting Dialogflow Gateway Client */
new df.Client('https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co').connect()
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
```