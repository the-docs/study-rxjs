const { from } = rxjs;

const success$ = from(Promise.resolve(100));
success$.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log('완료')
});

const fail$ = from(Promise.reject('에러'));
fail$.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log('완료')
})
