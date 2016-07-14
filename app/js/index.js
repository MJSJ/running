
var PIXI = require('pixi.js');
var Scroller = require("./modules/Scroller.js");
var Page1 = require("./modules/Page1.js")
var Interact = require("./modules/Socket.js");

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

Main.prototype.isSecond = function(){
  var arg = window.location.search.slice(1);
  var arr = arg.split("&");
  var obj ={};
  for(let i in arr){
      let temp = arr[i].split("=");
      obj[temp[0]] = temp[1]
  }

  var roomid = obj.roomid;
  if(roomid){
    this.role = 2;
    this.page1.type  = 2;
    return true;
  }else{
    this.role = 1;
    return false;
  }
}

Main.prototype.showNavigator = function(){
  this.navStage = new PIXI.Container(0xF0F0F0);
  this.page1 = new Page1(this.renderer,this.navStage);
  this.page1.startBtn.on("tap",this.toStart.bind(this))


  if(this.isSecond()){
    this.page1.double_player.emit("tap");
    this.toStart();
  }
}

Main.prototype.toStart = function(){
  var _this = this;
  if(this.page1.type == 1){
    this.setupGame();
    this.page1.stopAnimation();
  }else{
    window.Interact.init();
    window.Interact.generateQR(document.querySelector(".ewm_box"));
    document.querySelector("#specification2").style.display = "block";


    // monitor other player enter
    
    window.Interact.onMatched(function(){
      _this.setupGame();
      _this.page1.stopAnimation();
      document.querySelector("#specification2").style.display = "none";
      document.querySelector("#match_success").style.display = "block";

      // set
    });

  }
}

Main.prototype.setupGame = function(){

  // if(this.game){
  //   this.reSetupGame();
  // }else{

    this.scroller = new Scroller(this.stage);
    this.ui = new UI(this.stage);
    this.scroller.addTrack();
    

    ////////////////
    // add player //
    ////////////////
    
    /**
     * [game description]
     * @role 1 ,  2
     * @type 1 single 2 double
     */
    window.game = this.game = new Game(this.role,this.page1.type,this.scroller,this.renderer,this.ui,this.navStage);
    this.game.init();   
    
    this.renderer.render(this.stage);
  // }
}


Main.prototype.reSetupGame = function(){
   // window.game = this.game = new Game(1,this.page1.type,this.scroller,this.renderer,this.ui,this.navStage);
   this.game.type = this.page1.type;



   this.game.reInit();
   this.renderer.render(this.stage);
}

window.main = new Main();





