import {
   Request,
   Response
} from "./types"

import {
   Hello,
   RequestBlockRoot,
   SendBlockRoot,
   RequestBlockHeader,
   SendBlockHeader,
   RequestBlockBody,
   SendBlockBody
} from "./commands"

import {

} from "./response_codes"

export function parseRequest(message: string) {
    // TODO: Add appropriate error handling
    let requestLine = message.split("\n")[0];
    let payload = message.split("\n")[1];
    let requestFields = requestLine.split(" ");
    let headerLen = parseInt(requestLine[5]);
    let bodyLen = parseInt(requestLine[6]);

    let request: Request = {
        protocol: requestFields[0],
        version: requestFields[1],
	command: requestFields[2],
	compression: requestFields[3],
	response_compression: requestFields[4].split(","),
	head_only_indicator: requestLine[7] === "H",
	headers: payload.slice(0, headerLen),
	body: payload.slice(headerLen)

     };
     return request;
}

export function createRequestStr(request: Request) {
    return request.protocol + " " + 
           request.version + " " +
           request.command + " " +
           request.compression + " " +
           request.response_compression.toString() + " " +
	   request.headers.length + " " + 
           request.body.length + "\n" +
           request.headers.concat(request.body)
}


export function parseResponse(message: string) {
    // TODO: Add appropriate error handling
    let responseLine = message.split("\n")[0];
    let payload = message.split("\n")[1];
    let responseFields = responseLine.split(" ");
    let headerLen = parseInt(responseLine[2]);
    let bodyLen = parseInt(responseLine[3]);

    let response: Response = {
        code: parseInt(responseFields[0]),
	compression: responseFields[1],
	headers: payload.slice(0, headerLen),
	body: payload.slice(headerLen)
    };

    return response;
}

export function createResponseStr(response: Response) {
    return response.code.toString() + " " +
           response.compression + " " +
           response.headers.length + " " +
	   response.body.length + "\n" + 
           response.headers.concat(response.body)
}

