const { of } = rxjs;
of(10, 20, 30)
.subscribe({
  next: console.log,
  error: console.error,
  complete: () => console.log('완료')
});
