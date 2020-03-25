import { Observable } from 'rxjs';

const locations = new Observable((observer) => {
  let watchId: number;

  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition((position: Position) => {
      observer.next(position);
    }, (error: PositionError) => {
      observer.error(error);
    });
  } else {
    observer.error('Geolocation not available');
  }

  return {
    unsubscribe() {
      navigator.geolocation.clearWatch(watchId);
    }
  };
});

const locationsSubscription = locations.subscribe({
  next(position) {
    console.log('Current Position: ', position);
  },
  error(msg) {
    console.log('Error Getting Location: ', msg);
  },
});

setTimeout(() => {
  locationsSubscription.unsubscribe();
}, 10000);
