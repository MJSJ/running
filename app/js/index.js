
var PIXI = require('pixi.js');
var Scroller = require("./modules/Scroller.js");
var Page1 = require("./modules/Page1.js")

var all  = document.getElementById("all");
var WIDTH = window.SCREEN_WIDTH =  all.getBoundingClientRect().width/ window.pas.scaleNum;
var HEIGHT = window.SCREEN_HEIGHT = all.getBoundingClientRect().height / window.pas.scaleNum;

var SCROLL_SPEED = 5;

var UI = require("./modules/UI.js")
var Game = require("./modules/Game")

function Main(){
  this.stage = new PIXI.Container(0xF0F0F0);
  this.renderer = new PIXI.CanvasRenderer(WIDTH, HEIGHT);
  this.renderer.backgroundColor = 0xF0F0F0;
  all.appendChild(this.renderer.view);
  this.loadSpriteSheet();
}


Main.prototype.loadSpriteSheet = function(){
  var assetsToLoad = ["img/page1.json",'img/icons.json',"img/players.json"];
  var loader = new PIXI.loaders.Loader();
  loader.add(assetsToLoad);
  loader.once("complete",this.spriteSheetLoaded.bind(this));
  loader.load();
}


Main.prototype.spriteSheetLoaded = function(){
  this.showNavigator();

  // this.setupGame();

}

Main.prototype.showNavigator = function(){
  this.navStage = new PIXI.Container(0xF0F0F0);
  var page1 = new Page1(this.renderer,this.navStage);
  page1.startBtn.on("tap",function(){
    this.setupGame();
    page1.stopAnimation();
  }.bind(this))

}

Main.prototype.setupGame = function(){
  this.scroller = new Scroller(this.stage);
  this.ui = new UI(this.stage);
  this.scroller.addTrack();
  

  ////////////////
  // add player //
  ////////////////
  this.game = new Game(1,this.scroller,this.renderer,this.ui,this.navStage);
  this.game.init();   
  

  var _this = this;
  this.renderer.render(this.stage);
}

window.main = new Main();





