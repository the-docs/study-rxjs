class UserTs {
  private _name: string;
  private _isLogin: boolean;
  constructor() {
    this._name = '손찬욱';
    this._isLogin = false;
  }
  get name(): string {
    return this._name;
  }
  get isLogin(): boolean {
    return this._isLogin;
  }
  login(name: string): void {
    this._name = name;
    this._isLogin = true;
  }
  logout(): void {
    this._name = '';
    this._isLogin = false;
  }
}

class SystemTs {
  private _token: number;
  private _id: string;
  private _user: UserTs;
  constructor(user: UserTs) {
    this._token = null;
    this._id = 'System';
    this._user = user;
  }
  check(): void {
    const username: string = this._user.name;
    if (this._user.isLogin) {
      this._token = [...username].reduce((acc, v) => acc + v.charCodeAt(0), 0);
      console.log(`[${this._id}] ${username} 의 토큰은 ${this._token} 입니다.`);
    } else {
      this._token = null;
      console.log(`[${this._id}] 로그인 되지 않았습니다.`);
    }
  }
}

// let user = new UserTs();
// let system = new SystemTs(user);

// system.check();

// user.login('sculove');

// system.check();

// user.logout();

// system.check();
