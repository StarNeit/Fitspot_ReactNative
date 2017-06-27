import React, {Component} from 'react'
import {connect} from 'react-redux'
import AccountSettings from '@Profile/components/AccountSettings'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
//import { addFriends } from '@store/modules/profile/actions';

type Props = {
  bookingState: Object,
  addFriends: Function,
}

class AccountSettingsContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.onSelectFriends = this.onSelectFriends.bind(this)
  }
  onSelectFriends(numFriends) {
    this.props.addFriends(numFriends);
    Actions.reviewWorkout();
  }
  render() {
    return (<AccountSettings
              onSelectFriends = {this.onSelectFriends}
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    appSettings: state.auth.appSettings,
    bookingState: state.booking,
    numFriends: state.booking.numFriends,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriends: (trainer) => {
      dispatch(addFriends(trainer))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsContainer)
