const { range } = rxjs;

range(1, 10)
.subscribe({
  next: console.log,
  error: console.error,
  complete: () => console.log('완료')
});
