function Buoy(index,x,y){

	this.texture = PIXI.Texture.fromImage("buoy");

	PIXI.Sprite.call(this,this.texture,Buoy.WIDTH,Buoy.HEIGHT);

	this.position.x = x-Buoy.WIDTH/2;
	this.position.y = y||-90;
	this.index = index;
}

Buoy.WIDTH = 95;
Buoy.HEIGHT = 93;

Buoy.DELTA_X = 0.64;

Buoy.constructor = Buoy;
Buoy.prototype = Object.create(PIXI.Sprite.prototype);


module.exports = Buoy;
