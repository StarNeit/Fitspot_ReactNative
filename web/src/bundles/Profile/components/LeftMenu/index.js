import React from 'react';
import * as Actions from '@shared/actions';

class LeftMenu extends React.Component {

  render() {
    return(
      <div className="col-xs-12 col-sm-3">

          <h2 className="text-center marginBottom50 hidden-xs">&nbsp;</h2>

          <h4 className="settings-nav"><a href="#" onClick={Actions.editProfile}>Edit Profile</a></h4>

          <h4 className="settings-nav active"><a href="#" onClick={Actions.accountSettings}>Account Settings</a></h4>

          <h4 className="settings-nav"><a href="#" onClick={Actions.subscriptionSettings}>Subscription Settings</a></h4>
      </div>
    )
  }

}

export default LeftMenu;
