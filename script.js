// ================= GLOBAL INIT =================
document.addEventListener("DOMContentLoaded", async () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  let info = {};
  try {
    info = await fetchCompanyInfo();
  } catch (e) {
    console.error("Error fetching company info:", e);
  }

  // ================= BRAND =================
  if (info.title || info.name) document.title = info.title || info.name;
  if (info.name) document.querySelectorAll(".company-name").forEach(el => el.textContent = info.name);
  if (info.company) document.querySelectorAll(".company-owner").forEach(el => el.textContent = info.company);
  if (info.logo) {
    document.querySelectorAll(".company-logo").forEach(c => {
      c.innerHTML = `<img src="${info.logo}" alt="${info.name}" class="logo-img">`;
    });
  }

  // Favicon
  if (info.favicon) {
    const fav = document.createElement("link");
    fav.rel = "icon"; fav.href = info.favicon; fav.type = "image/png";
    document.head.appendChild(fav);
  }

  // ================= SOCIALS =================
  const socialContainer = document.querySelector(".footer-socials");
  if (socialContainer) {
    socialContainer.innerHTML = "";
    // Social links removed as requested
  }

  // ================= GAMES =================
  let games = [];
  try {
    games = await fetchGames(info.apis?.games);
  } catch(e) {
    console.error("Games fetch failed:", e);
  }
  
  const gamesSec = document.getElementById("games");
  if (gamesSec) {
    const mainContainer = gamesSec.querySelector(".games-container");
    if (mainContainer) {
      mainContainer.innerHTML = "";
      if (!games || games.length === 0) {
        mainContainer.textContent = "No games found. Please try again later.";
      } else {
        window.allGamesData = games;
        games.forEach(game => mainContainer.appendChild(createGameCard(game)));
      }
    }
  }

  // ================= RECENTLY PLAYED =================
  renderRecentlyPlayed();

  // ================= SEARCH =================
  const searchInput = document.getElementById("gameSearch");
  searchInput?.addEventListener("input", () => filterGames(searchInput.value));
});

// ================= GAME CARD =================
function createGameCard(game) {
  const card = document.createElement("a");
  card.className = "game-card";
  card.href = game.page;
  
  const img = document.createElement("img");
  img.src = game.thumbnail;
  img.alt = game.title;
  img.loading = "lazy";
  
  const h4 = document.createElement("h4");
  h4.textContent = game.title;
  
  card.appendChild(img);
  card.appendChild(h4);

  card.addEventListener("click", () => addToRecentlyPlayed(game));
  return card;
}

// ================= SEARCH FILTER =================
function filterGames(query) {
  query = query.trim().toLowerCase();
  document.querySelectorAll("#games .game-card").forEach(card => {
    const title = card.querySelector("h4").textContent.toLowerCase();
    card.style.display = (query === "" || title.includes(query)) ? "" : "none";
  });
}

// ================= TOGGLE SEARCH (Mobile) =================
function toggleSearch() {
  const searchBar = document.querySelector(".search-bar");
  if (searchBar) searchBar.classList.toggle("active");
}

// ================= RECENTLY PLAYED =================
function addToRecentlyPlayed(game) {
  const key = "recentlyPlayedGames";
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    stored = [];
  }

  stored = stored.filter(pagePath => pagePath !== game.page);
  stored.unshift(game.page);

  if (stored.length > 5) stored = stored.slice(0, 5);

  try {
    localStorage.setItem(key, JSON.stringify(stored));
  } catch (e) {}
}

function renderRecentlyPlayed() {
  const key = "recentlyPlayedGames";
  const section = document.getElementById("recently-played");
  const container = document.getElementById("recent-container");
  
  if (!section || !container) return;

  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    stored = [];
  }

  if (!stored || stored.length === 0) {
    section.style.display = "none";
    return;
  }

  const allGames = window.allGamesData || [];
  section.style.display = "";
  container.innerHTML = "";
  
  let validGamesCount = 0;
  stored.forEach(pagePath => {
    const gameObj = allGames.find(g => g.page === pagePath);
    if (gameObj) {
      container.appendChild(createGameCard(gameObj));
      validGamesCount++;
    }
  });
  
  if (validGamesCount === 0) {
    section.style.display = "none";
  }
}
