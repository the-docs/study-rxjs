const { Observable } = rxjs;
const interval$ = new Observable(function subscribe(observer) {
  const id = setInterval(function () {
    observer.next(new Date().toString());
  }, 1000);
  return function () {
    console.log('interval 제거');
    clearInterval(id);
  }
});

const subscription = interval$.subscribe(v => console.log(v));

setTimeout(function () {
  subscription.unsubscribe();
}, 5000);
