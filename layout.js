// layout.js — loads header and footer for all pages

async function loadLayout() {
  try {
    // Load header and footer
    const [headerHTML, footerHTML] = await Promise.all([
      fetch('https://blinkgames007.github.io/header.html').then(r => r.text()),
      fetch('https://blinkgames007.github.io/footer.html').then(r => r.text())
    ]);

    // Insert into page
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;

    // ✅ Fire a fake DOMContentLoaded event after injection
    const domEvent = new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(domEvent);

    // Load config.js
    const configScript = document.createElement('script');
    configScript.src = 'config.js';
    document.body.appendChild(configScript);

    // Load main script.js after config.js
    configScript.onload = () => {
      const mainScript = document.createElement('script');
      mainScript.src = 'script.js';
      document.body.appendChild(mainScript);
    };

  } catch (err) {
    console.error("Failed to load layout:", err);
  }
}

// Run immediately
loadLayout();
