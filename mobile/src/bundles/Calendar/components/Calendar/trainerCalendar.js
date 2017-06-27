// TrainerCalendar.js
import React from 'react';
import { requireNativeComponent } from 'react-native';

class TrainerCalendar extends React.Component {
  render() {
    {/*return <RCTCalendar {...this.props} />*/}
  }
}

TrainerCalendar.propTypes = {
  /**
   * The region to be displayed by the map.
   *
   * The region is defined by the center coordinates and the span of
   * coordinates to display.
   */
  availabilityItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    /**
     * Distance between the minimum and the maximum latitude/longitude
     * to be displayed.
     */
    id: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    address: React.PropTypes.string.isRequired,
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
    zipcode: React.PropTypes.string.isRequired,
    dateStart: React.PropTypes.string.isRequired,
    dateEnd: React.PropTypes.string.isRequired,
    radius: React.PropTypes.number.isRequired,
  })),
  appointmentItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    /**
     * Distance between the minimum and the maximum latitude/longitude
     * to be displayed.
     */
    id: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    address: React.PropTypes.string.isRequired,
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
    zipcode: React.PropTypes.string.isRequired,
    dateStart: React.PropTypes.string.isRequired,
    dateEnd: React.PropTypes.string.isRequired,
    radius: React.PropTypes.number.isRequired,
  })),

};

// var RCTCalendar = requireNativeComponent('TrainerCalendar', TrainerCalendar);

module.exports = TrainerCalendar;
