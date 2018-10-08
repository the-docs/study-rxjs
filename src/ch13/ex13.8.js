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

const scheduler = animationFrameScheduler;
const start = scheduler.now();
const DURATION = 300;

const interval$ = interval(0, scheduler).pipe(
  map(() => (scheduler.now() - start) / DURATION),
  takeWhile(rate => rate <= 1),
);

const animation$ = concat(interval$, of(1));

animation$.subscribe(rate => console.log('animation$', rate));
