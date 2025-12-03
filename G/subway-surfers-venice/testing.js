// Patch PokiSDK ad functions
if (window.PokiSDK) {
    PokiSDK.commercialBreak = function() {
        return new Promise((resolve) => {
            console.log("Triggering interstitial ad...");
            setTimeout(() => { console.log("Interstitial ad finished."); resolve(); }, 2000);
        });
    };

    PokiSDK.rewardedBreak = function() {
        return new Promise((resolve) => {
            console.log("Triggering rewarded ad...");
            setTimeout(() => { console.log("Rewarded ad finished. Reward player!"); resolve(); }, 3000);
        });
    };

    PokiSDK.displayAd = function() {
        console.log("Display ad called.");
    };
}
