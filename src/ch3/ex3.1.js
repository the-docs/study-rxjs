fetch('https://swapi.co/api/people/?format=json').then(res => {
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error('Error');
  }
}).then(jsonData => {
  document.getElementById('users').innerHTML = process(jsonData);
}).catch(e => {
  console.error(e);
});

function process(people) {
  const html = [];

  for (const user of people.results) {
    if (/male|female/.test(user.gender)) {
      let broca;
      let bmi;

      if (user.gender === 'male') {
        broca = (user.height - 100 * 0.9).toFixed(2);
        bmi = (user.height / 100 * user.height / 100 * 22).toFixed(2);
      } else {
        broca = (user.height - 105 * 0.9).toFixed(2);
        bmi = (user.height / 100 * user.height / 100 * 22).toFixed(2);
      }

      const obesityUsingBroca = ((user.mass - broca) / broca * 100).toFixed(2);
      const obesityUsingBmi = ((user.mass - bmi) / bmi * 100).toFixed(2);

      html.push(`<div class="col-md-6">
        <div class="card my-3 ${user.gender === 'male' ? 'text-white bg-dark' : 'bg-light'}">
          <div class="card-body">
            <h5 class="card-title">${user.name} </h5>
            <p class="mb-1">키 : ${user.height} cm</p>
            <p class="mb-1">몸무게 : ${user.mass} kg</p>
            <p class="mb-1">BROCA 표중체중 : ${broca} kg</p>
            <p class="mb-1">BROCA 비만도 : ${obesityUsingBroca}</p>
            <p class="mb-1">BMI 표중체중 : ${bmi} cm</p>
            <p class="mb-1">BMI 비만도 : ${obesityUsingBmi}</p>
          </div>
        </div>
      </div>`);
    }
  }

  return html.join('');
}
