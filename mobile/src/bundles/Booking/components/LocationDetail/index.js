import React from 'react'
import { View,Image,Text,StatusBar,TouchableHighlight,ListView,Dimensions } from 'react-native'
import {Actions} from 'react-native-router-flux'

import styles from './styles'

import BasicLocationView from './basicLocationView'
import GymView from './gymView'
import Carousel from 'react-native-snap-carousel';

import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
  visible: bool,
  locationItems: Array,
  currentLocation: Object,
  dismissDetails: Function,
  currentItem: integer,
  confirmLocation: Function
}

class LocationDetail extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      locationItems: props.locationItems,
      currentItem: props.currentItem
    };

  }

  renderItems() {
    return this.state.locationItems.map( gym => {
      return(
        <View key={'gymid' + gym.id}>
        <GymView currentLocation={this.props.currentLocation} gym={gym} />
            <TouchableHighlight onPress={ () => this.props.confirmLocation(gym)} style={{backgroundColor: DEFAULT_GREEN_COLOR,height:50, justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
              <Text style={{color: 'white', textAlign: 'center',alignSelf: 'center'}}>
                Choose {gym.name}
              </Text>
            </TouchableHighlight>
            </View>
      )
    })

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locationItems.length != this.state.locationItems.length){
      this.setState({ locationItems: nextProps.locationItems})
    }
  }


  render() {
    if(!this.props.visible){
      return null;
    }

    return (
      <TouchableHighlight style={styles.container} onPress={() => this.props.dismissDetails() } underlayColor={'#00000000'}>
        <View style={{flex:1}}>
              <Carousel
                  ref={(carousel) => { this._carousel = carousel; } }
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={256}
                  firstItem={this.props.currentItem}
                  autoplay={false}
                  slideStyle={{backgroundColor:'rgba(0,0,0,0)'}}
                  containerCustomStyle={{backgroundColor:'rgba(0,0,0,0.8)'}}
                  >
                  { this.renderItems() }
                </Carousel>
        </View>
      </TouchableHighlight>

    )
  }
}

export default LocationDetail
