import React from 'react';
import moment from 'moment'

class AddFriends extends React.Component {

  render() {
    return(
      <div className="container">
      	<div className="row">
              <div className="col-xs-12">
              	<div className="text-center">
                  	<h2 className="fw500">Add Friends</h2>
                  </div>
              </div>
          </div>
      	<div className="row book-now">
              <div className="col-xs-12 col-sm-6 col-md-2 col-md-offset-3">
              	<a href="#">
              	<div className="book-now-activity text-center" onClick={this.props.onSelectFriends.bind(this,1)}>
                  	<h3>+1</h3>
                  	<p>+$15</p>
                  </div>
                  </a>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-2" onClick={this.props.onSelectFriends.bind(this,2)}>
              	<a href="#">
              	<div className="book-now-activity text-center">
                  	<h3>+2</h3>
                  	<p>+$30</p>
                  </div>
                  </a>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-2" >
              	<a href="#">
              	<div className="book-now-activity text-center" onClick={this.props.onSelectFriends.bind(this, 0)}>
                  	<h3>Just Me</h3>
                    <p>-</p>
                  </div>
                  </a>
              </div>
          </div>
      </div>
    )
  }

}

export default AddFriends;
