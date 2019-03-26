import { assert } from "chai";
import "mocha"; 

import {
   parseRequest,
   parseResponse,
   createRequestStr,
   createResponseStr
} from "../src/index"

import {
   Request,
   Response
} from "../src/types"

describe("Dealing with Requests", () => {
  const testCases: any = [
    {input: "EWP 0.1 PING none none 0 5\n12345", 
     output: {protocol: "EWP", version: "0.1", command: "PING", compression: "none", response_compression: ["none"], head_only_indicator: false, headers: '', body: '12345'} },
     {input: "EWP 0.1 HELLO deflate gzip,snappy 0 1\n5", 
      output: {protocol: "EWP", version: "0.1", command: "HELLO", compression: "deflate", response_compression: ["gzip", "snappy"], head_only_indicator: false, header: '', body: '5'}},
  ];

  for (const {input, output} of testCases) {
      assert.deepEqual(parseRequest(input), output);
  }
})

describe("Dealing with Responses", () => {
  const testCases: any = [
    {input: "200 none 5 5\n1234512345", 
     output: {code: 200, compression: "none", headers: '12345', body: '12345'}},
    {input: "200 gzip 1 2\n156", 
     output: {code: 200, compression: "gzip", headers: '1', body: '56'}}
  ];

  for (const {input , output} of testCases) {
      assert.deepEqual(parseRequest(input), output);
  }


})
