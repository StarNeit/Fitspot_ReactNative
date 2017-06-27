import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChooseActivity from '@Booking/components/ChooseActivity'
import { setBookingType, selectActivity } from '@store/modules/booking/actions'
import CONSTS from '@utils/Consts'
import * as Actions from '@shared/actions';

type Props = {
  activities: Array,
  bookingState: Object,
  selectActivity: Function,
  setBookingType: Function,
}


class ChooseActivityContainer extends Component {

  props: Props
  constructor(props) {
    super(props);
    this.onChooseActivity = this.onChooseActivity.bind(this);
    this.onSelectBrowseTrainers = this.onSelectBrowseTrainers.bind(this);
  }
  onChooseActivity(activity) {
    if(this.props.bookingState.bookingType === CONSTS.BOOKING_TYPE.UNDEFINED) {
      this.props.setBookingType(CONSTS.BOOKING_TYPE.BY_ACTIVITY);
    }
    this.props.selectActivity(activity);
    Actions.chooseDateTime();
  }

  onSelectBrowseTrainers() {
    this.props.setBookingType(CONSTS.BOOKING_TYPE.BY_TRAINER);
    Actions.chooseTrainer();
  }
  render() {
    return (
      <ChooseActivity {...this.props }
        onChooseActivity={this.onChooseActivity}
        onSelectBrowseTrainers={this.onSelectBrowseTrainers} />
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    appSettings: state.auth.appSettings,
    activities: state.booking.bookingType === CONSTS.BOOKING_TYPE.BY_TRAINER ? state.booking.chosenTrainer.trainer.activities :
    state.auth.appSettings.activities,
    bookingState: state.booking,
    planItems: state.plans.planItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectActivity: (activity) => {
      dispatch(selectActivity(activity))
    },
    setBookingType: (type) => {
      dispatch(setBookingType(type))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseActivityContainer)
