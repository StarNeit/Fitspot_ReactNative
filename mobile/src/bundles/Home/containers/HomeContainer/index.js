import React, { Component } from 'react'
import Home from '@Home/components/Home'
import { connect } from 'react-redux'
import { setBookingType } from '@store/modules/booking/actions'
import { fetchPlans } from '@store/modules/plans/actions'
import {Actions, ActionConst} from 'react-native-router-flux'

type Props = {
  userType: int,
  setBookingType: Function,
  getPlanItems: Function,
  workoutInfo: Object,
  activities: Array,
  userAvatar: Object,
  chatSessions: Array,
  user: Object,
  loggedIn: boolean,
  unratedSessions: Array,
  plans: Array,
  appSettings: boolean,
}


class HomeContainer extends Component {

  props: Props

  constructor(props){
    super(props)
    this.state = {
      unratedSessions: props.unratedSessions,
      user: props.user,
      plans: props.plans
    }
  }


  componentWillMount() {

    if(this.state.user.userType == 2 && !this.state.user.userProfileReady){
      Actions.trainerAboutYou();
    }
    if(this.props.plans.length == 0){
      this.props.getPlanItems();
    }

  }

  componentDidMount(){
    if(!this.props.appAvailable){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'App not available in your area',
        detailsText: 'Fitspot isn\'t available in your area yet, but you can still look around the app and go through the process, you just wont be able to book.\n\n  If you\'re interested in Fitspot coming to your area, email us at info@fitspotapp.com',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
        showLinkButton: true,
        linkButtonText: 'Email Fitspot',
        linkButtonAction: 'mailto:info@fitspotapp.com?subject=App Availability',
      }
      )
    }
  }


  render() {
    return (
      <Home { ...this.props} />
    )
  }

  componentWillReceiveProps(nextProps){

    // if(nextProps.userType == 2 && !nextProps.user.userProfileReady){
    //   Actions.trainerAboutYou();
    // }
    if(nextProps.unratedSessions.length !== this.state.unratedSessions.length){
      this.setState({unratedSessions: nextProps.unratedSessions})
      Actions.ratingModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        workoutSession: nextProps.unratedSessions[0],
      }
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    userType: state.auth.user.userType,
    workoutInfo: state.workouts,
    activities: state.auth.appSettings.activities,
    userAvatar: state.auth.user.avatar,
    chatSessions: state.chat.sessionList,
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
    unratedSessions: state.workouts.unratedSessions,
    plans: state.plans.planItems,
    appAvailable: state.auth.appAvailable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBookingType: (type) => {
      dispatch(setBookingType(type))
    },
    getPlanItems: () => {
      dispatch(fetchPlans())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer)
