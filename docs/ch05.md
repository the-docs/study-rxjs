# 5 Observable 만들기

## 5.1 Observable 생성자를 이용하여 Observable 만들기
- [ex5.1][link1]

## 5.2 Observable 구현 시 고려해야 할 것들

### 5.2.1 에러 발생
- [ex5.2][link2]

### 5.2.2 데이터 전달이 완료된 경우
- [ex5.3][link3]

### 5.2.3 구독 해제
- [ex5.4][link4]

## 5.3 RxJS 네임스페이스에 있는 생성 함수로 Observable 만들기

### 5.3.1 of
`of(values: ...T, scheduler: Scheduler): Observable<T>`
- [ex5.5][link5]

### 5.3.2 range
`range(start: number, count: number, scheduler: Scheduler): Observable`
- [ex5.6][link6]

### 5.3.3 fromEvent
`fromEvent(target: EventTargetLike, eventName: string, option: EventListenerOptions, selector: SelectorMethodSignature<T>): Observable<T>`
- [ex5.7][link7]

### 5.3.4 from
`from(ish: ObservableInput<T>, scheduler: Scheduler): Observable`
- 배열, 배열 같은 객체
  - [ex5.8][link8]
- Iterable 객체
  - [ex5.9][link9]
- Promise
  - [ex5.10][link10]

### 5.3.5 interval
`interval(period: number, scheduler: Scheduler): Observable`
- [ex5.11][link11]

## 5.4 특별한 용도의 Observable 만들기

### 5.4.1 empty
`empty(scheduler: Scheduler): Observable`
- [ex5.12][link12]

### 5.4.2 throwError
`throwError(error: any, scheduler: Scheduler): Observable`
- [ex5.13][link13]

### 5.4.3 never
`never(scheduler: Scheduler): Observable`
- [ex5.14][link14]

## 5.5 정리

[link1]: "/src/ch5/ex5.1.js"
[link2]: "/src/ch5/ex5.2.js"
[link3]: "/src/ch5/ex5.3.js"
[link4]: "/src/ch5/ex5.4.js"
[link5]: "/src/ch5/ex5.5.js"
[link6]: "/src/ch5/ex5.6.js"
[link7]: "/src/ch5/ex5.7.js"
[link8]: "/src/ch5/ex5.8.js"
[link9]: "/src/ch5/ex5.9.js"
[link10]: "/src/ch5/ex5.10.js"
[link11]: "/src/ch5/ex5.11.js"
[link12]: "/src/ch5/ex5.12.js"
[link13]: "/src/ch5/ex5.13.js"
[link14]: "/src/ch5/ex5.14.js"
