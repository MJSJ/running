var PlayerFactory = require("./PlayerFactory.js");
var Control = require("./Controler.js")
// var $ = require("zepto")
// var $ = window.$;
function Game(role,type,scroller,renderer,ui,navStage){
	/**
	 * type 1: single
	 * 		2: dobule
	 */

	this.type = type;
	/**
	 * role 1: main
	 * 		2: second
	 */

	this.role = role;

	this.players = [];
	this.scroller = scroller;
	// this.playerFactory = new PlayerFactory(scroller);
	this.playerFactory = new PlayerFactory(this.role,this.type);
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

	this.renderer.render(this.scroller.stage);

	if(this.type == 1){
		// single play
		document.querySelector("#specification1").style.display = "block"
	}
	// this.ready();
	
}



/**
 * !!!!!!!!!!!this again now not use at all 
 * [ready description]
 * @Author   yursile
 * @DateTime 2016-07-12T17:54:36+0800
 * @param    {[type]}                 again 
 */
Game.prototype.ready = function(again){
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
		if(again){
			_this.again();
		}else{
			_this.begin();
		}
	},3000);
}

Game.prototype.readyToPlay = function(){
	var _this = this;
	console.log(this.role);
	console.log(window.Interact.roomID);
	window.Interact.socket.emit("zhan",{room_id:window.Interact.roomID,role:this.role==1?"main":"second"});
	window.Interact.socket.on("kezhan",function(){
		document.querySelector("#match_success").style.display = "none";
		_this.ready();
	})

}



Game.prototype.begin = function(fn){
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
		/**
		 * if main player has not completed
		 */
		if(this.role ==1 && this.players[0].state !== "over"){
			this.ui.update(this.players[0]);
		}else if(this.role ==2 && this.players[1].state !== "over"){
			this.ui.update(this.players[1]);
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
	var _this = this;
	var l = this.players.length;
	for(let i = 0;i<l;i++){
		this.players[i].stopRun(this.scroller,this.renderer);
	}

	webkitCancelAnimationFrame(this.timer);
	this.timer = null;

	window.main_player_time = this.ui.getTime();

	

	/**
	 * post this time and role
	 * 		wait the server return other time;
	 */


	 if(this.type == 2){
	 	window.Interact.socket.emit("completeTime",{room_id:window.Interact.roomID,role:this.role,time:this.ui.getTime()});
	 	window.Interact.socket.on("completed",function(data){
	 		_this.otherTime = data.time;

	 		this.scroller.stage.removeChildren();
			setTimeout(function(){
				this.renderer.render(this.navStage)
			}.bind(_this),2000);
			this.showResult();
	 	})
	 }else{
	 	this.scroller.stage.removeChildren();
		setTimeout(function(){
			this.renderer.render(this.navStage)
		}.bind(this),2000);
		this.showResult();
	 }

}

Game.prototype.showResult = function(){

	var main_player_time = this.ui.getTime()

	var result = this.getRank();



	for(var i=1;i<=result.length;i++){
		document.querySelector("#NO_"+i+" .time").innerHTML = result[i-1].time+"s";
		document.querySelector("#NO_"+i+" .player").className = "player "+result[i-1].name
	}

	//comment
	var comment = "";
	if(main_player_time<9.58){
		comment = "和您比起来，世界飞人博尔特都甘拜下风"
	}else if(main_player_time>=9.58&&main_player_time<13){
		comment = "跑出了国家运动员的水准"
	}else{
		comment = "是时候该节食了"
	}


	document.querySelector(".doc").innerHTML = comment;
	document.querySelector("#time").innerHTML = main_player_time+"s";



	setTimeout(function(){
		document.getElementById("result").style.display = "block";
	},500)
}


Game.prototype.getRank = function(){
	var array = [];
	var _this = this;
	if(this.type == 1){
		array.push({
			name:"main",
			time:_this.ui.getTime()
		});
		array.push({
			name:"npc",
			time:PlayerFactory.FAST_TIME
		});
		array.push({
			name:"npc",
			time:PlayerFactory.NORMAL_TIME
		});
	}else if(this.type == 2){
		array.push({
			name:"main",
			time:_this.role == 1 ? _this.ui.getTime():_this.otherTime
		});
		array.push({
			name:"second",
			time:_this.role == 2 ? _this.ui.getTime():_this.otherTime
		});
		array.push({
			name:"npc",
			time:PlayerFactory.NORMAL_TIME
		});
	}

	

	var swap = {};
	for(var i=1;i<array.length;i++){
		if(array[i].time < array[i-1].time){
			swap.time = array[i].time;
			array[i].time = array[i-1].time;
			array[i-1].time = swap.time; 

			swap.name = array[i].name;
			array[i].name = array[i-1].name;
			array[i-1].name = swap.name; 
		}
	}
	if(array[1]>array[2]){
		swap.time = array[1].time;
		array[1].time = array[2].time;
		array[2].time = swap.time; 

		swap.name = array[1].name;
		array[1].name = array[2].name;
		array[2].name = swap.name; 
	}

	return array;
}


Game.prototype.again = function(){
	this.countDown.stop();
	this.scroller.stage.removeChild(this.countDown);
	this.state = "begin";


	for(let i = 0;i<PLAYER_NUM;i++){
		this.players[i].run(this.scroller,this.renderer);

	}
}



Game.prototype.reInit = function(){
	// this.stage = stage;
	var stage = this.scroller.stage;

	//clear players from player factory 
	this.playerFactory.removePlayers();
	this.renderer.render(stage);
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

	this.ready(true);
	
}


module.exports = Game;