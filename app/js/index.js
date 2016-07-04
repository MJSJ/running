var React = require('react'),
    ReactDom = require('react-dom');

import Main from "./modules/main.js"

var App = React.createClass({

  onCompleteLoad:function(){
    console.log("loadComplete");
  },
  render:function(){
    return(
      <div className="wrap">
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




