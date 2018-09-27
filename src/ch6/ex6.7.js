const promise = new Promise((resolve, reject) => {
  try {
    let value = 0;
    setInterval(() => {
      console.log(`is going ${value}`);
      resolve(value++);
    }, 1000);
  } catch(e) {
    reject('error promise');
  }
});

promise.then(
  value => console.log(`promise value ${value}`)
);
