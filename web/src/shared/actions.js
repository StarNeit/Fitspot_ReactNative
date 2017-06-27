import {browserHistory} from 'react-router';

export const navigateTo = (path) => {
  browserHistory.push(path);
};

export const home = () => {
  browserHistory.push('/');
};

export const userAuth = (next) => {
  let url = '/user/auth/';

  if (next) {
    url += `?next=${next}`;
  }

  browserHistory.push(url);
};

export const userLogin = (next) => {
  let url = '/user/login/';

  if (next) {
    url += `?next=${next}`;
  }

  browserHistory.push(url);
};

export const userLogout = (next) => {

  browserHistory.push('/user/logout/');
};

export const userMoreInfo = (next) => {
  let url = '/user/more-info/';
  browserHistory.push(url);
};

export const userRegister = () => {
  browserHistory.push('/user/register/');
};

export const userForgotPassword = () => {
  browserHistory.push('/user/forgot-password/');
};


export const userVerify = () => {
  browserHistory.push('/user/verify/');
};

export const customerOnboarding = () => {
  browserHistory.push('/customer/onboard/');
};

export const chooseActivity = () => {
  browserHistory.push('/booking/choose-activity/');
};

export const chooseDateTime = () => {
  browserHistory.push('/booking/choose-datetime/');
};

export const chooseLocation = () => {
  browserHistory.push('/booking/choose-location/');
};

export const chooseTrainer = () => {
  browserHistory.push('/booking/choose-trainer/');
};

export const choosePlan = () => {
  browserHistory.push('/booking/choose-plan/');
};

export const addFriends = () => {
  browserHistory.push('/booking/add-friends/');
};

export const reviewWorkout = () => {
  browserHistory.push('/booking/review-workout/');
};

export const editWorkout = () => {
  browserHistory.push('/booking/edit-workout/');
};

export const addSubscription = () => {
  browserHistory.push('/subscribe/add-subscription/');
};

export const editProfile = () => {
  browserHistory.push('/profile/edit/');
};

export const accountSettings = () => {
  browserHistory.push('/profile/account-settings/');
};

export const subscriptionSettings = () => {
  browserHistory.push('/profile/subscription-settings/');
};

export const customerSupport = () => {
  window.location.href = "mailto:info@fitspotapp.com?subject=Your%20Subject&body=Your%20message%20goes%20here";
}
