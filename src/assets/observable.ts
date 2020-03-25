import { Observable, Subscriber } from 'rxjs';

function sequenceSubscriber(observer): any {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();

  return { unsubscribe() { } };
}

const sequence = new Observable(sequenceSubscriber);

sequence.subscribe({
  next(value) { console.log(value); },
  complete() { console.log('Finished sequence'); },
});
