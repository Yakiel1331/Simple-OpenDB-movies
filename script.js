// FETCH REFACTORING ADALAH MEMECAH KERUMITAN FETCH MENJADI FUNCTION FUNCTION TERPISAH

const btnSearch = document.querySelector(".search-button");

btnSearch.addEventListener("click", async function () {
  try {
    const inputForm = document.querySelector(".input-form");
    const movies = await getMovies(inputForm);
    updateUI(movies);
  } catch (err) {
    // console.log(err);
    const mContainer = document.querySelector(".movie-container");
    mContainer.innerHTML = `<h4 class="text-body-secondary">${err}</h4>`;
    // alert(err);
  }
});

function getMovies(inputForm) {
  return fetch(`http://www.omdbapi.com/?apikey=eb5eb652&s=${inputForm.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let insertdiv = "";
  movies.forEach((mList) => {
    insertdiv += showMovies(mList);
  });
  const mContainer = document.querySelector(".movie-container");
  mContainer.innerHTML = insertdiv;
}

function getMovieDetail(imdbid) {
  return fetch(`http://www.omdbapi.com/?apikey=eb5eb652&i=${imdbid}`)
    .then((response) => response.json())
    .then((response) => response);
}

// EVENT BINDING >> MENAMBAHKAN EVENT KE ELEMEN HTML YANG BARU DIBUAT
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("movie-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    // console.log(movieDetail);
    updateModal(movieDetail);
  }
});

function updateModal(element) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = showDetail(element);
}

function showMovies(element) {
  return `<div class="col-md-4 my-3">
            <div class="card">
              <img src="${element.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${element.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${element.Year}</h6>
                <a href="#" class="btn btn-primary movie-detail-button" data-bs-toggle="modal" data-bs-target="#dataMovieModal" data-imdbid=${element.imdbID}>Details</a>
              </div>
            </div>
          </div>`;
}

function showDetail(element) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${element.Poster}" class="img-fluid" alt="">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${element.Title}</h4></li>
                  <li class="list-group-item"><strong>Director : </strong>${element.Director}</li>
                  <li class="list-group-item"><strong>Actors : </strong>${element.Actors}</li>
                  <li class="list-group-item"><strong>Writer : </strong>${element.Writer}</li>
                  <li class="list-group-item"><strong>Plot : </strong><br>${element.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`;
}
