var Buoy = require("./Buoy");

function LastBuoy(index,x,y){
	this.texture = PIXI.Texture.fromImage("lastbuoy");

	PIXI.Sprite.call(this,this.texture,Buoy.WIDTH,Buoy.HEIGHT);

	this.position.x = x+5;
	this.position.y = y||-90;
	this.index = index;
}

LastBuoy.prototype = Object.create(PIXI.Sprite.prototype);
LastBuoy.prototype.constructor = LastBuoy;



module.exports = LastBuoy;
