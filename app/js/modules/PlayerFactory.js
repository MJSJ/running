var Player = require("./Player.js");

var F_POSITION = 350;
var S_POSITION = F_POSITION+52;
var T_POSITION = S_POSITION+52;
var X_POSITION = 50;
var OFFSET = 180;



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


/**
 * -230
 * @Author   yursile
 * @DateTime 2016-07-14T21:14:50+0800
 * @param    {[type]}                 speed [description]
 * @return   {[type]}                       [description]
 */
PlayerFactory.prototype.createMainPlayer = function(speed){
	// if(this.type == 2){

		if(this.role == 1){
			var player = new Player(this.role,X_POSITION-OFFSET,F_POSITION,"main_player");
		}else{
			var player = new Player(this.role,X_POSITION-OFFSET,F_POSITION,"second_player");
		}

	// }else{
	// 	if(this.role == 1){
	// 		var player = new Player(this.role,X_POSITION-OFFSET,F_POSITION,"main_player");
	// 	}else{
	// 		var player = new Player(this.role,X_POSITION,F_POSITION,"npc_player",speed);
	// 	}
	// }

	this.players.push(player);
}

PlayerFactory.prototype.createSecondPlayer = function(speed){
	var player;
	// if(!speed){
	// 	player = new Player(X_POSITION,S_POSITION,"second_player");
	// }else{
	// 	player = new Player(X_POSITION,S_POSITION,"npc_player",speed);
	// }

	// if(this.type == 1){
		// if(this.role == 1){
			player = new Player(this.role,X_POSITION,S_POSITION,"npc_player",speed);
		// }else{
		// 	player = new Player(this.role,X_POSITION-OFFSET,S_POSITION,"second_player");
		// }
	// }else if(this.type == 2){
	// 	if(this.role == 1){
	// 		player = new Player(this.role,X_POSITION-OFFSET,S_POSITION,"npc_player",speed);
	// 	}else{
	// 		player = new Player(this.role,X_POSITION-OFFSET,S_POSITION,"second_player");
	// 	}
	// 	// player = new Player(this.role,X_POSITION,S_POSITION,(this.role == 1?"second_player":"main_player"),speed);
	// }


	this.players.push(player);
}

PlayerFactory.prototype.createThirdPlayer = function(speed){
	var player = new Player(this.role,X_POSITION,T_POSITION,"npc_player",speed);
	this.players.push(player);
}

PlayerFactory.prototype.getSinglePlayer = function(){
	



	// if(this.role == 1){
		this.createMainPlayer();
		this.createSecondPlayer(PlayerFactory.FAST_SPEED);
		this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);
	// }else{
	// 	this.createSecondPlayer();
	// 	this.createMainPlayer(PlayerFactory.FAST_SPEED);
	// 	this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);
	// }

	return this.players;
}


PlayerFactory.prototype.getDoublePlayer = function(){
	// if(this.role == 1){
		this.createMainPlayer();
		this.createSecondPlayer(PlayerFactory.NORMAL_SPEED);
		this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);
	// }else{
	// 	this.createSecondPlayer();
	// 	this.createMainPlayer(PlayerFactory.NORMAL_SPEED);
	// 	this.createThirdPlayer(PlayerFactory.NORMAL_SPEED);
	// }

	

	return this.players;
}

PlayerFactory.prototype.removePlayers = function(){
	this.players = [];
}


module.exports = PlayerFactory;