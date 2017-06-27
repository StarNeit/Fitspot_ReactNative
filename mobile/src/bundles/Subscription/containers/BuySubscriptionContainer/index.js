import React, { Component } from 'react'
import {connect} from 'react-redux'
import BuySubscription from '@Subscription/components/BuySubscription'
import { receivedWorkoutCount } from '@store/modules/auth/actions'

type Props = {
  chosenSubscription: Object,
  appSettings: Object,
  selectedPlan: Function,
}

class BuySubscriptionContainer extends Component {

  props: Props

  constructor(props){
    super(props)
  }

  render() {
    return (
      <BuySubscription  {...this.props}/>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    appSettings: state.auth.appSettings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPlan: (plan) => {
      dispatch(receivedWorkoutCount(plan))
  }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuySubscriptionContainer)
