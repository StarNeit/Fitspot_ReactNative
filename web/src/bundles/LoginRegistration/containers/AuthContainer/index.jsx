import React from 'react';
import { connect } from 'react-redux';
import AuthSplash from '@LoginRegistration/components/AuthSplash';
import { checkAuth } from '@store/modules/auth/actions';
import * as actions from '@shared/actions';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.initialized = false;
  }

  componentDidMount() {
    this.props.checkAuth();

    this.initialized = true;
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, isLoggedIn, location } = nextProps;

    if (this.initialized) {
      if (!nextProps.isFetching) {
        if (nextProps.isLoggedIn) {
          if (location.query && location.query.next) {
            actions.navigateTo(location.query.next);
          } else {
            actions.home();
          }
        } else {
          actions.userLogin(location.query.next);
        }
      }
    }
  }

  render() {
    return (
      <AuthSplash />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    error: state.auth.error,
    location: ownProps.location,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => {
      dispatch(checkAuth());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
