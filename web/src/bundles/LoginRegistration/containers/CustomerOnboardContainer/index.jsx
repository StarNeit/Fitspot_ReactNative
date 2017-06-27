import React, { Component } from 'react';
import update from 'immutability-helper';
import CustomerOnboard from '@LoginRegistration/components/CustomerOnboard';
import { connect } from 'react-redux';
import { updateCustomer, authResetState } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import { loginWorkflow } from '../../workflow';
import CONSTS from '@utils/Consts';
import { toRestDate } from '@shared/helpers';


class CustomerOnboardContainer extends Component {
  constructor(props) {
    super(props);

    props.resetErrorState();

    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.customer && nextProps.user.customer.customerProfileReady) {
      loginWorkflow(nextProps.user);
    }
  }

  onUpdateClick(form) {
    let user = update(this.props.user, {
      userType: {$set: CONSTS.USER_TYPE.CUSTOMER},
    });

    const apiForm = update(form, {
      birthday: {$set: toRestDate(form.birthday)}
    });

    if (user.customer) {
      user = update(user, {
        customer: {$merge: apiForm},
      })
    } else {
      user = update(user, {
        customer: {$set: apiForm},
      });
    }

    this.props.updateCustomer(user);
  }

  render() {
    const {error, isFetching} = this.props;

    return (
      <CustomerOnboard
        error={error}
        isFetching={isFetching}
        onUpdateClick={this.onUpdateClick}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorState: () => {
      dispatch(authResetState());
    },
    updateCustomer: (user) => {
      dispatch(updateCustomer(user));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOnboardContainer);
