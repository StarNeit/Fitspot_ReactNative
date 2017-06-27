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



import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'

type Props = {
  bookingState: Object,
  workoutInfo: Object,
  updateNewPrice: Function,
  requestNewWorkout: Function,
  isAdding:Boolean,
  beginEditingBooking: Function,
  appSettings: Object,
  addBookingNonce : Function,
  updatePayTitle:Function,
  lastPaymentString:String,
  appAvailable: Boolean,
}

const Item = Picker.Item;

const rows = {
  ACTIVITY: 0,
  DATETIME: 1,
  LOCATION: 2,
  TRAINER: 3,
  PACKAGE: 4,
  CARD: 5,
  FRIENDS: 6,
  PROMOCODE: 7
}

class BookingConfirmation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [0,1,2,3,4,5],
      modalVisible: false,
      helpModalVisible: true,
      numberOfFriends: 0,
      pickerBottomValue: new Animated.Value(-350),
      btnSubmitState: props.appAvailable ? 'idle' : 'unavailable',
      bookingState: this.props.bookingState,
      error: this.props.error,
      promocode: '',
      isEditing: false,
      paymentToken: [],
      paymentString: props.lastPaymentString,
    }
    if (props.appAvailable) {
      this.props.updateNewPrice(0)
    }

    console.log(this.state)

  }


  async changeCard(){
    //use the token
    // 'plan_id': ('planId', parse.Integer(required=True, nullable=False)),
    // 'payment_token': ('paymentToken', parse.String(required=True, nullable=False))
    var BrainTreePayManager = NativeModules.BrainTreePayManager;

    try {
      var token = await BrainTreePayManager.showDropIn(this.props.appSettings.braintreeClientToken);
      if(token[0] === 'error'){
        if(token[1] === 'cancelled'){
          return
        }else{
          Actions.mainAppModal(
          {
            uniqId: new Date().getTime(),
            visible: true,
            headerText: 'Braintree Error',
            detailsText: token[1],
            onOkay:null,
            okayButtonText: 'OK',
            showCancelButton: false,
          }
          )
          return
        }
      }else{
        this.setState({paymentToken: token, paymentString: token[1]})
      }
  } catch (e) {
    console.error(e);
  }
}

  async buyItem(){

    var appSettings = this.props.appSettings
    var rowData = this.props.bookingState.subscriptionOption
    if(appSettings.braintreeClientToken === null){
      //need to get everything first.
    }else{
      //use the token
      // 'plan_id': ('planId', parse.Integer(required=True, nullable=False)),
      // 'payment_token': ('paymentToken', parse.String(required=True, nullable=False))
      var BrainTreePayManager = NativeModules.BrainTreePayManager;

      try {
        var token = await BrainTreePayManager.showDropIn(appSettings.braintreeClientToken);

        if(token[0] === 'error'){
          if(token[1] === 'cancelled'){
            return
          }else{
            Actions.mainAppModal(
            {
              uniqId: new Date().getTime(),
              visible: true,
              headerText: 'Braintree Error',
              detailsText: token[1],
              onOkay:null,
              okayButtonText: 'OK',
              showCancelButton: false,
            }
            )
            return
          }
        }

        // console.log(rowData)

        if(!Object.keys(rowData).length){
          this.props.addBookingNonce(token)
          this.setState({btnSubmitState: 'adding'})
          this.props.requestNewWorkout(this.state.numberOfFriends, this.state.promocode)
          return;
        }

        this.props.updatePayTitle(token[1]) //paymentMethod
        ApiUtils.post('customers/purchase-plan',{planId: rowData.id, paymentNonce: token[0]}).then(([response, jsonBody]) => {
          // do stuff with both.
          // console.log(response)
          // console.log(jsonBody)
          if (response.status == 200) {
            this.props.selectedPlan(jsonBody)
            this.setState({btnSubmitState: 'adding'})
            this.props.requestNewWorkout(this.state.numberOfFriends, this.state.promocode)
          } else {
            Actions.mainAppModal(
            {
              uniqId: new Date().getTime(),
              visible: true,
              headerText: 'Purchase Plan Error',
              detailsText: jsonBody.message,
              onOkay:null,
              okayButtonText: 'OK',
              showCancelButton: false,
            }
            )
          }

        }).catch(err => {
          console.log('Error: ', err);
        })

      } catch (e) {
        console.error(e);
      }

    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.bookingState != null && this.state.isEditing && this.props.appAvailable){
      this.setState({bookingState: nextProps.bookingState, btnSubmitState:'idle',isEditing:false,})
    }


    if(nextProps.isAdding){
      this.setState({btnSubmitState: 'busy'})
    }else if(!nextProps.isAdding && this.state.btnSubmitState === 'adding'){

      if(nextProps.error.length > 0){

        var key = new Date().getTime() + Math.random(5)
        Actions.mainAppModal(
        {
          uniqId: key,
          visible: true,
          headerText: 'Workout Request Error',
          detailsText: 'We are sorry but an error occured. Please check that all inputs are correct.\n\n  Error returned was: ' + nextProps.error,
          showSubDetails: false,
          onOkay: () => this.setState({error: ''}),
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
        this.setState({btnSubmitState: 'idle'})
      }else{
        this.setState({btnSubmitState: 'idle'})
        var retString = 'We’ve sent the workout details to '+ this.state.bookingState.chosenTrainer.firstName + ', and we’re waiting for confirmation. We’ll notify you when they do.'
        if(this.state.bookingState.chosenTrainer.firstName == null){
          retString = "We're finding the best trainer for you. We will notify you when they reply."
        }
        var workoutInfo = this.props.workoutInfo;
        var subDetailsText= ''
        if(this.props.bookingState.isSinglePurchase){
          subDetailsText = 'Thank you for your purchase!'
        }else if(!workoutInfo.isActive){ //not active but has some left over.
          if((workoutInfo.numWorkoutsLeft - 1 == 0)){
            subDetailsText = 'No workouts left, thank you for using Fitspot.'
          }else{
          subDetailsText = (workoutInfo.numWorkoutsLeft - 1) + ' workouts left before your subscription is over.'
          }
        }else{
          subDetailsText = (workoutInfo.numWorkoutsLeft - 1) + ' out of ' + workoutInfo.plan.numWorkouts + ' pre-paid workouts remaining.'
        }

        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Workout Request Sent!',
          detailsText: retString,
          subDetailsText: subDetailsText,
          showSubDetails: true,
          onOkay: () => Actions.popTo('homescreen'),
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      }

    }else if(this.state.btnSubmitState != 'idle' && this.props.appAvailable){
      this.setState({btnSubmitState: 'idle'})
    }
  }



  setHelpModalVisible(visible) {
    this.setState({helpModalVisible: visible});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }



  getDataForCategory(category){
    switch (category) {
      case rows.ACTIVITY:
        return this.state.bookingState.chosenActivity.name
      break;
      case rows.DATETIME:
      return moment(this.state.bookingState.chosenDate).format("MMM DD h:mm a")
      break;
      case rows.LOCATION:
      return this.state.bookingState.chosenLocation.name
      break;
      case rows.PACKAGE:
      if(this.state.bookingState.isSinglePurchase){
        return "SINGLE WORKOUT PURCHASE"
      }else{
        return this.props.workoutInfo.plan.name
      }
      break;

      case rows.TRAINER:
      if(this.state.bookingState.chosenTrainer.firstName == null)
      {
        return 'Fitspot Choose'
      }
      return this.state.bookingState.chosenTrainer.firstName + ' ' + this.state.bookingState.chosenTrainer.lastName
      break;
      case rows.CARD:
        return this.state.paymentString
      break;
      default:
    }
  }

  gotoViewForCategory(category){
    this.setState({isEditing: true})
    this.props.beginEditingBooking()

    switch (category) {
      case rows.ACTIVITY:
        Actions.chooseActivity()
      break;
      case rows.DATETIME:
        Actions.chooseDateTime()
      break;
      case rows.LOCATION:
        Actions.chooseLocation()
      break;
      case rows.TRAINER:
        Actions.chooseTrainer()
      break;
      case rows.CARD:
        this.changeCard()
      break;
      case rows.PACKAGE:
        Actions.bookingSubscriptionOptions()
      break;
      default:
    }
  }

  showPicker(){
    Animated.timing(
    this.state.pickerBottomValue,
      {
        toValue: 0,
        duration: 250,
        easing: Easing.quad
      }
    ).start();
  }

  hidePicker(){
    Animated.timing(
      this.state.pickerBottomValue,
      {
        toValue: -350,
        duration: 250,
        easing: Easing.quad
      }
    ).start();
  }

  done(){
    this.props.updateNewPrice(this.state.numberOfFriends)
    this.hidePicker()
  }

  changeFriendValue(value){
    if(value != this.state.numberOfFriends){
      this.setState({numberOfFriends: value, btnSubmitState: 'busy'})
      //we have a new
    }

  }
  placeRequest(){
    if((this.props.workoutInfo == null ||
      (this.props.workoutInfo.numWorkoutsLeft == 0 &&
      !this.props.workoutInfo.isActive) ||
      this.props.workoutInfo.numWorkoutsLeft == 0 ||
      this.props.bookingState.isSinglePurchase
      )
    ){
      this.buyItem()
    }
    else{
      this.setState({btnSubmitState: 'adding'})
      this.props.requestNewWorkout(this.state.numberOfFriends, this.state.promocode)
    }
  }





  renderOption(category){
    let categoryNames = ['Activity','Date & Time', 'Location', 'Trainer', 'Package', 'CARD', 'Friends', 'Promo Code']
    let selectedCategory = categoryNames[category]
    if(selectedCategory === 'CARD' && (typeof this.props.workoutInfo === 'undefined')){
      return null
    }
    if(this.state.bookingState.isSinglePurchase && selectedCategory === 'Package'){
      selectedCategory =  "Workout Type"
    }

    return(
      <TouchableHighlight key={category} onPress={() => this.gotoViewForCategory(category)} underlayColor={'rgba(0,0,0,0)'} style={{width:Dimensions.get('window').width,borderBottomColor:'#F2F2F2', borderBottomWidth:1,flex:1,alignSelf: 'stretch',}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',flex:1,marginTop: 12,marginBottom: 12,}}>
          <View style={{justifyContent:'center'}}>
            <Text style={{marginLeft: 16, fontFamily:'System', fontSize:8, letterSpacing:1,color:'#4C4C4C'}}>{selectedCategory.toUpperCase()}</Text>
            <Text style={{marginTop:2, marginLeft: 14, fontFamily:FONT_DAYTONA_LIGHT, fontSize:20,letterSpacing:-.8,color:'#4C4C4C'}}>{this.getDataForCategory(category)}</Text>
          </View>
          <View style={{justifyContent:'center'}}>
            <Text style={{marginRight:16,fontFamily:'System', fontSize:10, letterSpacing:1,}}>{selectedCategory === 'Package' ? '' : 'Tap To Edit'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {

      return (
        <View>
        <KeyboardAwareScrollView>
          <View style={styles.clientContainer}>
          <PopupModal visible={true} onDismiss={() => this.setHelpModalVisible(false)}>
            <HomeHelpModalPopup/>
          </PopupModal>
            { this.state.items.map((category) => this.renderOption(category)) }
            <TouchableHighlight style={{width:Dimensions.get('window').width, borderBottomWidth:1,borderBottomColor:'#F2F2F2',flex:1,alignSelf: 'stretch',}} underlayColor={'rgba(0,0,0,0)'} onPress={() => this.showPicker()}>
              <View style={{flexDirection:'row',justifyContent:'space-between',flex:1,marginTop: 12,marginBottom: 12,}}>
                <View style={{justifyContent:'center'}}>
                  <Text style={{marginLeft: 16, fontFamily:'System', fontSize:8, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>FRIENDS</Text>
                  <Text style={{marginTop:2, marginLeft: 14, fontFamily:FONT_DAYTONA_LIGHT, fontSize:20,letterSpacing:-.8,color:'#4C4C4C'}}>{this.state.numberOfFriends} Friend{this.state.numberOfFriends == 1 ? '': 's'}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text style={{marginRight:16,fontFamily:'System', fontSize:10, letterSpacing:1,}}>+$15/Friend</Text>
                  <Text style={{marginRight:16,fontFamily:'System',marginTop:5, fontSize:10, letterSpacing:1,textAlign:'center'}}>Tap to Add</Text>
                </View>
              </View>
            </TouchableHighlight>
            <View style={{width:Dimensions.get('window').width,backgroundColor:'#F2F2F2',borderBottomColor:'#F2F2F2', borderBottomWidth:1,flex:1,alignSelf: 'stretch',marginRight:22}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',flex:1,marginTop: 12,marginBottom: 12,}}>
                <View style={{justifyContent:'center',width:200}}>
                  <Text style={{marginLeft: 16, fontFamily:'System', fontSize:8, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>PROMO CODE</Text>
                  <TextInput style={{fontFamily: 'System',fontSize: 12,backgroundColor:'rgba(0,0,0,0)',width:258,height:25,marginTop:6, marginLeft: 14, fontFamily:FONT_DAYTONA_LIGHT, fontSize:20,letterSpacing:-.8,color:'#4C4C4C'}}
                     placeholder='Enter Code...'
                    placeholderTextColor='#c0c0c0'
                    value={this.state.promocode}
                    returnKeyType={'done'}
                    onChangeText={(text) => this.setState({promocode: text})}/>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text style={{marginRight: 16, fontFamily:'System', fontSize:10,textAlign:'center', letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>TOTAL</Text>
                  <Text style={{marginRight:16,fontFamily:FONT_DAYTONA_LIGHT,textAlign:'center', fontSize:20,color:'#4B4B4C'}}>${this.state.bookingState.isSinglePurchase  ? (this.props.appSettings.priceBase+this.state.bookingState.customerPrice)  : this.state.bookingState.customerPrice}</Text>
                </View>
              </View>
            </View>
            <Text style={{marginLeft:32,marginRight: 32,marginTop:10,marginBottom:10,fontFamily:FONT_DAYTONA_LIGHT,textAlign:'center'}}>Please note Fitspot has a 12 hour cancellation policy. If you cancel within 12 hours of the session time, you will be charged in full.</Text>
            <AwesomeButton  backgroundStyle={styles.bookButtonStyle}
                    labelStyle={styles.bookButtonTextStyle}
                    transitionDuration={200}
                    states={{
                      idle: {
                        text: "Place Request",
                        onPress: () => this.placeRequest(),
                        backgroundColor: '#5fb13d',
                        textColor: '#fff',
                      },
                      busy: {
                        text: 'Recalculating Price',
                        backgroundColor: '#4c4c4c',
                        spinner: true,
                        textColor: '#ffffff'
                      },
                      adding: {
                        text: 'Placing Request',
                        backgroundColor: '#4c4c4c',
                        spinner: true,
                        textColor: '#ffffff'
                      },
                      unavailable: {
                        text: 'Service unavailable in area',
                        backgroundColor: '#4c4c4c',
                        spinner: false,
                        textColor: '#ffffff'
                      },
                      success: {
                        text: 'Uploaded',
                        backgroundColor: '#ffffff',
                        textColor: '#5fb13d',
                      },
                      error: {
                        text: 'Error Uploading',
                        backgroundColor: '#ff0000',
                        textColor: '#ffffff'
                      }
                    }}
                    buttonState={this.state.btnSubmitState}
                    />

            </View>
        </KeyboardAwareScrollView>
        <Animated.View style={{width:Dimensions.get('window').width,backgroundColor:'white',position:'absolute',bottom:this.state.pickerBottomValue,borderTopColor:'#4c4c4c',borderTopWidth:1}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:'#F2F2F2',borderBottomWidth:1,}}>
            <TouchableHighlight style={{marginRight:12}} onPress={() => this.hidePicker()} underlayColor={'rgba(0,0,0,0)'}>
              <Text style={{marginLeft: 12, fontFamily:'System',fontSize:12,marginTop:12,marginBottom:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginRight:12,marginTop:12,}} onPress={() => this.done()} underlayColor={'rgba(0,0,0,0)'}>
              <Text style={{marginRight: 12, fontFamily:'System',fontSize:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>Done</Text>
              </TouchableHighlight>
          </View>
          <Picker
             enabled={false} selectedValue={this.state.numberOfFriends}
             onValueChange={(friends) => this.changeFriendValue(friends)}
             >
             <Item label="0 Friends" value="0" />
              <Item label="1 Friend" value="1" />
              <Item label="2 Friends" value="2" />
          </Picker>
        </Animated.View>
      </View>
      )
  }
}

export default BookingConfirmation
