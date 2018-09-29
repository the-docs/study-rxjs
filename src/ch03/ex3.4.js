const { of } = rxjs;
const { ajax } = rxjs.ajax;
const { switchMap, filter, map, reduce } = rxjs.operators;

ajax.getJSON('https://swapi.co/api/people/?format=json')
  .pipe(
    switchMap(data => of(...data.results)),
    filter(user => /male|female/.test(user.gender)),
    map(user => Object.assign(user, logic(user))),
    reduce((acc, user) => {
      acc.push(makeHtml(user));
      return acc;
    }, []),
    map(htmlArr => htmlArr.join(''))
  )
  .subscribe(v => {
    document.getElementById('users').innerHTML = v;
  });

function logic({ height, mass, gender }) {
  const broca = ((height - (gender === 'male' ? 100 : 105)) * 0.9).toFixed(2);
  const bmi = (height / 100 * height / 100 * (gender === 'male' ? 22 : 21)).toFixed(2);
  const obesityUsingBroca = ((mass - broca) / broca * 100).toFixed(2);
  const obesityUsingBmi = ((mass - bmi) / bmi * 100).toFixed(2);

  return {
    broca,
    bmi,
    obesityUsingBroca,
    obesityUsingBmi,
  };
}

function makeHtml(user) {
  return `<div class="col-md-6">
    <div class="card my-3 ${user.gender === 'male' ? 'text-white bg-dark' : 'bg-light'}">
      <div class="card-body">
        <h5 class="card-title">${user.name} </h5>
        <p class="mb-1">키 : ${user.height} cm</p>
        <p class="mb-1">몸무게 : ${user.mass} kg</p>
        <p class="mb-1">BROCA 표중체중 : ${user.broca} kg</p>
        <p class="mb-1">BROCA 비만도 : ${user.obesityUsingBroca}</p>
        <p class="mb-1">BMI 표중체중 : ${user.bmi} kg</p>
        <p class="mb-1">BMI 비만도 : ${user.obesityUsingBmi}</p>
      </div>
    </div>
  </div>`;
}
