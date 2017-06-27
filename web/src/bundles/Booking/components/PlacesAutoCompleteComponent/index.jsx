import React, { Component, PropTypes } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

class PlacesAutoCompleteComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address,  (err, { lat, lng }, results) => {
      if (err) {
        console.log('Oh no!', err)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(err),
          loading: false
        })
      }
      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng });
      console.log(results);
      this.setState({
        geocodeResults: this.renderGeocodeSuccess(lat, lng),
        loading: false
      })
    })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })

  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }

  render() {
    const cssClasses = {
      root: 'input-group col-xs-6',
      label: 'form-label',
      input: 'Demo__search-input form-control special',
      autocompleteContainer: 'Demo__autocomplete-container'
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    return (
      <div className='page-wrapper'>
        <div className='container'>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-2x fa-search" aria-hidden="true"></i></span>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              classNames={cssClasses}
              autocompleteItem={AutocompleteItem}
              autoFocus={true}
              placeholder="Search"
              hideLabel={true}
              inputName="gymsearch-input"
              onEnterKeyDown={this.handleSelect}
            />
            {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          </div>
        </div>
      </div>
    )
  }
}

PlacesAutoCompleteComponent.propTypes = {

};

export default PlacesAutoCompleteComponent;