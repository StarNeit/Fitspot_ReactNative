import React from 'react'

import {Animated,View,Image,Text,StatusBar,ScrollView,TouchableHighlight,ListView,Dimensions,Modal,TextInput,Picker,Easing,KeyboardAvoidingView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import moment from 'moment'
import PopupModal from '@components/PopupModal'
import HomeHelpModalPopup from '@components/PopupHelpModal/modalPopup'
import styles from './styles'
import ButtonHelp from '@components/ButtonHelp'
import BookingSubscriptionOptionsContainer from '@Booking/containers/BookingSubscriptionOptionsContainer'
import NotLoggedInView from '@components/NotLoggedInView'
import { NativeModules } from 'react-native';
import AwesomeButton from '@components/AwesomeButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ApiUtils from '@utils/ApiUtils'



import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG,DEFAULT_GREEN_COLOR} from '@theme/fonts'


class ConfirmPastWorkout extends React.Component {
  constructor(props) {
    super(props);

  }

  goToDetails(){

  }

  chat(){

  }
  render(){
    return(
      <View style ={styles.clientContainer}>
         
        <View style={[styles.rowBottom,{borderTopColor:'#E7E7E7', borderTopWidth:2}]}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15,borderBottomColor:'#E7E7E7', borderBottomWidth:2}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>DATE & TIME</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Wed 13 8:00am</Text></Text>
            </View>  
          </View>
          <View style={[styles.rowBottomColumn, {flex:1,marginRight:15,marginLeft: 15, borderBottomColor:'#E7E7E7', borderBottomWidth:2}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>TRAINER</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Robert Man</Text></Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.rowBottom,{borderBottomColor:'#E7E7E7', borderBottomWidth:2, marginTop:-25}]}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>ACTIVITY</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Strength</Text></Text>
            </View>
          </View>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15, marginRight:15}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>LOCATION</Text>
              <Text style={[styles.rowBottomText,{marginRight:6}]}><Text style={styles.bold}>Equinox Gym</Text></Text>
            </View>
          </View>
        </View>
        
        <View style={{backgroundColor:'white', borderBottomColor:'#E7E7E7',alignSelf: 'stretch',justifyContent: 'center', borderBottomWidth:2}}>
          <Text style={{marginTop:15,marginBottom:6,fontFamily:FONT_DAYTONA_REG,fontWeight:'400',fontSize:15,textAlign:'center',alignItems:'center'}}>6 Co-Workers Confirmed</Text>
          
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginTop: 20}}>
            <View style={{flexDirection: 'coloumn', alignItems:'center', justifyContent: 'center', marginTop:5, marginLeft:15}}>
              <Image source={require('@images/trainer1.png')} style={{width: 80, height: 80}}/>
              <Text style={[styles.rowBottomHeader, {marginTop: 10}]}> Jane Lewis</Text>
            </View>
            <View style={{flexDirection: 'coloumn', alignItems:'center', justifyContent: 'center', marginTop:5,marginLeft:25}}>
              <Image source={require('@images/trainer2.png')} style={{width: 80, height: 80}}/>
              <Text style={[styles.rowBottomHeader, {marginTop: 10}]}> Rico Johnson</Text>
            </View> 
            <View style={{flexDirection: 'coloumn', alignItems:'center', justifyContent: 'center', marginTop:5, marginLeft:25}}>
              <Image source={require('@images/trainer3.png')} style={{width: 80, height: 80}}/>
              <Text style={[styles.rowBottomHeader, {marginTop: 10}]}> Audrey Horne</Text>
            </View> 
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginTop: 10}}>
            <View style={{flexDirection: 'coloumn', alignItems:'center', justifyContent: 'center', marginTop:5, marginLeft:15}}>
              <Image source={require('@images/trainer1.png')} style={{width: 80, height: 80}}/>
              <Text style={[styles.rowBottomHeader, {marginTop: 10}]}> Jane Lewis</Text>
            </View>
            <View style={{flexDirection: 'coloumn', alignItems:'center', justifyContent: 'center', marginTop:5, marginLeft:25}}>
              <Image source={require('@images/trainer2.png')} style={{width: 80, height: 80}}/>
              <Text style={[styles.rowBottomHeader, {marginTop: 10}]}> Rico Johnson</Text>
            </View> 
            <View style={{flexDirection: 'coloumn', alignItems:'center', justifyContent: 'center', marginTop:5, marginLeft:25}}>
              <Image source={require('@images/trainer3.png')} style={{width: 80, height: 80}}/>
              <Text style={[styles.rowBottomHeader, {marginTop: 10,marginBottom:10}]}> Audrey Horne</Text>
            </View> 
          </View>
        </View>
        <View style={styles.bottomViewContainer}>
          <Text style={{marginTop:10,marginBottom:5,fontFamily:FONT_DAYTONA_REG,fontWeight:'400',fontSize:15,textAlign:'center',alignItems:'center'}}>Rate Workout</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:15}}>
            <Image source={require('@images/fav-star.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/fav-star.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/fav-star.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/fav-star.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/fav-star.png')} style={{width: 30, height: 30}}/>
          </View> 
          <Button buttonStyle={styles.bookActivityButtonWorkOutBottom} buttonTextStyle={styles.bookActivityButtonTextWorkOutBottom} onPress={this.chat}>RSVP Next Workout</Button>
        </View>
          
         
      </View>
    )
  }
}
export default ConfirmPastWorkout