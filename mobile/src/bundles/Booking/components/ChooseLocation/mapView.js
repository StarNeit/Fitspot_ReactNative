import React from 'react'
import {View, TextInput, Text, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import MapView from 'react-native-maps';
import SyntheticEvent from 'react-native/Libraries/Renderer/src/renderers/shared/stack/event/SyntheticEvent';
import Geocoder from 'react-native-geocoder';


import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
  isVisible: bool,
  locationItems: Object,
  chooseLocation: Function,
  locationPermission: bool,
  addLocation: Function,
}

class ChooseLocationMapView extends React.Component{

  refreshLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: position});
      },
      (error) => {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Geolocation Error',
          detailsText: JSON.stringify(error),
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      },
      {enableHighAccuracy: false, timeout: 4000, maximumAge: 1000}
    );
  }

  componentDidMount() {
    if(this.props.locationPermission){
      this.refreshLocation();
    }
  }
  componentWillUnmount(){

  }

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {},
      locationItems: props.locationItems,
      locationPermission: props.locationPermission,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locationItems.length != 0){
        this.setState({
          locationItems: nextProps.locationItems
        })
    }

    if(nextProps.locationPermission != this.state.locationPermission){
      this.refreshLocation();
    }
  }

  searchList(value){
    var itemsToShow = this.props.locationItems.filter( location => location.name.toLowerCase().includes(value))
    if(value.length == 0){
      this.setState({locationItems: this.props.locationItems})
    }else{
      this.setState({locationItems: itemsToShow})
    }


  }

  longPress(obj){
    // Position Geocoding
    var LOC = {
      lat: obj.nativeEvent.coordinate.latitude,
      lng: obj.nativeEvent.coordinate.longitude
    };

    Geocoder.geocodePosition(LOC).then(res => {
        // res is an Array of geocoding object (see below)
        var response = res[0];
        var currentLoc = {
          address: response.streetNumber + ' ' + response.streetName,
          city:response.locality,
          cost:0,
          description:"",
          id:-1,
          lat:response.position.lat,
          lon:response.position.lng,
          name: response.streetNumber + ' ' + response.streetName,
          rating_avg:0,
          state:response.adminArea,
          zipcode:response.postalCode
        }
        this.props.addLocation(currentLoc)
    })
    .catch(err => console.log(err))
  }



  render(){
    if(!this.props.visible){
      return null;
    }
    const {locationItems} = this.props
    return (
      <View style={{flex:1,backgroundColor:'red',marginTop:10}}>
        <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                clearButtonMode='while-editing'
                onChangeText={(text) => this.searchList(text)}
              />
        </View>
        <View style={styles.mapContainer}>
          <MapView
          style= {styles.map}
          onLongPress={e => this.longPress(e)}
          showsUserLocation
          ref={ref => { this.map = ref; }}
              initialRegion={{
                latitude: this.state.initialPosition.coords.latitude,
                longitude: this.state.initialPosition.coords.longitude,
                latitudeDelta: 0.0980,
                longitudeDelta: 0.0460,
              }}
            >
            {
              this.state.locationItems.map(marker => (
                <MapView.Marker
                  key={marker.lat}
                  coordinate={{latitude:marker.lat,
                                longitude: marker.lon}}
                  title={marker.name}
                  description={marker.address}

                  >
                    <MapView.Callout style={{width:160}}>
                    <TouchableHighlight onPress={() => this.props.chooseLocation(marker)}>
                      <Text>{marker.name}</Text>
                    </TouchableHighlight>
                    </MapView.Callout>
                </MapView.Marker>
                )
              )
             }
          </MapView>
        </View>
      </View>
    )
  }
}

export default ChooseLocationMapView
