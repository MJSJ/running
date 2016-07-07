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
	this.animationSpeed = 0.1;

	this.timer = null;
}

/**
 * state
 * 		running
 * 		over
 */

Player.DELTA_X = 0.05;
Player.WIDTH = 40;
Player.HEIGHT = 50;


Player.constructor = Player;
Player.prototype = Object.create(PIXI.extras.MovieClip.prototype);

Player.prototype.run = function(scroller,renderer){
	

	///////////////////
	// running stage //
	///////////////////

	this.changeRunningState();

	// scroller.stage
	// 
	this.scroller = scroller;
	this.renderer = renderer;

	this.running();

}

Player.prototype.running = function(){
	//player position
	this.moveViewportXBy(this.speed);
	this.setOffsetX(this.scroller);
	this.state = "running";
	//track move
	if(this.role == "main_player")
		this.scroller.moveViewportXBy(this.speed);


	// this.renderer.render(this.scroller.stage);
	this.timer = requestAnimationFrame(this.running.bind(this));


	//if player have completed
	if(this.getViewportX() * Player.DELTA_X * this.speed > Track.RUN_LENGTH){
		console.log(this.getViewportX());
		this.stopRun();
	}
}

Player.prototype.stopRun = function(){
	this.setSpeed(0);
	this.stop();
	cancelAnimationFrame(this.timer);
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