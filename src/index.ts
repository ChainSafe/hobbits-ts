import net from "net";
import {Peer} from "./types";

class HobbitsP2PNetwork {
  readonly port: number;
  private peers: Peer[];
  private staticPeers: Peer[];

  constructor(
    port: number,
    peers: Peer[],
    staticPeers: Peer[]) {

    this.port = port;
    this.peers = peers;
    this.staticPeers = staticPeers;
  }

  private connectStaticPeers = () => {
    this.staticPeers.map((peer: Peer) => {
      this.connect(peer);
    })
  };

  private connect = (peer: Peer) => {
    // TODO connect to the peer
  };

  private startServer = () => {
    const server = net.createServer().listen(9000, "127.0.0.1");
    server.on("connection", (socket) => {
      console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`)
    })
  }
}
