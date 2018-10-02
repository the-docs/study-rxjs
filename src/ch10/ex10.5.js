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
  $loading.classList.remove('d-none');
  $loading.classList.add('d-block');
}
const hideLoading = function() {
  $loading.classList.remove('d-block');
  $loading.classList.add('d-none');
}

const {
  // Subject,
  fromEvent,
} = rxjs;
const {
  map,
  switchMap,
  debounceTime,
  filter,
  distinctUntilChanged,
  tap,
  partition,
  retry,
  finalize,
  // multicast,
  publish,
} = rxjs.operators;
const { ajax } = rxjs.ajax;

const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
  .pipe(
    debounceTime(300),
    map(event => event.target.value),
    distinctUntilChanged(),
    tap(v => console.log('from keyup$', v)),
    // multicast(new Subject()),
    publish(),
  );

const [user$, reset$] = keyup$
  .pipe(
    partition(query => query.trim().length > 0),
  );

user$
  .pipe(
    tap(showLoading),
    switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
    tap(hideLoading),
    retry(2),
    finalize(hideLoading),
    tap(v => console.log('from user$', v)),
  )
  .subscribe(
    value => drawLayer(value.items),
    error => {
      console.error(error);
      alert(error.message);
    },
  );

reset$
  .pipe(
    tap(v => $layer.innerHTML = ''),
    tap(v => console.log('from reset$', v)),
  )
  .subscribe();

  keyup$.connect();
