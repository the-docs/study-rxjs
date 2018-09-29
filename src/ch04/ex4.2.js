const { fromEvent } = rxjs;
const click$ = fromEvent(document, 'click');
const observer = event => {
  console.log(event.currentTarget);
};
click$.subscribe(observer);
