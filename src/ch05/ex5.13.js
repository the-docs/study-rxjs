const { throwError, of } = rxjs;
const { map } = rxjs.operators;

of(1, -2, 3).pipe(
  map(number => number < 0 ? throwError('number는 0보다 커야한다') : number)
)
.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log('완료')
});
