import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  ListView,
  TextInput
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
}

class BasicLocationView extends React.Component {


  constructor(props) {
    super(props);


    this.state = {
      a: {
        latitude: 33.7883194,
        longitude: -84.3750677,
      },
    };
  }


  render() {
    return (
      <View style={styles.container}>
            <MapView style= {[styles.map,{backgroundColor: 'black'}]}
            ref={ref => { this.map = ref; }}
                initialRegion={{
                  latitude: 33.7883194,
                  longitude: -84.3750677,
                  latitudeDelta: 0.0020,
                  longitudeDelta: 0.0020,
                }}
              >
              <MapView.Marker
                 identifier="Marker1"
                 coordinate={this.state.a}
                 title = "Suh A"
                 description =" DESC"
                 image={require('../../assets/pin-location-no-pic.png')}
               />
            </MapView>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInput} placeholder= 'Your Address' placeholderTextColor='#B3B3B3'/>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInput} placeholder= 'Parking, Apartment, # Etc' placeholderTextColor='#B3B3B3'/>
            </View>
      </View>
    )
  }
}

export default BasicLocationView
