//Atribute
let  pos =false, tempX, tempY,flag=0,
//class enemy and player
Enemy = function(x, y, s) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
},
Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
    this.valScore=0;
},
//--------------------//
//object of type enemy with the value of her creation x, y for parameter
allEnemies = [],
//object of type Player with the value of her creation x, y for parameter
player = new Player();
//call initial enemy with the value of
initializeEnemy(5);
//------------------------//
$('.score').html(player.valScore);
//Methods
//Update of ubication X from enemy and player
function initializeEnemy(nBug){
  for(let x=0;x<nBug;x++)
  {
    flag++;
    positionRandomX()
    positionRandomY(flag);
    let sp = Math.floor((Math.random() * 500) + 1);
    allEnemies[x]=new Enemy(tempX, tempY, sp);
    if(flag===3)
    {
      flag=0;
    }
  }
}
//obtain position X random
function positionRandomX(){
  tempX = Math.floor(((Math.random() * 200) + 1)-1);
}
//obtain position Y;
function positionRandomY(fla){
    switch(fla)
    {
      case 1:
        tempY=70 + Math.floor((Math.random() * 20) + 1);
      break;
      case 2:
        tempY=120 + Math.floor((Math.random() * 20) + 1);
      break;
      case 3:
        tempY=220 + Math.floor((Math.random() * 20) + 1);
      break;
    }
}
//function for reset the score when is call
function resetScore(){
  player.valScore = 0;
  $('.score').html(player.valScore);
}
//function that determines if there was a collision
Enemy.prototype.checkCollisions=function(){
  if ((this.y < player.y + 50 && this.y + 50 > player.y)&&(this.x < player.x + 40 && this.x + 50 > player.x)){
    gameOver();
  }
  
}
//parameter gO is type boolean and indicate if is GameOver
function gameOver(){
  
  player.reset();
  $('.mScore').html(player.valScore);
  $('.dialog').dialog('open');
  resetScore();
 
}
Enemy.prototype.update = function(dt) {
    if (this.x < 505) {     
        this.x += (this.speed * dt);
    }
    else {
      var fla =Math.floor(Math.random() * (3-1 + 1) + 1);
      positionRandomX();
      positionRandomY(fla);
      this.x = tempX + -220 ;
      this.y = tempY;
    }

// function for detection of collision and gameover

};
Player.prototype.update = function() {
	if (this.y < 20){
	  this.valScore++;
	$('.score').html(this.valScore);
	  this.reset();
  }
};
//------------------------//
//Draw of the enemy and player in the canvas
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//--------------------------//
//function for move to player in the scenary
Player.prototype.handleInput = function(arrow) {
  switch (arrow) {
      case 'left':
          if (this.x > 0)
              this.x -= 50;
          break;
      case 'right':
          if (this.x < 400)
              this.x += 50;
          break;
      case 'up':
          if (this.y > 0)
              this.y -= 50;
          break;
      case "down":
          if (this.y < 400)
              this.y += 50;
          break;
  }
};
//--------------------------//
//initialize ubication of the player
Player.prototype.reset = function() {
    player.y=320;
    player.x=200;
    //player.valScore=0;
};
//-------------------------//
//listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
$(document).ready(function(){
  //popup Game Over
$( '.dialog' ).dialog( { 'autoOpen': false, 'buttons':{finish: function() {
          $( this ).dialog( "close" );
          initializeEnemy(5);
        }}} );
      });
//-------------------------//
