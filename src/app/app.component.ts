import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../assets/observable';

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
  .subscribe({
    next(value) {
      a = value;
    },
  });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  a = a;

  @ViewChild('name') nameInputRef: ElementRef;

  ngAfterViewInit(): void {
    function fromEvent(target: HTMLInputElement, eventName: string) {
      return new Observable((observer) => {
        const handler = (e) => observer.next(e);

        target.addEventListener(eventName, handler);

        return () => {
          target.removeEventListener(eventName, handler);
        };
      });
    }

    const ESC_KEY = 'Escape';
    const nameInput: HTMLInputElement = this.nameInputRef.nativeElement;

    fromEvent(nameInput, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        if (e.key === ESC_KEY) {
          nameInput.value = '';
        }
      });
  }
}
