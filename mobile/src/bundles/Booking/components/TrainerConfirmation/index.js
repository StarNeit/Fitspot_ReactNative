import React from 'react'

import {Alert,Animated,View,Image,Text,StatusBar,TouchableHighlight,ListView,Dimensions,Modal,TextInput,Picker,Easing} from 'react-native'
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
import MapView from 'react-native-maps';
import CONSTS from '@utils/Consts'
import DatePicker from 'react-native-datepicker'




import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'

type Props = {
  confirmWorkout: Function,
  cancelWorkout: Function,
  workoutItem: Object,
  activities: Array,
  chatSessions: Array,
  requestWorkoutChange: Function,
  userType: Integer,
}

const Item = Picker.Item;



class BookingTrainerConfirmation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount(){
    if(this.props.workoutItem.status === CONSTS.WORKOUT_STATUS.ACCEPTED){
      Actions.refresh({title: 'Workout Details'})
    }

  }

  componentWillReceiveProps(nextProps) {

  }

  chat(workoutItem){
    var chatSession = this.props.chatSessions.filter( chatSession => {
      if(chatSession.customer.id === workoutItem.userId &&
        chatSession.trainer.id === workoutItem.trainerId)
        return chatSession;
    })

    if(chatSession.length > 0){
      Actions.chatScene({sessionId: chatSession[0].sessionId, name: workoutItem.user.firstName + ' ' + workoutItem.user.lastName})
    }else{
      var headerText = (typeof this.props.workoutItem.trainer.id) === 'undefined' ? 'No trainer assigned. ': 'Trainer has not accepted request.'
      var detailText = (typeof this.props.workoutItem.trainer.id) === 'undefined' ? "You will be able to chat with your trainer once you have been matched." :
      'A trainer must accept your request before you can chat with them.'
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: headerText,
        detailsText: detailText,
        showSubDetails: false,
        onOkay: null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
    }
  }

  fireAction(action){
    if(action === 'decline'){

    }else if(action==='confirm'){
      this.props.confirmWorkout(this.props.workoutItem.id)
    }else{ // cancel
      Actions.mainAppModal(
        {
          uniqId: new Date().getTime() + Math.random(5),
          visible: true,
          headerText: 'Change Appointment',
          detailsText: 'Are you sure you want to cancel your workout? If the session is less than 12 hours away you will be charged full price.',
          showSubDetails: false,
          onOkay: () => this.props.cancelWorkout(this.props.workoutItem.id),
          okayButtonText: 'OK',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          onCancel: null,
        }
      )
    }

  }

  changeDate(date){

    var dateString = moment(date).format('dddd, MMMM Do hA')

    Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Change Appointment',
        detailsText: 'Are you sure you want to change your appointment to ' + dateString + '?',
        showSubDetails: false,
        onOkay: () => this.changeConfirmation(date),
        okayButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        onCancel: null,
      }
    )
  }

  changeConfirmation(date){
    var newString = moment(date).utc().format()
    this.props.requestWorkoutChange(this.props.workoutItem.id,newString)
  }



  render() {

    let workoutItem = this.props.workoutItem
    var selectedActivity = this.props.activities.filter(function(activity){
      if(activity.id === workoutItem.activityId){
        return true
      }else{
        false
      }
    })[0]

    var gymName = workoutItem.gymId === null ? workoutItem.address + ' ' + workoutItem.city : workoutItem.gym.name + ' ' + workoutItem.gym.address

    var nameToDisplay =  workoutItem.user.firstName + ' ' + workoutItem.user.lastName
    if(this.props.userType !== CONSTS.USER_TYPE.TRAINER){
      nameToDisplay = workoutItem.trainer === null ? 'Fitspot Choose' : workoutItem.trainer.firstName + ' ' + workoutItem.trainer.lastName
    }
    var dtStart = (typeof workoutItem.dtStart) === 'undefined' ? workoutItem.date : workoutItem.dtStart

    console.log(workoutItem.status)
    console.log(this.props.userType)


      return (
        <View style={{ flex:1,marginTop:65,marginBottom:55,borderTopColor:'#E6E6E6',borderTopWidth:1}}>
          <View style={{flex:1,marginLeft:32,marginRight:32,marginTop:12}}>
            <View style={{flexDirection:'row',marginTop:0}}>
              <View style={styles.infoBox}>
                <Text style={styles.smallText}>ACTIVITY</Text>
                <Text style={styles.bigText}>{selectedActivity.name}</Text>
                <View style={{backgroundColor:'#c0c0c0',width: 140,height:1,marginTop:12}}></View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.smallText}>Stars</Text>
                <Text style={styles.bigText}>{nameToDisplay}</Text>
                <View style={{backgroundColor:'#c0c0c0',width: 140,height:1,marginTop:12}}></View>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={styles.infoBox}>
                <Text style={styles.smallText}>DATE AND TIME</Text>
                <Text style={styles.bigText}>{moment(dtStart).local().format('MMM DD h:mmA')}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.smallText}>LOCATION</Text>
                <Text style={styles.bigText}>{gymName}</Text>
              </View>
            </View>
          </View>
          <View style={{flex:1,backgroundColor:'#c5c5c5'}}>
            <MapView
            style= {styles.map}
            ref={ref => { this.map = ref; }}
                initialRegion={{
                  latitude: workoutItem.lat,
                  longitude:workoutItem.lon,
                  latitudeDelta: 0.0980,
                  longitudeDelta: 0.0460,
                }}
              >
                <MapView.Marker
                  key={workoutItem.lat}
                  coordinate={{latitude:workoutItem.lat,
                                longitude: workoutItem.lon}}

                  image={require('../../assets/pin-location-no-pic.png')}
                  description={workoutItem.address}
                  onPress={() => this.props.chooseLocation(null)}
                />
            </MapView>
          </View>
          <Button buttonStyle={[styles.bookButtonStyle,{borderBottomWidth:.5,borderColor:'#CaCaCa'}, typeof workoutItem.trainer.id === 'undefined' ? {backgroundColor:'#CACACA'}:null]} buttonTextStyle={styles.bookButtonTextStyle} onPress={() => this.chat(workoutItem)}>
            {typeof workoutItem.trainer.id === 'undefined' ? 'No trainer assigned, chat unavailable.'  : 'Chat with '+ workoutItem.user.firstName}
          </Button>
          { workoutItem.status === CONSTS.WORKOUT_STATUS.PENDING && this.props.userType === CONSTS.USER_TYPE.TRAINER  ?
            <View style={{flexDirection:'row'}}>
              <Button buttonStyle={[styles.confirmCancelButton,{backgroundColor:'red'}]} buttonTextStyle={styles.bookButtonTextStyle} onPress={() => this.fireAction('cancel')}>
                Decline Workout
              </Button>
              <Button buttonStyle={[styles.confirmCancelButton,{borderLeftColor:'#CACACA',borderLeftWidth:.5}]} buttonTextStyle={styles.bookButtonTextStyle} onPress={() => this.fireAction('confirm')}>
                Confirm Workout
              </Button>
            </View>
            :
            <View style={{flexDirection:'row'}}>
              <DatePicker
              mode="datetime"
              style={styles.confirmCancelButton}
              placeholder="Change Time"
              format="YYYY-MM-DD HH:mm Z"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  height: 0
                },
                dateInput: {
                  flex:1,
                  borderWidth: 0,
                  // alignItems: 'flex-end'
                },
                placeholderText: [styles.bookButtonTextStyle,{marginLeft:30}],
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.changeDate(date)}}
            />
          <Button buttonStyle={[styles.confirmCancelButton,{borderLeftColor:'#CACACA',borderLeftWidth:.5,backgroundColor:'red'}]} buttonTextStyle={styles.bookButtonTextStyle} onPress={() => this.fireAction('cancel')}>
                Cancel Workout
              </Button>
            </View>

          }

        </View>
      )
  }
}

export default BookingTrainerConfirmation
