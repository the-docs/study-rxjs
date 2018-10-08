const {
  animationFrameScheduler,
  interval,
  of,
  concat,
} = rxjs;
const { 
  map,
  takeWhile,
} = rxjs.operators;

const DURATION = 300;
const from = 100;
const to = 500;
const scheduler = animationFrameScheduler;
const start = scheduler.now();

const interval$ = interval(0, scheduler).pipe(
  map(() => (scheduler.now() - start) / DURATION),
  takeWhile(rate => rate <= 1),
);

const animation$ = concat(interval$, of(1)).pipe(
  map(rate => from + (to - from) * rate),
);

animation$.subscribe(pos => console.log('animation$', pos));
