// Defines the various response codes used in EWP

export enum ResponseCodes {
    Ok = 200,
    BadRequest = 400,
    Forbidden = 403,
    NotFound = 404,
    RequestCompressionUnsupported = 406,
    ResponseCompressionUnsupported = 407,
    NotABlockchain = 418,
    InternalServerError = 500,
    NotImplemented = 501

}
