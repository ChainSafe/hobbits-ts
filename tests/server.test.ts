import {assert} from "chai";
import net from "net";
import HobbitsP2PNetwork, {HobbitsOpts} from "../src";

describe("Server", () => {
  const ctx: HobbitsOpts = {
    networkId: 1,
    chainId: 1,
    state: {
      latestFinalizedRoot: Buffer.alloc(0),
      latestFinalizedEpoch: 1,
      latestFinalizedSlot: 1
    }
  };
  // const server2 = new HobbitsP2PNetwork({...ctx, port: 9001, bootnodes: ["127.0.0.1:9000"]});

  describe("Startup/Shutdown", async () => {
    const server = new HobbitsP2PNetwork(ctx);

    it("The server should not be running", async () => {
      const status: boolean = server.running;
      assert.isFalse(status, `Server should have returned false, but it returned with ${status}`);
    });

    it("The server should be running", async () => {
      await server.start();
      const status: boolean = server.running;
      assert.isTrue(status, `Server should have returned true, but it returned with ${status}`)
    });

    it("The server should shutdown", async () => {
      await server.stop();
      const status: boolean = server.running;
      assert.isFalse(status, `Server should have returned false, but it returned with ${status}`);
    })
  });

  describe("Connections", () => {
    const server = new HobbitsP2PNetwork(ctx);

    before(async () => {
      await server.start();
    });

    it("Server should have 0 connections", async () => {
      // Check the total amount before connecting
      const peersBefore: number = server.getTotalPeers();
      assert.strictEqual(peersBefore, 0, `Expected total count to be 0 but got ${peersBefore}`);

      describe("Connect to server", () => {
        before(async () => {
          await net.createConnection({port: 9000});
        });
        
        // Check total connections after the before script runs
        it("It should have 1 connection", () => {
          const peersAfter: number = server.getTotalPeers();
          assert.strictEqual(peersAfter, 1, `Expected total count to be 1 but got ${peersAfter}`);
        })
      });
    });
  });
});

