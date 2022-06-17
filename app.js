const html = String.raw;
const init = () => {
  fetch(
    "https://api.themoviedb.org/3/movie/200/similar?api_key=c3dd593c326e1089087cacfc0c68ab56&language=pt-BR"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson.results);
      renderCarroussel(myJson.results);
    });
};

function renderCarroussel(results) {
  const renderFilms = document.getElementById("render-films");
  const renderButtons = document.getElementById("carroussel-button");
  if (renderFilms == null || renderButtons == null) {
    return;
  }
  renderFilms.innerHTML = "";
  renderButtons.innerHTML = "";
  for (let i = 0; i < results.length; i++) {
    const movie = results[i];
    const template = html` <div class="carousel-item ${i == 0 ? "active" : ""}">
      <div class="row mb-5">
        <div class="col-md-4 d-flex justify-content-center">
          <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" />
        </div>
        <div class="col-md-8">
          <h2>${movie.title}</h2>
          <p><b>Sinopse:</b> ${movie.overview}</p>
          <p><b>Avaliação:</b> ${movie.vote_average}</p>

          <div class="d-flex justify-content-end">
            <a
              href="detalhes.html?id="
              id="detail-link"
              class="btn btn-danger btn-sm"
            >
              Saiba mais...
            </a>
          </div>
        </div>
      </div>
    </div>`;
    renderFilms.innerHTML += template;
    const templateButton = html` <button
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to="${i}"
      class="${i == 0 ? "active" : ""}"
      aria-current="true"
      aria-label="Slide ${i + 1}"
    ></button>`;
    renderButtons.innerHTML += templateButton;
  }
}

document.body.onload = init;
