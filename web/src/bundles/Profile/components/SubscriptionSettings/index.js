import React from 'react';
import * as Actions from '@shared/actions';
import LeftMenu from '@Profile/components/LeftMenu';
import moment from 'moment';
import {times} from 'lodash';

class SubscriptionSettings extends React.Component {

  renderRemainingWorkoutStrips(numWorkoutsLeft, numWorkoutsAvailable) {
    var diff = numWorkoutsAvailable - numWorkoutsLeft;
    var grey = diff < 0 ? 0 : diff;
    var green = diff < 0 ? numWorkoutsAvailable:  numWorkoutsLeft;
    let stripItems = [];
    _.times(grey, (i) => {
      stripItems.push(<div key={i} className="col-xs-3 workout-indicator">
           <p className="">&nbsp;</p>
       </div>);
    });
    _.times(green, (i) => {
      stripItems.push(<div key={i + grey} className="col-xs-3 workout-indicator">
          <p className="active">&nbsp;</p>
      </div>);
    });
    return(stripItems)
  }
  render() {
    var workoutInfo = this.props.user.workoutInfo;
    if(!workoutInfo || !workoutInfo.isActive) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-offset-3">
              <h2>You do not have any active subscription.</h2>
            </div>
          </div>
        </div>
      );
    }
    var validity = moment(workoutInfo.nextBillingDate).format("MMMM Do");
    var numWorkoutsLeft = workoutInfo.numWorkoutsLeft;
    var numWorkoutsAvailable = workoutInfo.plan.numWorkouts
    var remainingWorkouts = numWorkoutsLeft + " of " + numWorkoutsAvailable
    return(
      <div className="container">

  	<div className="row">

              <LeftMenu/>

              <div className="col-xs-12 col-sm-6">

                  <h2 className="text-center marginBottom50">Subscription Settings</h2>

                  <div className="col-xs-12 kill-left-padding kill-right-padding marginBottom20">

  		  <div className="subscribe-package text-center">

  			<h4><strong>{workoutInfo.plan.name}</strong></h4>
  			<p className="col-xs-6"><small>Workouts</small><strong>{workoutInfo.plan.numWorkouts}</strong>/month</p>
  			<p className="col-xs-6"><small>-30% off</small><strong>${workoutInfo.plan.pricePerWorkout}</strong>/workout</p>

                    </div>

                  </div>

                  <h3 className="text-center marginBottom20">My Workouts</h3>

                  <p className="text-center marginBottom20">{remainingWorkouts} workouts remaining until {validity}</p>

                  {this.renderRemainingWorkoutStrips(numWorkoutsLeft, numWorkoutsAvailable)}

                  <p className="marginBottom20">&nbsp;</p>

                  <div className="col-xs-6 kill-left-padding">

                    <button type="button" className="btn btn-danger btn-lg btn-block"
                      onClick={this.props.onCancelPlan}>Cancel Subscription</button>
                  </div>

                  <div className="col-xs-6 kill-right-padding">

                      <button type="button" className="btn btn-info btn-lg btn-block" disabled="true">Edit Subscription</button>

                  </div>

              </div>

          </div>

      </div>
    )
  }
}

export default SubscriptionSettings;
