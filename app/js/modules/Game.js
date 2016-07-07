var PlayerFactory = require("./PlayerFactory.js");


function Game(type,scroller,renderer){

	this.type = type;
	this.players = [];
	this.scroller = scroller;
	this.playerFactory = new PlayerFactory(scroller);
	this.renderer = renderer;

	this.timer = null;
	this.ALL_VIEWPORT = this.scroller.track.ALL_VIEWPORT;

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


	
	
}




Game.prototype.ready = function(){

}

Game.prototype.begin = function(){
	//set main player's speed
	this.players[0].setSpeed(3);

	for(let i = 0;i<PLAYER_NUM;i++){
		this.players[i].run(this.scroller,this.renderer);

	}

	//update render
	
	// requestAnimationFrame(this.running.bind(this));
	this.running();

	
}


Game.prototype.running = function(){
	this.timer = this.renderer.render(this.scroller.stage);
	requestAnimationFrame(this.running.bind(this));
	
	/**
	 * 	if all player have completed;
	 */
	if(this.players[0].state=="over" && this.players[1].state=="over" &&this.players[0].state=="over"){
		this.over();
	}else{
		for(let i = 0;i<PLAYER_NUM;i++){
		
			this.players[i].run(this.scroller,this.renderer);

		}
	}
	
}



Game.prototype.over = function(){
	var l = this.players.length;
	for(let i = 0;i<l;i++){
		this.players[i].stopRun(this.scroller,this.renderer);
	}

	cancelAnimationFrame(this.timer);
	this.timer = null;
}

module.exports = Game;