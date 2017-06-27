import React from 'react';
import * as Actions from '@shared/actions';
import LeftMenu from '@Profile/components/LeftMenu';
import { Field, reduxForm } from 'redux-form';
import EditProfileForm from './EditProfileForm';

class EditProfile extends React.Component {

  render() {
    return(
      <div className="container settings">

        <div className="row">
          <LeftMenu/>
          <div className="col-xs-12 col-sm-6">
              <EditProfileForm onSubmit={this.props.handleSubmit}></EditProfileForm>
          </div>

        </div>

      </div>
    )
  }

}

export default EditProfile;
