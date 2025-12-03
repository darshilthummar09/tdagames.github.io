// Restart the game with ads
GameManager.prototype.restart = function () {
  openWebOldLogic(() => {
    this.storageManager.clearGameState();
    this.actuator.continueGame();
    this.setup();
  });
};


original
GameManager.prototype.restart = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame();
  this.setup();
};