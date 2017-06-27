import React, { Component } from 'react';
import VerifyUser from '@LoginRegistration/components/VerifyUser';
import { connect } from 'react-redux';
import { verifyCurrentUser, resendVerifyCode } from '@store/modules/auth/actions';
import { loginWorkflow } from '@LoginRegistration/workflow';
import * as Actions from '@shared/actions';


class VerifyUserContainer extends Component {

  constructor(props) {
    super(props);

    this.onResendCodeClick = this.onResendCodeClick.bind(this);
    this.state = {
      isCodeResent: false,
    };
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isVerified) {
      loginWorkflow(nextProps.user);
    }
  }

  onResendCodeClick(event){
    event.preventDefault();

    this.props.resendVerifyCode(this.props.user.id);
    this.setState({
      isCodeResent: !this.props.error,
    });
  }

  render() {
    const {error, onVerifyClick} = this.props;
    console.log(this.props.state);
    return (
      <VerifyUser
       error={error}
       onVerifyClick={onVerifyClick}
       onResendCodeClick={this.onResendCodeClick}
       isCodeResent={this.state.isCodeResent}
       />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onVerifyClick: (form) => {
      dispatch(verifyCurrentUser(form.code));
    },
    resendVerifyCode: (userId) => {
      dispatch(resendVerifyCode(userId));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUserContainer);
