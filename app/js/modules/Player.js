
function Player(x,y,url,speed){
	this.texture = PIXI.Texture.fromImage(url);
	PIXI.extras.TilingSprite.call(this,this.texture,Player.WIDTH,Player.HEIGHT);

	this.position.x = 0;
	this.position.y = 0;
	this.speed = speed||0;
}


Player.WIDTH = 40;
Player.HEIGHT = 50;


Player.constructor = Player;
Player.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Player.prototype.run = function(speed){
	this.speed = speed;


}

module.exports = Player;