import 'isomorphic-fetch'
import { Agent, DetectIntentRequest, DetectIntentResponse } from 'dialogflow'

export class Client {
    endpoint: string
    agent: Agent

    constructor(public id: string){
        this.id = id
        this.endpoint = `https://${this.id}.gateway.dialogflow.cloud.ushakov.co`
        this.agent = null
    }

    connect = async () => {
        try {
            let response = await fetch(this.endpoint)
            this.agent = await response.json()
            return this
        }

        catch (error) {
            throw error
        }
    }

    get = async () => {
        return this.agent
    }

    request = async (request: DetectIntentRequest, format?: boolean) => {
        try {
            let response = await fetch(`${this.endpoint}/${request.session}?format=${format || false}`, {method: 'POST', body: JSON.stringify(request), headers: {'Content-Type': 'application/json'}})
            let result: DetectIntentResponse
            result = await response.json()

            return result
        }

        catch (error) {
            throw error
        }
    }
}