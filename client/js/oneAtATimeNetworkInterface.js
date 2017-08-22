import { createBatchingNetworkInterface } from "react-apollo";
import createOneAtATimeQueue from "./oneAtATimeQueue.js";

// XXX WIP

// http://dev.apollodata.com/core/network.html#custom-network-interface
export class OneAtATimeNetworkInterface {

  constructor(opts) {
    this.batchedInterface = createBatchingNetworkInterface(opts);
    this.queue = createOneAtATimeQueue();
  }

  query(request) {

    // TODO how can we append a new mutation to this batch?
    return this.queue.enqueue(() => {
      console.log("BATCH!");
      return this.batchedInterface.query(request);
    });

  }

  use(middlewares) {
    this.batchedInterface.use(middlewares);
    return this;
  }

  useAfter(afterwares) {
    this.batchedInterface.useAfter(afterwares);
    return this;
  }
}

export function createOneAtATimeNetworkInterface(opts) {
  return new OneAtATimeNetworkInterface(opts);
}
