# Request
A package to send and receive data using promises.

## Import
```typescript
import { ECRRequest, ECRResponse, ECRMethod } from "@elijahjcobb/request";
```

## Examples

#### Promises
```typescript
let req: ECRRequest = new ECRRequest();

req.setUrl("the-url");
req.setMethod(ECRMethod.Post);
req.setBody({ foo: "hello", bar: "world" });

let res: ECRResponse = req.request();
```

#### Callbacks
```typescript
let req: ECRRequest = new ECRRequest();

req.setUrl("the-url");
req.setMethod(ECRMethod.Post);
req.setBody({ foo: "hello", bar: "world" });

req.requestAsync(((error: Error, response: ECRResponse): void => {}));
```

## Documentation
Everything is completely documented. You can view the [declaration files](https://github.com/elijahjcobb/request/tree/master/dist) or even the [source code](https://github.com/elijahjcobb/request/tree/master/ts) on GitHub.

### ECRRequest
```typescript
{
    body: Buffer;
    url: string;
    method: Method;
    headers: object;
    constructor();
    setBearerToken(token: string): void;
    setUrl(url: string): void;
    setMethod(method: Method): void;
    setBody(body: string | object | Buffer): void;
    requestAsync(completion: (error: Error, response: Response) => void): void;
    request(): Promise<Response>;
}
```

### ECRResponse
```typescript
{
    statusCode: number;
    roundTripTime: number;
    body: string | object | Buffer;
    constructor(response: RequestLib.Response, startTimestamp: number);
    getJSON(): object;
    getBuffer(): Buffer;
    getString(): string;
    getRaw(): string | object | Buffer;
    print(): void;
}
```

### ECRMethod
```typescript
{
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}
```

## Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/elijahjcobb/request/issues) or if you are old fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).