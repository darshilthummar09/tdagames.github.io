const API_URL =
  "https://apiv2.cricket.com.au/web/views/fixtures?CompletedFixturesCount=12&InProgressFixturesCount=12&UpcomingFixturesCount=12";

async function loadMatches() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const liveMatches = data.InProgressFixtures || [];
        const upcomingMatches = data.UpcomingFixtures || [];
        const recentMatches = data.CompletedFixtures || [];

        renderSection("live", liveMatches);
        renderSection("upcoming", upcomingMatches);
        renderSection("recent", recentMatches);

        setupTabs();

    } catch (err) {
        console.error("Error:", err);
    }
}

function renderSection(sectionId, matches) {
    const container = document.getElementById(sectionId);
    container.innerHTML = ""; 

    matches.forEach(match => {
        const card = buildMatchCard(match);
        container.appendChild(card);
    });
}

function buildMatchCard(match) {
    const home = match.HomeTeam;
    const away = match.AwayTeam;

    const inningsByTeam = {};
    if (match.Innings) {
        match.Innings.forEach(inn => {
            if (!inn) return;
            const id = inn.BattingTeamId;
            const score = `${inn.RunsScored}-${inn.NumberOfWicketsFallen}`;
            if (!inningsByTeam[id]) inningsByTeam[id] = [];
            inningsByTeam[id].push(score);
        });
    }

    function teamScore(id) {
        return inningsByTeam[id] ? inningsByTeam[id].join(" & ") : "";
    }

    const card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
        <div class="card-header">
            <div class="series-name">${match.Competition?.Name ?? ""} ${match.Name ?? ""}</div>
            <img src="arrow-right.png" class="arrow-icon">
        </div>

        <div class="venue-row">
            <div class="venue-pill">${match.GameType ?? ""}</div>
            <div class="venue-pill">${match.Venue?.Name ?? ""}</div>
        </div>

        <div class="team-row">
            <div class="left-block">
                <img src="${home?.LogoUrl ?? ""}" class="flag">
                <div class="team-name">${home?.ShortName ?? ""}</div>
            </div>
            <div class="right-block">
                <div class="team-score">${teamScore(home?.Id)}</div>
            </div>
        </div>

        <div class="team-row">
            <div class="left-block">
                <img src="${away?.LogoUrl ?? ""}" class="flag">
                <div class="team-name">${away?.ShortName ?? ""}</div>
            </div>
            <div class="right-block">
                <div class="team-score">${teamScore(away?.Id)}</div>
            </div>
        </div>

        <div class="match-result">${match.ResultText ?? ""}</div>
    `;

    // On click, open match-details.html with match data
    card.addEventListener("click", () => {
        const data = encodeURIComponent(JSON.stringify(match));
        window.location.href = `match-details.html?data=${data}`;
    });

    return card;
}

/* === TAB SWITCH === */
function setupTabs() {
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".section");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.target).classList.add("active");
        });
    });
}

loadMatches();
