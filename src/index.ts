import net from "net";
import {BeaconState, Peer} from "./types";
import * as msgs from "./messages";

interface HobbitsCtx {
  port: number,
  networkId: number,
  chainId: number,
  peers: Peer[],
  staticPeers: Peer[],
  state: BeaconState
}

class HobbitsP2PNetwork {
  private port: number;
  private networkId: number;
  private chainId: number;
  private peers: Peer[];
  private staticPeers: Peer[];
  private state: BeaconState;

  constructor(ctx: HobbitsCtx) {
    this.port = ctx.port;
    this.networkId = ctx.networkId;
    this.chainId = ctx.chainId;
    this.peers = ctx.peers;
    this.state = ctx.state;
    this.staticPeers = ctx.staticPeers;
  }

  private connectStaticPeers = () => {
    this.staticPeers.map((peer: Peer) => {
      this.connect(peer);
    })
  };

  private connect = (peer: Peer) => {
    // TODO connect to the peer

    this.sendHello()
  };

  private sendHello = () => {
    const msg: msgs.Hello = {
      network_id: this.networkId,
      chain_id: this.chainId,
      latest_finalized_root: this.state.latestFinalizedRoot,
      latest_finalized_epoch: this.state.latestFinalizedEpoch,
      best_root: this.state.latestFinalizedRoot,
      best_slot: this.state.latestFinalizedSlot
    }
  };

  private startServer = () => {
    const server = net.createServer().listen(9000, "127.0.0.1");
    server.on("connection", (socket) => {
      console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`)
    })
  }
}
