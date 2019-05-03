"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RequestLib = require("request");
const Response_1 = require("./Response");
class Request {
    constructor() {
        this.setBody = this.setBody.bind(this);
        this.requestAsync = this.requestAsync.bind(this);
        this.request = this.request.bind(this);
    }
    setBearerToken(token) {
        if (this.headers === undefined)
            this.headers = {};
        this.headers["Authorization"] = "Bearer " + token;
    }
    setUrl(url) {
        this.url = url;
    }
    setMethod(method) {
        this.method = method;
    }
    setBody(body) {
        const type = typeof body;
        if (type === "object") {
            if (body instanceof Buffer) {
                this.body = body;
            }
            else {
                try {
                    this.body = Buffer.from(JSON.stringify(body), "utf8");
                    if (this.headers === undefined)
                        this.headers = {};
                    this.headers["Content-Type"] = "application/json";
                }
                catch (e) {
                    throw new Error("Failed to parse object to buffer.");
                }
            }
        }
        else if (type === "string") {
            try {
                this.body = Buffer.from(body, "utf8");
            }
            catch (e) {
                throw new Error("Failed to parse string to buffer.");
            }
        }
        else {
            throw new Error("Body must be a Buffer, object, or string.");
        }
    }
    requestAsync(completion) {
        if (!this.method)
            throw new Error("You must supply a HTTP method for the request.");
        if (!this.url)
            throw new Error("You must supply a URL for the request.");
        let req = {
            method: this.method,
            uri: this.url
        };
        if (this.body)
            req["body"] = this.body;
        if (this.headers)
            req["headers"] = this.headers;
        const startTime = Date.now();
        RequestLib(req, (error, response) => {
            if (error) {
                if (typeof error === "object" && error instanceof Error)
                    completion(error, undefined);
                else
                    completion(new Error(error), undefined);
            }
            else {
                completion(undefined, new Response_1.Response(response, startTime));
            }
        });
    }
    request() {
        return new Promise(((resolve, reject) => {
            this.requestAsync(((error, response) => {
                if (error)
                    reject(error);
                else
                    resolve(response);
            }));
        }));
    }
}
exports.Request = Request;
