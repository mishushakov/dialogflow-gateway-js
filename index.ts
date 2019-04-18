import axios from 'axios'
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
            let response = await axios.get(this.endpoint)
            this.agent = response.data
            return this
        }

        catch (error) {
            throw error
        }
    }

    get = async () => {
        return this.agent
    }

    request = async (request: DetectIntentRequest) => {
        try {
            let response = await axios.post(`${this.endpoint}/${request.session}`, request)
            let result: DetectIntentResponse
            result = response.data

            return result
        }

        catch (error) {
            throw error
        }
    }
}