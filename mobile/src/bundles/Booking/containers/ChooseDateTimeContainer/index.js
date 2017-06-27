import React, { Component } from 'react'
import ChooseDateTime from '@Booking/components/ChooseDateTime'
import { connect } from 'react-redux'
import { selectDateTime } from '@store/modules/booking/actions'
import CONSTS from '@utils/Consts'

type Props = {
  bookingState: Object,
  selectDateTime: Function,
}


class ChooseDateTimeContainer extends Component {

  props: Props

  render() {
    return (
      <ChooseDateTime { ...this.props }  />
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
