const clickTarget = 2;
const promoUrl = "https://632.mark.qureka.com/intro/question";
let clickAdsShow = true;
let gclick = parseInt(localStorage.getItem("gclick") || "1");

function openWebOldLogic(action) {
    if (!clickAdsShow) {
        if (typeof action === "function") {
            action();
        } else if (typeof action === "string") {
            window.location.href = action;
        }
        return;
    }
    if (gclick === clickTarget && promoUrl) {
        window.open(promoUrl, "_blank");
        gclick = 1;
        localStorage.setItem("gclick", gclick);
    } else {
        if (typeof action === "function") {
            action();
        } else if (typeof action === "string") {
            window.location.href = action;
        }
        gclick++;
        localStorage.setItem("gclick", gclick);
    }
}
