function isCollapsed(rectangle1, rectangle2) {
  const {
    position: { x: x1, y: y1 },
    width: w1,
    height: h1,
  } = rectangle1.attackBox;
  const {
    position: { x: x2, y: y2 },
    width: w2,
    height: h2,
  } = rectangle2;

  return x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2;
}

function determineWinner(player, enemy, timerId) {
  clearTimeout(timerId);
  const displayText = document.querySelector("#displayText");
  displayText.style.display = "flex";

  if (player.health === enemy.health) {
    displayText.innerHTML = "무승부..";
  } else if (player.health > enemy.health) {
    displayText.innerHTML = "킹 승리!";
  } else {
    displayText.innerHTML = "마법사 승리!";
  }
}

let timer = 60;
let timerId;

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner(player, enemy, timerId);
  }
}
