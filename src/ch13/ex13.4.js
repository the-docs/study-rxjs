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

// A 데이터 처리1
// A 데이터 처리2
// B 데이터 처리1
// B 데이터 처리2
// C 데이터 처리1
// C 데이터 처리2
// A 데이터 처리3
// A 데이터 처리4
// A 데이터 처리5
// A 데이터 처리6
// A
// B 데이터 처리3
// B 데이터 처리4
// B 데이터 처리5
// B 데이터 처리6
// B
// C 데이터 처리3
// C 데이터 처리4
// C 데이터 처리5
// C 데이터 처리6
// C
