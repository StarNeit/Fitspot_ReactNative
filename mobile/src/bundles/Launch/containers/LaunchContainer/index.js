import React, { Component } from 'react'
import Launch from '@Launch/components/Launch'
import {connect} from 'react-redux'
import {setUserTypeCustomer, setUserTypeTrainer } from '@store/modules/auth/actions'

type Props = {
  userType: int,
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
}


class LaunchContainer extends Component {

  props: Props

  render() {
    return (
      <Launch  userType={this.props.userType} setUserTypeTrainer={this.props.setUserTypeTrainer} setUserTypeCustomer={this.props.setUserTypeCustomer} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userType: state.auth.user.userType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserTypeCustomer: () => {
      dispatch(setUserTypeCustomer())
    },
    setUserTypeTrainer: () => {
      dispatch(setUserTypeTrainer())
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LaunchContainer)
