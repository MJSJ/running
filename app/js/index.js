
var PIXI = require('pixi.js');
var Scroller = require("./modules/Scroller.js");


var all  = document.getElementById("all");
var WIDTH = window.SCREEN_WIDTH =  all.getBoundingClientRect().width/ window.pas.scaleNum;
var HEIGHT = window.SCREEN_HEIGHT = all.getBoundingClientRect().height / window.pas.scaleNum;

var SCROLL_SPEED = 5;

var UI = require("./modules/UI.js")
var Game = require("./modules/Game")

function Main(){
  this.stage = new PIXI.Container(0xF0F0F0);
  // this.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
  this.renderer = new PIXI.CanvasRenderer(WIDTH, HEIGHT);
  this.renderer.backgroundColor = 0xF0F0F0;
  all.appendChild(this.renderer.view);
  
  this.loadSpriteSheet();
}

// Main.prototype.update = function (){
 
//     this.scroller.moveViewportXBy(SCROLL_SPEED);
//     this.renderer.render(this.stage);
    
//     requestAnimationFrame(this.update.bind(this));
// }


Main.prototype.loadSpriteSheet = function(){
  var assetsToLoad = ['img/icons.json',"img/players.json"];
  var loader = new PIXI.loaders.Loader();
  loader.add(assetsToLoad);
  loader.once("complete",this.spriteSheetLoaded.bind(this));
  loader.load();
}


Main.prototype.spriteSheetLoaded = function(){
  this.scroller = new Scroller(this.stage);
  this.ui = new UI(this.stage);
  this.scroller.addTrack();
  

  ////////////////
  // add player //
  ////////////////
  this.game = new Game(1,this.scroller,this.renderer);
  this.game.init();   
  

  var _this = this;
  this.renderer.render(this.stage);


  //timer
  this.game.ready();
  // setTimeout(function(){
  //   _this.game.begin();
  //   // requestAnimationFrame(_this.update.bind(_this));
  // },3000);
  


  // var slice1 = PIXI.Sprite.fromFrame("edge_01");
  // slice1.position.x = 32;
  // slice1.position.y = 64;
  // this.stage.addChild(slice1);


  // var slice2 = PIXI.Sprite.fromFrame("decoration_03");
  // slice2.position.x = 128;
  // slice2.position.y = 64;
  // this.stage.addChild(slice2);
}

new Main();





