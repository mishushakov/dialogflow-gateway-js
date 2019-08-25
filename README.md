# Dialogflow Gateway JavaScript SDK

Dialogflow Gateway enables third-party integrations to securely access the Dialogflow V2 API

- [Documentation](https://github.com/mishushakov/dialogflow-gateway-docs)
- [Implementations](https://github.com/mishushakov/dialogflow-gateway-docs#implementations)

This is a JavaScript Client, that is compatitable with Dialogflow Gateway backends.
It can be used both in browser and node as a drop-in replacement for the deprecated `dialogflow-javascript-client` library, by Dialogflow

⚡️ Blazing-fast and super-small (3.4K gzipped)

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

Note: Endpoint is a URL (example: https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co)

## Examples

With Async/Await and ES Modules on [Dialogflow Gateway Hosted by Ushakov](https://dialogflow.cloud.ushakov.co)

```js
import { Client } from 'dialogflow-gateway'

async () => {
    /* Connect Dialogflow Gateway Client */
    const client = new Client('https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co').connect()

    /* Send text request */
    try {
        const response = await client.send({
            session: 'test',
            queryInput: {
                text: {
                    text: 'Hello',
                    languageCode: 'en'
                }
            }
        })

        console.log(response)
    }

    catch (error){
        // Handle error
    }

    /* Retrieve the Agent */
    try {
        const agent = await client.get())
        console.log(agent)
    }

    catch (error){
        // Handle error
    }
}
```

Same code with require and promises

```js
const { Client } = require('dialogflow-gateway')

/* Connect Dialogflow Gateway Client */
const client = new Client('https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co').connect()

/* Send text request */
client.send({
    session: 'test',
    queryInput: {
        text: {
            text: 'Hello',
            languageCode: 'en'
        }
    }
})
.then(response => {
    console.log(response)
})
.catch(error => {
    // Handle Error
})

/* Retrieve the Agent */
client.get()
.then(agent => {
    console.log(agent)
})
.catch(error => {
    // Handle Error
})
```

Same code in Browser. Notice, that we are using the `df` scope

```js
/* Connect Dialogflow Gateway Client */
const client = new df.Client('https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co').connect()

/* Send text request */
client.send({
    session: 'test',
    queryInput: {
        text: {
            text: 'Hello',
            languageCode: 'en'
        }
    }
})
.then(response => {
    console.log(response)
})
.catch(error => {
    // Handle Error
})

/* Retrieve the Agent */
client.get()
.then(agent => {
    console.log(agent)
})
.catch(error => {
    // Handle Error
})
```

For more examples see [examples directory](./examples)

Thank you!