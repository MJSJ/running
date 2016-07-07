var Player = require("./Player.js");

var F_POSITION = 0;
var S_POSITION = 50;
var T_POSITION = 400;
var X_POSITION = 50;




function PlayerFactory (){
	this.players = [];
}

PlayerFactory.FAST_SPEED = 2;
PlayerFactory.NORMAL_SPEED = 1;

PlayerFactory.prototype.createMainPlayer = function(){
	var player = new Player(X_POSITION,F_POSITION,"main_player");
	this.players.push(player);
}

PlayerFactory.prototype.createSecondPlayer = function(speed){
	var player;
	if(!speed){
		player = new Player(X_POSITION,S_POSITION,"second_player");
	}else{
		player = new Player(X_POSITION,S_POSITION,"npc_player",speed);
	}
	this.players.push(player);
}

PlayerFactory.prototype.createThirdPlayer = function(speed){
	var player = new Player(X_POSITION,T_POSITION,"npc_player",speed);
	this.players.push(player);
}

PlayerFactory.prototype.getSinglePlayer = function(){
	this.createMainPlayer();
	this.createSecondPlayer(PlayerFactory.FAST_SPEED);
	this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);

	return this.players;
}


PlayerFactory.prototype.getDoublePlayer = function(){
	this.createMainPlayer();
	this.createSecondPlayer();
	this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);

	return this.players;
}


module.exports = PlayerFactory;