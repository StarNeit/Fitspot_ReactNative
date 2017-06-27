import React, { Component } from 'react';
import LoginRegister from '@LoginRegistration/components/LoginRegister';
import { connect } from 'react-redux';
import { loginUser, createUserFB, loginFail, authResetState } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import { loginWorkflow } from '../../workflow';
import * as Facebook from '@shared/integrations/facebook';


class LoginRegisterContainer extends Component {
  constructor(props) {
    super(props);

    props.resetErrorState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      loginWorkflow(nextProps.user);
    } else
    if (nextProps.needMoreInfo) {
      Actions.userMoreInfo();
    }
  }

  onRegisterClick(event) {
    event.preventDefault();

    Actions.userRegister();
  }

  onForgotPasswordClick(event) {
    event.preventDefault();

    Actions.userForgotPassword();
  }

  render() {
    const {error, onLoginSubmit, onFacebookLoginClick, isFetching, isLoggedIn} = this.props;

    return (
      <LoginRegister
        error={error}
        isFetching={isFetching}
        onLoginSubmit={onLoginSubmit}
        onFacebookLoginClick={onFacebookLoginClick}
        onRegisterClick={this.onRegisterClick}
        onForgotPasswordClick={this.onForgotPasswordClick}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    isLoggedIn: state.auth.loggedIn,
    needMoreInfo: state.auth.needMoreInfo,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorState: () => {
      dispatch(authResetState());
    },
    onLoginSubmit: (form) => {
      dispatch(loginUser(form.email, form.password));
    },
    onFacebookLoginClick: (event) => {
      event.preventDefault();

      Facebook.init().then(() => {
        Facebook.login().then((data) => {
          dispatch(createUserFB({
            token: data.authResponse.accessToken,
            timezone: 'US/Eastern',
          }));
        }).catch((err) => {
          dispatch(loginFail(err.message));
        });
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterContainer);
