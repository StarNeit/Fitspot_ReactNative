import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  ListView,
  Dimensions
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'
import ChooseLocationListView from './listView'
import ChooseLocationMapView from './mapView'
import LocationDetail from '../LocationDetail'
import NavigationSteps from '@components/NavigationSteps'
import CONSTS from '@utils/Consts'

import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
  showListView: boolean,
  showLocationDetails: boolean,
  locationItems: Object,
  bookingState: Object,
  selectLocation: Function,
  locationPermission: bool,
  currentLocation: Object,
  currentItem: 0,
  addLocation: Function,
}

class ChooseLocation extends React.Component {


  constructor(props) {
    super(props);
    this.props.showLocationDetails = false;
    this.state = {
      currentStep: this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY ? 3 : 4,
      totalSteps: 4,
      locationPermission: props.locationPermission,
      showLocationDetails : props.showLocationDetails,
    }
  }

  chooseLocation(location){
    var chosenIndex = 0
    for (var i = 0; i < this.props.locationItems.length; i++) {
      if(this.props.locationItems[i].id == location.id)
      {
        chosenIndex = i
      }
    }
    this.setState({currentItem:chosenIndex})
    this.setState({showLocationDetails: true})

  }

  confirmLocation(location){
    this.props.selectLocation(location)
    if(this.props.bookingState.isEditing){
      Actions.pop()
    }else{
      if(this.props.bookingState.bookingType === CONSTS.BOOKING_TYPE.BY_TRAINER){
        //booking confirmation
        //TODO: check for payment.
        if((this.props.workoutInfo == null ||
          (this.props.workoutInfo.numWorkoutsLeft == 0 &&
          !this.props.workoutInfo.isActive) ||
          this.props.workoutInfo.numWorkoutsLeft == 0
          ) &&
          (!this.props.bookingState.isSinglePurchase)
        ){
          Actions.bookingSubscriptionOptions()
        }else{
          Actions.bookingConfirmation()
        }

      }else{
        Actions.chooseTrainer()
      }
    }
  }

  dismissDetails(){
    this.setState({showLocationDetails : false})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission){
      this.setState({locationPermission: nextProps.locationPermission});
    }
  }

  render() {
    const { showListView, locationItems, locationPermission } = this.props
    return (
      <View style={styles.container}>
      <NavigationSteps currentNumber={this.state.currentStep} style={{opacity: this.props.bookingState.isEditing ? 0 : 1}} numberOfSteps={this.state.totalSteps}  />
        <ChooseLocationListView visible={showListView} locationItems={ locationItems } chooseLocation={this.chooseLocation.bind(this)}   />
        <ChooseLocationMapView addLocation={this.props.addLocation} visible={!showListView} locationItems={ locationItems } chooseLocation={this.chooseLocation.bind(this)} locationPermission={locationPermission} />
        <LocationDetail confirmLocation={this.confirmLocation.bind(this)} currentItem={this.state.currentItem} dismissDetails={() => this.dismissDetails()} visible={this.state.showLocationDetails} locationItems={ locationItems } currentLocation={this.props.currentLocation} />
      </View>
    )
  }
}

export default ChooseLocation
