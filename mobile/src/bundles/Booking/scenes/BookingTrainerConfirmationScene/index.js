import React, { Component } from 'react'
import BookingTrainerConfirmationContainer from '@Booking/containers/BookingTrainerConfirmationContainer'


type Props = {
  workouteItem: Object
}


class BookingTrainerConfirmationScene extends Component {

  props: Props


  render() {
    return (
      <BookingTrainerConfirmationContainer workoutItem={this.props.workoutItem}  />
    )
  }

}


export default BookingTrainerConfirmationScene
