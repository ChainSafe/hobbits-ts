import net from "net";
import {EventEmitter} from "events";

export interface PeerOpts {
  ip: string;
  port: number;
}

export default class Peer extends EventEmitter {
  public ip: string;
  public port?: number;
  public connection: net.Socket;

  /**
   * Constructor
   * @param {PeerOpts} opts
   */
  public constructor(opts: PeerOpts) {
    super();
    this.ip = opts.ip;
    this.port = opts.port || 9000;
  }

  /**
   * Establishes a connection to the peer.
   * @returns {boolean}
   */
  public connect = (): boolean => {
    // Attempt to connect to peer, if connection refused remove the peer from bootnodes.
    try {
      this.connection = net.createConnection({port: this.port});
      this.start();
      return true;
    } catch (e) {
      console.log(`Error Connecting to static peer: ${this.ip}`);
      return false;
    }
  };

  /**
   * Starts listening for incoming messages from the server
   */
  private start = () => {
    this.connection.on('data', (data) => {
      this.emit("new-data", data.toString());
      this.connection.end();
    });

    this.connection.on('end', () => {
      this.emit("status","Disconnecting from server!");
    });
  };

  /**
   * Destroys the connection to the peer.
   * @returns {Promise<void>}
   */
  public disconnect = async (): Promise<void> => {
    await this.connection.destroy()
  };
}
