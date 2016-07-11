var Track = require("./Track.js")


function Player(x,y,role,speed){
	this.role = role;
	this.textureArray = this.generateTexture();
	PIXI.extras.MovieClip.call(this,this.textureArray);

	this.position.x = x;
	this.position.y = y;
	this.speed = speed||0;


	//world coordinate x
	this.viewPortX = 0;
	this.animationSpeed = 0;

	this.timer = null;
}

/**
 * state
 * 		running
 * 		over
 */

Player.DELTA_X = Track.DELTA_X;
Player.WIDTH = 40;
Player.HEIGHT = 50;

//hava main player completed;
// 0： not
// 1:  have
Player.MAIN_PLAYER == 0;


Player.constructor = Player;
Player.prototype = Object.create(PIXI.extras.MovieClip.prototype);

Player.prototype.updateAnimationSpeed = function(){
	this.animationSpeed = this.speed/50;
}

Player.prototype.run = function(scroller,renderer){
	

	///////////////////
	// running stage //
	///////////////////

	this.changeRunningState();

	// scroller.stage
	// 
	this.scroller = scroller;
	// this.renderer = renderer;

	this.running();

}



Player.prototype.running = function(){
	//player position
	this.moveViewportXBy(this.speed);
	this.setOffsetX(this.scroller);

	//player animation speed
	this.updateAnimationSpeed();

	this.state = "running";
	//track move
	if(this.role == "main_player"){
		this.scroller.moveViewportXBy(this.speed);
	}
		

	//if player have completed
	if(this.getViewportX() * Player.DELTA_X > Track.RUN_LENGTH){
		console.log(this.role +" "+this.scroller.getViewportX()+" "+ this.getViewportX());
		this.stopRun();
		if(this.role == "npc_player"){
			// this.stopRun();
			this.moveBack();
		}else if(this.role =="main_player"){
			Player.MAIN_PLAYER = 1;
		}
	}else{
		this.timer = webkitRequestAnimationFrame(this.running.bind(this));
	}
}


/**
*	if first arrival player is npc  
*   move back
*/
Player.prototype.moveBack = function(){
	if(Player.MAIN_PLAYER == 1){
		webkitCancelAnimationFrame(this.timer);
		this.timer = null;
	}

	this.setViewportX(Track.RUN_LENGTH/Track.DELTA_X);
	this.setOffsetX(this.scroller);

	this.timer = webkitRequestAnimationFrame(this.moveBack.bind(this));
}

Player.prototype.stopRun = function(){
	// this.setSpeed(0);
	this.stop();
	webkitCancelAnimationFrame(this.timer);
	this.timer = null;
	this.state = "over";
}

Player.prototype.moveViewportXBy = function(speed){
	this.viewPortX += speed;
}

/**
 * ???????????????????
 * @Author   yursile
 * @DateTime 2016-07-07T16:20:22+0800
 * @param    {[type]}                 scroller [description]
 */
Player.prototype.setOffsetX = function(scroller){

	this.position.x = (this.getViewportX() - scroller.getViewportX())*Player.DELTA_X;
}

Player.prototype.getViewportX = function(){
	return this.viewPortX;
}

Player.prototype.setViewportX = function(viewPortX){
	this.viewPortX = viewPortX;
}


Player.prototype.changeRunningState = function(){
	this.play();
}

Player.prototype.generateTexture = function(){
	var textureArray = [];
	for (let i=1; i < 4; i++)
	{
	     var texture = PIXI.Texture.fromFrame(this.role+i);
	     textureArray.push(texture);
	};
	return textureArray;
}

Player.prototype.setSpeed = function(speed){
	this.speed = speed;
}


module.exports = Player;