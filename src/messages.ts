import {BeaconBlockBody, BeaconBlockHeader, BeaconBlockRoot} from "./types";

export interface RpcBody {
  method_id: number;
  id: 1;
  body: request;
}

type request = Hello | Goodbye | GetStatus | GetBlockRoots | BlockRoots | GetBlockHeaders | BlockHeaders | GetBlockBodies | BlockBodies;

// 0x00
export interface Hello {
  networkId: number;
  chainId: number;
  latestFinalizedRoot: Buffer;
  latestFinalizedEpoch: number;
  bestRoot: Buffer;
  bestSlot: number;
}

// 0x01
export interface Goodbye {
  reason: number;
}

// 0x02
export interface GetStatus {
  sha: Buffer;
  userAgent: Buffer;
  timestamp: number;
}

// 0x0A
export interface GetBlockRoots {
  startRoot: Buffer;
  startSlot: number;
  max: number;
  skip: number;
  direction: number;
}

// 0x0B
export interface BlockRoots {
  roots: BeaconBlockRoot[];
}

// 0x0C
export interface GetBlockHeaders {
  startRoot: Buffer;
  startSlot: number;
  max: number;
  skip: number;
  direction: number;
}

// 0x0D
export interface BlockHeaders {
  headers: BeaconBlockHeader[];
}

// 0x0E
export interface GetBlockBodies {
  startRoot: Buffer;
  startSlot: number;
  max: number;
  skip: number;
  direction: number;
}

// 0x0F
export interface BlockBodies {
  blocks: BeaconBlockBody[];
}
