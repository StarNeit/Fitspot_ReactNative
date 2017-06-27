import React, { Component } from 'react';
import Register from '@LoginRegistration/components/Register';
import { connect } from 'react-redux';
import { createUser } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import * as Facebook from '@shared/integrations/facebook';
import { loginWorkflow } from '../../workflow';


class RegisterContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      loginWorkflow(nextProps.user);
    }
  }

  render() {
    return (
      <Register
        {...this.props}
        onSubmit={this.props.onRegisterSubmit}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    isLoggedIn: state.auth.loggedIn,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterSubmit: (user) => {
      dispatch(createUser(user));
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
          dispatch(createAccountFailure(err.message));
        });
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
