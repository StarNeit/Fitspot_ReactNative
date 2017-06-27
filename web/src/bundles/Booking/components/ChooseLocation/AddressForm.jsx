import React, { Component, PropTypes } from 'react';
import GymInfoCard from './GymInfoCard';

class AddressForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedOption: "findGym",
        };
    }

    handleOptionChange(changeEvent) {
        this.setState({selectedOption : changeEvent.target.value});

    }
    render() {
        return (
            <div>
            <div className="col-sm-12 col-sm-8 col-sm-offset-2">
                <h3>Nearby Gyms</h3>
            </div>
            {this.renderStuff()}
            </div>
        );
    }
    renderStuff() {

            return this.renderNearbyGyms();

    }
    renderAddress() {
       return(
           <div className="col-xs-8 col-sm-offset-2">
            <div className="form-group">
                    <label htmlFor="exampleAddress">Address</label>
                    <input type="text" className="form-control special" id="exampleAddress" placeholder=""/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleAptFloorSuite">Apt / Floor / Suite # <small>- Optional</small></label>
                    <input type="text" className="form-control" id="exampleAptFloorSuite" placeholder=""/>
                </div>

                <div className="form-group col-xs-6 kill-left-padding">
                    <label htmlFor="exampleCity">City</label>
                    <input type="text" className="form-control" id="exampleCity" placeholder=""/>
                </div>

                <div className="form-group col-xs-3">
                    <label htmlFor="exampleState">State</label>
                    <input type="text" className="form-control" id="exampleState" placeholder=""/>
                </div>

                <div className="form-group col-xs-3 kill-right-padding">
                    <label htmlFor="exampleZipCode">ZipCode</label>
                    <input type="text" className="form-control" id="exampleZipCode" placeholder=""/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleParkingInstructions">Parking Instructions, etc. <small>- Optional</small></label>
                    <input type="text" className="form-control" id="exampleParkingInstructions" placeholder=""/>
                </div>

                <button type="submit" className="btn btn-info btn-lg btn-block">Choose This Location</button>
        </div>
       );
    }
    renderNearbyGyms () {
        return this.props.gyms.map(loc => {
            return (
            <div className="col-xs-12 col-sm-4 col-md-6 col-lg-4" key={loc.id} onClick={this.props.onLocationSelected.bind(this,loc)}>
                <GymInfoCard key={loc.id} {...loc} />
            </div>
            );
        });
    }
}


AddressForm.propTypes = {
    gyms : PropTypes.array.isRequired,
    onLocationSelected: PropTypes.func.isRequired,
};

export default AddressForm;
