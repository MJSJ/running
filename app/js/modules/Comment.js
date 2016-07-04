
let React = require('react');

module.exports = React.createClass({
 
  render(){
    return (
      <div className="comment">
      	<h3 className="author">{this.props.author}</h3>
        <p className="comment_p">{this.props.comment}</p>
      </div>
    )
  }
});