box = {
    width: 50,
    height: 40
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
this.x=x;
this.y=y;
this.speed= speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
this.sprite = 'images/enemy-bug.png';


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 550) {
        this.x = -100;
        this.speed = 200 + Math.floor(Math.random() * 200);
    }
    else
        this.x += this.speed * dt;

    this.checkForCollosion();

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkForCollosion = function() {
    let playerPosition =  {
        x: player.x,
        y: player.y,
        width: box.width,
        height: box.height
    }
    // Get current enemy position
    let enemyPosition = {
        x: this.x,
        y: this.y,
        width: box.width +10,
        height: box.height
    }

    if (playerPosition.x < enemyPosition.x + enemyPosition.width && playerPosition.x + playerPosition.width > enemyPosition.x && playerPosition.y < enemyPosition.y + enemyPosition.height && playerPosition.y + playerPosition.height > enemyPosition.y) {
        player.x=200;
        player.y=400;
    } 
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.sprite="images/char-cat-girl.png";
    }

    update(){

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset(){
        this.x=200;
        this.y=400;
    }

    handleInput(direction){
        console.log(`x= ${this.x} and y = ${this.y}`);
        if(direction=="right"){
            // if the player is in the far right block and pressed right he should go the far left block.
            if(this.x==402)
                this.x=-2;
            else
            this.x+=101;
        }
            
        else if (direction=="left"){
            // if the player is in the far left block and pressed left he should go the far right block.
            if (this.x==-2)
            this.x=402;
            else
            this.x-=101;
        }
        else if (direction=="up")
        if(this.y==68)
            this.reset();
        else
            this.y-=83;

        else if (direction=="down")
            if(this.y==400)
                this.y=this.y;
            else    
                this.y+=83;
     
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
}
    

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let player = new Player(200,400);
var allEnemies = [];
let positionY = 60;

for (let i = 0; i<3; i++){
 const enemy = new Enemy (-100,positionY,Math.floor(Math.random() * 200) + 200) ;
 allEnemies.push(enemy);   
 positionY+=85
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
