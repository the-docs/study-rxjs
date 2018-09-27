const promise = new Promise((resolve, reject) => {
  console.log('create promise');
  try {
    resolve(1);
  } catch(e) {
    reject('error promise');
  }
});

promise.then(
  value => console.log(`첫번째 promise ${value}`),
  error => console.error(`첫번째 promise ${error}`),
);

promise.then(
  value => console.log(`두번째 promise ${value}`),
  error => console.error(`두번째 promise ${error}`),
);
