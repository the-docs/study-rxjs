const { of } = rxjs;
const { reduce } = rxjs.operators;

of(10, 20, 30, 40, 50).pipe(
  reduce((store, value, index) => {
    store.sum += value;
    store.avg = store.sum / (index + 1);
    return store;
  }, {
    sum: 0,
    avg: 0,
  }),
).subscribe(value => console.log('reduce', value));
