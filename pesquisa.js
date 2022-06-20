//melhorar a visibilidade do html dentro do js
const html = String.raw;
//faz a requisição
const init = () => {
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.search == null) {
    return;
  }
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=c3dd593c326e1089087cacfc0c68ab56&language=pt-BR&query=${params.search}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      renderSearch(myJson.results);
    });
  console.log(params);
};
// função para renderizar dados na tela
function renderSearch(results) {
  const resultsElement = document.getElementById("results");
  if (resultsElement == null) {
    return;
  }
  resultsElement.innerHTML = "";
  //cria o template de acordo com os itens recebidos da API
  for (const result of results) {
    const template = html` <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <img
                class="card-img-top img-search "
                src="https://image.tmdb.org/t/p/w200/${result.poster_path}"
                alt="Card image cap"
              />
            </div>
            <div class="col-6">
              <h5 class="card-title">${result.title}</h5>
              <p class="card-text">${result.overview}</p>
              <a href="detalhes.html?id=${result.id}" class="btn btn-dark"
                >Saiba mais...</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>`;
    // acumula os templates e mostra na tela
    resultsElement.innerHTML += template;
  }
}
//carrega o body e recebe init
document.body.onload = init;
