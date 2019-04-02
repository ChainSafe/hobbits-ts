import net from "net";

export interface PeerOpts {
  ip: string;
  port: number;
}

export default class Peer {
  public ip: string;
  public port: number;
  public connection: net.Socket;

  /**
   * Constructor
   * @param {PeerOpts} opts
   */
  public constructor(opts: PeerOpts) {
    this.ip = opts.ip;
    this.port = opts.port;
  }

  /**
   * Establishes a connection to the peer.
   * @returns {boolean}
   */
  public connect = (): boolean => {
    // Attempt to connect to peer, if connection refused remove the peer from bootnodes.
    try {
      this.connection = net.createConnection({port: this.port});
      return true;
    } catch (e) {
      console.log(`Error Connecting to static peer: ${this.ip}`);
      return false;
    }
  };

  /**
   * Destroys the connection to the peer.
   * @returns {Promise<void>}
   */
  public disconnect = async (): Promise<void> => {
    await this.connection.destroy()
  };
}
