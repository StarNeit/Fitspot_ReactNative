import React, { Component } from 'react'
import WorkoutSessions from '@Calendar/components/WorkoutSessions'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { createAvailability, deleteAvailability } from '@store/modules/availability/actions'
import { refreshUser } from '@store/modules/auth/actions'
import { selectTrainer,selectActivity,selectDateTime,selectLocation } from '@store/modules/booking/actions'
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

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


class WorkoutSessionsSceneContainer extends Component {

  props: Props

  constructor(props){
    super(props)
  }
  componentDidMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton})
  }

  shouldComponentUpdate (){
    return false;
  }

  goToCalendarScene() {
    Actions.calendarScene();
  }
  renderRightButton = () => {
    var imgLocation;

    if(this.showListView){
      imgLocation = require('@Booking/assets/choose-location-map-icon.png');
    }else{
      imgLocation = require('@Booking/assets/choose-location-list-icon.png');
    }

    return (
      <TouchableOpacity onPress={ this.goToCalendarScene }>
          <Icon key={0} name="calendar" size={20} color={DEFAULT_GREEN_COLOR}/>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <WorkoutSessions {...this.props}/>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionItems: state.workouts.workoutItems,
    chatSessions: state.chat.sessionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkoutSessionsSceneContainer)
