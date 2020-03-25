import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

const observable = new Observable<number>((observer) => {
  observer.next(1);
});

let a = 1;

observable.subscribe((value) => {
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
