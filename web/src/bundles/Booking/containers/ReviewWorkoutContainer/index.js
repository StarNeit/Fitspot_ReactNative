import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReviewWorkout from '@Booking/components/ReviewWorkout'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { addWorkout } from '@store/modules/workouts/actions'

type Props = {
  bookingState: Object,
  workout: Object,
  error: String,
  lastPaymentString:String,
  workoutInfo: Object,
}

class ReviewWorkoutContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      error: this.props.error,
      promocode: '',
      isEditing: false,
      paymentToken: [],
      paymentString: props.lastPaymentString,
    }
    this.requestNewWorkout = this.requestNewWorkout.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.error.length > 0){
      //TODO: Better - use modal for error
      alert(nextProps.error);
    } else {
      var retString = 'We’ve sent the workout details to '+ this.props.bookingState.chosenTrainer.firstName + ', and we’re waiting for confirmation. We’ll notify you when they do.'
      if(this.props.bookingState.chosenTrainer.firstName == null){
        retString = "We're finding the best trainer for you. We will notify you when they reply."
      }
      var workoutInfo = this.props.workoutInfo;
      var subDetailsText= ''
      if(this.props.bookingState.isSinglePurchase){
        subDetailsText = 'Thank you for your purchase!'
      }else if(!workoutInfo.isActive){ //not active but has some left over.
        if((workoutInfo.numWorkoutsLeft - 1 == 0)){
          subDetailsText = 'No workouts left, thank you for using Fitspot.'
        }else{
        subDetailsText = (workoutInfo.numWorkoutsLeft - 1) + ' workouts left before your subscription is over.'
        }
      }else{
        subDetailsText = (workoutInfo.numWorkoutsLeft - 1) + ' out of ' + workoutInfo.plan.numWorkouts + ' pre-paid workouts remaining.'
      }
      alert(retString + "\n\n" + subDetailsText);
      Actions.home();
    }
  }
  requestNewWorkout(numberOfFriends,promocode){

    const {bookingState} = this.props
    this.refs.review.refs.braintree.tokenize().then((data) => {
      console.log('BT Data: ', data);
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
        promocode: undefined,
        paymentNonce: data.nonce,
      }

      if(bookingState.chosenTrainer.id != null){
        payload['trainerId'] = bookingState.chosenTrainer.id
      }
      if(bookingState.chosenLocation.id > 0){
        payload['gymId'] = bookingState.chosenLocation.id
      }

      this.props.addWorkout(payload)

    });

  }
  render() {
    return (<ReviewWorkout ref="review"
              {...this.props} requestNewWorkout= {this.requestNewWorkout}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    bookingState: state.booking,
    appSettings: state.auth.appSettings,
    error : state.workouts.error,
    workoutItems: state.workouts.workoutItems,
    workoutInfo: state.auth.user.workoutInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addWorkout: (payload) => {
      dispatch(addWorkout(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewWorkoutContainer)
