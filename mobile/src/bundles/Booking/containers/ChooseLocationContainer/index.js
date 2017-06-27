import React, { Component } from 'react'
import { TouchableOpacity ,Text, Image, PermissionsAndroid} from 'react-native'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'
import ChooseLocation from '@Booking/components/ChooseLocation'
import { getLocationPermission } from '@store/modules/auth/actions'
import { selectLocation } from '@store/modules/booking/actions'
import ApiUtils from '@utils/ApiUtils'
import Geocoder from 'react-native-geocoder';

type Props = {
  bookingState: Object,
  selectLocation: Function,
  locationPermission: boolean,
  getLocationPermission: Function,
  workoutInfo: Object,
}


class ChooseLocationContainer extends Component {

  showListView = true

  constructor(props) {
    super(props);
    this.state = {
      showLocationListView : true,
      showLocationDetails : false,
      locations: [],
      locationPermission: props.locationPermission,
      currentLocation: {}
    }

  }

  addLocation(location){
    var newArray = this.state.locations.slice()
    newArray.unshift(location)
    this.setState({locations:newArray})
  }

  refreshLocation() {

    navigator.geolocation.getCurrentPosition((position) => {

      var initialPosition = JSON.stringify(position);
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude
      var currentLocation = {lat: latitude, lon:longitude, radius: 10}
      // var currentLocation = {lat: 33.8101512, lon: -84.4225184, radius: 10}
      this.setState({currentLocation: currentLocation});

      var string = 'gyms/list?lat=' + currentLocation.lat +'&lon=' + currentLocation.lon + '&radius=' + currentLocation.radius
      ApiUtils.get(string).then(([response, jsonBody]) => {
        // do stuff with both.
        if (response.status == 200) {

          Geocoder.geocodePosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }).then(res => {
              // res is an Array of geocoding object (see below)
              var response = res[0];
              var currentLoc = {
                address: response.streetNumber + ' ' + response.streetName,
                city:response.locality,
                cost:0,
                description:"",
                id:-1,
                lat:response.position.lat,
                lon:response.position.lng,
                name:"Current Location",
                rating_avg:0,
                state:response.adminArea,
                zipcode:response.postalCode
              }
              jsonBody.unshift(currentLoc)
              this.setState( {locations: jsonBody});

          })
          .catch(err => console.log(err))

          //
        } else {

          Actions.mainAppModal(
          {
            uniqId: new Date().getTime(),
            visible: true,
            headerText: 'Gelocation Error',
            detailsText: 'Error Loading Gyms, please close the app and try again.',
            onOkay:null,
            okayButtonText: 'OK',
            showCancelButton: false,
          }
          )
        }

      }).catch(err => {
        console.log('Error: ', err);
      })

    }, (error) => {
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Geolocation Error',
        detailsText: JSON.stringify(error),
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
    }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 1000
    });
  }

  toggleListView(){
    this.setState({
      showLocationListView: !this.state.showLocationListView
    })
    this.showListView = !this.showListView
    Actions.refresh({ renderRightButton: this.renderRightButton})
  }


  componentDidMount() {

    Actions.refresh({ renderRightButton: this.renderRightButton})
    if(this.props.locationPermission){
      this.refreshLocation();
    }else{
      this.props.getLocationPermission();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission){
      this.setState({locationPermission: nextProps.locationPermission});
      this.refreshLocation();
    }
  }

  renderRightButton = () => {
    var imgLocation;

    if(this.showListView){
      imgLocation = require('@Booking/assets/choose-location-map-icon.png');
    }else{
      imgLocation = require('@Booking/assets/choose-location-list-icon.png');
    }

    return (
      <TouchableOpacity onPress={ () => this.toggleListView() }>
          <Image source={imgLocation}/>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <ChooseLocation currentLocation={this.state.currentLocation} showListView={this.state.showLocationListView} {...this.props} locationItems={ this.state.locations } locationPermission={ this.state.locationPermission } addLocation={this.addLocation.bind(this)} />
    )
  }

}

const setToggleVisible = (showingListView) => {
  //TODO: Need to update the icon here I believe.
  return showingListView
}

const mapStateToProps = (state) => (
  {
  showLocationListView: setToggleVisible(state.chooseLocationListView),
  counter: state.counter,
  bookingState : state.booking,
  locationPermission : state.auth.locationPermission,
  workoutInfo: state.auth.user.workoutInfo,
})

const mapDispatchToProps = (dispatch) => {
  return {
    selectLocation: (location) => {
      dispatch(selectLocation(location))
    },
    getLocationPermission: () => {
      dispatch(getLocationPermission());
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChooseLocationContainer)
