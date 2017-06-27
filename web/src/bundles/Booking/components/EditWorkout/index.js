import React, {Component, PropTypes} from 'react';
import CONSTS from '@utils/Consts';
import moment from 'moment';
import DateTimeForm from '@Booking/components/ChooseDateTime/DateTimeForm';

type Props = {
    plans : Array,
    bookingState : object,
}

class EditWorkout extends React.Component {
    constructor(props) {
        super(props);
        var workout = this.props.workouts.workoutItems[0];
        this.state = {
          showDate: false,
          date: workout.dtStart,
        };
        this.onContinueClick = this.onContinueClick.bind(this);
    }
    onContinueClick(form) {
      let newTime = moment(moment(form.day).format('MM/DD/YYYY') +' '+ (moment(form.time).isValid() ?
              moment(form.time).format('h:mm a') :
              form.time), 'MM-DD-YYYY h:mm a');
        //using moment lib for format our date timestamp
      this.setState({date : newTime, showDate: false});
    }
    changeDateVisible() {
       this.setState({showDate: !this.state.showDate})
    }
    renderChangeDate() {
      if(this.state.showDate) {
          var initialValues = { //pass initial values for edit workout
              day: moment(this.state.date).toString(),
              time: moment(this.state.date).toString()
          };
        return (
          <div className="workout-row">
            <DateTimeForm initialValues={initialValues} title='Change Date' onSubmit={this.onContinueClick}/>
          </div>
        )
      }
    }

    render() {
        var workout = this.props.workouts.workoutItems[0];

        return (
          <div className="container">

            <div className="row">

                  <div className="col-xs-12 col-sm-6 col-sm-offset-3">

                    <div className="workout-row">

                      <h4><small>ACTIVITY</small>Strength</h4>

                    </div>

                    <div className="workout-row">

                      <h4><small>TRAINER</small>{workout.trainer.firstName} {workout.trainer.lastName.slice(0,1)}</h4>

                    </div>

                    <div className="workout-row">

                      <h4><small>DATE & TIME</small>{moment(this.state.date).format("MMM DD h:mm a")}</h4>
                      <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={() => this.changeDateVisible()}>Change</a>

                    </div>

                    {this.renderChangeDate()}

                    <div className="workout-row">

                      <h4><small>LOCATION</small>{workout.gym.name}</h4>

                    </div>

                    <div className="workout-row">

                      <h4><small>FRIENDS</small>+{workout.numFriends} Participants</h4>

                    </div>

                    <button type="button" className="btn btn-info btn-lg btn-block marginBottom20"
                      onClick={() => this.props.onRequestWorkoutChange(workout.id, this.state.date)}>Save Changes</button>

                    <button type="button" className="btn btn-danger btn-lg btn-block"
                      onClick={() => this.props.onCancelWorkout(workout.id)}>Cancel Workout</button>

                  </div>

              </div>

          </div>
        )
    }
}

export default EditWorkout;
