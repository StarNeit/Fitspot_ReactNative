import React from 'react'
import {View,Image,Text,StatusBar,TouchableHighlight,ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import moment from 'moment'
import CONSTS from '@utils/Consts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'


type Props = {
  eventInfo : Object,
  showCommunicationOptions : bool,
  activities: Array,
  chatSessions: Array
}
class HomeViewWorkoutInfo extends React.Component{
  constructor(props){
    super(props)
  }
  chat(){

  }
  goToDetails(){
     Actions.confirmPastWorkout();
  }

  renderSingleWorkout(){
    return (
      <View style ={styles.row}>
        <View style={{backgroundColor:'#3FAA9B',borderTopLeftRadius: 6,borderTopRightRadius: 6}}>
          <View style={{alignSelf:'center',flexDirection:'row'}}>
            <Image source={require('@images/singleWorkout-icon.png')} style={{width: 20, height: 20,marginTop:10,marginBottom:10}} />
            <Text style={{fontWeight:'700', color:'white', fontSize:14,fontFamily:FONT_DAYTONA_REG,letterSpacing:1,textAlign:'center',marginTop:13,marginBottom:10,marginLeft:10}}>SINGLE WORKOUT</Text>
          </View>
        </View>
        <View style={styles.rowBottom}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15,borderBottomColor:'gray'}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>DATE & TIME</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Mon 14 8:00am</Text></Text>
            </View>
          </View>
          
          <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0,marginLeft: 15, borderBottomColor:'gray'}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>TRAINER</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Robert Man</Text></Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rowBottom}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15, borderBottomColor:'gray'}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>ACTIVITY</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Strength</Text></Text>
            </View>
          </View>
          <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0, marginLeft: 15}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>LOCATION</Text>
              <Text style={[styles.rowBottomText,{marginRight:6}]}><Text style={styles.bold}>Equinox Gym</Text></Text>
            </View>
          </View>
        </View>
         <View style={{backgroundColor:'gray'}}>
          <Text style={{marginTop:6,marginBottom:6,fontFamily:FONT_DAYTONA_REG,fontWeight:'400',fontSize:15,textAlign:'center',marginLeft:15}}>Pending Trainer Response...</Text>
         </View> 
        <View style={{flex: 1,flexDirection: 'row'}}>
          <TouchableHighlight onPress={this.goToDetails} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,marginRight: 0, height: 50, borderBottomLeftRadius:6 ,backgroundColor:DEFAULT_GREEN_COLOR}]}>
            <View style={{alignSelf:'center',flexDirection:'row',}}>
              <Image source={require('@images/edit-session-white.png')} style={{width: 20, height: 20}} />
              <Text style={{fontWeight:'700', fontSize:15,fontFamily:FONT_DAYTONA_REG,color:'white'}}> Edit</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> this.chat()} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,borderLeftWidth: 1,height: 50, borderLeftColor: '#c0c0c0', marginRight: 0, borderBottomRightRadius:6,backgroundColor:DEFAULT_GREEN_COLOR}]}>
            <View style={{alignSelf:'center',flexDirection:'row',}}>
              <Image source={require('@images/chat-session-white.png')} style={{width: 20, height: 20}} />
              <Text style={{fontWeight:'700', fontSize:15,fontFamily:FONT_DAYTONA_REG,color:'white'}}> Chat</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  renderCoporateWorkout(){
    return (
      <View style ={styles.row}>
        <View style={{backgroundColor:'#E6672C',borderTopLeftRadius: 6,borderTopRightRadius: 6}}>
          <View style={{alignSelf:'center',flexDirection:'row'}}>
            <Image source={require('@images/workout-icon.png')} style={{width: 20, height: 20,marginTop:10,marginBottom:10}} />
            <Text style={{fontWeight:'700', color:'white', fontSize:14,fontFamily:FONT_DAYTONA_REG,letterSpacing:1,textAlign:'center',marginTop:13,marginBottom:10,marginLeft:10}}>CORPORATE WORKOUT</Text>
          </View>
        </View>
        <View style={styles.rowBottom}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15,borderBottomColor:'gray'}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>DATE & TIME</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Mon 14 8:00am</Text></Text>
            </View>
          </View>
          
          <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0,marginLeft: 15, borderBottomColor:'gray'}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>TRAINER</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Robert Man</Text></Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rowBottom}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15, borderBottomColor:'gray'}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>ACTIVITY</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>Strength</Text></Text>
            </View>
          </View>
          <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0, marginLeft: 15}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>LOCATION</Text>
              <Text style={[styles.rowBottomText,{marginRight:6}]}><Text style={styles.bold}>Equinox Gym</Text></Text>
            </View>
          </View>
        </View>
        
        <View style={{backgroundColor:'white'}}>
          <Text style={{marginTop:6,marginBottom:6,fontFamily:FONT_DAYTONA_REG,fontWeight:'400',fontSize:12,textAlign:'left',marginLeft:15}}>12 CO-WORKERS ATTENDING</Text>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginTop: 10,marginBottom:20}}>
            <Image source={require('@images/trainer1.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer2.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer3.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer4.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer5.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer1.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer2.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer3.png')} style={{width: 30, height: 30}}/>
            <Image source={require('@images/trainer4.png')} style={{width: 30, height: 30}}/>
          </View>
        </View>

        <View style={{flex: 1,flexDirection: 'row'}}>
          <TouchableHighlight onPress={this.goToDetails} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,marginRight: 0, height: 50, borderBottomLeftRadius:6 ,backgroundColor:DEFAULT_GREEN_COLOR}]}>
            <View style={{alignSelf:'center',flexDirection:'row',}}>
              <Image source={require('@images/check-in-icon.png')} style={{width: 20, height: 20}} />
              <Text style={{fontWeight:'700', fontSize:15,fontFamily:FONT_DAYTONA_REG,color:'white'}}> Going</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> this.chat()} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,borderLeftWidth: 1,height: 50, borderLeftColor: '#c0c0c0', marginRight: 0, borderBottomRightRadius:6,backgroundColor:DEFAULT_GREEN_COLOR}]}>
            <View style={{alignSelf:'center',flexDirection:'row',}}>
              <Image source={require('@images/check-out-icon.png')} style={{width: 20, height: 20}} />
              <Text style={{fontWeight:'700', fontSize:15,fontFamily:FONT_DAYTONA_REG,color:'white'}}> Not Going</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  render(){
    return this.renderCoporateWorkout()
  // const { eventInfo, showCommunicationOptions } = this.props
  //   if(eventInfo.trainerId === null){
  //     eventInfo['trainer'] = { firstName: 'Fitspot', lastName: 'Choose'}
  //   }


  //   var selectedActivity = this.props.activities.filter(function(activity){
  //     if(activity.id === eventInfo.activityId){
  //       return true
  //     }else{
  //       false
  //     }
  //   })[0]

  //   var gymName = eventInfo.gymId === null ? eventInfo.address + ' ' + eventInfo.city : eventInfo.gym.name

  //   var dtStart = (typeof eventInfo.dtStart) === 'undefined' ? eventInfo.date : eventInfo.dtStart
    
  }
}

export default HomeViewWorkoutInfo
