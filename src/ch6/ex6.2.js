const { interval } = rxjs;
const numbers$ = interval(1000);

numbers$.subscribe(value => console.log(value));
