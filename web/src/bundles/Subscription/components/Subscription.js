import React, { PropTypes } from 'react'
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render () {
    var totalListPrice = this.props.plan.price;
    var finalPrice = (totalListPrice * 0.7) % 1 === 0 ? (totalListPrice * 0.7) :(totalListPrice * 0.7).toFixed(2); // TODO: INZ - hard coded for now.
    return (
      <div className="container">

      	<div className="row">

              <div className="col-xs-12 col-sm-6 col-sm-offset-3 subscribe-section">

                <h2 className="text-center marginBottom50">{this.props.plan.name}</h2>

                <a href="#"><i className="fa fa-chevron-left" aria-hidden="true" onClick={this.props.onClickPrevPlan}></i></a>
                <a href="#"><i className="fa fa-chevron-right" aria-hidden="true" onClick={this.props.onClickNextPlan}></i></a>

                <div className="col-xs-12 kill-left-padding kill-right-padding marginBottom20">

              	 <div className="subscribe-package text-center">

                     <p className="col-xs-6"><small>Workouts</small><strong>{this.props.plan.numWorkouts}</strong>/month</p>
                     <p className="col-xs-6"><small>-30% off</small><strong>${this.props.plan.pricePerWorkout}</strong>/workout</p>

                   </div>

                </div>

                <div className="subscribe-row">

                  <p>Number of Workouts <span>{this.props.plan.numWorkouts}</span></p>

                </div>

                <div className="subscribe-row">

                  <p>Subscription Discount <span>-30%</span></p>

                </div>

                <div className="subscribe-row">

                  <p><strong>Price of {this.props.plan.numWorkouts} Workouts <span>${finalPrice}</span></strong></p>

                </div>
                <div className="container">
                  <div className="row subscribe-row">
                    <div className="col-xs-12 col-sm-6 kill-left-padding ">
                      {/*<h2 className="text-center marginBottom20">Credit Card</h2>*/}
                      <BraintreeDropIn clientToken={this.props.appSettings.braintreeClientToken} ref="braintree" />
                    </div>
                  </div>

                </div>
                <p className="disclaimer text-center">* Legal disclaimer suff, you will be billed at the start of the month, subscriptions can be cancelled at any time, etc.</p>

                <button type="button" className="btn btn-info btn-lg btn-block marginBottom20" onClick={this.props.onClickPurchase}>Confirm Purchase of ${finalPrice} / Month</button>

              </div>

          </div>

      </div>
    )
  }
}

export default Subscription;
