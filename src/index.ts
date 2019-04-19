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
  private connectStaticPeers = async () => {
    await Promise.all(this.bootnodes.map((bootnode: string) => {
      this.connect(bootnode);
    }));
    console.log(`Connected to ${this.peers.length} static peers`);
  };

  /**
   * Connects to a peer
   * @param {string} ip
   */
  private connect = async (ip: string) => {
    const peer: Peer = new Peer({
      ip,
      port: this.port
    });

    const res: boolean = await peer.connect();
    if (res) {
      // Add peer to peers list
      this.peers.push(peer);
    }
  };

  private listenToPeers = () => {
    this.peers.map((peer: Peer) => {

      peer.on("hello", (data) => {
        console.log(`Parent Received: ${data}`);
      });

      peer.start();
    })
  };

  /**
   * Sends 0x00 message "Hello"
   * @param peer
   */
  private sendHello = (peer) => {
    const msg: msgs.Hello = {
      networkId: this.networkId,
      chainId: this.chainId,
      latestFinalizedRoot: this.state.latestFinalizedRoot,
      latestFinalizedEpoch: this.state.latestFinalizedEpoch,
      bestRoot: this.state.latestFinalizedRoot,
      bestSlot: this.state.latestFinalizedSlot
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
    this.listenToPeers();
  };

  /**
   * Stops the server
   */
  public stop = async (): Promise<void> => {
    await this.server.close();
    await Promise.all(this.peers.map((peer: Peer) => peer.disconnect()));
  }
}
