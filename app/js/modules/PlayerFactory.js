var Player = require("./Player.js");

var F_POSITION = 350;
var S_POSITION = F_POSITION+52;
var T_POSITION = S_POSITION+52;
var X_POSITION = 50;




function PlayerFactory (){
	this.players = [];
}

PlayerFactory.FAST_SPEED = 10.4384;   //   100/9.58
PlayerFactory.NORMAL_SPEED = 7.6923;

Player.FAST_TIME = 9.58;
Player.NORMAL_TIME = 13;
// PlayerFactory.NORMAL_SPEED = 10.4384;

PlayerFactory.prototype.createMainPlayer = function(){
	var player = new Player(X_POSITION-230,F_POSITION,"main_player");
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