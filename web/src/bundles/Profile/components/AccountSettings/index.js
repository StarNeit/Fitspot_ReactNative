import React from 'react';
import moment from 'moment'
import * as Actions from '@shared/actions';
import LeftMenu from '@Profile/components/LeftMenu';
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';

class AccountSettings extends React.Component {

  render() {
    return(
      <div className="container">

	<div className="row">

              <LeftMenu/>

              <div className="col-xs-12 col-sm-6">

                  <h2 className="text-center marginBottom50">Account Settings</h2>


                  <form>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" placeholder="" value={this.props.user.email}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="examplePhoneNumber">Phone Number</label>
                      <input type="text" className="form-control" id="examplePhoneNumber" placeholder="" value={this.props.user.phone}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleYourPassword">Your Password</label>
                      <input type="password" className="form-control" id="exampleYourPassword" placeholder=""/>
                    </div>

                    <button type="submit" className="btn btn-info btn-lg btn-block">Save Changes</button>

                  </form>

                  <hr className="section-devider"/>

                  <h2 className="text-center marginBottom50">Credit Card Information</h2>


                  <form>

                    <BraintreeDropIn clientToken={this.props.appSettings.braintreeClientToken} ref="braintree" />

                    {/*<button type="submit" className="btn btn-info btn-lg btn-block">Add Card</button>*/}

                  </form>

                  <hr className="section-devider"/>

                  <h2 className="text-center marginBottom20">Fitspot Credit</h2>

                  <p className="text-center">You referred 10 new users. Your next discount will be $25.</p>

                  <hr className="section-devider"/>

                  <h2 className="text-center marginBottom20">Send Referral Code</h2>

                  <p className="text-center">Know a friend that would live Fitspot? Give them your referral code and when they sign up, you will get a cash reward!</p>

                  <h3 className="refer-code text-center">DEBJ0466327</h3>

                  <button type="submit" className="btn btn-info btn-lg btn-block">Send Code</button>


              </div>

          </div>

      </div>
    )
  }

}

export default AccountSettings;
