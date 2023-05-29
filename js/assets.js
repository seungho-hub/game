const ASSETS = {
  wizard: {
    imageSrc: "./img/wizard/Idel.png",
    sprites: {
      idle: {
        imageSrc: "./img/wizard/Idle.png",
        framesMax: 6,
      },
      run: {
        imageSrc: "./img/wizard/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./img/wizard/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "./img/wizard/Fall.png",
        framesMax: 3,
      },
      attack1: {
        imageSrc: "./img/wizard/Attack1.png",
        framesMax: 8,
      },
      takeHit: {
        imageSrc: "./img/wizard/Take Hit.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "./img/wizard/Death.png",
        framesMax: 7,
      },
    },
  },
  king: {
    imageSrc: "./img/king/Idel.png",
    sprites: {
      idle: {
        imageSrc: "./img/king/Idle.png",
        framesMax: 6,
      },
      run: {
        imageSrc: "./img/king/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./img/king/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "./img/king/Fall.png",
        framesMax: 3,
      },
      attack1: {
        imageSrc: "./img/king/Attack1.png",
        framesMax: 6,
      },
      takeHit: {
        imageSrc: "./img/king/Take Hit.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "./img/king/Death.png",
        framesMax: 11,
      },
    },
  },
  sounds: {
    wizard: {
      attack: document.querySelector("#wizard-attack"),
      attackHit: document.querySelector("#wizard-attack-hit"),
      jump: document.querySelector("#wizard-jump"),
    },
    king: {
      attack: document.querySelector("#king-attack"),
      attackHit: document.querySelector("#king-attack-hit"),
      jump: document.querySelector("#king-jump"),
    },
  },
};
