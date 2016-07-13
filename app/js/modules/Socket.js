var io = require('socket.io-client');
var QRCode = window.QRCode;
var w = window;
var d = document;
var counter = 0;
var isGenerated = false;
// ws.a.sohu.com
var Interact = window.Interact = {
    host: 'ws://10.2.24.81:',
    port: 3000,
    url: 'http://10.2.24.81',
    // 连接房间
    registerRoom: function (rid) {
        var _this = this;
        //告诉服务器，客户端要进入的房间号
        console.log(rid+"   ");
        //EFAF46
        this.socket.emit('registerRoom', { room_id: rid });
        // 创建房间的二维码
        
    },

    generateQR:function(ele){
        var _this = this;
        if(!isGenerated){
            if(w.location.pathname != '/run'){
                var qrcode = new QRCode(ele, {
                    text: _this.url + ":" + _this.port + "/run?roomid=" + _this.roomID,
                    width: 257,
                    height: 257,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
            isGenerated = true
        }
    },



    // 断开连接
    unregisterRoom: function (){

    },

    
    init: function(config){
        var arg = w.location.search.slice(1);
        var arr = arg.split("&");
        var obj ={};
        for(let i in arr){
            let temp = arr[i].split("=");
            obj[temp[0]] = temp[1]
        }

        var roomid = obj.roomid;

        if(roomid){
            this.roomID = roomid;
        }else{ this.roomID = (new Date().getTime());}


      

        // 实例化一个socket
        this.socket = io( this.host + this.port );
        var _this = this;
        // 向服务器注册一个房间
        _this.registerRoom(_this.roomID);

        _this.onUserEnter();
    },
    // 监听用户进入
    onUserEnter: function () {
       
    },

    onMatched:function(fn){
         this.socket.on("matched",function(data){
            fn(data);
         })
    },

    // 监听用户动作
    // onUserAction: function(onRes,onReq) {
    //     onRes();
    //     onReq();
    // }
};

module.exports = Interact;
