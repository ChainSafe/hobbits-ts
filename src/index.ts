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
    let requestLine, payload = message.split("\n");
    let requestFields = requestLine.split(" ");

    let request: Request = {
        protocol: requestFields[0],
        version: requestFields[1],
	command: requestFields[2],
	compression: requestFields[3],
	response_compression: requestFields[4].split(","),
	head_only_indicator: ,
	headers:,
	body:,

     };
     return request;
}

function parseResponse(message: string) {
    let responseLine, payload = message.split("\n");
    let responseFields = responseLine.split(" ");

    let response: Response = {
        code: parseInt(responseFields[0]),
	compression: responseFields[1],
	headers:,
	body:,
    }
}


