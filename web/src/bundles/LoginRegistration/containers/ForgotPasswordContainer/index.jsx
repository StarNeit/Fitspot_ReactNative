import React, { Component } from 'react';
import ForgotPassword from '@LoginRegistration/components/ForgotPassword';
import { connect } from 'react-redux';
import { forgotPassword, authResetState } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import { loginWorkflow } from '../../workflow';
import * as Facebook from '@shared/integrations/facebook';


class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEmailSent: false,
    };

    props.resetErrorState();

    this.onForgotSubmit = this.onForgotSubmit.bind(this);
}
  onForgotSubmit(form){
    this.props.onForgotSubmit(form);
    this.setState({
      isEmailSent: true,
    });
  }
  render() {
    const {error, isFetching} = this.props;

    return (
      <ForgotPassword
        error={error}
        isFetching={isFetching}
        isEmailSent={this.state.isEmailSent}
        onForgotSubmit={this.onForgotSubmit}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorState: () => {
      dispatch(authResetState());
    },
    onForgotSubmit: (form) => {
      dispatch(forgotPassword(form.email));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
