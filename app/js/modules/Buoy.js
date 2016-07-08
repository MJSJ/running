function Buoy(index,x,y){

	this.texture = PIXI.Texture.fromImage("buoy");

	PIXI.Sprite.call(this,this.texture,Buoy.WIDTH,Buoy.HEIGHT);

	this.position.x = x-Buoy.WIDTH/2+8;
	this.position.y = y||-90;
	this.index = index;

	this.addText();
	// this.text = i;
}

Buoy.WIDTH = 95;
Buoy.HEIGHT = 93;

Buoy.DELTA_X = 0.64;

Buoy.prototype = Object.create(PIXI.Sprite.prototype);
Buoy.prototype.constructor = Buoy;


Buoy.prototype.addText = function(){
	var style = {
	    font : 'bold italic 36px Arial',
	    fill : '#F7EDCA',
	    stroke : '#4a1850',
	    strokeThickness : 5,
	    dropShadow : true,
	    dropShadowColor : '#000000',
	    dropShadowAngle : Math.PI / 6,
	    dropShadowDistance : 6,
	    wordWrap : true,
	    wordWrapWidth : 440
	};

	this.richText = new PIXI.Text(this.index,style);
	this.richText.x = 30;
	this.richText.y = 20;


	this.addChild(this.richText);
}

Buoy.prototype.removeText = function(){
	this.addChild(this.richText);
}

module.exports = Buoy;
