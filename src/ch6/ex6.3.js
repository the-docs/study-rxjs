const { interval } = rxjs;
const numbers$ = interval(1000);

numbers$.subscribe(value => console.log(`첫번째 ${value}`));

numbers$.subscribe(value => console.log(`두번째 ${value}`));
