import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setUserTypeCustomer, setUserTypeTrainer } from '@store/modules/auth/actions'

import UserTypeChoice from '@LoginRegistration/components/UserTypeChoice'


type Props = {
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
}


class UserTypeChoiceContainer extends Component {

  props: Props

  render() {
    return (
      <UserTypeChoice { ...this.props } />
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

export default connect(mapStateToProps,mapDispatchToProps)(UserTypeChoiceContainer)
