import StartGame from './game/main';

function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    document.getElementById("game-container").style.display = isPortrait ? "none" : "block";
    document.getElementById("landscape-warning").style.display = isPortrait ? "block" : "none";
}

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    StartGame('game-container');

    checkOrientation();
});