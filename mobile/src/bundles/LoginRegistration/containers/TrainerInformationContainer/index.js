import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrainerInformation from '@LoginRegistration/components/TrainerInformation'
import { updateTrainer } from '@store/modules/auth/actions'

type Props = {
  onFinishClick: Function,
  activities: Array,
  baseTrainerInfo: Object,
  currentUser: Object,
}


class TrainerInformationContainer extends Component {

  props: Props

  render() {
    return (
      <TrainerInformation currentUser={this.props.currentUser} onFinishClick={this.props.onFinishClick} activities={this.props.activities} baseTrainerInfo={this.props.baseTrainerInfo}  />
    )
  }

}


const mapStateToProps = (state) => {
  return {
    activities: state.auth.appSettings.activities,
    baseTrainerInfo: state.auth.trainerInfo,
    currentUser: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFinishClick: (trainer) => {
      dispatch(updateTrainer(trainer))
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TrainerInformationContainer)
