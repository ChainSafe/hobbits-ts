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
  const server1 = new HobbitsP2PNetwork(ctx);
  const server2 = new HobbitsP2PNetwork({...ctx, port: 9001, bootnodes: ["127.0.0.1:9000"]});

  before(async () => {
    await server1.start();
  });

  it("Server1 should have 0 connections", async () => {
    // Check the total amount before connecting
    const peersBefore: number = server1.getTotalPeers();
    assert.strictEqual(peersBefore, 0, `Expected total count to be 0 but got ${peersBefore}`);

    // TODO move this
    await net.createConnection({port: 9000});

    // TODO Optimize this next block, connection has to be made outside next block due to async issues
    describe("Connect to server", () => {
      it("It should have 1 connection", () => {
        // Check total connections after the before script runs
        const peersAfter: number = server1.getTotalPeers();
        assert.strictEqual(peersAfter, 1, `Expected total count to be 1 but got ${peersAfter}`);
      })
    });
  });
});

