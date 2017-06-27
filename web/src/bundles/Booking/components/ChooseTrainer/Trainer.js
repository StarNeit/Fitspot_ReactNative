import React, { Component, PropTypes } from 'react';
import { join, map } from 'lodash'
const Trainer = (props) => {
  const { trainer, onChooseTrainer } = props;
  //console.log(props);
  var trainerActivities = trainer.trainer && trainer.trainer.activities ? join(map(trainer.trainer.activities, 'name'), ", ") : 'Activities vary depending on location';
  return (
    <div
        className="col-xs-12 col-sm-6 col-md-3"
        onClick={() => onChooseTrainer(trainer)}>
        <a href="#">
          <div className="book-trainer-profile text-center">
            <p className="trainer-note-container">

                <span className="trainer-note">Available at 2:00 pm (2h later)</span>

                <img
                    className="trainer-profile-avator"
                    src={require('../../assets/trainer-placeholder-1.jpg')}/>
            </p>
            <h3>{props.trainer.firstName} {props.trainer
                    .lastName
                    .slice(0, 1)}</h3>
            <div className="rating-stars">

                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-empty" aria-hidden="true"></i>
            </div>

            <p className="trainer-details">{props.trainer.trainer ? props.trainer.trainer.bio : props.trainer.bio}</p>
            <p>
                <strong>{trainerActivities}</strong>
            </p>
            <hr/>
            <p className="certifications">TRAINER ID</p>
            <p className="certification-items">{props.trainer.id === -1 ? 'Not Avaiable' : props.trainer.publicId}</p>
        </div>
        </a>
    </div>
  );
}

export default Trainer;
