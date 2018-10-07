const { of, asyncScheduler } = rxjs;
const { tap, subscribeOn } = rxjs.operators;

const obs$ = of('A', 'B', 'C').pipe(
  tap(v => console.log(v, '데이터 처리1')),
  tap(v => console.log(v, '데이터 처리2')),
  tap(v => console.log(v, '데이터 처리3')),
  tap(v => console.log(v, '데이터 처리4')),
  tap(v => console.log(v, '데이터 처리5')),
  subscribeOn(asyncScheduler),
);

console.log('[subscribe 전]');
setTimeout(() => {
  const start = new Date().getTime();
  console.log('[subscribe 1초 후]');
  obs$.subscribe(v => console.log('observer received', v));
  console.log(`[subscribe 후 ${new Date().getTime() - start} ms]`);
}, 1000);

// [subscribe 전]
// [subscribe 1초 후]
// [subscribe 후 3 ms]
// A 데이터 처리1
// A 데이터 처리2
// A 데이터 처리3
// A 데이터 처리4
// A 데이터 처리5
// observer received A
// B 데이터 처리1
// B 데이터 처리2
// B 데이터 처리3
// B 데이터 처리4
// B 데이터 처리5
// observer received B
// C 데이터 처리1
// C 데이터 처리2
// C 데이터 처리3
// C 데이터 처리4
// C 데이터 처리5
// observer received C
