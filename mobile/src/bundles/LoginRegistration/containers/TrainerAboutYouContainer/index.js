import React, { Component } from 'react'
import TrainerAboutYou from '@LoginRegistration/components/TrainerAboutYou'
import { connect } from 'react-redux'
import { updateTrainerAboutYou } from '@store/modules/auth/actions'

type Props = {
  onNextStepPress: Function
}


class TrainerAboutYouContainer extends Component {

  props: Props

  render() {
    return (
      <TrainerAboutYou onNextStepPress={this.props.onNextStepPress}  />
    )
  }

}

//
// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onNextStepPress: (trainer) => {
      dispatch(updateTrainerAboutYou(trainer))
    }
  }
}

export default connect(null,mapDispatchToProps)(TrainerAboutYouContainer)
