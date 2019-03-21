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

function parseRequest(message: string) {
    // TODO: Add appropriate error handling
    let requestLine, payload = message.split("\n");
    let requestFields = requestLine.split(" ");

    let request: Request = {
        protocol: requestFields[0],
        version: requestFields[1],
	command: requestFields[2],
	compression: requestFields[3],
	response_compression: requestFields[4].split(","),
	head_only_indicator: requestLine[7] === "H",
	headers: Buffer.from(payload.splice(0, parseInt(requestLine[5]))),
	body: Buffer.from(payload.splice(parseInt(requestLine[5]), parseInt(requestLine6) + parseInt(requestLine5))),

     };
     return request;
}

function createRequestStr(request: Request) {
    return request.protocol + " " + 
           request.version + " " +
           request.command + " " +
           request.compression + " " +
           request.response_compression.toString() + " " +
	   request.headers.length + " " + 
           request.body.length + "\n" +
           request.headers.concat([request.body])
}


function parseResponse(message: string) {
    // TODO: Add appropriate error handling
    let responseLine, payload = message.split("\n");
    let responseFields = responseLine.split(" ");

    let response: Response = {
        code: parseInt(responseFields[0]),
	compression: responseFields[1],
	headers: payload.slice(0, parseInt(responseLine[2])),
	body: payload.slice(parseInt(responseLine[2]), parseInt(responseLine[3]) + parseInt(responseLine[2])),
    };

    return response;
}

function createResponseStr(response: Response) {
    return response.code.toString() + " " +
           response.compression + " " +
           response.headers.length + " " +
	   response.body.length + "\n" + 
           response.headers.concat([response.body])
}

