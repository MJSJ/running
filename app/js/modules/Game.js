var PlayerFactory = require("./PlayerFactory.js");


function Game(type){

	this.type = type;
	this.playerFactory = new PlayerFactory();
	this.players = [];
}


Game.prototype.init = function(stage){
	this.stage = stage;

	if(this.type == 1){
		this.players = this.playerFactory.getSinglePlayer();
	}else if(this.type == 2){
		this.players = this.playerFactory.getDoublePlayer();
	}

	var l = this.players.length;
	for(let i = 0;i<l;i++){
		this.stage.addChild(this.players[i]);
	}

	
	
}




Game.prototype.ready = function(){

}

Game.prototype.begin = function(){
	var l = this.players.length;
	for(let i = 0;i<l;i++){
		this.players[i].run();
	}
}


Game.prototype.over = function(){

}

module.exports = Controler;