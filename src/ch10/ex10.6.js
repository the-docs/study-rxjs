const { interval } = rxjs;
const { publish } = rxjs.operators;
const number$ = interval(1000);
const connectable$ = number$.pipe(publish());
let connectSub;
let sub1;
let sub2;

sub1 = connectable$.subscribe(v => console.log(`observerA: ${v}`));
connectSub = connectable$.connect();

setTimeout(() => {
  sub2 = connectable$.subscribe(v => console.log(`observerB: ${v}`));
}, 1100);

setTimeout(() => {
  console.log('observerA is unsubscribed');
  sub1.unsubscribe();
}, 2100);

setTimeout(() => {
  console.log('observerB is unsubscribed');
  sub2.unsubscribe();

  console.log('connectableObservable is unsubscribed');
  connectSub.unsubscribe();
}, 3100);
