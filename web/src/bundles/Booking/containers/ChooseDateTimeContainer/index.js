import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChooseDateTime from '@Booking/components/ChooseDateTime'
import * as Actions from '@shared/actions';
import { selectDateTime } from '@store/modules/booking/actions'
import moment from 'moment'



type Props = {
  bookingState: Object,
  selectDateTime: Function,
}

class ChooseDateTimeContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.onContinueClick = this.onContinueClick.bind(this);
  }


  onContinueClick(form) {
    let newTime = moment(form.day +' '+ (moment(form.time).isValid() ? moment(form.time).format('h:mm a') : form.time),'MM-DD-YYYY h:mm a'); //using moment lib for format our date timestamp
    this.props.selectDateTime(newTime)
    Actions.chooseLocation();
}
  render() {
    const {error, isFetching} = this.props;
    return (
      <ChooseDateTime {...this.props} onContinueClick={this.onContinueClick} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    bookingState: state.booking
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectDateTime: (dateTime) => {
      dispatch(selectDateTime(dateTime))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseDateTimeContainer)
