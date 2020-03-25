import { Observable } from 'rxjs';

function multicastSequenceSubscriber() {
  const seq = [1, 2, 3];

  const observers = [];

  let timeoutId: ReturnType<typeof setTimeout>;

  return (observer) => {
    observers.push(observer);

    if (observers.length === 1) {
      timeoutId = doSequence({
        next(value) {
          observers.forEach((obs) => obs.next(value));
        },
        complete() {
          observers.slice(0).forEach((obs) => obs.complete());
        },
      }, seq, 0);
    }

    return {
      unsubscribe() {
        observers.splice(observers.indexOf(observer), 1);
        if (observers.length === 0) {
          clearTimeout(timeoutId);
        }
      },
    };
  };
}

function doSequence(observer, arr, idx) {
  return setTimeout(() => {
    observer.next(arr[idx]);
    if (idx === arr.length - 1) {
      observer.complete();
    } else {
      doSequence(observer, arr, idx += 1);
    }
  }, 1000);
}

const multicastSequence = new Observable(multicastSequenceSubscriber());

multicastSequence.subscribe({
  next(value) { console.log(`1st subscribe:  ${value}`); },
  complete() { console.log('1st sequence finished.'); },
});

setTimeout(() => {
  multicastSequence.subscribe({
    next(value) { console.log(`2st subscribe:  ${value}`); },
    complete() { console.log('2st sequence finished.'); },
  });
}, 500);
