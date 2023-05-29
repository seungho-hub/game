const canvas = document.querySelector("canvas");
const canvas2dContext = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

canvas2dContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/bg.gif",
});

const king = new Fighter({
  position: {
    x: 50,
    y: 0,
  },
  speed: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  framesMax: 8,
  scale: 1.5,
  offset: {
    x: 75,
    y: 25,
  },
  ...ASSETS["king"],
  attackBox: {
    offset: {
      x: 20,
      y: 50,
    },
    width: 100,
    height: 50,
  },
  ad: 15,
});

const wizard = new Fighter({
  position: {
    x: 925,
    y: 100,
  },
  speed: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  framesMax: 4,
  scale: 1.5,
  offset: {
    x: 155,
    y: 62,
  },
  ...ASSETS["wizard"],
  attackBox: {
    offset: {
      x: -70,
      y: 50,
    },
    width: 30,
    height: 50,
  },
  ad: 20,
});

const keys = {
  a: false,
  d: false,
  ArrowRight: false,
  ArrowLeft: false,
};

startTimer();

function animate() {
  setTimeout(function () {
    window.requestAnimationFrame(animate);

    // 게임 로직 및 애니메이션 업데이트 코드
  }, 9);

  canvas2dContext.fillStyle = "black";
  canvas2dContext.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  canvas2dContext.fillStyle = "rgba(255, 255, 255, 0.15)";
  canvas2dContext.fillRect(0, 0, canvas.width, canvas.height);
  king.update();
  wizard.update();

  king.speed.x = 0;
  wizard.speed.x = 0;

  if (keys.a && king.lastKey === "a") {
    king.speed.x = -5;
    king.switchSprite("run");
  } else if (keys.d && king.lastKey === "d") {
    king.speed.x = 5;
    king.switchSprite("run");
  } else {
    king.switchSprite("idle");
  }

  if (king.speed.y < 0) {
    ASSETS.sounds.king.jump.play();
    king.switchSprite("jump");
  } else if (king.speed.y > 0) {
    king.switchSprite("fall");
  }

  if (keys.ArrowLeft && wizard.lastKey === "ArrowLeft") {
    wizard.speed.x = -5;
    wizard.switchSprite("run");
  } else if (keys.ArrowRight && wizard.lastKey === "ArrowRight") {
    wizard.speed.x = 5;
    wizard.switchSprite("run");
  } else {
    wizard.switchSprite("idle");
  }

  if (wizard.speed.y < 0) {
    ASSETS.sounds.wizard.jump.play();
    wizard.switchSprite("jump");
  } else if (wizard.speed.y > 0) {
    wizard.switchSprite("fall");
  }

  if (
    isCollapsed(king, wizard) &&
    king.isAttacking &&
    king.framesCurrent === 4
  ) {
    wizard.takeHit(king.ad);
    king.isAttacking = false;

    gsap.to("#enemyHealth", {
      width: wizard.health + "%",
    });
    ASSETS.sounds.king.attackHit.play();
  }

  if (king.isAttacking && king.framesCurrent === 4) {
    king.isAttacking = false;
    ASSETS.sounds.king.attack.play();
  }

  if (
    isCollapsed(wizard, king) &&
    wizard.isAttacking &&
    wizard.framesCurrent === 2
  ) {
    king.takeHit(wizard.ad);
    wizard.isAttacking = false;

    gsap.to("#playerHealth", {
      width: king.health + "%",
    });
    ASSETS.sounds.wizard.attackHit.play();
  }

  if (wizard.isAttacking && wizard.framesCurrent === 2) {
    wizard.isAttacking = false;
    ASSETS.sounds.wizard.attack.play();
  }

  if (wizard.health <= 0 || king.health <= 0) {
    end(king, wizard, timerId);
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if (!king.dead) {
    switch (event.key) {
      case "d":
        keys.d = true;
        king.lastKey = "d";
        break;
      case "a":
        keys.a = true;
        king.lastKey = "a";
        break;
      case "w":
        if (king.jumpCount === 2) {
          break;
        }
        king.speed.y = -15;
        king.jumpCount++;
        break;
      case " ":
        king.attack();
        break;
    }
  }

  if (!wizard.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight = true;
        wizard.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft = true;
        wizard.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (wizard.jumpCount === 2) {
          break;
        }
        wizard.speed.y = -15;
        wizard.jumpCount++;
        break;
      case "ArrowDown":
        wizard.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d = false;
      break;
    case "a":
      keys.a = false;
      break;
    case "ArrowRight":
      keys.ArrowRight = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = false;
      break;
  }
});
