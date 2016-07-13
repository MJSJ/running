var Far = require("./Far.js");
var Mid = require("./Mid.js")
var Track = require("./Track.js")

function Scroller(stage){
	this.stage = stage;
	this.farbg = new Far('rear',995,204);
	this.midbg = new Mid('front',995,212);
	// this.track = new Track();
	this.addClouds();

	stage.addChild(this.farbg);
	stage.addChild(this.midbg);
	stage.addChild(this.clouds);
	// stage.addChild(this.track);
	this.viewportX = 0;
}



Scroller.prototype.setViewportX = function(currentX){
	if(this.farbg) this.farbg.setViewportX(currentX)
	if(this.midbg) this.midbg.setViewportX(currentX)
	if(this.track) this.track.setViewportX(currentX)
	this.viewportX = currentX;
}

Scroller.prototype.getViewportX = function(){
	return this.viewportX;
}

Scroller.prototype.moveViewportXBy = function(offsetX){
	if(this.farbg) this.farbg.moveViewportXBy(offsetX);
	if(this.midbg) this.midbg.moveViewportXBy(offsetX);
	if(this.track) this.track.moveViewportXBy(offsetX);
	if(this.clouds) this.clouds.position.x -= offsetX/10;
	this.viewportX = this.getViewportX() + offsetX;
}

Scroller.prototype.addTrack = function(span){
	
	this.track = new Track();
	this.stage.addChild(this.track);
}

Scroller.prototype.addClouds = function(){
	this.clouds = new PIXI.Container();
	var cloud1 = new PIXI.Sprite.fromFrame("cloud");
	cloud1.position.x = 30;
	cloud1.position.y = 50;
	this.clouds.addChild(cloud1);

	var cloud2 = new PIXI.Sprite.fromFrame("cloud");
	cloud2.position.x = 400;
	cloud2.position.y = 230;
	this.clouds.addChild(cloud2);


	var cloud3 = new PIXI.Sprite.fromFrame("cloud");
	cloud3.position.x = 760;
	cloud3.position.y = 60;
	this.clouds.addChild(cloud3);

	this.clouds.position.x = 0;

	this.stage.addChild(this.clouds);

}

module.exports = Scroller;