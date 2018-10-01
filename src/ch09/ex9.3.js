const $layer = document.getElementById('suggestLayer');

const drawLayer = function(items) {
  $layer.innerHTML = items.map(user => {
    return `<li class="media my-4">
      <img class="mr-3"
        src="${user.avatar_url}"
        alt="Generic placeholder image"
        style="height: 64px; width: 64px;"
      >
      <div class="media-body">
        <h5 class="mt-0">${user.login}</h5>
        <a href="${user.html_url}">HomePage</a>
      </div>
    </li>`
  }).join('');
}

const $loading = document.getElementById('loading');

const showLoading = function() {
  $loading.style.display = 'block';
}
const hideLoading = function() {
  $loading.style.display = 'none';
}

const { fromEvent } = rxjs;
const {
  map,
  mergeMap,
  debounceTime,
  filter,
  distinctUntilChanged,
  tap,
  partition,
} = rxjs.operators;
const { ajax } = rxjs.ajax;

const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
  .pipe(
    debounceTime(300),
    map(event => event.target.value),
    distinctUntilChanged(),
  );

const [user$, reset$] = keyup$
  .pipe(
    partition(query => query.trim().length > 0),
  );

user$
  .pipe(
    filter(query => query.trim().length > 0),
    tap(showLoading),
    mergeMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
    tap(hideLoading),
  )
  .subscribe(value => {
    drawLayer(value.items)
  });

reset$
  .pipe(
    filter(query => query.trim().length === 0),
    tap(v => $layer.innerHTML = ''),
  )
  .subscribe();
