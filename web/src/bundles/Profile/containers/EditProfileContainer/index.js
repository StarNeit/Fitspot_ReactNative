import React, {Component} from 'react'
import {connect} from 'react-redux'
import update from 'immutability-helper';
import EditProfile from '@Profile/components/EditProfile'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { updateCustomer } from '@store/modules/auth/actions'
import CONSTS from '@utils/Consts';
import { toRestDate } from '@shared/helpers';

type Props = {
  updateCustomer: Function,
}

class EditProfileContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error);
    } else if (!nextProps.isFetching && !nextProps.error) {
      Actions.home();
    }
  }
  handleSubmit(form) {
    let user = update(this.props.user, {
      userType: {$set: CONSTS.USER_TYPE.CUSTOMER},
    });

    const apiForm = update(form, {
      birthday: {$set: toRestDate(form.customer.birthday)}
    });

    if (user.customer) {
      user = update(user, {
        customer: {$merge: apiForm.customer},
      })
    } else {
      user = update(user, {
        customer: {$set: apiForm},
      });
    }
    // user = update(user, {
    //   customer : {
    //     preferredTrainerGender: {$set: 0},
    //   }
    // });
    this.props.updateCustomer(user);
  }

  render() {
    return (<EditProfile
              handleSubmit = {this.handleSubmit}
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
    isFetching: state.auth.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCustomer: (user) => {
      dispatch(updateCustomer(user))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)
