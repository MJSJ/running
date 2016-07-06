var Far = require("./Far.js");
var Mid = require("./Mid.js")
var Track = require("./Track.js")

function Scroller(stage){
	this.stage = stage;
	this.farbg = new Far('rear',995,204);
	this.midbg = new Mid('front',995,212);
	// this.track = new Track();

	stage.addChild(this.farbg);
	stage.addChild(this.midbg);
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

	this.viewportX = this.getViewportX() + offsetX;
}

Scroller.prototype.addTrack = function(span){
	
	this.track = new Track();
	this.stage.addChild(this.track);
}

module.exports = Scroller;