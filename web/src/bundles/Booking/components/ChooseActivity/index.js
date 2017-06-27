import React from 'react'
import CONSTS from '@utils/Consts'
import moment from 'moment';
import { find } from 'lodash'

type Props = {
  activities: Array,
  bookingState: Object,
  selectActivity: Function,
}

class ChooseActivity extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    var currentStep = this.props.bookingState.currentStep
    var totalSteps = this.props.bookingState.totalSteps
    this.state = {
      currentStep: currentStep,
      totalSteps: totalSteps,
    }
  }


  _renderActivities() {
    if(!this.props.activities) {
      return;
    }
    return this.props.activities.map(activity => {
          return (
            <div key={activity.id} className="col-xs-12 col-sm-6 col-md-4">
              <a href="#" onClick={() => this.props.onChooseActivity(activity)}>
                <div className="book-now-activity text-center">
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                </div>
              </a>
            </div>
          );
      })
  }
  _renderHeading() {
    var basePrice = this.props.appSettings.priceBase;
    if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_TRAINER) {
      return (
        <div className="col-xs-12">
          <div className="text-center">
            <h2>Choose Activity</h2>
          </div>
        </div>
      );
    } else {
      if(this.props.workoutInfo && this.props.workoutInfo.isActive) {

        var validity = moment(this.props.workoutInfo.nextBillingDate).format("MMMM Do");
        var planName = find(this.props.planItems, (plan) => {
          return plan.id === this.props.workoutInfo.plan.id;
        }).name;
        var numWorkoutsLeft = this.props.workoutInfo.numWorkoutsLeft;
        var numWorkoutsAvailable = this.props.workoutInfo.plan.numWorkouts;
        var remainingWorkouts = numWorkoutsLeft + " of " + numWorkoutsAvailable
        return (
          <div className="col-xs-12">
            <div className="text-center">
              <h2>Book a single workout</h2>
              <p><strong>{planName}</strong> : {remainingWorkouts} workouts remaining until {validity}</p>
              <p className="spaced"><strong>START BY CHOOSING AN ACTIVITY</strong></p>
            </div>
          </div>
        );

      } else {
        return (
          <div className="col-xs-12">
            <div className="text-center">
              <h2>Book a single workout for ${basePrice}</h2>
              <p className="spaced"><strong>START BY CHOOSING AN ACTIVITY</strong></p>
            </div>
          </div>
        );
      }
    }
  }
  render() {
    return (
      <div className="container book-now">
        <div className="row">
          {this._renderHeading()}
        </div>
        <div className="row">
          {this._renderActivities()}
        </div>
        <div className="row text-center">
          <div className="col-xs-12 col-sm-4  col-sm-offset-4">
            <p className="devider-text spaced"><strong>OR START BY CHOOSING A NEARBY TRAINER</strong></p>
            <a href="#" onClick={() => this.props.onSelectBrowseTrainers()} className="btn btn-info btn-lg btn-block">Browse Nearby Trainers</a>
          </div>
        </div>
     </div>
    )
  }
}

export default ChooseActivity
