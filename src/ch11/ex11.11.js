const $view = document.getElementById('carousel');
const $container = $view.querySelector('.carousel-container');
const PANEL_COUNT = $container.querySelectorAll('.carousel-panel').length;

const SUPPORT_TOUCH = 'ontouchstart' in window;
const EVENTS = {
  start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
  end: SUPPORT_TOUCH ? 'touchend' : 'mouseup',
};

const { fromEvent } = rxjs;
const {
  map,
  takeUntil,
  // mergeAll,
  // mergeMap,
  switchMap,
  // take,
  first,
  startWith,
} = rxjs.operators;

function toPos(obs$) {
  return obs$.pipe(
    map(v => SUPPORT_TOUCH ? v.changedTouchs[0].pageX : v.pageX),
  );
}

const start$ = fromEvent($view, EVENTS.start).pipe(toPos);
const move$ = fromEvent($view, EVENTS.move).pipe(toPos);
const end$ = fromEvent($view, EVENTS.end);

const size$ = fromEvent(window, 'resize').pipe(
  startWith(0),
  map(event => $view.clientWidth),
);

size$.subscribe(width => console.log('view의 넓이', width));

const drag$ = start$.pipe(
  switchMap(start => {
    return move$.pipe(
      map(move => move - start),
      takeUntil(end$),
    );
  }),
);

drag$.subscribe(distance => console.log('start$와 move$의 차이 값', distance));

const drop$ = drag$.pipe(
  switchMap(drag => end$.pipe(first())),
);
