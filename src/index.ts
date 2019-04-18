import axios from 'axios'
import { Agent, DetectIntentRequest, DetectIntentResponse } from 'dialogflow'

class GatewayAgent {
    constructor(public agent: Agent, public endpoint: string){
        this.agent = agent
        this.endpoint = endpoint
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

export class Gateway {
    endpoint: string

    constructor(public id: string){
        this.id = id
        this.endpoint = `https://${this.id}.gateway.dialogflow.cloud.ushakov.co`
    }

    connect = async () => {
        try {
            let response = await axios.get(this.endpoint)
            return new GatewayAgent(response.data, this.endpoint)
        }
    
        catch (error) {
            throw error
        }
    }
}