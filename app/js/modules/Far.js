function Far(url,width,height){
	this.texture = PIXI.Texture.fromImage(url);

	PIXI.extras.TilingSprite.call(this,this.texture,width,height);


	this.position.x = 0;
	this.position.y = Far.START_Y;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewPortX = 0;

}

Far.DELTA_X = 0.128;
Far.START_Y = 336;


Far.constructor = Far;
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function(){
	this.tilePosition.x -=0.128;
}



Far.prototype.setViewportX = function(newX){
	var distanceTravelled = newX - this.viewPortX;
	this.viewPortX = newX;
	this.tilePosition.x -= (Far.DELTA_X * distanceTravelled);
}

Far.prototype.moveViewportXBy = function(offsetX){
	this.viewPortX = this.viewPortX + offsetX;
	this.tilePosition.x -= (Far.DELTA_X * offsetX);
}


Far.prototype.getViewportX = function(){
	return this.viewPortX;
}

module.exports = Far;
