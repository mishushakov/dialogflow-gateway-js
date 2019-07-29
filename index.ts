import 'isomorphic-fetch'
import { Agent, DetectIntentRequest, DetectIntentResponse } from 'dialogflow'

/* Class represents Dialogflow Gateway Client */
export class Client {
    /* Agent */
    agent: Agent

    /**
     * Create a Dialogflow Gateway Client
     * @param endpoint - The URL to the Agent Dialogflow Gateway
     */
    constructor(public endpoint: string){
        this.endpoint = this.endpoint
        this.agent = null
    }

    /* Connect the Dialogflow Gateway Client to Dialogflow Gateway */
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

    /* Get Information about connected Agent */
    get = async () => {
        return this.agent
    }

    /**
     * Make request to Dialogflow Gateway
     * @param request - Request body
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