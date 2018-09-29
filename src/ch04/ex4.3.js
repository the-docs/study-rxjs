const { fromEvent } = rxjs;
const { pluck } = rxjs.operators;
const click$ = fromEvent(document, 'click')
.pipe(
  pluck('currentTarget')
);
const observer = currentTarget => {
  console.log(currentTarget);
};
click$.subscribe(observer);
