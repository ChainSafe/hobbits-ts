import net from "net";
import {BeaconState, Events} from "./types";
import * as msgs from "./messages";
import Peer, {PeerOpts} from "./peer";

export interface HobbitsOpts {
  port?: number;
  networkId: number;
  chainId: number;
  bootnodes?: string[];
  state: BeaconState;
}

export default class HobbitsP2PNetwork {
  public running: boolean;
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
    this.running = false;
  }

  /**
   * Connects to static peers
   */
  private connectStaticPeers = async (): Promise<void> => {
    await Promise.all(this.bootnodes.map((bootnode: string): Promise<void> => {
      return this.connect(bootnode);
    }));
    // console.log(`Connected to ${this.peers.length} static peers`);
  };

  /**
   * Connects to a peer
   * @param {string} ip
   */
  private connect = async (ip: string): Promise<void> => {
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

  private listenToPeers = (): void => {
    this.peers.map((peer: Peer): void => {

      peer.on(Events.Hello, (data): void => {
        console.log(`Parent Received: ${data}`);
      });

      peer.start();
    })
  };

  /**
   * Sends 0x00 message "Hello"
   * @param peer
   */
  private sendHello = (peer): void => {
    const msg: msgs.Hello = {
      networkId: this.networkId,
      chainId: this.chainId,
      latestFinalizedRoot: this.state.latestFinalizedRoot,
      latestFinalizedEpoch: this.state.latestFinalizedEpoch,
      bestRoot: this.state.latestFinalizedRoot,
      bestSlot: this.state.latestFinalizedSlot
    };
    // NOTE: Stubbed -- writin should probably be its own function
    peer.connection.write(JSON.stringify(msg));
  };

  /**
   * Starts the server
   */
  public start = (): void => {
    this.server.on("connection", (connection): void => {
      const peerOpts: PeerOpts = {ip: connection.remoteAddress, port: connection.remotePort};
      this.peers.push(new Peer(peerOpts));
      console.log(`SERVER :: CONNECTED TO: ${connection.remoteAddress}:${connection.remotePort}`);
      console.log(`SERVER :: TOTAL PEERS: ${this.peers.length}`);
    });

    this.server.on("close", (): void => {
      // console.log("Closing server!");
      this.running = false;
    });

    this.server.listen(this.port, (): void => {
      // console.log("Server started!");
      this.running = true;
    });

    this.connectStaticPeers();
    this.listenToPeers();
  };

  /**
   * Get the total number of connected peers
   * @returns {number}
   */
  public getTotalPeers = (): number => {
    return this.peers.length;
  };

  /**
   * Stops the server
   */
  public stop = async (): Promise<void> => {
    await this.server.close();
    await Promise.all(this.peers.map((peer: Peer): Promise<void> => peer.disconnect()));
  }
}
