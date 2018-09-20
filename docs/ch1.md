# 1 RxJS가 해결하려고 했전 문제 1 - 입력 데이터의 오류

## 1.1 웹 애플리케이션의 입력 데이터

## 1.2 입력 데이터의 전달 시점이 다양하다.

### 1.2.1 동기 (synchronous)

### 1.2.2 비동기 (asynchronous)

## 1.3 동기와 비동기를 함께 사용할 수 밖에 없는가?

## 1.4 RxJS는 어떻게 개션하였나?

### 1.4.1 Observable

### 1.4.2 모든 데이터는 Observable 인스턴스로 만들 수 있다.
- 키보드를 눌러서 입력된 데이터
- 마우스를 이동하거나 클릭해서 입력된 데이터
- Ajax/fetch 요청을 통해 얻은 데이터
- Web socket을 통해 전달된 데이터
- Messages를 통해 전달된 데이터

`fromEvent(HTMLElement, 'EventName');`
```javascript
const { from } = rxjs;
const key$ = fromEvent(document, 'keydown');
const click$ = fromEvent(document, 'click');
```

`from(Iterable|Array-like|Promise);`
```javascript
const { from } = rxjs;
const arrayFrom$ = from([10, 20, 30]);
const iterableFrom$ = from(new Map([[1, 2], [2, 4], [4, 8]]));
const ajaxPromiseFrom = from(fetch('./api/some.json'));
```

`of(...items);`
```javascript
const { of } = rxjs;
const numberOf$ = of(10, 20, 30);
const stringOf$ = of('a', 'b', 'c');
```

## 1.5 정리
