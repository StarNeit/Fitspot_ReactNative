import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  ListView
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'
import ImageSlider from 'react-native-image-slider';
import Swiper from 'react-native-swiper'
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
  gym: Object,
  currentLocation: Object
}

class GymView extends React.Component {


  constructor(props) {
    super(props);


    this.state = {
      a: {
        latitude: 33.7883194,
        longitude: -84.3750677,
      },
    };
  }


  distanceFromPoint(){

    var lat1 = this.props.gym.lat
    var lon1 = this.props.gym.lon

    var lat2 = this.props.currentLocation.lat
    var lon2 = this.props.currentLocation.lon




    var R = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180)
    var lat2 = lat2 * (Math.PI / 180)

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return Math.ceil(d * 0.621371);
  }


  render() {
    var imageArray = [
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/640/480/any']

    const {gym} = this.props
    return (
      <TouchableHighlight style={styles.gymDetailContainer}>

        <View>
          <View>
              <Swiper loadMinimal loadMinimalSize={1} height={160} width={256} loop={false} style={{borderTopLeftRadius:10,borderTopRightRadius:10,}}>
                <Image source={{uri: 'https://placeimg.com/640/480/any'}} style={{width:256,flex: 1,backgroundColor: 'transparent'}} />
                <Image source={{uri: 'https://placeimg.com/640/480/any'}} style={{width:256,flex: 1,backgroundColor: 'transparent'}} />
                <Image source={{uri: 'https://placeimg.com/640/480/any'}} style={{width:256,flex: 1,backgroundColor: 'transparent'}} />
                <Image source={{uri: 'https://placeimg.com/640/480/any'}} style={{width:256,flex: 1,backgroundColor: 'transparent'}} />
            </Swiper>
          </View>
          <Text style={styles.locationName}>{gym.name}</Text>
          <Text style={styles.locationInfo}>{this.distanceFromPoint()} Mi - {gym.address}</Text>
           <MapView scrollEnabled={false} style= {[styles.map,{backgroundColor: 'black'}]}
            ref={ref => { this.map = ref; }}
                initialRegion={{
                  latitude: gym.lat,
                  longitude: gym.lon,
                  latitudeDelta: 0.0020,
                  longitudeDelta: 0.0020,
                }}
              >
              <MapView.Marker
                 identifier="Marker1"
                 coordinate={{latitude:gym.lat,longitude:gym.lon}}
                 title = "Suh A"
                 description =" DESC"
                 image={require('../../assets/pin-location-no-pic.png')}
               />
            </MapView>
        </View>

      </TouchableHighlight>
    )
  }
}

export default GymView
