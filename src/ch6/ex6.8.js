const { Observable } = rxjs;

const obs$ = new Observable(observer => {
  let id;
  try {
    let value = 0;
    id = setInterval(() => {
      console.log(`is going ${value}`);
      observer.next(value++);
    }, 1000);
  } catch(e) {
    observer.next(e);
  }

  return () => {
    clearInterval(id);
    console.log('cancelled');
  }
});

const subscription = obs$.subscribe(
  value => console.log(`observable value ${value}`)
);

setTimeout(() => subscription.unsubscribe(), 3000);
