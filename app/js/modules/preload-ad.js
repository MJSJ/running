(function(window){


    var isFunc = function(f) {
        return typeof f === 'function';
      }
      //构造器函数
    function resLoader(config) {
      this.option = {
        resourceType: 'image', //资源类型，默认为图片
        ad:false,
        adTime:3000,
        baseUrl: './', //基准url
        resources: [], //资源路径数组
        onStart: null, //加载开始回调函数，传入参数total
        onProgress: null, //正在加载回调函数，传入参数currentIndex, total
        onComplete: null //加载完毕回调函数，传入参数total
      }
      var i;
      if (config) {
        for (i in config) {
          this.option[i] = config[i];
        }
      } else {
        alert('参数错误！');
        return;
      }
      this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
      this.total = this.option.resources.length || 0; //资源总数
      this.currentIndex = 0; //当前正在加载的资源索引
    };
    var startTime;

    resLoader.prototype.start = function() {
      this.status = 1;
      var _this = this;
      var baseUrl = this.option.baseUrl;
      var i,r,l,url;
      for (i = 0, l = this.option.resources.length; i < l; i++) {
          r = this.option.resources[i],
          url = '';
        if (r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
          url = r;
        } else {
          url = baseUrl + r;
        }
        startTime = new Date();

        var image = new Image();
        image.onload = function() {
          _this.loaded();
        };
        image.onerror = function() {
          _this.loaded();
        };
        image.src = url;
      }
      if (isFunc(this.option.onStart)) {
        this.option.onStart(this.total);
      }
    }

    resLoader.prototype.loaded = function() {
      if (isFunc(this.option.onProgress)) {
        this.option.onProgress(++this.currentIndex, this.total);
      }
      //加载完毕

      var endTime = new Date();
      // console.log(endTime-startTime);
      if (this.currentIndex === this.total) {
        if (isFunc(this.option.onComplete)) {
          var _this = this;
          if(this.option.ad===true){
            setTimeout(function(){
             _this.option.onComplete(this.total);
            },this.option.adTime-(endTime-startTime));  
          }else{
             _this.option.onComplete(this.total);
          }       
        }
      }
    }

    window.resLoader = resLoader;
    module.exports = resLoader;

})(window);



