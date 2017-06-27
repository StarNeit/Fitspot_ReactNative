import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddFriends from '@Booking/components/AddFriends'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { addFriends } from '@store/modules/booking/actions';

type Props = {
  bookingState: Object,
  addFriends: Function,
}

class AddFriendsContainer extends Component {
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
    return (<AddFriends
              onSelectFriends = {this.onSelectFriends}
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    bookingState: state.booking,
    numFriends: state.booking.numFriends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriends: (trainer) => {
      dispatch(addFriends(trainer))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsContainer)
