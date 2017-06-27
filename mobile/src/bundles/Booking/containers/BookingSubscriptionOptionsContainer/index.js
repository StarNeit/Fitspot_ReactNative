import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookingSubscriptionOptions from '@Booking/components/SubscriptionOptions'
import { addSubscriptionOption,activateSinglePurchaseBooking } from '@store/modules/booking/actions'

import CONSTS from '@utils/Consts'

type Props = {
  items:Array,
  authState: Object,
  addSubscriptionOption: Function,
  activateSinglePurchaseBooking: Function,
  bookingState: Object,
}


class BookingSubscriptionOptionsContainer extends Component {

  props: Props

  render() {
    return (
      <BookingSubscriptionOptions {...this.props }  />
    )
  }

}


const mapStateToProps = (state) => {
  return {
    items: state.plans.planItems,
    authState: state.auth,
    bookingState: state.booking,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscriptionOption: (plan) => {
      dispatch(addSubscriptionOption(plan))
    },
    activateSinglePurchaseBooking: () => {
      dispatch(activateSinglePurchaseBooking())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingSubscriptionOptionsContainer)
