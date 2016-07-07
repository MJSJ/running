function Mid(url,width,height){
	this.texture = PIXI.Texture.fromImage(url);

	PIXI.extras.TilingSprite.call(this,this.texture,width,height);


	this.position.x = 0;
	this.position.y = Mid.START_Y;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewPortX = 0;

}

/**
 * unit speed for 1 clock;
 * @type {Number}
 */
Mid.DELTA_X = 0.5;
Mid.START_Y = 365;
Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function(){
	this.tilePosition.x -=0.128;
}



Mid.prototype.setViewportX = function(newX){
	var distanceTravelled = newX - this.viewPortX;
	this.viewPortX = newX;
	this.tilePosition.x -= (Mid.DELTA_X * distanceTravelled);
}

Mid.prototype.moveViewportXBy = function(offsetX){
	this.viewPortX = this.viewPortX + offsetX;
	this.tilePosition.x -= (Mid.DELTA_X * offsetX);
}

Mid.prototype.getViewportX = function(){
	return this.viewPortX;
}

module.exports = Mid;
