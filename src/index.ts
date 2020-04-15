import 'isomorphic-fetch'
import WebSocket = require('isomorphic-ws')
import { Agent, DetectIntentRequest, DetectIntentResponse } from 'dialogflow'

export class Client {
    private agent: Agent

    private wss: WebSocket

    /**
     * Dialogflow Gateway Client
     * @param endpoint - URL pointing to the Agent on Dialogflow Gateway
     * ```typescript
     * const client = new Client('https://dialogflow-web-v2.core.ushaflow.io')
     * ```
     */
    constructor(public endpoint: string){
        this.endpoint = endpoint
        this.wss = new WebSocket(this.endpoint.replace('http', 'ws'))
        this.wss.onerror = () => this.wss.close()
    }

    /**
     *  Get Agent linked to this Client
     * ```typescript
     * const client = new Client('https://dialogflow-web-v2.core.ushaflow.io')
     * client.get()
     * .then(agent => {
     *   console.log(agent)
     * })
     * .catch(error => {
     *   // Handle error
     * })
     * ```
     */
    get = (): Promise<Agent> => {
        return new Promise((resolve, reject) => {
            if (!this.agent){
                fetch(this.endpoint)
                .then(res => res.json())
                .then(agent => {
                    if (agent.error) reject(new Error(agent.error))
                    resolve(agent)
                })
                .catch(error => reject(error))
            }

            else resolve(this.agent)
        })
    }

    /**
     * Send request to Dialogflow Gateway
     * @param request - Request body
     * ```typescript
     * const client = new Client('https://dialogflow-web-v2.core.ushaflow.io')
     * client.send({
     *   session: 'test',
     *   queryInput: {
     *     text: {
     *       text: 'Hello',
     *       languageCode: 'en'
     *     }
     *   }
     * })
     * .then(response => {
     *   console.log(response)
     * })
     * .catch(error => {
     *   // Handle error
     * })
     * ```
     */
    send = (request: DetectIntentRequest): Promise<DetectIntentResponse> => {
        return new Promise((resolve, reject) => {
            if (this.wss && this.wss.readyState == 1){
                this.wss.onmessage = message => {
                    resolve(JSON.parse(message.data.toString()))
                }

                this.wss.send(JSON.stringify(request))
            }

            else {
                fetch(this.endpoint, {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: {'Content-Type': 'application/json'}
                })
                .then(res => res.json())
                .then(message => {
                    if (message.error) reject(new Error(message.error))
                    resolve(message)
                })
                .catch(error => reject(error))
            }
        })
    }
}