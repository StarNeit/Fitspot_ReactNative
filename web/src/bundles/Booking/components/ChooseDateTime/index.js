import React, { Component, PropTypes } from 'react';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
import { Field, reduxForm } from 'redux-form';
import DateTimeForm from './DateTimeForm';
import moment from 'moment'

const ROUNDING_MINUTES = 90;
const ROUNDING = ROUNDING_MINUTES * 60 * 1000; /*ms*/

class ChooseDateTime extends Component {

    constructor(props) {
        super(props);
        const {bookingState} = this.props;
        var currentStep = this.props.bookingState.currentStep;
        var totalSteps = this.props.bookingState.totalSteps;
        var date = this.props.bookingState.chosenDate.length > 0 ?
                    moment(bookingState.chosenDate).format("MM-DD-YYYY") : moment().format("MM-DD-YYYY");
        var time = this.props.bookingState.chosenDate.length > 0 ?
                    moment(bookingState.chosenDate).format("h:00 a") :
                    moment(Math.ceil((+moment().add(ROUNDING_MINUTES,'minutes')) / ROUNDING) * ROUNDING).format("h:mm a");
        this.state = {
            currentStep: currentStep,
            totalSteps: totalSteps,
            date: date,
            time: time,
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3 booking-section">
                    <h1 className="text-center marginBottom50">Choose Date & Time</h1>
                        <DateTimeForm onSubmit={this.props.onContinueClick}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseDateTime;