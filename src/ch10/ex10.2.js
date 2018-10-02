const { Subject } = rxjs;
const subject = new Subject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(2);
