import net from "net";
import {BeaconState, Peer} from "./types";
import * as msgs from "./messages";

export interface HobbitsCtx {
  port?: number,
  networkId: number,
  chainId: number,
  bootnodes?: string[],
  state: BeaconState
}

export default class HobbitsP2PNetwork {
  private port: number;
  private networkId: number;
  private chainId: number;
  private peers: Peer[];
  private bootnodes: string[];
  private state: BeaconState;
  private server: net.Server;

  constructor(ctx: HobbitsCtx) {
    this.port = ctx.port || 9000;
    this.networkId = ctx.networkId;
    this.chainId = ctx.chainId;
    this.state = ctx.state;
    this.peers = [];
    this.bootnodes = ctx.bootnodes || [];
  }

  /**
   * Connects to static peers
   */
  private connectStaticPeers = () => {
    this.bootnodes.map((bootnode: string) => {
      this.connect(bootnode);
    });
    console.log(`Connected to ${this.peers.length} static peers`);
  };

  /**
   * Connects to a peer
   * @param {string} ip
   */
  private connect = (ip: string) => {
    // Attempt to connect to peer, if connection refused remove the peer from bootnodes.
    let connection: net.Socket;
    try {
      connection = net.createConnection({port: this.port});
    } catch (e) {
      console.log(`Error Connecting to static peer: ${ip}`);
      const index = this.bootnodes.indexOf(ip);
      if (index > -1) {
        this.bootnodes.splice(index, 1);
      }
      return;
    }

    const peer: Peer = {
      ip,
      connection
    };
    // Add peer to peers list
    this.peers.push(peer);
    // Send
    this.sendHello(peer)
  };

  /**
   * Sends 0x00 message "Hello"
   * @param peer
   */
  private sendHello = (peer) => {
    const msg: msgs.Hello = {
      network_id: this.networkId,
      chain_id: this.chainId,
      latest_finalized_root: this.state.latestFinalizedRoot,
      latest_finalized_epoch: this.state.latestFinalizedEpoch,
      best_root: this.state.latestFinalizedRoot,
      best_slot: this.state.latestFinalizedSlot
    };

    peer.connection.write(msg);
  };

  /**
   * Starts the server
   */
  public start = () => {
    this.server = net.createServer();
    this.server.on("connection", (socket) => {
      console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`)
    });

    this.server.on("close", () => {
      console.log("Closing server!");
    });

    this.server.listen(this.port, () => {
      console.log("Server started!")
    })
  };

  /**
   * Stops the server
   */
  public stop = () => {
    this.server.close(() => {
      console.log('Server closed!')
    })
  }
}
