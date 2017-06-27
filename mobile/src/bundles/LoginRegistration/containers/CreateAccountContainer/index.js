import React, { Component } from 'react'
import CreateAccount from '@LoginRegistration/components/CreateAccount'
import { connect } from 'react-redux'
import { createUser,createUserFB } from '@store/modules/auth/actions'
import {Actions} from 'react-native-router-flux'


type Props = {
  error: '',
  isCreated: boolean,
  onCreateClick: Function,
  onFacebookLoginClick: Function,
  userType: int,
  initialValues: Object,
  authToken: String,
}


class CreateAccountContainer extends Component {

  props: Props

  render() {
    return (
      <CreateAccount {...this.props }  />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isCreated: state.auth.isCreated,
    userType: state.auth.user.userType,
    initialValues: state.auth.needMoreInfoData,
    authToken: state.auth.authToken,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateClick: (user) => {
      dispatch(createUser(user))
    },
    onFacebookLoginClick: (token) => {
      dispatch(createUserFB(token))
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateAccountContainer)
