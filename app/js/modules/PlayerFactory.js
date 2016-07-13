var Player = require("./Player.js");

var F_POSITION = 350;
var S_POSITION = F_POSITION+52;
var T_POSITION = S_POSITION+52;
var X_POSITION = 50;




function PlayerFactory (role,type){
	this.role = role;
	this.type = type;
	this.players = [];
}

PlayerFactory.FAST_SPEED = 10.4384;   //   100/9.58
PlayerFactory.NORMAL_SPEED = 7.6923;

PlayerFactory.FAST_TIME = Player.FAST_TIME = 9.58;
PlayerFactory.NORMAL_TIME = Player.NORMAL_TIME = 13;
// PlayerFactory.NORMAL_SPEED = 10.4384;

PlayerFactory.prototype.createMainPlayer = function(){

	var player = new Player(this.role,X_POSITION-230,F_POSITION,(this.role == 1?"main_player":"second_player"));
	this.players.push(player);
}

PlayerFactory.prototype.createSecondPlayer = function(speed){
	var player;
	// if(!speed){
	// 	player = new Player(X_POSITION,S_POSITION,"second_player");
	// }else{
	// 	player = new Player(X_POSITION,S_POSITION,"npc_player",speed);
	// }

	if(this.type == 1){
		player = new Player(this.role,X_POSITION,S_POSITION,"npc_player",speed);
	}else if(this.type == 2){
		player = new Player(this.role,X_POSITION,S_POSITION,(this.role == 1?"second_player":"main_player"),speed);
	}


	this.players.push(player);
}

PlayerFactory.prototype.createThirdPlayer = function(speed){
	var player = new Player(this.role,X_POSITION,T_POSITION,"npc_player",speed);
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
	this.createSecondPlayer(PlayerFactory.NORMAL_SPEED);
	this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);

	return this.players;
}

PlayerFactory.prototype.removePlayers = function(){
	this.players = [];
}


module.exports = PlayerFactory;