const $view = document.getElementById('carousel');
const $container = $view.querySelector('.carousel-container');
const PANEL_COUNT = $container.querySelectorAll('.carousel-panel').length;

const SUPPORT_TOUCH = 'ontouchstart' in window;
const EVENTS = {
  start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
  end: SUPPORT_TOUCH ? 'touchend' : 'mouseup',
};

const {
  fromEvent,
  merge,
} = rxjs;
const {
  startWith,
  map,
  switchMap,
  takeUntil,
  first,
  share,
  withLatestFrom,
  scan,
} = rxjs.operators;

function toPos(obserable$) {
  return obserable$.pipe(
    map(v => SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX),
  );
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
// drag$.subscribe(distance => console.log('drag$', distance));

const drop$ = drag$.pipe(
  switchMap(drag => {
    return end$.pipe(
      map(event => drag),
      first(),
    );
  }),
  withLatestFrom(size$, (drag, size) => {
    return { ...drag, size };
  }),
);
// drop$.subscribe(array => console.log('drop$', array));

const carousel$ = merge(drag$, drop$).pipe(
  scan((store, { distance, size }) => {
    const updateStore = {
      from: -(store.index * store.size) + distance,
    };

    if (size === undefined) {
      updateStore.to = updateStore.from;
    } else {
      
    }

    return { ...store, ...updateStore };
  }, {
    from: 0,
    to: 0,
    index: 0,
    size: 0,
  }),
);
carousel$.subscribe(v => console.log(v));
