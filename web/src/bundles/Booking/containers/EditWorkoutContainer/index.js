import React, {Component} from 'react'
import {connect} from 'react-redux'
import EditWorkout from '@Booking/components/EditWorkout'
import * as Actions from '@shared/actions';
import { cancelSubscription } from '@store/modules/auth/actions'
import { trainerConfirmWorkoutRequest,requestWorkoutChange, cancelWorkout } from '@store/modules/workouts/actions'
import CONSTS from '@utils/Consts'

type Props = {
    bookingState : Object,
    plans : Array,
    getPlans : Function,
    cancelWorkout: Function,
    requestWorkoutChange: Function,
}

class EditWorkoutContainer extends Component {
    props : Props
    constructor(props) {
      super(props);
      this.onCancelWorkout = this.onCancelWorkout.bind(this);
      this.onRequestWorkoutChange = this.onRequestWorkoutChange.bind(this);
    }
    onRequestWorkoutChange(workoutId, date) {
      this.props.requestWorkoutChange(workoutId, date);
    }

    onCancelWorkout(workoutId) {
        if(confirm('Are you sure you want to cancel this workout?')) {
          this.props.cancelWorkout(workoutId);
          Actions.home();
        }

    }

    componentWillMount() {
        //this.props.getPlans();
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.error && nextProps.error.length > 0){
        //TODO: Better - use modal for error
        alert(nextProps.error);
      } if(nextProps.workouts.confirmingStatus === CONSTS.API_CALL_STATUS.DELETED) {
        alert("Appointment Cancelled - We have notified the trainer of your cancellation")
      } if(nextProps.workouts.confirmingStatus === CONSTS.API_CALL_STATUS.FAILED) {
        alert("Cancellation Failed -  Please contact support for further assistance")
      } if(nextProps.workouts.confirmingStatus === CONSTS.API_CALL_STATUS.UPDATED) {
        alert("Appointment Updated - We have sent the trainer a request of your change");
        Actions.home();
      }
    }
    render() {
        return (
            <EditWorkout
                onCancelPlan = {this.onCancelPlan}
                onCancelWorkout = {this.onCancelWorkout}
                onRequestWorkoutChange = {this.onRequestWorkoutChange}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bookingState : state.booking,
      plans : state.plans.planItems,
      error : state.auth.error,
      workouts: state.workouts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      requestWorkoutChange: (workoutId,date) => {
        dispatch(requestWorkoutChange(workoutId,date))
      },
      cancelWorkout: (workoutId) => {
        dispatch(cancelWorkout(workoutId))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkoutContainer)
