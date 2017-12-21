//Atribute
let valScore = 0, pos =false, tempX, tempY,flag=0,
//class enemy and player
Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
},
Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
},
//--------------------//
//object of type enemy with the value of her creation x, y for parameter
allEnemies = [],
//object of type Player with the value of her creation x, y for parameter
player = new Player();
//call initial enemy with the value of
initializeEnemy(5);
//------------------------//
$('#Score').html(valScore);
//Methods
//Update of ubication X from enemy and player
function initializeEnemy(nBug)
{
  for(let x=0;x<nBug;x++)
  {
    flag++;
    positionRandomX()
    positionRandomY(flag);
    allEnemies[x]=new Enemy(tempX, tempY);
    if(flag===3)
    {
      flag=0;
    }
  }
}
//obtain position X random
function positionRandomX()
{
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
function resetScore()
{
  valScore = 0;
  $('#Score').html(valScore);
}
//function that determines if there was a collision
function collision(x,y){
  if ((y < player.y + 50 && y + 30 > player.y)&&(x < player.x + 30 && x + 50 > player.x))
    return true;
  else
    return false;
}
//parameter gO is type boolean and indicate if is GameOver
function gameOver(gO) {
  if(gO)
  {
  player.reset();
  $('#mScore').html(valScore);
  $('#dialog').dialog('open');
  resetScore();
  }
}
Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
      var ran = Math.floor((Math.random() * 500) + 1);
        this.x += (ran * dt);
    }
    else {
      var fla =Math.floor(Math.random() * (3-1 + 1) + 1);
      positionRandomX();
      positionRandomY(fla);
      this.x = tempX + -220 ;
      this.y = tempY;
    }

// function for detection of collision and gameover
gameOver(collision(this.x,this.y));
};
Player.prototype.update = function() {
	if (player.y < 20){
	valScore++;
	$('#Score').html(valScore);
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
  switch(arrow)
  {
    case 'left':
    if(this.x>0)
    this.x-=50;
    break;
    case 'right':
    if(this.x<400)
    this.x+=50;
    break;
    case 'up':
    if(this.y>0)
    this.y-=50;
    break;
    case "down":
    if(this.y<400)
    this.y+=50;
    break;
  }
};
//--------------------------//
//initialize ubication of the player
Player.prototype.reset = function() {
    player = new Player();

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
$( '#dialog' ).dialog( { 'autoOpen': false, 'buttons':{finish: function() {
          $( this ).dialog( "close" );
          initializeEnemy(5);
        }}} );
      });
//-------------------------//
