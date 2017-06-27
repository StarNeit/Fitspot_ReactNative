import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

// Individual scenes
import { LaunchScene } from '@Launch/scenes';
import * as LoginRegistration from '@LoginRegistration/scenes';
import * as Booking from '@Booking/scenes';
import * as Subscription from '@Subscription/scenes';
import * as Profile from '@Profile/scenes';


export default function(store, history) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={LaunchScene} />
        <Route path="/user">
          <Route path="auth/" component={LoginRegistration.AuthScene} />
          <Route path="login/" component={LoginRegistration.LoginRegisterScene} />
          <Route path="logout/" component={LoginRegistration.LogoutScene} />
          <Route path="forgot-password/" component={LoginRegistration.ForgotPasswordScene} />
          <Route path="verify/" component={LoginRegistration.VerifyUserScene} />
          <Route path="register/" component={LoginRegistration.RegisterScene} />
          <Route path="more-info/" component={LoginRegistration.LoginInfoScene} />
        </Route>
        <Route path="/customer">
          <Route path="onboard/" component={LoginRegistration.CustomerOnboardScene} />
        </Route>
         <Route path="/booking">
          <Route path="choose-activity/" component={Booking.ChooseActivityScene} />
          <Route path="choose-location/" component={Booking.ChooseLocationScene} />
          <Route path="choose-datetime/" component={Booking.ChooseDateTimeScene} />
          <Route path="choose-trainer/" component={Booking.ChooseTrainerScene} />
          <Route path="choose-plan/" component={Booking.ChoosePlanScene} />
          <Route path="add-friends/" component={Booking.AddFriendsScene} />
          <Route path="review-workout/" component={Booking.ReviewWorkoutScene} />
          <Route path="edit-workout/" component={Booking.EditWorkoutScene} />
         </Route>
         <Route path="/subscribe">
          <Route path="add-subscription/" component={Subscription.SubscriptionScene} />
         </Route>

         <Route path="/profile">
          <Route path="edit/" component={Profile.EditProfileScene} />
          <Route path="account-settings/" component={Profile.AccountSettingsScene} />
          <Route path="subscription-settings/" component={Profile.SubscriptionSettingsScene} />
          </Route>
      </Router>
    </Provider>
  );
};
