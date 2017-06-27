import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import CONSTS from '@utils/Consts';

const GENDER_LIST = [
  {
    label: 'Male',
    value: CONSTS.GENDER.MALE,
  },
  {
    label: 'Female',
    value: CONSTS.GENDER.FEMALE,
  },
  {
    label: 'Unspecified',
    value: CONSTS.GENDER.UNSPECIFIED,
  },
];

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  return errors;
};


const EditProfileForm = (props) => {
  const { handleSubmit, isFetching, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <button type="button" className="btn btn-primary btn-lg btn-block btn-fb marginBottom20">Connect Facebook</button>
      <img className="img-responsive" src={require('../../assets/upload-img.jpg')} alt="profile-picture" />
      <button type="submit" className="btn btn-info btn-lg btn-block marginBottom50">Change Profile Picture</button>
      <Field name="firstName" label="First Name" type="text" component={Input} className="form-group col-xs-6 kill-left-padding" />
      <Field name="lastName" label="Last Name" type="text" component={Input} className="form-group col-xs-6 kill-right-padding" />
      <Field name="customer.birthday" label="Your Birth Date" type="text" component={Input} />
      <Field name="medicalHistory" label="Medical History" type="text" component={Input} />
      <Field name="customer.height" label="Your Height" type="text" component={Input} />
      <Field name="customer.weight" label="Your Weight" type="text" component={Input} />
      <Field name="fitnessLevel" label="Your Fitness Level" type="text" component={Input} />
      <Field name="fitnessGoal" label="Your Fitness Goal" type="text" component={Input} />
      <Field name="bodyFocus" label="Your Body Focus" type="text" component={Input} />
      <Field name="phone" label="Phone" type="text" component={Input} />
      <p className="text-center marginBottom50">What trainer type do you prefer?</p>
      <Field name="customer.preferredTrainerGender" label="Gender" component={InlineButtonList} values={GENDER_LIST} />
      <div>
        <label>Training Style</label>
        <div>
          <Field name="trainingStyle" component="select" className="form-control marginBottom50">
              <option>Any Style</option>
              <option>Yoga</option>
              <option>Pilates</option>
              <option>Stretch</option>
          </Field>
        </div>
      </div>
      <button type="submit" className="btn btn-info btn-lg btn-block"  disabled={isFetching}>Save Changes</button>
    </form>
  );
};

const form = reduxForm({
  form: 'EditProfileForm',
  validate,
})(EditProfileForm);

const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.user,
  };
}

export default connect(mapStateToProps)(form);
