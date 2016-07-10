var PlayerFactory = require("./PlayerFactory.js");


function Game(type,scroller,renderer){

	this.type = type;
	this.players = [];
	this.scroller = scroller;
	this.playerFactory = new PlayerFactory(scroller);
	this.renderer = renderer;

	this.timer = null;
	this.ALL_VIEWPORT = this.scroller.track.ALL_VIEWPORT;
	this.state = null;

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


	this.ready();
	
}




Game.prototype.ready = function(){
	var _this = this;
	this.state = "ready";
	var countDowns = [];
	for (let i=4; i > 0; i--)
	{
	     // let texture = PIXI.Texture.fromFrame("countDown"+i);
	     let sprite = PIXI.Sprite.fromFrame("countDown"+i);
	     countDowns.push(sprite);
	};

	this.countDown = new PIXI.extras.MovieClip(countDowns);
	this.countDown.animationSpeed = 0.05;
	this.countDown.position.x = 250;
	this.countDown.position.y = 350;


	this.scroller.stage.addChild(this.countDown);
	this.countDown.play();

	setTimeout(function(){
		_this.scroller.stage.removeChild(this.countDown);
		_this.countDown.stop();
		_this.begin();
	},3000);
}

Game.prototype.begin = function(){
	//set main player's speed
	this.state = "begin";
	this.players[0].setSpeed(9);

	for(let i = 0;i<PLAYER_NUM;i++){
		this.players[i].run(this.scroller,this.renderer);

	}
	this.update();

	
}


Game.prototype.update = function(){
	// if(this.state == "begin"){
		this.timer = this.renderer.render(this.scroller.stage);
	// }

	requestAnimationFrame(this.update.bind(this));
	
	
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

	cancelAnimationFrame(this.timer);
	this.timer = null;
}


Game.prototype.again = function(){

}

module.exports = Game;