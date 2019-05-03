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

import * as RequestLib from "request";

export class Response {

	public statusCode: number;
	public roundTripTime: number;
	public body: string | object | Buffer;

	public constructor(response: RequestLib.Response, startTimestamp: number) {

		this.roundTripTime = Date.now() - startTimestamp;
		this.statusCode = response.statusCode;
		this.body = response.body;

	}

	public getJSON(): object {

		let res: object = undefined;

		try {

			if (typeof this.body === "object") res = this.body;
			else if (typeof this.body === "string") res = JSON.parse(this.body);

		} catch (e) {}

		return res;

	}

	public getBuffer(): Buffer {

		let res: Buffer = undefined;

		try {

			if (typeof this.body === "object") {

				if (this.body instanceof Buffer) res = this.body;
				else res = res = Buffer.from(JSON.stringify(this.body), "utf8");

			} else if (typeof this.body === "string") res = Buffer.from(this.body, "utf8");

		} catch (e) {}

		return res;

	}

	public getString(): string {

		let res: string = undefined;

		try {

			if (typeof this.body === "object") {

				if (this.body instanceof Buffer) res = this.body.toString("utf8");
				else res = res = JSON.stringify(this.body);

			} else if (typeof this.body === "string") res = this.body;

		} catch (e) {}

		return res;

	}

	public getRaw(): string | object | Buffer {

		return  this.body;

	}

	public print(): void {

		console.log("Response:", this.statusCode, "\tTime:", this.roundTripTime + "ms");

	}

}