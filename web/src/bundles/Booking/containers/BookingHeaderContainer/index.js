import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChooseActivity from '@Booking/components/ChooseActivity'
import { setBookingType, selectActivity } from '@store/modules/booking/actions'
import CONSTS from '@utils/Consts'
import * as Actions from '@shared/actions';

type Props = {
  bookingState: Object,
}
class BookingHeaderContainer extends Component {

  props: Props
  constructor(props) {
    super(props);

  }
  getHeaderTextElements() {
    var bookingState = this.props.bookingState;
    var activityName = bookingState.chosenActivity ? bookingState.chosenActivity.name: '';
    var dateTime= bookingState.chosenDate ? bookingState.chosenDate.format("MMM DD h:mm a") : '';
    var location= bookingState.chosenLocation ? bookingState.chosenLocation.name : '';
    var trainer= bookingState.chosenTrainer ? bookingState.chosenTrainer.firstName : '';
    var friends= bookingState.numFriends;
    if(bookingState.bookingType === CONSTS.BOOKING_TYPE.BY_TRAINER) {
      return (
        <span className="secondry-logo-text hidden-xs hidden-sm hidden-md">
        { trainer ? "" : 'Book Single Workout'}
        { activityName ? 'New ': ''}  { activityName ? <a className="header-booking-link" href="#"  onClick={Actions.chooseActivity}>{activityName} </a> : ''}
        { trainer ? " workout with " : ''} { trainer ? <a className='header-booking-link' href='#' onClick={Actions.chooseTrainer}>{trainer}</a> : ''}
        { dateTime ? " on" : ' on ...'} { dateTime ? <a className='header-booking-link' href='#' onClick={Actions.chooseDateTime}>{dateTime}</a> : ' '}
        { location ? " at" : ' at ...'} { location ? <a className='header-booking-link' href='#' onClick={Actions.chooseLocation}>{location}</a> : ''}

        { friends > 0 ? " and" : ''} {friends > 0 ? <a className='header-booking-link' href='#' onClick={Actions.addFriends}>{friends} {friends == 1 ? 'Friend' : 'Friends'}</a> : ''}
        </span>
      )

    } else if (bookingState.bookingType === CONSTS.BOOKING_TYPE.BY_ACTIVITY) {
      return (
        <span className="secondry-logo-text hidden-xs hidden-sm hidden-md">
          New <a className="header-booking-link" href="#"  onClick={Actions.chooseActivity}>{activityName} </a>
        { dateTime ? " Workout on" : ''} { dateTime ? <a className='header-booking-link' href='#' onClick={Actions.chooseDateTime}>{dateTime}</a> : 'workout on ... '}
        { location ? " at" : ''} { location ? <a className='header-booking-link' href='#' onClick={Actions.chooseLocation}>{location}</a> : ''}
        { trainer ? " with" : ''} { trainer ? <a className='header-booking-link' href='#' onClick={Actions.chooseTrainer}>{trainer}</a> : ''}
        { friends > 0 ? " and" : ''} {friends > 0 ? <a className='header-booking-link' href='#' onClick={Actions.addFriends}>{friends} {friends == 1 ? 'Friend' : 'Friends'}</a> : ''}
        </span>
      )
    }
  }
  renderHeaderText() {
    var bookingState = this.props.bookingState;
    if(bookingState.bookingType === CONSTS.BOOKING_TYPE.UNDEFINED) {
      return
    }


    return (
      <span>
        {this.getHeaderTextElements()}
        <span className="steps-text hidden-xs hidden-sm hidden-md pull-right">
          <i className="fa fa-check" aria-hidden="true"></i>
        </span>
        <span className="logo-devider hidden-xs hidden-sm hidden-md pull-right"></span>
      </span>
    )
  }
  _getActivity() {
    var bookingState = this.props.bookingState;
    var activityName = bookingState.chosenActivity ? bookingState.chosenActivity.name: '';
    if(activityName) {
      return
    }
  }
  renderMobileHeader() {
    return(
      <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mobile-steps"><i className="fa fa-check" aria-hidden="true"></i></span>
                    <span className="caret"></span>
          </button>
          <ul className="dropdown-menu booking-menu dropdown-menu-right">
            <li>New <a href="#">Strength</a> workout</li>
            <li>on <a href="#">Mon 14th, 8:00am</a></li>
            <li>at <a href="#">Equinox Gym</a></li>
            <li>with <a href="#">Chad R</a></li>
            <li>and <a href="#">2 friends</a></li>
          </ul>
      </div>
    )
  }
  render() {
    return (
      <header className="alternate">
    		<div className="container">
      		<div className="row">
        		<div className="col-xs-6 col-md-12">
              <a href='#' onClick={Actions.home}>
                <img src={require('@assets/img/fitspot-white.svg')} alt="Fitspot" height="40"/>
              </a>
              <span className="logo-devider hidden-xs hidden-sm hidden-md"></span>
              {this.renderHeaderText()}
            </div>
        		<div className="col-xs-6 text-right visible-xs visible-sm">
              {this.renderMobileHeader()}
            </div>
            </div>
        </div>
    	</header>
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

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingHeaderContainer)
