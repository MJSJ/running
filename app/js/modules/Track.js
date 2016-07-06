var Buoy = require("./Buoy.js");

function Track(){

	this.graphics = new PIXI.Graphics();
	this.graphics.lineStyle(10, 0x9AB8E9, 1);

	this.drawColumn(Track.COLUMN_SPAN);
	this.drawRow(Track.ROW_SPAN);

	//  generate track graphics
	this.texture = this.graphics.generateTexture();
 	PIXI.Sprite.call(this,this.texture,10000,172);

	this.position.x = 0;
	this.position.y = 700;


	this.viewPortX = 0;
	this.generateBuoy(Track.COLUMN_SPAN);
}

Track.DELTA_X = 0.64;
Track.COLUMN_SPAN = 850;
Track.ROW_SPAN = 52;

Track.constructor = Track;
Track.prototype = Object.create(PIXI.Sprite.prototype);




Track.prototype.setViewportX = function(newX){
	var distanceTravelled = newX - this.viewPortX;
	this.viewPortX = newX;
	this.position.x -= (Track.DELTA_X * distanceTravelled);
}

Track.prototype.moveViewportXBy = function(offsetX){
	this.viewPortX = this.viewPortX + offsetX;
	this.position.x -= (Track.DELTA_X * offsetX);
}

Track.prototype.drawColumn = function(span){
	
	for(let i = 0;i<10;i++){
		this.graphics.moveTo(550+span*i,0);
		this.graphics.lineTo(550+span*i,160);

		this.graphics.endFill();
	}
}


Track.prototype.drawRow = function(span){
	
	for(let i = 1;i<4;i++){
		this.graphics.moveTo(0,span*i);
		this.graphics.lineTo(10000, span*i);
		this.graphics.endFill();
	}
}

Track.prototype.getViewportX = function(){
	return this.viewPortX;
}


Track.prototype.generateBuoy = function(span){
	for(let i = 0;i<10;i++){
		let buoy = new Buoy(i,550+span*i);
		this.addChild(buoy);
	}
}



module.exports = Track;
