var PlayerFactory = require("./PlayerFactory.js");
var Control = require("./Controler.js")

function Game(type,scroller,renderer,ui,navStage){
	/**
	 * type 1: single
	 * 		2: dobule
	 */

	this.type = type;
	this.players = [];
	this.scroller = scroller;
	this.playerFactory = new PlayerFactory(scroller);
	this.renderer = renderer;
	this.ui = ui;

	this.timer = null;
	this.ALL_VIEWPORT = this.scroller.track.ALL_VIEWPORT;
	this.state = null;
	this.navStage = navStage;

}

var PLAYER_NUM = 3;

Game.prototype.init = function(){
	// this.stage = stage;
	var stage = this.scroller.stage;
	if(this.type == 1){
		this.players = this.playerFactory.getSinglePlayer();
	}else if(this.type == 2){
		this.players = this.playerFactory.getDoublePlayer();
	}

	var l = this.players.length;
	for(let i = 0;i<l;i++){
		stage.addChild(this.players[i]);
	}

	this.control = new Control(this);

	// show distance times
	this.ui.addDistance();
	this.ui.addTime();

	this.ready();
	
}




Game.prototype.ready = function(){
	var _this = this;
	this.state = "ready";
	var countDowns = [];
	for (let i=1; i < 5; i++)
	{
	     let texture = PIXI.Texture.fromFrame("countDown"+i);
	     countDowns.push(texture);
	     // let sprite = PIXI.Sprite.fromFrame("countDown"+i);
	     // countDowns.push(sprite);
	};

	this.countDown = new PIXI.extras.MovieClip(countDowns);
	this.countDown.animationSpeed = 0.018;
	this.countDown.position.x = 100;
	this.countDown.position.y = 350;


	this.scroller.stage.addChild(this.countDown);
	this.countDown.play();

	this.update();
	setTimeout(function(){
	
		_this.begin();
	},3000);
}

Game.prototype.begin = function(){
	this.countDown.stop();
	this.scroller.stage.removeChild(this.countDown);
	this.state = "begin";

	//set main player's speed
	// this.players[0].setSpeed(10.4384);


	// this.onSpeedChange();
	for(let i = 0;i<PLAYER_NUM;i++){
		this.players[i].run(this.scroller,this.renderer);

	}

	//update distance and time

	
}




Game.prototype.update = function(){
	if(this.state == "begin" ){
		this.renderer.render(this.scroller.stage);
		if(this.players[0].state !== "over"){
			this.ui.update(this.players[0]);
		}
	}else if(this.state == "ready"){
		this.renderer.render(this.scroller.stage);
	}

	
	this.timer = webkitRequestAnimationFrame(this.update.bind(this));
	
	
	/**
	 * 	if all player have completed;
	 */
	if(this.players[0].state=="over" && this.players[1].state=="over" &&this.players[2].state=="over"){
		this.over();
	}
	
}



Game.prototype.over = function(){
	this.state = "over";
	var l = this.players.length;
	for(let i = 0;i<l;i++){
		this.players[i].stopRun(this.scroller,this.renderer);
	}

	webkitCancelAnimationFrame(this.timer);
	this.timer = null;

	window.main_player_time = this.ui.getTime();
	// console.log(this.ui.getTime());
	this.scroller.stage.removeChildren();
	setTimeout(function(){
		this.renderer.render(this.navStage)

	}.bind(this),2000);
}

Game.prototype.showResult = function(){
	window.result = [];
	result.push({"main_player":this.ui.getTime()});
	result.push({"fast_player":PlayerFactory.FAST_TIME});
	result.push({"normal_player":PlayerFactory.NORMAL_TIME});
}


Game.prototype.again = function(){

}


Game.prototype.reInit = function(){
	// this.stage = stage;
	var stage = this.scroller.stage;
	if(this.type == 1){
		this.players = this.playerFactory.getSinglePlayer();
	}else if(this.type == 2){
		this.players = this.playerFactory.getDoublePlayer();
	}

	var l = this.players.length;
	for(let i = 0;i<l;i++){
		stage.addChild(this.players[i]);
	}

	this.control.again();

	// show distance times
	// this.ui.addDistance();
	// this.ui.addTime();

	this.ready();
	
}


module.exports = Game;