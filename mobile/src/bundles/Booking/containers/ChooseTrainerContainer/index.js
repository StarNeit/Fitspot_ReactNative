import React, {Component} from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import ChooseTrainer from '@Booking/components/ChooseTrainer'
import ApiUtils from '@utils/ApiUtils'
import { selectTrainer, getTrainerAvailability } from '@store/modules/booking/actions'
import { getLocationPermission } from '@store/modules/auth/actions'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'
import CONSTS from '@utils/Consts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  activities: Array,
  bookingState: Object,
  selectTrainer: Function,
  locationPermission: boolean,
  getLocationPermission: Function,
  requestingLocationPermission: boolean,
  workoutInfo: Object,
  getTrainerAvailability: Function
}

class ChooseTrainerContainer extends Component {

  props : Props

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      radius: 10,
      trainers: [],
      locationPermission: props.locationPermission,
      requestingLocationPermission: props.requestingLocationPermission,
    }

  }

  refreshLocation(){
    // 'lat' : parse.Float(required = True, nullable = False),
    // 'lon' : parse.Float(required = True, nullable = False),
    // 'radius' : parse.Float(required = True, nullable = False, validators = [validate_radius])
    navigator.geolocation.getCurrentPosition((position) => {

      var initialPosition = JSON.stringify(position);
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude

      var searchObj = {lat: latitude, lon: longitude, radius: 20}
      // var searchObj = {lat: 33.8101512, lon: -84.4225184, radius: 20}
      this.setState(searchObj);


      var bookingState = this.props.bookingState
      if(bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY){
        var chosenDate = moment(bookingState.chosenDate).utc().format()
        var string = 'availability/search?lat=' + bookingState.chosenLocation.lat +'&lon=' + bookingState.chosenLocation.lon
        + '&radius=' + searchObj.radius + '&activity_id='+ bookingState.chosenActivity.id + '&datetime=' + chosenDate
        ApiUtils.get(string).then(([response, jsonBody]) => {
          // do stuff with both.
          if (response.status == 200 && jsonBody.length > 0) {
            var arrayvar = this.state.trainers.slice()
            arrayvar.push(jsonBody[0])
            this.setState( {trainers: arrayvar});
          } else {

            Actions.mainAppModal(
            {
              uniqId: new Date().getTime(),
              visible: true,
              headerText: 'No Trainers',
              detailsText: 'There are no trainers available around you right now. If fitspot choose is available, please use that option.',
              showSubDetails: false,
              onOkay: null,
              okayButtonText: 'OK',
              showCancelButton: false,
            }
            )
          }

        }).catch(err => {
          console.log('Error: ', err);
        })
      }else{
        var string = 'trainers/list?lat=' + searchObj.lat +'&lon=' + searchObj.lon + '&radius=' + searchObj.radius
        ApiUtils.get(string).then(([response, jsonBody]) => {
          // do stuff with both.
          if (response.status == 200 && jsonBody.length > 0) {
            var arrayvar = this.state.trainers.slice()
            arrayvar.push(jsonBody[0])
            this.setState( {trainers: arrayvar});
          } else {

            Actions.mainAppModal(
            {
              uniqId: new Date().getTime(),
              visible: true,
              headerText: 'No Trainers',
              detailsText: 'There are no trainers available around you right now. If fitspot choose is available, please use that option.',
              showSubDetails: false,
              onOkay: null,
              okayButtonText: 'OK',
              showCancelButton: false,
            }
            )
          }

        }).catch(err => {
          console.log('Error: ', err);
        })
      }



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

  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission != this.state.locationPermission){
      this.refreshLocation();
    }
  }

  componentDidMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton})
    if(this.props.locationPermission){
      this.refreshLocation();
    }else{
      this.props.getLocationPermission();
    }
  }
  renderRightButton = () => {
    return (
      <TouchableOpacity onPress={ () => {console.log('Button pressed')} }>
          <Icon name="search" size={15} color={DEFAULT_GREEN_COLOR}/>
      </TouchableOpacity>
    )
  }

  render() {
    return (<ChooseTrainer trainers={this.state.trainers} { ...this.props }/>)
  }

}
const mapStateToProps = (state) => {
  return {
    activities: state.auth.appSettings.activities,
    bookingState: state.booking,
    requestingLocationPermission: state.auth.requestingLocationPermission,
    locationPermission: state.auth.locationPermission,
    workoutInfo: state.auth.user.workoutInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectTrainer: (trainer) => {
      dispatch(selectTrainer(trainer))
    },
    getLocationPermission: () => {
      dispatch(getLocationPermission());
    },
    getTrainerAvailability: (trainer) => {
      dispatch(getTrainerAvailability(trainer));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseTrainerContainer)
