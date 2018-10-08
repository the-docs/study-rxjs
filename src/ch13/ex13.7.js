const { animationFrameScheduler, interval } = rxjs;
const { 
  map,
  takeWhile,
} = rxjs.operators;

const scheduler = animationFrameScheduler;
const start = scheduler.now();
const DURATION = 300;
const animation$ = interval(0, scheduler).pipe(
  map(() => (scheduler.now() - start) / DURATION),
  takeWhile(rate => rate <= 1),
);

animation$.subscribe(rate => console.log('animation$', rate));
