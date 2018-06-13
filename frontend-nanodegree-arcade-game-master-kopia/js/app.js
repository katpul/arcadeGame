
const winner = document.querySelector('#winnerModal');
const button = document.querySelector('.playAgain');
let count = 0;
let points = 0;
// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    // This variables are useed for the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
    this.x += this.speed * dt;

    // When enemies are off the canvas, they come back randomly with different speeds
    if (this.x > 510) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 100 + 80);
    };

    // Checks if  there is a collisions between the player and enemies
    // If there is a collison moves player to start position
    if (player.x < this.x + 70 &&
        player.x + 70 > this.x &&
        player.y < this.y + 50 &&
        50 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
        points = 0;
        count++;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on x and y axis
var Player = function () {


    this.x = 200;
    this.y = 400;

    //The image of the player of horn-girl is added to the playing field
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Makes user posibility to move player using arrow keys
Player.prototype.handleInput = function (keyPress) {


    if (keyPress == 'left' && this.x > 0) {
        this.x -= 101;
    };


    if (keyPress == 'right' && this.x < 400) {
        this.x += 101;
    };


    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };


    if (keyPress == 'down' && this.y < 400) {
        this.y += 83;
    };

    // When player reaches water, moving it to starting position
    if (this.y < 0) {
       points++
       countPoints()
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 500);
    };
};

// starting location of player
var player = new Player(200, 400);


var allEnemies = [];

// Location of enemies
var enemyLocation = [60, 150, 230];


//First move of allEnemies
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 250);
    allEnemies.push(enemy);
});



//Close the modal and reset the game
button.addEventListener('click', function () {
    winner.style.display = 'none';
    resetGame();
})

//Reset the game after the modal is closed
function resetGame() {
    count = 0;
    points = 0;
}

function countPoints() {
    if (points == 5) {
        setTimeout(function () {
            winner.style.display = 'block';
        }, 500);
        resetGame();
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
