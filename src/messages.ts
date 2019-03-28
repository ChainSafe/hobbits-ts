import {BeaconBlockRoot} from "./types";

export interface RpcBody {
  method_id: number;
  id: 1;
  body: requests;
}

type requests = Hello | Goodbye | GetStatus | GetBlockRoots | BlockRoots | GetBlockHeaders | BlockHeaders | GetBlockBodies | BlockBodies;

// 0x00
export interface Hello {
  network_id: number;
  chain_id: number;
  latest_finalized_root: Buffer;
  latest_finalized_epoch: number;
  best_root: Buffer;
  best_slot: number;
}

// 0x01
export interface Goodbye {
  reason: number;
}

// 0x02
export interface GetStatus {
  sha: Buffer;
  user_agent: Buffer;
  timestamp: number;
}

// 0x0A
export interface GetBlockRoots {
  start_root: Buffer;
  start_slot: number;
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
  start_root: Buffer;
  start_slot: number;
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
  start_root: Buffer;
  start_slot: number;
  max: number;
  skip: number;
  direction: number;
}

// 0x0F
export interface BlockBodies {
  blocks: BeaconBlockBody[];
}
