const { fromEvent } = rxjs;
const { map } = rxjs.operators;
const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
  .pipe(
    map(event => event.target.value)
  );

keyup$.subscribe(value => {
  console.log('search input에 입력된 값', value);
});
