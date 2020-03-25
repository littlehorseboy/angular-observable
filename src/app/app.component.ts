import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const observable = new Observable<number>((observer) => {
  observer.next(1);
});

let a = 1;

// observable.subscribe((value) => {
//   a = value;
// });

observable
  .pipe(
    map((value) => value * 2),
  )
  .subscribe((value) => {
    a = value;
  });


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = a;
}
