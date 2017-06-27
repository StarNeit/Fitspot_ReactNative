import React from 'react';
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';
import moment from 'moment'
import { find, sortBy } from 'lodash'
import * as Actions from '@shared/actions';

type Props = {
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
};


class Launch extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    console.log(props)
    this.braintreeTest = this.braintreeTest.bind(this);
  }

  chooseTrainer() {
    this.props.setUserTypeTrainer();
    // TODO: Actions.home();
  }

  chooseCustomer() {
    this.props.setUserTypeCustomer();
    // TODO: Actions.home();
  }

  braintreeTest(event) {
    event.preventDefault();

    this.refs.braintree.tokenize().then((data) => {
      console.log('x', data);
    }).catch((err) => {
      console.log('y', err);
    });
  }

  renderUpcomingWorkouts() {
    //console.log(this.props);
    if(this.props.workouts.workoutItems.length == 0){
      return;
    }
    // Can we assume this to be sorted?
    var workout = sortBy(this.props.workouts.workoutItems, [function(w) { return moment(w.dtStart).unix() }])[0];
    var trainerName = workout.trainer.firstName + " "+  workout.trainer.lastName.slice(0.1);
    var dateTime = moment(workout.dtStart).format("MMM DD h:mm a");
    var activityName = find(this.props.appSettings.activities, function(act) {
      return act.id === workout.activityId;
    }).name;
    var nextWorkout = moment.duration(moment().diff(moment(workout.dtStart))).humanize();
    return(
        <div className="container">
          <div className="row">
              <div className="col-xs-12">
                <div className="text-center">
                    <h2>Your next workout starts in {nextWorkout}</h2>
                  </div>
              </div>
          </div>
          <div className="row text-center" key={workout.id}>
            <div className="col-xs-12">
              <div className="subscribe-details text-center">
                  <p className="col-xs-6 col-md-3 info-boxes"><small>DATE & TIME</small><strong>{dateTime}</strong></p>
                  <p className="col-xs-6 col-md-3 info-boxes"><small>TRAINER</small><strong>{trainerName}</strong></p>
                  <p className="col-xs-6 col-md-3 info-boxes"><small>ACTIVITY</small><strong>{activityName}</strong></p>
                  <p className="col-xs-6 col-md-3 info-boxes"><small>LOCATION</small><strong>{workout.gym.name}</strong></p>
                  <p className="col-xs-12 text-center trainer-status">{this.props.workouts.confirmingStatus == 0 ? 'Pending Trainer Confirmation' : 'Confirmed'}</p>
                  <p className="col-xs-6 text-center action-links"><a href="#" onClick={Actions.editWorkout}>Edit Workout</a></p>
                  <p className="col-xs-6 text-center action-links"><a href="#">Chat With {trainerName}</a></p>
                </div>
            </div>
          </div>
          <hr className="section-devider"/>
        </div>
    );
  }
  renderPlans() {
     return this.props.plans.map(plan => {
         return (
             <div className="col-xs-12 col-sm-6 col-md-3" key={plan.id} onClick={() => {this.props.onChoosePlan(plan)}}>
                 <div className="subscribe-packages text-center">
                     <h4><strong>{plan.name}</strong></h4>
                     <p style={{fontSize:18}} className="col-xs-5"><strong><small>Workouts</small>{plan.numWorkouts}</strong>/month</p>
                     <p style={{fontSize:18}} className="col-xs-7"><strong><small>{plan.percentDiscount}% OFF</small>${Math.ceil((plan.price / plan.numWorkouts))}</strong>/workout</p>

                 </div>
             </div>
         )
     });
 }
  render() {
    return (
      <div className="container">
          {this.renderUpcomingWorkouts()}
        {/* <h3>This is Braintree test</h3>

        <BraintreeDropIn clientToken={this.props.appSettings.braintreeClientToken} ref="braintree" />
        <a href="#" onClick={this.braintreeTest} className="btn btn-default">Submit</a>
        */}
      </div>
    );
  }
}

export default Launch;
