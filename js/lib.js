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

function end(p1, p2, timerId) {
  clearTimeout(timerId);
  const displayText = document.querySelector("#displayText");
  displayText.style.display = "flex";

  let result;

  if (p1.health === p2.health) {
    result = "무승부..";
  } else if (p1.health > p2.health) {
    result = "킹 승리!";
  } else {
    result = "마법사 승리!";
  }
  displayText.innerHTML = result;
}

let timer = 60;
let timerId;

function startTimer() {
  if (timer > 0) {
    timerId = setTimeout(startTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    end(player, enemy, timerId);
  }
}
