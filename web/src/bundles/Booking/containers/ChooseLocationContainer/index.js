import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseLocation from '@Booking/components/ChooseLocation';
import { getLocationPermission } from '@store/modules/auth/actions';
import { selectLocation } from '@store/modules/booking/actions';
import ApiUtils from '@utils/ApiUtils';
import * as Actions from '@shared/actions';
import { fetchGyms } from '@store/modules/booking/actions';
import CONSTS from '@utils/Consts'

type Props = {
  bookingState: Object,
  selectLocation: Function,
  getGyms: Function,
  locationPermission: boolean,
  getLocationPermission: Function,

}


class ChooseLocationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationPermission: props.locationPermission,
      currentLocation: {}
    };

  }

  refreshLocation() {
    // console.log("refreshLocation");
    // navigator.geolocation.getCurrentPosition((position) => {
    //   var latitude = position.coords.latitude;
    //   var longitude = position.coords.longitude;
    //   //TODO: uncomment below line to remove hard-coded lat/lon
    //   // var currentLocation = {lat: latitude, lon: longitude, radius: 10};
    //   //SFO lat/lon
    //   //var currentLocation = {lat : 37.5659448, lon:-122.01160010000001, radius: 10}
    //   //ATL lat/lon
      var currentLocation = {lat: 33.8101512, lon: -84.4225184, radius: 10}
      this.setState({currentLocation: currentLocation});
      this.props.getGyms(33.8101512,-84.4225184,10);

    // }, (error) => {console.log(error); alert(JSON.stringify(error))}, {
    //   enableHighAccuracy: true,
    //   timeout: 20000,
    //   maximumAge: 1000
    // });
  }


  componentDidMount() {

    if(this.props.locationPermission){
      this.refreshLocation();
    } else {
      this.props.getLocationPermission();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission){
      this.setState({locationPermission: nextProps.locationPermission});
      if(!this.state.currentLocation.lat)
        this.refreshLocation();
    }
  }

  chooseLocation(location){
    this.props.selectLocation(location);
    if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_TRAINER) {
      Actions.reviewWorkout();
    } else if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY) {
      Actions.chooseTrainer();
    }

  }

  render() {
    return (
      <ChooseLocation
        {...this.props}
        currentLocation={this.state.currentLocation}
        locationPermission={ this.state.locationPermission }
        onChooseLocation={this.chooseLocation.bind(this)}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    bookingState : state.booking,
    locationPermission : state.auth.locationPermission,
    gyms: state.booking.gyms,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectLocation: (location) => {
      dispatch(selectLocation(location))
    },
    getLocationPermission: () => {
      dispatch(getLocationPermission());
    },
    getGyms: (lat, lon, radius) => {
      dispatch(fetchGyms(lat, lon, radius));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChooseLocationContainer)
