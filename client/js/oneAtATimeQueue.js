
/**
 * @param  {Function} [onEmpty] fired when the queue is empty
 * @return {Function} function that queues up a lazy promise
 */
export default function createOneAtATimeQueue({ onEmpty = () => {} } = {}) {

  // local state
  const state = {
    isInFlight: false,
    next: null
  };

  // a function to execute a lazy promise and handle it's return
  const firePromise = (lazyPromise) => {
    state.isInFlight = true;

    lazyPromise()
      .then(() => {
        if (state.next){
          console.log("fire queued!");
          firePromise(state.next);
          state.next = null;
        }
        else {
          console.log("empty!");
          onEmpty();
          state.isInFlight = false;
        }
      });
  };


  return {
    /**
    * this function will be called by the consumer potentially rapidly
    * @param  {Function} lazyPromise a function that returns a Promise
    * @return {Nothing} nothing
    */
    enqueue: (lazyPromise) => {

      // if there is a promise currently in flight,
      // repace the next with this lazyPromise
      if (state.isInFlight) {
        console.log("replace!");
        state.next = lazyPromise;
      }
      // it's all clear, kick it off!
      else {
        console.log("fire new!");
        firePromise(lazyPromise);
      }
    }
  };
}
