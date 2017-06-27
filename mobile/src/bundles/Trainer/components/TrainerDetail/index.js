import React from 'react'
import { View, Image, Text, StatusBar, TouchableHighlight, ListView, Dimensions } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import HorizontalLine from '@components/HorizontalLine'

import Carousel from 'react-native-snap-carousel';

import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

type Props = {
  visible: bool,
  trainers: Array,
  onCancelClick: Function,
  onChooseClick: Function,
  selectedTrainer: Object,
  activities: Array,
}

class TrainerDetail extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

    }
  }

  cancel(){
    this.props.onCancelClick()
  }

  renderItems() {

    let component = this

    var trainerList = this.props.trainers.filter( trainer => trainer.id > 0)

    return trainerList.map((trainer) => {
      let data = trainer
      var activities = this.props.activities.map(a => a.name);
      if(trainer.id > 0){
        activities = data.trainer.activities.map(a => a.name);
      }

      return(
        <TouchableHighlight key={data.lastName + data.firstName} onPress={() => component.cancel() } underlayColor={'#00000000'}>
          <View>
          <View style={styles.trainerContainer}>
            <Image source={{uri: data.avatar.url}} style={{width:256,height:160}} />
            <Image source={require('@images/fav-star.png')} style={[{position:'absolute', top:6,right:6}]} />

            <Text style={styles.locationName}>{data.firstName} {data.lastName.slice(0,1)}</Text>
              <Text style={styles.trainerBio}>
                {data.trainer.bio}
              </Text>
              <Text style={styles.trainerOptions}>{activities.join(', ')}</Text>
              <HorizontalLine />
              <View style={styles.certificationContainer}>
                <Text style={{fontWeight: '500',fontFamily:"System", fontSize:8, color:'#999999'}}>TRAINER ID</Text>
                <View style={{marginLeft:5,marginRight:5,width:1,height:10, backgroundColor:'#c0c0c0'}}></View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.certificationAbbrev}>{data.publicId}</Text>
                </View>
              </View>
        </View>
        <TouchableHighlight style={styles.buttonStyle} onPress={() => component.props.onChooseClick(trainer)} underlayColor={'#00000000'}>
          <Text style={styles.buttonTextStyle}>
            Choose {data.firstName}
          </Text>
        </TouchableHighlight>
        </View>
      </TouchableHighlight>
      )
    })

  }


  render() {

    if(!this.props.visible || this.props.trainers.length == 0){
      return null;
    }

    return (
      <TouchableHighlight style={styles.container} onPress={() => this.props.onCancelClick() } underlayColor={'#00000000'}>
        <View style={{flex:1}}>
              <Carousel
                  ref={'carousel'}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={256}
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

export default TrainerDetail
