import { Observable } from 'rxjs';

function sequenceSubscriber(observer) {
  const seq = [1, 2, 3];
  let timeoutId: ReturnType<typeof setTimeout>;

  function doSequence(arr: Array<any>, idx: number) {
    timeoutId = setTimeout(() => {
      observer.next(arr[idx]);
      if (idx === arr.length - 1) {
        observer.complete();
      } else {
        doSequence(arr, idx += 1);
      }
    }, 1000);
  }

  doSequence(seq, 0);

  return {
    unsubscribe() {
      clearTimeout(timeoutId);
    },
  };
}

const sequence = new Observable(sequenceSubscriber);

sequence.subscribe({
  next(value) { console.log(`1st subscribe:  ${value}`); },
  complete() { console.log('1st sequence finished.'); },
});

setTimeout(() => {
  sequence.subscribe({
    next(value) { console.log(`2st subscribe:  ${value}`); },
    complete() { console.log('2st sequence finished.'); },
  });
}, 500);
