const { Observable } = rxjs;
const numbers$ = Observable.create(observer => {
  console.log('create observable');
  try {
    observer.next(1);
  } catch(e) {
    observer.error('error observable');
  } finally {
    observer.complete();
  }
});

numbers$.subscribe(
  value => console.log(`첫번째 observable ${value}`),
  error => console.error(`첫번째 observable ${error}`),
);

numbers$.subscribe(
  value => console.log(`두번째 observable ${value}`),
  error => console.error(`두번째 observable ${error}`),
);
