var React = require('react');
var Page1 = require("./page1.js");
var Page3 = require("./CommentBox.js");

var Swiper = require("swiper");
var Pagination = require("./Pagination.js");
import Page2 from './page2.js';
import Page4 from './Scroll.js';
import LastPage from "./ShareComponent.js";


var App = React.createClass({
  render:function(){
    return(
      <div className="main">
       <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide"><Page1 ref="page0" autoplay={true} /></div>
            <div className="swiper-slide"><Page2 ref="page1"/></div>
            <div className="swiper-slide"><Page3 ref="page2"/></div>
            <div className="swiper-slide"><LastPage ref="page3"/></div>
            <div className="swiper-slide"><Page4 ref="page4"/></div>
          </div>
       </div>
      </div>
    )
  },
  onComplete(){
    console.log("ok");
  },
  componentDidMount(){
    var _this =this;
    var mySwiper = new Swiper('.swiper-container', {
     direction : 'vertical',
     onSlideChangeEnd:function(swiper){
      _this.refs["page"+swiper.activeIndex].setState({
        isActive:true
      });

      _this.refs["page"+swiper.previousIndex].setState({
        isActive:false
      });
     }
    })
  }
});
export {App as default}




