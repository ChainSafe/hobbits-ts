// Defines the types used in the EWP

export interface Request {
    protocol: string;
    version: string;
    command: string;
    compression: string;
    response_compression: string[];
    head_only_indicator: boolean;
    headers: string;
    body: string;
}

export interface Response {
    code: number;
    compression: string;
    headers: string;
    body: string;
}
