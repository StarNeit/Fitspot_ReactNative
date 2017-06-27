import React from 'react';
import moment from 'moment'
import * as Actions from '@shared/actions';
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';

class ReviewWorkout extends React.Component {

  render() {
    var bookingState = this.props.bookingState;
    var appSettings = this.props.appSettings;
    var activityName = bookingState.chosenActivity.name;
    var dateTime= moment(bookingState.chosenDate).format("MMM DD h:mm a");
    var location = bookingState.chosenLocation.name;
    var trainerName = bookingState.chosenTrainer.firstName + " " + bookingState.chosenTrainer.lastName.slice(0,1)
    var workoutType = bookingState.isSinglePurchase  ? 'Single Workout' : bookingState.subscriptionOption.name
    var basePrice = bookingState.isSinglePurchase ? appSettings.priceBase : bookingState.subscriptionOption.pricePerWorkout
    var numFriends = bookingState.numFriends
    var totalFriendPrice = bookingState.numFriends * appSettings.priceFriend
    var numWorkouts = bookingState.isSinglePurchase ? 1 : bookingState.subscriptionOption.numWorkouts;

    var totalPrice = basePrice * numWorkouts - 69 //hard-coded
      + bookingState.numFriends * appSettings.priceFriend
    //var percentDiscount = 100 - Math.ceil(((chosenSub.price / totalPrice)* 100)

    return (
      <div className="container">

    <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-offset-3">

            <h2 className="text-center marginBottom20">Review Workout</h2>

            <div className="workout-row">

              <h4><small>ACTIVITY</small>{activityName}</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseActivity}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>DATE & TIME</small>{dateTime }</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseDateTime}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>LOCATION</small>{location}</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseLocation}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>TRAINER</small>{trainerName}</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseTrainer}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>TYPE</small>{workoutType}</h4>
              {bookingState.isSinglePurchase ?
                <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.choosePlan}>Change</a>
                :
                <div></div>
              }
            </div>

            <div className="workout-row marginBottom20">

              <h4><small>FRIENDS</small>+{numFriends} Participants</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.addFriends}>Change</a>

            </div>

            <h2 className="text-center marginBottom20">Order Summary</h2>

            <div className="subscribe-section">

            <div className="subscribe-row">

              <p>{numWorkouts} Workouts <span>${basePrice}</span></p>

            </div>

            <div className="subscribe-row">

              <p>+{numFriends} Friends<span>+ ${totalFriendPrice}</span></p>

            </div>

            <div className="subscribe-row">

              <p>Promo Code: 1 For 1 <span>- $69</span></p>

            </div>

            <div className="subscribe-row">

              <p><strong>TOTAL <span>${totalPrice }</span></strong></p>

            </div>

            </div>

            <form>

                <div className="form-group">
                   <label htmlFor="examplePromoCode"><strong>PROMO CODE</strong> - <small>OPTIONAL</small></label>
                   <input type="text" className="form-control" id="examplePromoCode" placeholder="" value="FITNOW"/>
                </div>

                <button type="submit" className="btn btn-info btn-lg btn-block marginBottom20">Apply Promo Code</button>
                <h2 className="text-center marginBottom20">Credit Card</h2>
                <BraintreeDropIn clientToken={appSettings.braintreeClientToken} ref="braintree" />
                {/*<button type="submit" className="btn btn-info btn-lg btn-block">Purchase Workout</button>*/}
                <a href="#" onClick={() => this.props.requestNewWorkout(numFriends, "")} className="btn btn-default">Submit</a>

            </form>

          </div>

      </div>

  </div>
    );
  }

}

export default ReviewWorkout;
