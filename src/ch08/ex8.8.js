const { fromEvent } = rxjs;
const { map, mergeMap, debounceTime, filter } = rxjs.operators;
const { ajax } = rxjs.ajax;
const user$ = fromEvent(document.getElementById('search'), 'keyup')
  .pipe(
    debounceTime(300),
    map(event => event.target.value),
    filter(query => query.trim().length > 0),
    mergeMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`))
  );

user$.subscribe(value => {
  console.log('서버로부터 받은 검색 결과', value);
});
