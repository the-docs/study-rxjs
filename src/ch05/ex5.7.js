const { fromEvent } = rxjs;

const click$ = fromEvent(document, 'click')
const subscription = click$.subscribe({
  next: v => console.log('click 이벤트 발생'),
  error: e => console.error(e),
  complete: () => console.log('완료')
});
