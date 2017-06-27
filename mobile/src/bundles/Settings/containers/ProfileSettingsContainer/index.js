import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileSettings from '@Settings/components/ProfileSettings'
import { logout } from '@store/modules/auth/actions'
import { availabilityResetState } from '@store/modules/availability/actions'
import { chatResetState } from '@store/modules/chat/actions'
import { Actions } from 'react-native-router-flux'



type Props = {
  logoutClick: Function,
  user: Object,
  brainTreeToken: String,
  workoutInfo: Object,
}


class ProfileSettingsContainer extends Component {

  props: Props

  constructor(props){
    super(props);
    this.state = {
      payoutItems: props.workoutInfo.paymentHistory.workouts == null ? [] : props.workoutInfo.paymentHistory.workouts,
    }
  }

  render() {
    return (
      <ProfileSettings { ...this.props }  payoutItems={this.state.payoutItems}  />
    )
  }


}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    brainTreeToken: state.auth.appSettings.braintreeClientToken,
    workoutInfo : state.workouts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutClick: () => {
      dispatch(chatResetState())
      dispatch(availabilityResetState())
      dispatch(logout())
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ProfileSettingsContainer)
