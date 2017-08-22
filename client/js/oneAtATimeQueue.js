/**
 * @param  {Function} [onEmpty] fired when the queue is empty
 * @return {Function} function that queues up a lazy promise
 */
export default function createOneAtATimeQueue({ onEmpty = () => {} } = {}) {

  // local state
  const state = {
    inFlight: null, // Promise
    next: null // Lazy promise (function that returns a promise)
  };

  // a function to execute a lazy promise and handle it's return
  const firePromise = (lazyPromise) => {
    state.inFlight = lazyPromise()
      .then(result => {
        console.log("    NEXT", state.next);
        if (state.next){
          console.log("fire queued!");
          const next = state.next;
          state.next = null;
          firePromise(next);
        }
        else {
          onEmpty();
          state.inFlight = null;
          console.log("empty!", state.inFlight);
        }

        return result;
      });
  };


  return {
    /**
    * this function will be called by the consumer potentially rapidly
    * @param  {Function} lazyPromise a function that returns a Promise
    * @return {Nothing} nothing
    */
    enqueue: (lazyPromise) => {

      console.log("state.inFlight", state.inFlight);

      // if there is a promise currently in flight,
      // replace the next with this lazyPromise
      if (state.inFlight !== null) {
        console.log("replace!");
        state.next = lazyPromise;
      }
      // it's all clear, kick it off!
      else {
        console.log("fire new!");
        firePromise(lazyPromise);
      }

      return state.inFlight;
    }
  };
}
