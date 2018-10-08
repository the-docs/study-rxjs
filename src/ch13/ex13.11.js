const {
  animationFrameScheduler,
  interval,
  of,
  concat,
  defer,
} = rxjs;
const { 
  map,
  takeWhile,
} = rxjs.operators;

function animation(from, to, duration) {
  return defer(() => {
    const scheduler = animationFrameScheduler;
    const start = scheduler.now();
    const interval$ = interval(0, scheduler).pipe(
      map(() => (scheduler.now() - start) / duration),
      takeWhile(rate => rate <= 1),
    );

    return concat(interval$, of(1)).pipe(
      map(rate => from + (to - from) * rate),
    );
  });
}

const animation$ = animation(100, 500, 300);
// animation$.subscribe(pos => console.log('animation$', pos));

setTimeout(() => {
  animation$.subscribe(v => console.log('animation$', v));
}, 500);
