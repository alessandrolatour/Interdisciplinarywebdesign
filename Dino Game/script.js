const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const lives = document.getElementById("lives");

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

  // get current cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  // detect collision
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    console.log("Game Over!");
  }
}, 10);

function decrementLife() {
    this.life--;
    if (this.life === 0) {
        this.dead = true;
    }
};

document.addEventListener("keydown", function (event) {
  jump();
});