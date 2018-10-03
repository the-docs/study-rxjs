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
} = rxjs.operators;

const start$ = fromEvent($view, EVENTS.start);
const move$ = fromEvent($view, EVENTS.move);
const end$ = fromEvent($view, EVENTS.end);

const drag$ = start$
.pipe(
  switchMap(start => move$.pipe(takeUntil(end$))),
);
