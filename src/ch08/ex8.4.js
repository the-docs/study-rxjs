const { fromEvent } = rxjs;
const { map } = rxjs.operators;
const { ajax } = rxjs.ajax;
const user$ = fromEvent(document.getElementById('search'), 'keyup')
  .pipe(
    map(event => event.target.value),
    map(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`))
  );

user$.subscribe(value => {
  console.log('서버로부터 받은 검색 결과', value);
});
