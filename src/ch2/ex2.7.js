class NewPaper {
  constructor() {
    this._observers = [];
  }
  setNews(news) {
    this.notify(news);
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
  notify(news) {
    this._observers.forEach( v => {
      v.update(news);
    });
  }
}

class NewsScrapper {
  update(news) {
    console.log(`뉴스를 스크램하자 - ${news}`);
  }
}

class NewsReader {
  update(news) {
    console.log(`뉴스를 읽자 - ${news}`);
  }
}

class WriterAndReader {
  constructor(newsPaper) {
    this._newsPaper = newsPaper;
  }
  update(news) {
    console.log(`전달 받은 뉴스 - ${news}`);
    // this._newsPaper.setNews(`번형된 뉴스 - ${news}`);
  }
}

const newsPaper = new NewPaper();
newsPaper.add(new WriterAndReader(newsPaper));

newsPaper.setNews('북한 장거리 미사일 발사!');
