import React, { Component } from 'react';
import Launch from '@Launch/components/Launch';
import { connect } from 'react-redux';
import { setUserTypeCustomer, setUserTypeTrainer } from '@store/modules/auth/actions';
import { fetchPlans } from '@store/modules/plans/actions';
import ChoosePlan from '@Booking/components/ChoosePlan'
import ChooseActivity from '@Booking/components/ChooseActivity'
import ChooseActivityContainer from '@Booking/containers/ChooseActivityContainer'
import { fetchWorkouts } from '@store/modules/workouts/actions';
import { subscribePlan, selectPlan } from '@store/modules/subscription/actions';

import * as Actions from '@shared/actions';

type Props = {
  userType: int,
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
  plans : Array,
  getPlans : Function,
  fetchWorkouts : Function,
  selectPlan: Function,
};


class LaunchContainer extends Component {
  props: Props;
  constructor(props) {
    super(props);
    this.onChoosePlan = this.onChoosePlan.bind(this);
    this.onChooseSingleWorkout = this.onChooseSingleWorkout.bind(this);
  }
  onChoosePlan(plan) {
      this.props.selectPlan(plan);
      Actions.addSubscription();
  }
  onChooseSingleWorkout(plan) {
      this.props.activateSinglePurchaseBooking();
      Actions.addFriends();
  }

  componentWillMount() {
      this.props.getPlans();
      this.props.fetchWorkouts();
  }
  renderPlans() {
    if (this.props.workoutInfo &&  this.props.workoutInfo.numWorkoutsLeft > 0
          &&  this.props.workoutInfo.isActive) {
      return;
    }
    return (
      <div>
        <hr className="section-devider"/>
        <ChoosePlan
            homeLook
            title = 'Subscribe and Save!'
            showSingleWorkout = {false}
            onChoosePlan = {this.onChoosePlan}
            onChooseSingleWorkout = {this.onChooseSingleWorkout}
            {...this.props}
        />
      </div>
    )
  }
  render() {
    return (
      <div>
        <Launch {...this.props} />
          <ChooseActivityContainer
            {...this.props}
          />
        {this.renderPlans()}
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userType: state.auth.user.userType,
    workoutInfo: state.auth.user.workoutInfo,
    appSettings: state.auth.appSettings,
    activities: state.auth.appSettings.activities,
    workouts: state.workouts,
    plans : state.plans.planItems,
    bookingState: state.booking
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlans: () => {
        dispatch(fetchPlans());
    },
    fetchWorkouts: () => {
        dispatch(fetchWorkouts());
    },
    setUserTypeCustomer: () => {
      dispatch(setUserTypeCustomer());
    },
    setUserTypeTrainer: () => {
      dispatch(setUserTypeTrainer());
    },
    selectPlan: (plan) => {
      dispatch(selectPlan(plan))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);
