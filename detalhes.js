//melhorar a visibilidade do html dentro do js
const html = String.raw;
//faz a requisição
const init = () => {
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.id == null) {
    alert("Filme não encontrado");
    return;
  }
  fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=c3dd593c326e1089087cacfc0c68ab56&language=pt-BR`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      renderDetails(myJson);
    });
  console.log(params);
};

function renderDetails(movie) {
  const details = document.getElementById("details");
  if (details == null) {
    return;
  }
  details.innerHTML = html`
    <div class="row mb-5 mt-5">
      <div class="col-md-4 d-flex justify-content-center">
        <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" />
      </div>
      <div class="col-md-8">
        <h2>${movie.title}</h2>
        <h3>${movie.tagline}</h3>
        <p><b>Sinopse:</b> ${movie.overview}</p>
        <p><b>Gêneros:</b> ${movie.genres.map(renderGenres).join(", ")}</p>
        <p>
          <b>Produção:</b> ${movie.production_companies
            .map(renderProduction)
            .join(", ")}
        </p>
        <p><b>Avaliação:</b> ${movie.vote_average}</p>
        <p><b>Popularidade:</b> ${movie.popularity}</p>
      </div>
    </div>
  `;
}

function renderGenres(genre) {
  return html`<span>${genre.name}</span>`;
}

function renderProduction(company) {
  return html`<span>${company.name}</span>`;
}

document.body.onload = init;
