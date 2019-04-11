import net from "net";
import {BeaconState} from "./types";
import * as msgs from "./messages";
import Peer, {PeerOpts} from "./peer";

export interface HobbitsOpts {
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

  /**
   * Constructor
   * @param {HobbitsOpts} opts
   */
  public constructor(opts: HobbitsOpts) {
    this.port = opts.port || 9000;
    this.networkId = opts.networkId;
    this.chainId = opts.chainId;
    this.state = opts.state;
    this.peers = [];
    this.bootnodes = opts.bootnodes || [];
    this.server = net.createServer();
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
    const peer: Peer = new Peer({
      ip,
      port: this.port
    });

    const res: boolean = peer.connect();
    if (res) {
      // Add peer to peers list
      this.peers.push(peer);
    }
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
    // NOTE: Stubbed -- writin should probably be its own function
    peer.connection.write(msg);
  };

  /**
   * Starts the server
   */
  public start = () => {
    this.server.on("connection", (socket) => {
      console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`)
    });

    this.server.on("close", () => {
      console.log("Closing server!");
    });

    this.server.listen(this.port, () => {
      console.log("Server started!")
    });

    this.connectStaticPeers();
  };

  /**
   * Stops the server
   */
  public stop = async (): Promise<void> => {
    await this.server.close();
    await Promise.all(this.peers.map((peer: Peer) => peer.disconnect());
  }
}
