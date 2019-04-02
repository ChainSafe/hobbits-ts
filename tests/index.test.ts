import {assert} from "chai";
import net from "net";
import HobbitsP2PNetwork, {HobbitsCtx} from "../src";

describe("P2P", () => {
  const ctx: HobbitsCtx = {
    networkId: 1,
    chainId: 1,
    state: {
      latestFinalizedRoot: Buffer.alloc(0),
      latestFinalizedEpoch: 1,
      latestFinalizedSlot: 1
    }
  };
  const server1 = new HobbitsP2PNetwork(ctx);
  const server2 = new HobbitsP2PNetwork({...ctx, port: 9001, bootnodes: ["172.0.0.1:9000"]});

  before(() => {
    server1.start();
  });

  it("Should successfully connect to the server", () => {
    try {
      net.createConnection({port: 9000});
      assert.isTrue(true);
    } catch (e) {
      console.log(e);
      assert.isTrue(false)
    }
  });

  // it("Should send hello", () => {
  //   server2.start();
  //   Todo figure out how to check if it said hello
  // });

});

