var Buoy = require("./Buoy.js");
var LastBuoy = require("./LastBuoy")

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

Track.COLUMN_SPAN = 850;
Track.ROW_SPAN = 52;
Track.LENGTH = 10000;
Track.START_OFFSET = 350;
Track.RUN_LENGTH = Track.COLUMN_SPAN*10+Track.START_OFFSET;

Track.DELTA_X = Track.RUN_LENGTH/6000; //		RUN_LENGTH/speed/time
						//  speed:10  time: 10  

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
		this.graphics.moveTo(Track.START_OFFSET+span*i,0);
		this.graphics.lineTo(Track.START_OFFSET+span*i,160);

		this.graphics.endFill();
	}

	//last line
	this.graphics.moveTo(Track.START_OFFSET+span*10+5,0);
	this.graphics.lineTo(Track.START_OFFSET+span*10+5,160);

	this.graphics.endFill();
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
		let buoy = new Buoy(i,Track.START_OFFSET+span*i);
		this.addChild(buoy);
	}

	//last flag
	var lastFlag = new LastBuoy(10,Track.START_OFFSET+span*10);
	this.addChild(lastFlag);
}




module.exports = Track;
