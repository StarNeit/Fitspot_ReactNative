import React from 'react'
import {connect} from 'react-redux'
import ApiUtils from '@utils/ApiUtils'
import {Image, TouchableHighlight, View, Animated, Easing, TouchableWithoutFeedback,Text,Dimensions, Picker} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import Title from '@components/Title'
import Button from '@components/Button'
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from '@components/AwesomeButton';

import { fetchUnratedSessions } from '@store/modules/workouts/actions'



const Item = Picker.Item;
const RatingChoice = {
  GYM: 0,
  TRAINER: 1,
}


type Props = {

  visible: Boolean,
  workoutSession: Object,
  getUnrated: Function,

}

class RatingModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blackViewOpacityValue: new Animated.Value(1.0),
      whiteViewOpacityValue: new Animated.Value(1.0),
      height: 1000,
      gymRating: '5',
      trainerRating: '5',
      currentRatingChoice: RatingChoice.TRAINER,
      pickerBottomValue: new Animated.Value(-250),
      btnSubmitState:'idle'
    };

    this.state.blackViewOpacityValue.setValue(0);
    this.state.whiteViewOpacityValue.setValue(0);
  }
  hideSelf(){
    this.setState({height: 1000, visible: false})
    Actions.pop()
  }

  showSelf(){
    this.setState({height: 0, visible:true})
  }
  componentDidMount(){
    
    this.presentModal()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.visible == true && this.state.visible == false) {
      this.setState({
      headerText: nextProps.headerText,
      detailsText: nextProps.detailsText,
      subDetailsText: nextProps.subDetailsText,
      cancelButtonText: nextProps.cancelButtonText,
      okayButtonText: nextProps.okayButtonText,
      showImage : nextProps.showImage,
      image : nextProps.image,
      onOkay: nextProps.onOkay,
      onCancel: nextProps.onCancel
      })
      this.presentModal();
    }
  }



  presentModal() {
    this.showSelf();
    Animated.sequence([
    Animated.timing(                          // Base: spring, decay, timing
      this.state.blackViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 1,                         // Animate to smaller size
        easing: Easing.quad,
      }
    ),Animated.timing(                         // Base: spring, decay, timing
      this.state.whiteViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 1.0,                         // Animate to smaller size
        easing: Easing.quad,
      },
    )]).start();                                // Start the animation

  }

  dismissModal(){
    Animated.sequence([
    Animated.timing(                          // Base: spring, decay, timing
      this.state.whiteViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 0,                         // Animate to smaller size
        easing: Easing.quad,
      }
    ),Animated.timing(                         // Base: spring, decay, timing
      this.state.blackViewOpacityValue,                 // Animate `bounceValue`
      {
        toValue: 0.0,                         // Animate to smaller size
        easing: Easing.quad,
        duration: 700,
      },
    )]).start(this.hideSelf());
  }

  okPress(){
    this.dismissModal()
    if(this.state.onOkay != null){
      this.state.onOkay()
    }


  }
  cancelPress(){
    this.dismissModal()
    if(this.state.onCancel !== null){
      this.state.onCancel()
    }


  }

  rate(rateItem){
    this.setState({currentRatingChoice: rateItem})
    this.showPicker()
  }

  renderStarRating(rateItem){
    var num = '5.0';
    var halfNum = false
    if(rateItem === 'gym'){
      num = this.state.gymRating.split('.')
    }else{
      num = this.state.trainerRating.split('.')
    }

    // if(num[1] !== '0'){
    //   halfNum = true
    // }

    var numInt = parseInt(num[0])
    var stars = []

    for (var i = 0; i < 5; i++) {
      if((i+1) <= numInt){
        stars.push((<Icon key={Math.random(5)} name="star" size={15} color="#F6A623" />))
      }else if(halfNum){
        halfNum = false;
        stars.push((<Icon key={Math.random(5)} name="star-half-o" size={15} color="#F6A623" />))
      }else{
        stars.push((<Icon key={Math.random(5)} name="star-o" size={15} color="#F6A623" />))
      }
    }
    return stars

  }

  changeRatingValue(value){
    if(this.state.currentRatingChoice === RatingChoice.GYM){
      this.setState({gymRating : value})
    }else{
      this.setState({trainerRating : value})
    }
  }

  showPicker(){
    Animated.timing(
    this.state.pickerBottomValue,
      {
        toValue: 0,
        duration: 500,
        easing: Easing.quad
      }
    ).start();
  }

  hidePicker(){
    Animated.timing(
      this.state.pickerBottomValue,
      {
        toValue: -250,
        duration: 500,
        easing: Easing.quad
      }
    ).start();
  }

  submitRatings(){
    this.setState({btnSubmitState: 'adding'})
    ApiUtils.patch('workouts/rate-session/' + this.props.workoutSession.id, {'trainerRating':this.state.trainerRating, 'gymRating':this.state.gymRating})
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        this.setState({btnSubmitState: 'success'})
        this.dismissModal();
        this.props.getUnrated();
      } else {
        dispatch(trainerConfirmFail(jsonBody.message))
      }

    }).catch(err => {
      console.log('Error: ', err);
    })
  }


  render() {
    const { workoutSession } = this.props
    return (
      <TouchableWithoutFeedback onPress={()=>this.dismissModal()}>
      <Animated.View style={[styles.container,{
        opacity: this.state.blackViewOpacityValue, marginTop: this.state.height}]}  >
        <Animated.View style={[styles.contentContainer,{
          opacity: this.state.whiteViewOpacityValue}]}>
          {this.props.showImage ?
            <View style={{alignSelf:'center',marginTop:24,}}>
            <Image source={this.props.image} style={{width:72,height:72 ,borderRadius:36, justifyContent:'center',backgroundColor:'yellow'}} />
            </View>
            :
            null
          }
          <View>
            <Text style={styles.headerText}>How was your workout?</Text>
          </View>
          <View>
            <Text style={styles.detailsText}>Please rate your experience to let others know what to expect.</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <View>
              {workoutSession.trainer === null ? null :<View>
              <Image style={{alignSelf:'center'}} source={{uri: workoutSession.trainer.avatar.url }} style={{width:72,height:72 ,borderRadius:36}} />
              <Text style={styles.nameText}>{workoutSession.trainer.firstName} {workoutSession.trainer.lastName}</Text>
              <TouchableWithoutFeedback onPress={() => this.rate(RatingChoice.TRAINER)}>
                <View>
                <View style={{flexDirection:'row',marginTop:6}}>
                {this.renderStarRating('trainer')}
                </View>
                <Text style={styles.nameText}>Tap to Rate</Text>
                </View>
              </TouchableWithoutFeedback></View>
}
            </View>
            <View style={{alignSelf:'center'}}>
              { workoutSession.trainer === null ? null :
                <View>
              <Image style={{alignSelf:'center'}} source={{uri: workoutSession.trainer.avatar.url }} style={{width:72,height:72 ,borderRadius:36}} />
              <Text style={[styles.nameText,{maxWidth:75}]}>{workoutSession.gym.name}</Text>
                <TouchableWithoutFeedback onPress={() => this.rate(RatingChoice.GYM)}>
                  <View>
                  <View style={{flexDirection:'row',marginTop:6,}}>
                    {this.renderStarRating('gym')}
                  </View>
                  <Text style={styles.nameText}>Tap to Rate</Text>
                  </View>
                </TouchableWithoutFeedback>
                </View>
              }
            </View>
          </View>
          <View style={{height:40,backgroundColor:'yellow',marginTop:24}}>
          <AwesomeButton backgroundStyle={styles.okButtonStyle}
                  labelStyle={styles.okButtonTextStyle}
                  transitionDuration={200}
                  states={{
                    idle: {
                      text: "Submit Rating",
                      onPress: () => this.submitRatings(),
                      backgroundColor: '#5fb13d',
                      textColor: '#fff',
                    },
                    adding: {
                      text: 'Sending Ratings',
                      backgroundColor: '#4c4c4c',
                      spinner: true,
                      textColor: '#ffffff'
                    },
                    error: {
                      text: 'Error Uploading',
                      backgroundColor: '#ff0000',
                      textColor: '#ffffff'
                    },
                    success: {
                      text: 'Ratings submitted.',
                      backgroundColor: '#ffffff',
                      textColor: '#5fb13d',
                    },
                  }}
                  buttonState={this.state.btnSubmitState}
                  />
        </View>
        </Animated.View>
        <Animated.View style={{width:Dimensions.get('window').width,backgroundColor:'white',position:'absolute',bottom:this.state.pickerBottomValue,borderTopColor:'#4c4c4c',borderTopWidth:1}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:'#F2F2F2',borderBottomWidth:1,}}>
            <Text style={{marginLeft: 12, fontFamily:'System',fontSize:12,marginTop:12,marginBottom:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>Select Rating</Text>
            <TouchableHighlight style={{marginRight:12,marginTop:12,}} onPress={() => this.hidePicker()} underlayColor={'rgba(0,0,0,0)'}>
              <Text style={{marginRight: 12, fontFamily:'System',fontSize:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>Save</Text>
              </TouchableHighlight>
          </View>
          <Picker
             enabled={false} selectedValue={this.state.currentRatingChoice === RatingChoice.GYM ? this.state.gymRating : this.state.trainerRating}
             onValueChange={(friends) => this.changeRatingValue(friends)}
             >
            <Item label="1" value="1" />
            <Item label="2" value="2" />
            <Item label="3" value="3" />
            <Item label="4" value="4" />
            <Item label="5" value="5" />
          </Picker>
        </Animated.View>
      </Animated.View>

      </TouchableWithoutFeedback>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUnrated: () => {
      dispatch(fetchUnratedSessions())
    }
  }
}

export default connect(null, mapDispatchToProps)(RatingModal);
