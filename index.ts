import 'isomorphic-fetch'
import { Agent, DetectIntentRequest, DetectIntentResponse } from 'dialogflow'

/** Class representing Dialogflow Gateway Client */
export class Client {
    /** API Endpoint */
    endpoint: string
    /** Agent */
    agent: Agent

    /**
     * Create a Dialogflow Gateway Client
     * @param id - The identifier of Google Cloud project, that is connected to Dialogflow Gateway
     */
    constructor(public id: string){
        this.id = id
        this.endpoint = `https://${this.id}.gateway.dialogflow.cloud.ushakov.co`
        this.agent = null
    }

    /** Connect the Dialogflow Gateway Client to Dialogflow Gateway */
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

    /** Get Information about connected Agent */
    get = async () => {
        return this.agent
    }

    /**
     * Make request to Dialogflow Gateway
     * @param request - Request body
     * @param format - Formatting mode
     */
    request = async (request: DetectIntentRequest): Promise<DetectIntentResponse> => {
        try {
            let response = await fetch(`${this.endpoint}/${request.session}`, {method: 'POST', body: JSON.stringify(request), headers: {'Content-Type': 'application/json'}})
            return await response.json()
        }

        catch (error) {
            throw error
        }
    }
}