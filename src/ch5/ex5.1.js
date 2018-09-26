const { Observable } = rxjs;
const numbers$ = new Observable(function subscribe(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
});
numbers$.subscribe(v => console.log(v));
