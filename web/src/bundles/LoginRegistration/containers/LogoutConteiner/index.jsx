import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from '@LoginRegistration/components/Logout';
import { logout } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';


class LogoutConteiner extends Component {
  componentWillMount() {
    const { logout } = this.props;
    logout();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loggedIn) {
      Actions.home();
    }
  }

  render() {

    return (
      <Logout />
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
    logout: () => {
      dispatch(logout());
    },
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LogoutConteiner);
