"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var WebSocket = require("isomorphic-ws");
var Client = /** @class */ (function () {
    /**
     * Dialogflow Gateway Client
     * @param endpoint - URL pointing to the Agent on Dialogflow Gateway
     * ```typescript
     * const client = new Client('https://dialogflow-web-v2.core.ushaflow.io')
     * ```
     */
    function Client(endpoint) {
        var _this = this;
        this.endpoint = endpoint;
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
        this.get = function () {
            return new Promise(function (resolve, reject) {
                if (!_this.agent) {
                    fetch(_this.endpoint)
                        .then(function (res) { return res.json(); })
                        .then(function (agent) {
                        if (agent.error)
                            reject(new Error(agent.error));
                        resolve(agent);
                    })
                        .catch(function (error) { return reject(error); });
                }
                else
                    resolve(_this.agent);
            });
        };
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
        this.send = function (request) {
            return new Promise(function (resolve, reject) {
                if (_this.wss && _this.wss.readyState == 1) {
                    _this.wss.onmessage = function (message) {
                        resolve(JSON.parse(message.data.toString()));
                    };
                    _this.wss.send(JSON.stringify(request));
                }
                else {
                    fetch(_this.endpoint, {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (message) {
                        if (message.error)
                            reject(new Error(message.error));
                        resolve(message);
                    })
                        .catch(function (error) { return reject(error); });
                }
            });
        };
        this.endpoint = endpoint;
        this.wss = new WebSocket(this.endpoint.replace('http', 'ws'));
        this.wss.onerror = function () { return _this.wss.close(); };
    }
    return Client;
}());
exports.Client = Client;
