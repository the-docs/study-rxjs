const $view = document.getElementById('carousel');
const $container = $view.querySelector('.carousel-container');
const PANEL_COUNT = $container.querySelectorAll('.carousel-panel').length;

const SUPPORT_TOUCH = 'ontouchstart' in window;
const EVENTS = {
  start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
  end: SUPPORT_TOUCH ? 'touchend' : 'mouseup',
};
const HOLD = 100;
const DEFAULT_DURATION = 300;

const { fromEvent, merge, defer, animationFrameScheduler, interval, of, concat } = rxjs;
const {
  tap,
  map,
  startWith,
  switchMap,
  takeUntil,
  share,
  first,
  withLatestFrom,
  scan,
  takeWhile,
} = rxjs.operators;

const toPos = (obs$) => {
  return obs$.pipe(
    map(event => SUPPORT_TOUCH
      ? event.changedTouches[0].pageX
      : event.pageX
    ),
  );
}

const translateX = (pos) => {
  $container.style.transform = `translate3d(${pos}px, 0,0)`;
}

const animation = ({ from, to }) => {
  return defer(() => {
    const scheduler = animationFrameScheduler;
    const start = scheduler.now();
    const interval$ = interval(0, scheduler).pipe(
      map(() => (scheduler.now() - start) / DEFAULT_DURATION),
      takeWhile(rate => rate <= 1),
    );

    return concat(interval$, of(1)).pipe(
      map(rate => from + (to - from) * rate),
    );
  });
}

const start$ = fromEvent($view, EVENTS.start).pipe(toPos);
const move$ = fromEvent($view, EVENTS.move).pipe(toPos);
const end$ = fromEvent($view, EVENTS.end);
const size$ = fromEvent(window, 'resize').pipe(
  startWith(0),
  map(event => $view.clientWidth),
);

const drag$ = start$.pipe(
  switchMap(start => {
    return move$.pipe(
      map(move => move - start),
      takeUntil(end$),
    );
  }),
  share(),
  map(distance => ({ distance })),
);

const drop$ = drag$.pipe(
  switchMap(drag => {
    return end$.pipe(
      map(end => drag),
      first(),
    );
  }),
  withLatestFrom(size$, (drag, size) => ({ ...drag, size })),
);

const carousel$ = merge(drag$, drop$).pipe(
  scan((store, { distance, size }) => {
    const updateStore ={
      from: -(store.index * store.size) + distance,
    };

    if (size === undefined) {
      updateStore.to = updateStore.from;
    } else {
      let nextIndex = store.index;
      if (Math.abs(distance) >= HOLD) {
        nextIndex = distance < 0
          ? Math.min(store.index + 1, PANEL_COUNT - 1)
          : Math.max(store.index - 1, 0);
      }
      updateStore.index = nextIndex;
      updateStore.to = -(nextIndex * size);
      updateStore.size = size;
    }

    return { ...store, ...updateStore }
  }, {
    from: 0,
    to: 0,
    index: 0,
    size: 0,
  }),
  switchMap(({ from, to }) => from === to ? of(to) : animation({ from, to })),
);
carousel$.subscribe(pos => translateX(pos));
