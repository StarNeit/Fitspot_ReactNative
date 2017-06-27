import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '@shared/actions';

class SecurePageContainer extends React.Component {
  componentWillMount() {
    const { isLoggedIn, location } = this.props;

    if (!isLoggedIn) {
      let next = null;
      if (location.query && location.query.next) {
        next = location.query.next;
      }

      Actions.userAuth(next);
    }
  }

  render() {
    const { isLoggedIn, className } = this.props;

    if (!isLoggedIn) {
      return (
        <div />
      );
    }

    return (
      <div className={className || 'logged-in'}>{this.props.children}</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.loggedIn,
  }
}

export default connect(mapStateToProps)(SecurePageContainer);
