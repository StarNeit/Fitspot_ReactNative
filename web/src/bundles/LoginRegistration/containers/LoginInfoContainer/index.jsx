import React, { Component } from 'react';
import LoginInfo from '@LoginRegistration/components/LoginInfo';
import { connect } from 'react-redux';
import { createUserFB } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import { loginWorkflow } from '../../workflow';
import * as Facebook from '@shared/integrations/facebook';


class LoginInfoContainer extends Component {
  componentWillMount() {
    console.log(this.props);
    if (!this.props.authToken) {
      Actions.userLogin();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      loginWorkflow(nextProps.user);
    }
  }

  render() {
    const {error, isFetching, onSubmit} = this.props;

    return (
      <LoginInfo
        error={error}
        isFetching={isFetching}
        onSubmit={onSubmit}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    isLoggedIn: state.auth.loggedIn,
    authToken: state.auth.authToken,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

const mergeProps = (stateProps, dispatchProps) => {
  console.log(stateProps, dispatchProps);
  return {
    ...stateProps,
    onSubmit: (form) => {
      dispatchProps.dispatch(createUserFB({
        token: stateProps.authToken,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        // TODO: Configurable timezone
        timezone: 'US/Eastern',
      }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginInfoContainer);

