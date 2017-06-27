import React, { Component, PropTypes } from 'react';


class GymInfoCard extends Component {
    constructor(props, context) {
      super(props, context);
      console.log(props);
    }

    render() {
        return (
          <div className="book-location-profile text-center">
            <p className="location-miles-count">6 Miles</p>
            <div className="rating-stars">
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star-empty" aria-hidden="true"></i>
            </div>
            <div id={"carousel-example-generic-" + this.props.id} className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target={"#carousel-example-generic-" + this.props.id} data-slide-to="0" className="active"></li>
                <li data-target={"#carousel-example-generic-" + this.props.id} data-slide-to="1"></li>
                <li data-target={"#carousel-example-generic-" + this.props.id} data-slide-to="2"></li>
              </ol>
            <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <img src={require('../../assets/location-placeholder-1.jpg')} alt="Location Description"/>
                </div>
                <div className="item">
                  <img src={require('../../assets/location-placeholder-2.jpg')} alt="Location Description"/>
                </div>
                <div className="item">
                  <img src={require('../../assets/location-placeholder-3.jpg')} alt="Location Description"/>
                </div>
              </div>
              <a className="left carousel-control" href={"#carousel-example-generic-" + this.props.id} role="button" data-slide="prev">
                <span className="fa fa-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href={"#carousel-example-generic-" + this.props.id} role="button" data-slide="next">
                <span className="fa fa-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <h3>{this.props.name}</h3>
            <p className="location-details">{this.props.address}</p>
            <p className="location-details">{this.props.city}</p>
              <p className="action-delete">
                <a href="#"><i className="fa fa-trash" aria-hidden="true"></i></a>
              </p>
          </div>

        );
    }
}

GymInfoCard.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default GymInfoCard;
