import React, { Component } from 'react'
import CalendarView from '@Calendar/components/Calendar'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'
import { createAvailability, deleteAvailability } from '@store/modules/availability/actions'
import { refreshUser } from '@store/modules/auth/actions'
import { selectTrainer,selectActivity,selectDateTime,selectLocation } from '@store/modules/booking/actions'

type Props = {
  user: Object,
  isLoggedIn: boolean,
  onCreateAvailabilityPress : Function,
  onDeleteAvailabilityPress : Function,
  onEditAvailabilityPress : Function,
  availableItems: Array,
  createStatus: Object,
  deleteStatus: Object,
  errorMessage: String,
  sessionItems: Array,
  activities: Array,
  refreshUser: Function,
  editEvent: Function,
  chatSessions: Array,
}


class CalendarContainer extends Component {

  props: Props

  constructor(props){
    super(props)
  }

  render() {
    return (
      <CalendarView {...this.props}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    isLoggedIn: (state.auth.loggedIn == null) ? false : state.auth.loggedIn,
    availableItems: state.availabilities.items,
    createStatus: state.availabilities.createStatus,
    deleteStatus: state.availabilities.deleteStatus,
    errorMessage: state.availabilities.errorMessage,
    sessionItems: state.workouts.workoutItems,
    activities: state.auth.appSettings.activities,
    chatSessions: state.chat.sessionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAvailabilityPress : (availability) => {
      dispatch(createAvailability(availability))
    },
    onDeleteAvailabilityPress : (availabilityId) => {
      dispatch(deleteAvailability(availabilityId))
    },
    refreshUser: () => {
      dispatch(refreshUser())
    },
    editEvent: (eventInfo, activity) => {
      dispatch(selectTrainer(eventInfo.trainer))
      dispatch(selectActivity(activity))
      dispatch(selectDateTime(eventInfo.dtStart))
      dispatch(selectLocation(eventInfo.gym))
      Actions.bookingConfirmationCalendar({})
    },
    onUpdateClick: (user) => {
      dispatch(updateCustomer(user))
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CalendarContainer)
