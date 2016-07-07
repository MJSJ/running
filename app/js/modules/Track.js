var Buoy = require("./Buoy.js");

function Track(){

	this.graphics = new PIXI.Graphics();
	this.graphics.lineStyle(Track.LINE_WIDTH, 0x9AB8E9, 1);

	this.drawColumn(Track.COLUMN_SPAN);
	this.drawRow(Track.ROW_SPAN);

	//  generate track graphics
	this.texture = this.graphics.generateTexture();
 	PIXI.Sprite.call(this,this.texture,Track.LENGTH,172);

	this.position.x = 0-Track.LINE_WIDTH;
	this.position.y = 620-Track.LINE_WIDTH;


	this.viewPortX = 0;
	this.generateBuoy(Track.COLUMN_SPAN);
}
Track.LINE_WIDTH = 10;
Track.DELTA_X = 0.05;
Track.COLUMN_SPAN = 850;
Track.ROW_SPAN = 52;
Track.LENGTH = 10000;
Track.RUN_LENGTH = 9050;



Track.constructor = Track;
Track.prototype = Object.create(PIXI.Sprite.prototype);

/**
 * [ALL_VIEWPORT description]
 * @type {[type]}
 */
Track.prototype.ALL_VIEWPORT = Track.RUN_LENGTH/Track.DELTA_X;


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
