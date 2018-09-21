class Subject {
  constructor() {
    this._observers = [];
  }
  add(observer) {
    this._observers.push(observer);
  }
  remove(observer) {
    const idx = this._observers.indexOf(observer);
    if (idx !== -1) {
      this._observers.splice(idx, 1);
    }
  }
  notify(status) {
    this._observers.forEach( v => {
      v.update(status);
    });
  }
}

class User extends Subject {
  constructor() {
    super();
    this._state = {
      name: '손정희',
      isLogin: false,
    };
  }
  getName() {
    return this._state.name;
  }
  isLogin() {
    return this._state.isLogin;
  }
  login(name) {
    this._state.name = name;
    this._state.isLogin = true;
    this.notify(this._state);
  }
  logout() {
    this._state.name = '';
    this._state.isLogin = false;
    this.notify(this._state);
  }
}

class System {
  constructor(id) {
    this._token = null;
    this._id = id;
  }
  update(status) {
    if (status.isLogin) {
      this._token = Array.prototype.reduce.call(status.name, (acc, v) => acc + v.charCodeAt(0), 0);
      console.log(`[${this._id}] ${status.name} 의 토큰은 ${this._token} 입니다.`);
    } else {
      console.log(`[${this._id}] ${this._token} 은(는) 로그아웃 되었습니다.`);
      this._token = null;
    }
  }
}

const user = new User();
const observer1 = new System('observer1');
const observer2 = new System('observer2');
const observer3 = new System('observer3');

user.add(observer1);
user.add(observer2);
user.add(observer3);

user.login('sculove');
user.logout();
user.login('crazymonlong');
