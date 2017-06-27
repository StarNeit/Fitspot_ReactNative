import React, { Component } from 'react'
import LoginRegister from '@LoginRegistration/components/LoginRegister'
import { connect } from 'react-redux'
import { loginUser,createUserFB } from '@store/modules/auth/actions'
import {Actions} from 'react-native-router-flux'

type Props = {
  error: string,
  onLoginClick: Function,
  onLoginClickFB: Function,
}


class LoginRegisterContainer extends Component {


  constructor(props){
    super(props);
  }

  render() {

    const {error,onLoginClick,isLoggedIn} = this.props
    return (
      <LoginRegister {...this.props} />
    )
  }
  componentWillReceiveProps(nextProps) {
  if (nextProps.needMoreInfo) {
    Actions.mainAppModal(
    {
      uniqId: new Date().getTime(),
      visible: true,
      headerText: 'Facebook Login Incomplete',
      detailsText: "We need a few more bits of information before we can create an account. Please fill the blank fields and click Create Account",
      onOkay:null,
      okayButtonText: 'OK',
      showCancelButton: false,
    }
    )

    Actions.createAccount();
  }
}

}





const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: state.auth.loggedIn,
    needMoreInfo: state.auth.needMoreInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (email,password) => {
      dispatch(loginUser(email,password))
    },
    checkAuthCookie: () => {
      dispatch(checkAuth())
    },
    onFacebookLoginClick: (token) => {
      dispatch(createUserFB(token))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginRegisterContainer)
