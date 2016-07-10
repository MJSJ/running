var Buoy = require("./Buoy.js")
var Track = require("./Track.js")


var SPAN = 850;

var WIDTH = window.SCREEN_WIDTH;
var HEIGHT = window.SCREEN_HEIGHT;
var FLOORY = 620;
var BARY = 475;

var STYLE_S = {
	    font : 'bold italic 50px Arial'
	};

var STYLE = {
	font : 'bold italic 80px Arial'
}

function UI(stage){
	this.stage = stage;

	this.graphics = new PIXI.Graphics();
	
	this.addFloor();
	this.addBar();

	var _this = this;
	this.stage.addChild(_this.graphics);


	this.distance = "000";
	this.time = "0.00";

	// this.distance.text
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

UI.prototype.addDistance = function(){

	var distance_s = new PIXI.Text('m',STYLE_S);
	distance_s.x = 150;
	distance_s.y = 50;
	this.stage.addChild(distance_s);

	this.distanceText = new PIXI.Text("000",STYLE);
	this.distanceText.x = 0;
	this.distanceText.y = 0;
	this.stage.addChild(this.distanceText);
}

UI.prototype.addTime = function(){

	var time_s = new PIXI.Text('s',STYLE_S);
	time_s.x = 600;
	time_s.y = 50;
	this.stage.addChild(time_s);
	var _this = this;



	this.TimeText = new PIXI.Text("0.00",STYLE);
	this.TimeText.x = 400;
	this.TimeText.y = 0;
	this.stage.addChild(this.TimeText);

}

UI.prototype.updateTime = function(){
	// recored start time
	if(!this.startTime) this.startTime = new Date().getTime();

	var currentTime = new Date().getTime();
	var diffSeconds = Math.floor((currentTime-this.startTime)/1000);
	var diffMilliseconds = Math.floor(((currentTime-this.startTime)%1000)/10);
	var diffMillisecondsText = (diffMilliseconds<10)?("0"+diffMilliseconds):diffMilliseconds;

	this.TimeText.text = diffSeconds+"." + diffMillisecondsText;
}


UI.prototype.updateDistance = function(player){
	var distance =  Math.ceil(player.getViewportX()/Track.RUN_LENGTH*Track.DELTA_X*100);
	if(distance<10){
		this.distanceText.text = "00"+distance;
	}else if(distance>=10&&distance<100){
		this.distanceText.text = "0"+distance;
	}else{
		this.distanceText.text  = "100"
	}
	
}


UI.prototype.update = function(player){
	this.updateTime();
	this.updateDistance(player);
}





module.exports = UI;