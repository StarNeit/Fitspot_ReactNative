import React, {Component, PropTypes} from 'react';
import Trainer from './Trainer';
import CONSTS from '@utils/Consts'
import { find } from 'lodash'

type Props = {
    trainers: Object,
    activities: Array,
    bookingState: Object,
    selectTrainer: Function,
}
class ChooseTrainer extends React.Component {
    constructor(props) {
        super(props);
        var currentStep = this.props.bookingState.currentStep
        var totalSteps = this.props.bookingState.totalSteps

        this.state = {
            currentStep: currentStep,
            totalSteps: totalSteps,
            activities: this.props.activities,
            selectedTrainer: {},
            trainers: this.props.trainers,
        }
    }

    renderTrainers() {
      var trainers = this.props.trainers
      if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY){
        var fcTrainer = {
          firstName: 'Fitspot',
          lastName: 'Choose',
          id: -1,
          bio: "Fitspot will send an express message to all of our trainers to find you one at your selected time",

        };
        var foundTrainer = find(trainers, (trainer) => {
          return trainer.id === -1;
        });
        if(!foundTrainer) {
          trainers.unshift(fcTrainer);
        }
      }
      console.log(trainers);
      return trainers.map(trainer => <Trainer key={trainer.id} trainer={trainer} {...this.props}/>);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="text-center">
                            <h2 className="fw500 marginBottom20">Choose Trainer</h2>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center settings">

                        <label className="radio-inline active trainerL" htmlFor="inlineRadio4">
                            <input
                                type="radio"
                                className="trainer"
                                name="inlineRadioOptions2"
                                id="inlineRadio4"
                                value="Any"/>
                            Any
                        </label>
                        <label className="radio-inline trainerL" htmlFor="inlineRadio5">
                            <input
                                type="radio"
                                className="trainer"
                                name="inlineRadioOptions2"
                                id="inlineRadio5"
                                value="Male"/>
                            Male
                        </label>
                        <label className="radio-inline trainerL" htmlFor="inlineRadio6">
                            <input
                                type="radio"
                                className="trainer"
                                name="inlineRadioOptions2"
                                id="inlineRadio6"
                                value="Female"/>
                            Female
                        </label>

                    </div>
                </div>
                <div className="row">
                    {this.renderTrainers()}
                </div>
                <div className="row text-center marginBottom50">
                    <div className="col-xs-12 col-sm-4  col-sm-offset-4">
                        <a href="#" className="btn btn-info btn-lg btn-block disabled">Load More Trainers</a>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-xs-12 col-sm-4  col-sm-offset-4">
                        <a href="#" className="btn btn-info btn-lg btn-block">Let Fitspot Choose my Trainer</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseTrainer;
