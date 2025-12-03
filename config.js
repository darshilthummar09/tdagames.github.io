// ✅ One variable to rule all ads
window.ADS_ENABLED = true; // set false to disable ads globally

// Related games config
window.RELATED_GAMES_API = "https://api.npoint.io/e24cdd5120b7643095ac";
window.MORE_GAMES_COUNT = 12; // change this to any number of random games

// ================= CONFIG / API CALLS =================
const apiUrl = "https://api.npoint.io/ecf6de08a8afb805eaff";
let companyInfo = {};

// Fetch company + games data
async function fetchCompanyInfo() {
  try {
    const res = await fetch(apiUrl);
    companyInfo = await res.json();
    return companyInfo;
  } catch (err) {
    console.error("API fetch failed:", err);
    return {};
  }
}

// Fetch section (games list)
async function fetchGames(url) {
  if (!url) return [];
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("Games fetch failed:", err);
    return [];
  }
}

