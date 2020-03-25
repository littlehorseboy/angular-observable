import { of } from 'rxjs';

const observable = of(1, 2, 3);

observable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Observer got a complete notification'),
});
