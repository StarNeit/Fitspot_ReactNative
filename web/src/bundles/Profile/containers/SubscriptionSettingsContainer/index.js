import React, {Component} from 'react'
import {connect} from 'react-redux'
import SubscriptionSettings from '@Profile/components/SubscriptionSettings'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { cancelSubscription } from '@store/modules/auth/actions'

type Props = {
  bookingState: Object,
  cancelSubscription: Function,

}

class SubscriptionSettingsContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.onCancelPlan = this.onCancelPlan.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error);
    } else if (!nextProps.isFetching && !nextProps.error) {
      Actions.home();
    }
  }
  onCancelPlan(plan) {
      if(confirm('Are you sure?'))
       this.props.cancelSubscription();
  }

  render() {
    return (<SubscriptionSettings
              onCancelPlan = {this.onCancelPlan}
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
    isFetching: state.auth.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelSubscription: () => {
        dispatch(cancelSubscription());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionSettingsContainer)
