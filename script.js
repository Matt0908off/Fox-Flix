document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o recarregamento da página
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const apiKey = "b273e06"; // Substitua pela sua chave de API
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na conexão com a API");
      }
      return response.json();
    })
    .then(data => {
      if (data.Response === "True") {
        displayResults(data.Search); // Exibe os resultados
      } else {
        displayNoResults(); // Exibe a mensagem fofa
      }
    })
    .catch(error => {
      console.error("Erro ao buscar dados:", error);
      displayNoResults(); // Exibe a mensagem de erro
    });
});

function displayResults(results) {
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = ""; // Limpa os resultados anteriores

  if (results.length === 0) {
    displayNoResults();
    return;
  }

  results.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML = `
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tomado.svg/1200px-Tomado.svg.png" alt="Fox Face" class="fox-face">
      <img src="${item.Poster !== 'N/A' ? item.Poster : 'placeholder.jpg'}" alt="${item.Title}">
      <strong>${item.Title}</strong> (${item.Year})<br>
      Tipo: ${item.Type}<br>
      <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank" class="movie-link-button">Mais informações</a>
      <a href="https://www.netflix.com/search?q=${item.Title}" target="_blank" class="movie-link-button">Assistir no Netflix</a>
      <a href="https://www.amazon.com/s?k=${item.Title}" target="_blank" class="movie-link-button">Assistir no Amazon Prime</a>
      <a href="https://www.disneyplus.com/search?q=${item.Title}" target="_blank" class="movie-link-button">Assistir no Disney+</a>
    `;
    resultsList.appendChild(li);
  });
}

function displayNoResults() {
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = `
      <div class="no-results">
          <div class="sad-fox-container">
              <div class="sad-fox">
                  <div class="sad-fox-eyes"></div>
                  <div class="sad-fox-mouth"></div>
                  <div class="sad-fox-tear"></div>
              </div>
              <p>Infelizmente, não encontramos o filme que você procurou.</p>
              <p>Tente procurar por outro título!</p>
          </div>
      </div>
  `;
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('popup').style.display = 'flex';
  }, 3000); // Exibe o popup após 3 segundos

  document.getElementById('popupClose').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
  });

  document.getElementById('popup').addEventListener('click', (event) => {
    if (event.target === document.getElementById('popup')) {
      document.getElementById('popup').style.display = 'none';
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById('loading');

  document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o recarregamento da página
    loading.style.display = 'flex'; // Exibe a animação de carregamento

    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const apiKey = "b273e06"; // Substitua pela sua chave de API
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro na conexão com a API");
        }
        return response.json();
      })
      .then(data => {
        if (data.Response === "True") {
          displayResults(data.Search); // Exibe os resultados
        } else {
          displayNoResults(); // Exibe a mensagem fofa
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
        displayNoResults(); // Exibe a mensagem de erro
      })
      .finally(() => {
        loading.style.display = 'none'; // Oculta a animação de carregamento
      });
  });

  function displayResults(results) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = ""; // Limpa os resultados anteriores
  
    if (results.length === 0) {
      displayNoResults();
      return;
    }
  
    results.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("card");
      li.innerHTML = `
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tomado.svg/1200px-Tomado.svg.png" alt="Fox Face" class="fox-face">
        <img src="${item.Poster !== 'N/A' ? item.Poster : 'placeholder.jpg'}" alt="${item.Title}">
        <strong>${item.Title}</strong> (${item.Year})<br>
        Tipo: ${item.Type}<br>
        <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank" class="movie-link-button">Mais informações</a>
        <a href="https://www.netflix.com/search?q=${item.Title}" target="_blank" class="movie-link-button">Assistir no Netflix</a>
        <a href="https://www.amazon.com/s?k=${item.Title}" target="_blank" class="movie-link-button">Assistir no Amazon Prime</a>
        <a href="https://www.disneyplus.com/search?q=${item.Title}" target="_blank" class="movie-link-button">Assistir no Disney+</a>
      `;
      resultsList.appendChild(li);
    });
  }

  function displayNoResults() {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = `
        <div class="no-results">
            <div class="sad-fox-container">
                <div class="sad-fox">
                    <div class="sad-fox-eyes"></div>
                    <div class="sad-fox-mouth"></div>
                    <div class="sad-fox-tear"></div>
                </div>
                <p>Infelizmente, não encontramos o filme que você procurou.</p>
                <p>Tente procurar por outro título!</p>
            </div>
        </div>
    `;
  }
});