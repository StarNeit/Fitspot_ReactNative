import React, {Component, PropTypes} from 'react';
import CONSTS from '@utils/Consts';

type Props = {
    plans : Array,
    bookingState : object,
}

class ChoosePlan extends React.Component {
    constructor(props) {
        super(props);
    }
    _renderSingleWorkout() {
        return (
          <div className="col-xs-12 col-sm-6 col-md-3 booking-step-5" onClick={() => {this.props.onChooseSingleWorkout()}}>
            <a href="#">
              <div className="book-now-activity text-center">
                <h3>$69</h3>
                <h4><br/></h4>
                <p>As a single, one-off session<br/>
                  No subscription</p>
              </div>
            </a>
          </div>
        )
    }
    _renderPlans() {
        var availablePlans = this.props.workoutInfo && this.props.workoutInfo.isActive ? [this.props.workoutInfo.plan] : this.props.plans
        return availablePlans.map(plan => {
            if(this.props.homeLook) {
              return(
                <div className="col-xs-12 col-sm-6 col-md-4" key={plan.id}>
                	<a href="#" onClick={() => {this.props.onChoosePlan(plan)}}>
                	<div className="subscribe-packages text-center">
                    	<h4><strong>{plan.name}</strong></h4>
                    	<p className="col-xs-6"><small>Workouts</small><strong>{plan.numWorkouts}</strong>/month</p>
                    	<p className="col-xs-6"><small>-20% off</small><strong>${plan.pricePerWorkout}</strong>/workout</p>
                    </div>
                    </a>
                </div>
              )
            } else {
              return (
                  <div className="col-xs-12 col-sm-6 col-md-3 booking-step-5" key={plan.id}>
                    <a href="#"  onClick={() => {this.props.onChoosePlan(plan)}}>
                      <div className="book-now-activity text-center">
                        <h3>${plan.pricePerWorkout}</h3>
                        <p>Subscribe for ${plan.price} a month<br/>
                           {plan.numWorkouts} workouts at ${plan.pricePerWorkout}</p>
                         <h4 style={{color: plan.color, 'font-weight': 'bold'}}>{plan.name}</h4>
                      </div>
                    </a>
                  </div>
              )
            }

        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="text-center">
                            <h2>{this.props.title}</h2>
                        </div>
                    </div>
                </div>
                <div className="row book-now">
                    {this.props.showSingleWorkout ? this._renderSingleWorkout() : ''}
                    {this._renderPlans()}
                </div>
            </div>
        )
    }
}

export default ChoosePlan;
