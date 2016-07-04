var React = require('react'),
    ReactDom = require('react-dom'),
    Loading = require('./modules/loading.js');

import Main from "./modules/main.js"

var App = React.createClass({

  onCompleteLoad:function(){
    console.log("loadComplete");
  },
  render:function(){
    return(
      <div className="wrap">
        <Loading onComplete={this.onCompleteLoad} ref="loading"/>     
        <Main />
      </div>
    )
  },
  onComplete(){
    console.log("ok");
  },
  componentDidMount(){
  }
});
ReactDom.render(<App />,document.getElementById('all'));




