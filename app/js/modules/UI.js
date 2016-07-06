var Buoy = require("./Buoy.js")

var SPAN = 850;

var WIDTH = window.SCREEN_WIDTH;
var HEIGHT = window.SCREEN_HEIGHT;
var FLOORY = 620;
var BARY = 475;

function UI(stage){
	this.stage = stage;

	this.graphics = new PIXI.Graphics();
	
	this.addFloor();
	this.addBar();

	var _this = this;
	this.stage.addChild(_this.graphics);
}




UI.prototype.addFloor = function(){
	this.graphics.beginFill(0x5889DA);
	this.graphics.moveTo(0,FLOORY);
	this.graphics.lineTo(WIDTH, FLOORY);
	this.graphics.lineTo(WIDTH, HEIGHT);
	this.graphics.lineTo(0, HEIGHT);
	this.graphics.endFill();
}


UI.prototype.addBar = function(){
	this.graphics.beginFill(0xF5CD5A);
	this.graphics.moveTo(0,BARY);
	this.graphics.lineTo(WIDTH, BARY);
	this.graphics.lineTo(WIDTH, FLOORY);
	this.graphics.lineTo(0, FLOORY);
	this.graphics.endFill();
}

// UI.prototype.addPlayers = function(){

// }




module.exports = UI;