class NewPaper {
  constructor() {
    this._observers = [];
  }
  setNews(news) {
    try {
      throw new Error('NewsPaper Error');

      this.notify(news);
    } catch(e) {
      this.notify(news);
    }
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

const newsPaper = new NewPaper();
newsPaper.add(new NewsScrapper());
newsPaper.add(new NewsReader());

newsPaper.setNews('북한 평양 냉면 인기');
newsPaper.setNews('태풍 한반도 상륙');
newsPaper.setNews('제 3차 남북 정상 회담');
newsPaper.setNews('코스피 상승');
