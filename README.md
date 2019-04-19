# Dialogflow Gateway JavaScript SDK

[Dialogflow Gateway](https://dialogflow.cloud.ushakov.co) is a cloud-based service, which connects Dialogflow V2 Agents to the World Wide Web

This is the Official Dialogflow Gateway JavaScript Client.
It can be used both in browser and node as a replacement for the deprecated `dialogflow-javascript-client` library, by @dialogflow

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

Link your Agent to [Dialogflow Gateway](https://dialogflow.cloud.ushakov.co), you can find a detailed guide [here](https://github.com/mishushakov/dialogflow-gateway-docs/blob/master/guide.md)

Then, import the library and connect client to your Gateway:

```js
import { Client } from 'dialogflow-gateway'

new Client('<YOUR GOOGLE PROJECT ID HERE>').connect()
```

## Examples

With Async/Await and ES Modules

```js
import { Client } from 'dialogflow-gateway'

async () => {
    /* Connecting Dialogflow Gateway Client */
    let client = await new Client('dialogflow-web-v2').connect()

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
let { Client } = require('dialogflow-gateway')

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
```

Same code in Browser. Notice, that we are using the `df` scope

```js
/* Connecting Dialogflow Gateway Client */
new df.Client('dialogflow-web-v2').connect()
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

Request with formatting option enabled (for iterating over components):

```js
client.request({
    session: 'test',
    queryInput: {
        text: {
            text: "Hello",
            languageCode: "en"
        }
    }
}, true)
```