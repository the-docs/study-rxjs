const promise = new Promise((resolve, reject) => {
  try {
    resolve(1);
  } catch(e) {
    reject('error promise');
  }
});

promise.then(
  value => console.log(`promise ${value}`),
  error => console.error(`promise ${error}`),
);
