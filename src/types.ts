import net from "net";

export interface BeaconBlockRoot {
  block_root: Buffer;
  slot: number;
}

export interface BeaconBlockHeader {
  stub: number;
}

export interface BeaconBlockBody {
  stub: number;
}

export interface Peer {
  ip: string;
  connection: net.Socket;
}

export interface BeaconState {
  latestFinalizedRoot: Buffer;
  latestFinalizedEpoch: number;
  latestFinalizedSlot: number;
}
