import React from 'react'
import {View,Image,Text,StatusBar,TouchableHighlight,ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import moment from 'moment'
import { selectTrainer,selectActivity,selectDateTime,selectLocation } from '@store/modules/booking/actions'
import CONSTS from '@utils/Consts'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'

type Props = {
  eventInfo : Object,
  showCommunicationOptions : bool,
  activities: Array,
  editEvent: Function,
  chatSessions: Array,
}

class ScheduledEventInfo extends React.Component {

constructor(props){
  super(props)
}

edit(){
  Actions.confirmTrainerWorkout({workoutItem: this.props.eventInfo})
}

chat(){
  var eventInfo = this.props.eventInfo;
  var chatSession = this.props.chatSessions.filter( chatSession => {
    if(chatSession.customer.id === eventInfo.userId &&
      chatSession.trainer.id === eventInfo.trainerId)
      return chatSession;
  })
  if(chatSession.length > 0){
    Actions.chatScene({sessionId: chatSession[0].sessionId, name: eventInfo.trainer.firstName + ' ' + eventInfo.trainer.lastName})
  }else{
    Actions.mainAppModal(
    {
      uniqId: new Date().getTime(),
      visible: true,
      headerText: 'No Chat Available',
      detailsText: "We're sorry, but you must have a trainer accept a workout before chatting.",
      showSubDetails: false,
      onOkay: null,
      okayButtonText: 'OK',
      showCancelButton: false,
    }
    )
  }
}

render(){
  const { eventInfo, showCommunicationOptions } = this.props

  var selectedActivity = this.props.activities.filter(function(activity){
      if(activity.id === eventInfo.activityId){
        return true
      }else{
        return false
      }
    }
  )[0]

  var gymName = eventInfo.gymId === null ? eventInfo.address + ' ' + eventInfo.city : eventInfo.gym.name

  var  nameToDisplay = eventInfo.trainer === null ? 'Fitspot Choose' : eventInfo.trainer.firstName + ' ' + eventInfo.trainer.lastName

  var dtStart = (typeof eventInfo.dtStart) === 'undefined' ? eventInfo.date : eventInfo.dtStart


  return (
    <View style ={styles.row}>
      <View style={{backgroundColor:'white',marginTop:10, borderTopLeftRadius: 6,borderTopRightRadius: 6, borderBottomWidth:2, borderBottomColor:'#E7E7E7'}}>
          <View style={{alignSelf:'center',flexDirection:'row'}}>
            <Image source={require('@images/workout-icon.png')} style={{width: 15, height: 15,marginTop:7,marginBottom:5}} />
            <Text style={{fontWeight:'700', color:'#E6672C', fontSize:12,fontFamily:FONT_DAYTONA_REG,letterSpacing:1,textAlign:'center',marginTop:5,marginBottom:5,marginLeft:10}}><Text style={styles.bold}>CORPORATE WORKOUT</Text></Text>
          </View>
      </View>
      
      <View style={styles.rowBottom}>
        <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15,marginBottom:0,marginTop:10, borderBottomColor:'#E7E7E7', borderBottomWidth:2}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>DATE & TIME</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>{moment(dtStart).local().format('MMM DD h:mmA')}</Text></Text>
            </View>  
        </View>
        <View style={[styles.rowBottomColumn, {flex:1,marginRight:15,marginLeft: 15,marginTop:10, marginBottom:0, borderBottomColor:'#E7E7E7', borderBottomWidth:2}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>TRAINER</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>{nameToDisplay}</Text></Text>
            </View>
        </View>
      </View>
      <View style={[styles.rowBottom,{borderBottomColor:'#E7E7E7', borderBottomWidth:2,marginTop:20}]}>
        <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15}]}>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.rowBottomHeader}>ACTIVITY</Text>
            <Text style={styles.rowBottomText}><Text style={styles.bold}>{selectedActivity.name}</Text></Text>
          </View>
        </View>
        <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 15, marginRight:15}]}>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.rowBottomHeader}>LOCATION</Text>
            <Text style={[styles.rowBottomText,{marginRight:6}]}><Text style={styles.bold}>{gymName}</Text></Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor:'white',height: 70, marginTop: 10, borderBottomWidth:2, borderBottomColor:'#E7E7E7'}}>
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginTop: 20,marginBottom:20}}>
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
        <TouchableHighlight onPress={this.goToDetails} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,marginRight: 0, height: 50, borderBottomLeftRadius:6}]}>
          <View style={{alignSelf:'center',flexDirection:'row',}}>
            <Image source={require('@images/check-in-icon.png')} style={{width: 20, height: 20}} />
            <Text style={{fontWeight:'700', fontSize:15,fontFamily:FONT_DAYTONA_REG,color:DEFAULT_GREEN_COLOR}}> Going</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=> this.chat()} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,borderLeftWidth: 1,height: 50, borderLeftColor: '#c0c0c0', marginRight: 0, borderBottomRightRadius:6}]}>
          <View style={{alignSelf:'center',flexDirection:'row',}}>
            <Image source={require('@images/check-out-icon.png')} style={{width: 20, height: 20}} />
            <Text style={{fontWeight:'700', fontSize:15,fontFamily:FONT_DAYTONA_REG,color:DEFAULT_GREEN_COLOR}}> Not Going</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}
}

export default ScheduledEventInfo
