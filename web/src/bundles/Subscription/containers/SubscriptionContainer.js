import React, { PropTypes } from 'react'
import Subscription from '@Subscription/components/Subscription'
import { connect } from 'react-redux';
import ApiUtils from '@utils/ApiUtils';
import { subscribePlan, selectPlan } from '@store/modules/subscription/actions';
import * as Actions from '@shared/actions';

type Props = {
    bookingState : Object,
    plans : Array,
    getPlans : Function,
    subscribePlan: Function,
    planItem: Object,
}
class SubscriptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClickNextPlan = this.onClickNextPlan.bind(this)
    this.onClickPrevPlan = this.onClickPrevPlan.bind(this)
    this.onClickPurchase = this.onClickPurchase.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.error.length > 0){
      //TODO: Better - use modal for error
      alert(nextProps.error);
    } else if(nextProps.planItem.planId) {
      alert("Congratulations - you are now subscribed! Let's book a workout!");
      Actions.home();
    }
  }
  onClickPurchase() {
      this.refs.sub.refs.braintree.tokenize().then((data) => {
        console.log('BT Data: ', data);
        this.props.subscribePlan(this.props.selectedPlan.id, data.nonce)
      }).catch((err) => {
        console.log('y', err);
      });

  }

  onClickNextPlan() {
    var plans = this.props.plans;
    var planIndex = plans.indexOf(this.props.selectedPlan);
    if(planIndex < plans.length) {
      this.props.selectPlan(plans[planIndex + 1]);
    } else {
      this.props.selectPlan(plans[0]);
    }
  }
  onClickPrevPlan() {
    var plans = this.props.plans;
    var planIndex = plans.indexOf(this.props.selectedPlan);
    if(planIndex > 0) {
      this.props.selectPlan(plans[planIndex - 1]);
    } else {
      this.props.selectPlan(plans[plans.length - 1]);
    }
  }
  render () {
    return (
      <div>
        <Subscription {...this.props} ref="sub"
              plan={this.props.selectedPlan}
              onClickPrevPlan={this.onClickPrevPlan}
              onClickNextPlan={this.onClickNextPlan}
              onClickPurchase={this.onClickPurchase}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.auth.user.userType,
    appSettings: state.auth.appSettings,
    workouts: state.workouts,
    plans : state.plans.planItems,
    error : state.subscription.error,
    planItem: state.subscription.planItem,
    selectedPlan: state.subscription.selectedPlanId,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlans: () => {
        dispatch(fetchPlans());
    },
    selectPlan: (planId) => {
        dispatch(selectPlan(planId));
    },
    subscribePlan: (planId, nonce) => {
        dispatch(subscribePlan(planId, nonce));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
