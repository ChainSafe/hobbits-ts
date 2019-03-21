// Defines the types used in the EWP

export interface request {
    protocol: string;
    version: string;
    command: string;
    response_compression: string[];
    head_only_indicator: boolean;
    headers: Buffer;
    body: Buffer;
}

export interface response {
    code: number;
    compression: string;
    headers: Buffer;
    body: Buffer;
}
