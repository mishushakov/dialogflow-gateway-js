import 'isomorphic-fetch'
import WebSocket = require('isomorphic-ws')
import { Agent, DetectIntentRequest, DetectIntentResponse } from 'dialogflow'
import { EventEmitter } from 'events'

interface DFGatewayError {
  error: string
  code: Response['status']
}

export class Client extends EventEmitter {
  private readonly wss: WebSocket

  /**
   * Dialogflow Gateway Client
   * @param endpoint - URL pointing to the Agent on Dialogflow Gateway
   * ```typescript
   * const client = new Client('https://dialogflow-web-v2.core.ushaflow.io')
   * ```
   */

  constructor (public endpoint: string) {
    super()
    this.endpoint = endpoint
    this.wss = new WebSocket(this.endpoint.replace('http', 'ws'))
    this.wss.onerror = (error) => {
      this.wss.close()
      this.emit('error', error)
    }

    this.wss.onmessage = message => {
      this.emit('message', JSON.parse(String(message.data)))
    }
  }

  /**
   *  Get Agent linked to this Client
   * ```typescript
   * const client = new Client('https://dialogflow-web-v2.core.ushaflow.io')
   * client.get()
   * .then(agent => console.log)
   * .catch(error => console.error)
   * ```
   */

  get = async (): Promise<Agent | DFGatewayError> => {
    return await new Promise((resolve, reject) => {
      fetch(this.endpoint)
        .then(async res => await res.json())
        .then((agent: Agent | DFGatewayError) => {
          if ('error' in (agent as DFGatewayError)) {
            return reject(new Error((agent as DFGatewayError).error))
          }

          resolve(agent)
        })
        .catch(error => reject(error))
    })
  }

  /**
   * Send request to Dialogflow Gateway
   * @param request - Request body
   * ```typescript
   * client.send({
   *   session: 'test',
   *   queryInput: {
   *     text: {
   *       text: 'Hello',
   *       languageCode: 'en'
   *     }
   *   }
   * })
   * ```
   */

  send = (request: DetectIntentRequest): void => {
    if (this.wss.readyState === 1) {
      this.wss.send(JSON.stringify(request))
    } else {
      fetch(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(async res => await res.json())
        .then((message: DetectIntentResponse | DFGatewayError) => {
          if ('error' in (message as DFGatewayError)) {
            return this.emit('error', (message as DFGatewayError).error)
          }

          this.emit('message', message)
        })
        .catch(error => {
          this.emit('error', error)
        })
    }
  }
}
