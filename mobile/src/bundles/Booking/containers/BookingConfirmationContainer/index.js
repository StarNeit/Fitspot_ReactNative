import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookingConfirmation from '@Booking/components/Confirmation'
import { selectActivity, beginEditingBooking,addBookingNonce } from '@store/modules/booking/actions'
import { addWorkout } from '@store/modules/workouts/actions'
import {Actions} from 'react-native-router-flux'
import CONSTS from '@utils/Consts'
import moment from 'moment'
import ApiUtils from '@utils/ApiUtils'
import { receivedWorkoutCount,updatePaymentTitle } from '@store/modules/auth/actions'


type Props = {
  bookingState: Object,
  workoutInfo: Object,
  isAdding: Boolean,
  error: String,
  beginEditingBooking: Function,
  appSettings: Object,
  lastPaymentString: String,
  selectedPlan: Function,
  addBookingNonce: Function,
  updatePayTitle:Function,
  appAvailable: Boolean,
}


class BookingConfirmationContainer extends Component {

  props: Props

  constructor(props) {
    super(props);

    this.props.bookingState.customerPrice = 0
    this.state = {
      bookingState: this.props.bookingState,
      isAdding: this.props.isAdding,
      error: this.props.error,
      appSettings: props.appSettings,
      lastPaymentString: props.lastPaymentString,
      lat: 0.0,
      lon: 0.0,
      appAvailable: props.appAvailable,
    }
  }
  componentWillReceiveProps(nextProps){

    if(nextProps.error.length > 0 ){
      this.setState({error: nextProps.error})
    }
    if(nextProps.bookingState != null){
      this.setState({bookingState: nextProps.bookingState})
    }
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({lat:position.coords.latitude, lon: position.coords.longitude})
    })
  }

  render() {
    return (
      <View>
        <Text>adsfadfadfafasdfa</Text>
      </View>
    )
  }

  getNewPrice(numberOfFriends){
    const {bookingState} = this.props
// workouts/estimate-price?lat=33.7806479&lon=-84.3861051&radius=50&dt=Wed%20Mar%2015%202017%2016%3A44%3A00%20GMT%2B0000&gym_id=1&numFriends=0
    var payload = {
      lat: this.state.lat,
      lon: this.state.lon,
      radius: 50,
      dt: moment(bookingState.chosenDate).utc(),
      gym_id: bookingState.chosenLocation.id,
      numFriends: numberOfFriends
    }

    var string = 'workouts/estimate-price?' + ApiUtils.parseJsonAsQueryString(payload)
    ApiUtils.get(string).then(([response, jsonBody]) => {
      // do stuff with both.
      if (response.status == 200) {
        var bookingState = this.state.bookingState
        bookingState.customerPrice = jsonBody.customerPays
        this.setState({bookingState: bookingState})
      } else {
        var bookingState = this.state.bookingState
        bookingState.customerPrice = 0
        this.setState({bookingState: bookingState})
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Price Estimate Error',
          detailsText: jsonBody.message,
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }

  requestNewWorkout(numberOfFriends,promocode){

    const {bookingState} = this.props

    var payload = {
      lat: bookingState.chosenLocation.lat,
      lon: bookingState.chosenLocation.lon,
      radius: 50,
      date: bookingState.chosenDate,

      numFriends: numberOfFriends,
      activityId: bookingState.chosenActivity.id,
      shouldUsePurchasedPlan: bookingState.isSinglePurchase ? false : true,
      address: bookingState.chosenLocation.address,
      city: bookingState.chosenLocation.city,
      state: bookingState.chosenLocation.state,
      zipcode: bookingState.chosenLocation.zipcode,
      promocode: promocode,
      /*#TODO: address field, etc
      #braintree info
      'payment_token': ('paymentToken', parse.String()),
      'payment_nonce': ('paymentNonce', parse.String()),
      'customer_id': ('customerId', parse.String()) */
    }

    if(bookingState.isSinglePurchase){
      payload['paymentNonce'] = bookingState.singlePayNonce
    }

    if(bookingState.chosenTrainer.id != null){
      payload['trainerId'] = bookingState.chosenTrainer.id
    }
    if(bookingState.chosenLocation.id > 0){
      payload['gymId'] = bookingState.chosenLocation.id
    }

    this.props.addWorkout(payload)
  }
}


const mapStateToProps = (state) => {

  return {
    bookingState: state.booking,
    workoutInfo: state.auth.user.workoutInfo,
    isAdding: state.workouts.isAdding,
    error: state.workouts.error,
    appSettings: state.auth.appSettings,
    lastPaymentString: state.auth.user.lastPaymentString,
    appAvailable: state.auth.appAvailable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectActivity: (activity) => {
      dispatch(selectActivity(activity))
    },
    addWorkout: (payload) => {
      dispatch(addWorkout(payload))
    },
    beginEditingBooking: () => {
      dispatch(beginEditingBooking())
    },
    selectedPlan: (plan) => {
      dispatch(receivedWorkoutCount(plan))
    },
    addBookingNonce: (nonce) => {
      dispatch(addBookingNonce(nonce))
    },
    updatePayTitle: (title) => {
      dispatch(updatePaymentTitle(title))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingConfirmationContainer)
