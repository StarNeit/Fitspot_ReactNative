import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookingTrainerConfirmation from '@Booking/components/TrainerConfirmation'
import { selectActivity, beginEditingBooking } from '@store/modules/booking/actions'
import { trainerConfirmWorkoutRequest,requestWorkoutChange, cancelWorkout } from '@store/modules/workouts/actions'
import {Actions} from 'react-native-router-flux'
import CONSTS from '@utils/Consts'
import ApiUtils from '@utils/ApiUtils'

type Props = {
  bookingState: Object,
  workoutInfo: Object,
  isAdding: Boolean,
  error: String,
  trainerConfirmWorkoutRequest: Function,
  workoutItem: Object,
  activities: Array,
  chatSessions: Array,
  confirmingStatus: Integer,
  requestWorkoutChange: Function,
  cancelWorkout: Function,
  userType: Integer,
}


class BookingTrainerConfirmationContainer extends Component {

  props: Props

  constructor(props) {
    super(props);

    this.state = {
      bookingState: props.bookingState,
      isAdding: props.isAdding,
      error: props.error,
      confirmingStatus : props.confirmingStatus,
      chatSessions: props.chatSessions,
      userType:props.userType,
    }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.confirmingStatus === CONSTS.API_CALL_STATUS.UPDATED){
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Appointment Updated',
          detailsText: 'We have sent the trainer a request of your change.',
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
        Actions.pop()
      }
      if(nextProps.confirmingStatus === CONSTS.API_CALL_STATUS.DELETED){
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Appointment Cancelled',
          detailsText: 'We have notified the trainer of your cancellation.',
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
        Actions.pop()
      }
  }

  render() {
    return (
      <BookingTrainerConfirmation   cancelWorkout={this.props.cancelWorkout} requestWorkoutChange={this.props.requestWorkoutChange} activities={this.props.activities} workoutItem={this.props.workoutItem} { ...this.state } confirmWorkout={this.props.trainerConfirmWorkoutRequest} updateNewPrice={(numberOfFriends) => this.getNewPrice(numberOfFriends)} requestNewWorkout={ (numberOfFriends) => this.requestNewWorkout(numberOfFriends)}  />
    )
  }


  requestNewWorkout(numberOfFriends){
    this.props.addWorkout(payload)
  }
}


const mapStateToProps = (state) => {
  return {
    activities: state.auth.appSettings.activities,
    confirmingStatus : state.workouts.confirmingStatus,
    chatSessions: state.chat.sessionList,
    userType: state.auth.user.userType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trainerConfirmWorkoutRequest: (workoutId) => {
      dispatch(trainerConfirmWorkoutRequest(workoutId))
    },
    requestWorkoutChange: (workoutId,date) => {
      dispatch(requestWorkoutChange(workoutId,date))
    },
    cancelWorkout: (workoutId) => {
      dispatch(cancelWorkout(workoutId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingTrainerConfirmationContainer)
