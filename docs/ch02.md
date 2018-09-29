# 2 RxJS가 해결하려고 했던 문제 2 - 상태 전파 문제

## 2.1 웹 애플리케이션의 상태

- [ex2.1][link1]

## 2.2 웹 애플리케이션의 상태 변화로 인한 문제점

### 2.2.1 첫째, User의 인터페이스가 변경되면 System도 함께 변경해야 한다.

### 2.2.2 둘째, User 상태를 확인하기 위한 인터페이스에 대한 의사소통 비용이 발생한다.

### 2.2.3 셋째, 다수의 클래스가 User에 의존 관계가 있는 경우라면 User의 변경 여부를 반영하기 위해 다수의 클래스들이 직접 User의 상태를 모두 반영해야 한다.

## 2.3 우리가 이미 알고 있는 솔루션 - 옵서버 패턴 (Observer Pattern)

### 2.3.1 Loosely Coupling

### 2.3.2 자동 상태 전파

### 2.3.3 인터페이스의 단일화

## 2.4 옵서버 패턴의 흔한 예
- [ex2.2][link2]

## 2.5 옵서버 패턴 적용하기
- [ex2.3][link3]
- [ex2.4][link4]

## 2.6 RxJS는 무엇을 해결하고자 했는가?

### 2.6.1 상태 변화는 언제 종료되는가?
- [ex2.5][link5]

### 2.6.2 상태 변화에서 에러가 발생하면?
- [ex2.6][link6]

### 2.6.3 Observer에 의해 Subject의 상태가 변경되는 경우는?
- [ex2.7][link7]

## 2.7 RxJS는 어떻게 개선하였나?
- [ex2.8][link8]

``` javascript
let newsPaper = new Subject();
newsPaper.add({
  update: function(v) {
    console.log(v);
  }
});
```

### 2.7.1 인터페이스의 확장
- [ex2.9][link9]

### 2.7.2 Observable은 Read-only

## 2.8 Observable 은 리액티브하다.

## 2.9 정리

[link1]: "/src/ch2/ex2.1.js"
[link2]: "/src/ch2/ex2.2.js"
[link3]: "/src/ch2/ex2.3.js"
[link4]: "/src/ch2/ex2.4.js"
[link5]: "/src/ch2/ex2.5.js"
[link6]: "/src/ch2/ex2.6.js"
[link7]: "/src/ch2/ex2.7.js"
[link8]: "/src/ch2/ex2.8.js"
