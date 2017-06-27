import React from 'react';
import GoogleMapReact from 'google-map-react';
import GymInfoCard from './GymInfoCard';
import AddressForm from './AddressForm';
import Geosuggest from 'react-geosuggest';
import PlacesAutoCompleteComponent from '../PlacesAutoCompleteComponent'
import MarkerComponent from './MarkerComponent';

type Props = {
  gyms: Object,
  bookingState: Object,
  selectLocation: Function,
  locationPermission: bool,
  currentLocation: Object,
  currentItem: 0,
  addLocation: Function,
};



class ChooseLocation extends React.Component {

  constructor(props) {
    console.log(props);
    super(props);
    var currentStep = this.props.bookingState.currentStep
    var totalSteps = this.props.bookingState.totalSteps
    this.state = {
      currentStep: currentStep,
      totalSteps: totalSteps,
      locationPermission: props.locationPermission,
      selectedOption: "prevLocation",
    };
    //{lat: 33.8101512, lng: -84.4225184}
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission){
      this.setState({locationPermission: nextProps.locationPermission});
    }
  }
  renderLocation() {
    if(this.state.selectedOption == 'prevLocation') {
      return this._renderPrevLocation();
    } else {
      return this._renderNewLocation();
    }
  }
  handleAddLocationClick() {
    //console.log('handle add location click');
    this.setState({selectedOption :'newLocation'});
  }
  _renderNewLocation() {
    return (
        <div>        
          <div className="container-fluid map-section">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="col-xs-12 text-center settings find-gym">
                  <AddressForm gyms={this.props.bookingState.gyms} onLocationSelected={(location) => {
                    console.log(location);this.props.onChooseLocation(location)
                    }
                  }/>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 hidden-xs hidden-sm kill-left-padding kill-right-padding">
                {this._renderLocationMarkers()}
              </div>
            </div>
          </div>
        </div>

    );
  }
  _renderLocationMarkers() {
    return (
      <GoogleMapReact
        style={{height: '100vh'}}
        bootstrapURLKeys={{key: "AIzaSyArRWqezgpwrJhw9l24KVRLZbdkTQ-IVxU"}}
        defaultCenter={{lat: 33.8101512, lng: -84.4225184}}
        defaultZoom={12}
      >
      {this.props.bookingState.gyms.map(location => <MarkerComponent
        lat={location.lat}
        lng={location.lon}
        text={location.name}
        key={location.id}
      />)}
    </GoogleMapReact>);
  }
  _renderPrevCards() {
    return this.props.bookingState.gyms.map(loc => {
            return (
            <div key={loc.id} className="col-xs-12 col-sm-6 col-md-3" onClick={() => this.props.onChooseLocation(loc)}>
                <GymInfoCard {...loc}/>
            </div>
            );
        });
  }
  _renderPrevButtons() {
    return (
      <div>
        <div className="row text-center marginBottom50">
          <div className="col-xs-12 col-sm-6  col-sm-offset-3">
            <a href="#" className="btn btn-info btn-lg btn-block disabled">Load More Previous Locations</a>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-xs-12 col-sm-6  col-sm-offset-3">
            <a href="javascript:void(0)" className="btn btn-info btn-lg btn-block" onClick={() => this.handleAddLocationClick()}>Add Location</a>
          </div>
        </div>
      </div>
    )
  }
  _renderPrevLocation() {
    return (
      <div className="container">
        {this._renderPrevCards()}
        {this._renderPrevButtons()}
      </div>
    )

  }
  handleOptionChange (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }
  render() {
    const { gyms, locationPermission } = this.props
    return (
      <div className="booking-step-3">
        <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="text-center">
                <h2 className="fw500 marginBottom20">Choose Location</h2>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center settings">
              <label htmlFor="prevLocation" className={"radio-inline trainerL " +
                (this.state.selectedOption === 'prevLocation' ? 'active' : '')}>
                <input id = "prevLocation" type="radio" value="prevLocation" className="trainer"
                              checked={this.state.selectedOption === 'option2'}
                              onChange={this.handleOptionChange.bind(this)} />
                Previous Location
              </label>
              <label htmlFor="newLocation" className={"radio-inline trainerL " +
              (this.state.selectedOption === 'newLocation' ? 'active' : '')}>
              <input id = "newLocation" type="radio" value="newLocation" className="trainer"
                              checked={this.state.selectedOption === 'option3'}
                              onChange={this.handleOptionChange.bind(this)} />
                New Location
              </label>
              <p className="text-center marginBottom20"><strong>TRAINER AREA - SUNSET BLVD 1017, ATLANTA</strong></p>
            </div>
          </div>
        </div>
        <div className="row">
            {this.renderLocation()}
        </div>
      </div>
    )
  }
}

export default ChooseLocation
