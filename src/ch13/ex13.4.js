const { of, asyncScheduler, asapScheduler } = rxjs;
const { tap, observeOn } = rxjs.operators;

const obs$ = of('A', 'B', 'C').pipe(
  tap(v => console.log(v, '데이터 처리1')),
  tap(v => console.log(v, '데이터 처리2')),
  observeOn(asyncScheduler),
  tap(v => console.log(v, '데이터 처리3')),
  tap(v => console.log(v, '데이터 처리4')),
  observeOn(asapScheduler),
  tap(v => console.log(v, '데이터 처리5')),
  tap(v => console.log(v, '데이터 처리6')),
);

obs$.subscribe(v => console.log(v));
