import React from 'react'
import { NativeModules } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { TextInput,View, ListView, StyleSheet, Text, ScrollView, Image } from 'react-native';
import styles from './styles'

import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import CONSTS from '@utils/Consts'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,AccessToken,LoginManager
} = FBSDK;

import PaymentHistory from './paymentHistory'


type Props = {
  logoutClick: Function,
  user: Object,
  brainTreeToken: String,
  workoutInfo: Object,
  getPayoutInfo: Function,
  payoutItems: Array,
}

class Profile extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        showPayment: true,
      }
    }

  async setupCreditCard(){
    var BrainTreePayManager = NativeModules.BrainTreePayManager;
        var token = await BrainTreePayManager.showDropIn(this.props.brainTreeToken);

    if(token[0] === 'error'){
      if(token[1] === 'cancelled'){
        return
      }else{
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Credit Card Setup Error',
          detailsText: token[1],
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
        return
      }
    }
  }

  logout(){
    LoginManager.logOut((data) =>{
    })
    this.props.logoutClick();
  }

  toggleInformation(status){
    this.setState({showPayment: status})
  }

  renderPayment(){
    var buttonCTA = 'Add Card'
    var cardInfoText = 'Add a credit card to purchase packages or single workouts.'
    if(this.props.user.lastPaymentString != null){
      cardInfoText = this.props.user.lastPaymentString
      buttonCTA = 'Change Card'
    }

    return(
      <ScrollView>
        <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:24,marginBottom:16}}>Credit Card Information</Text>
        <Text style={{alignSelf: 'center',fontFamily:'System',fontSize:13, marginLeft: 32, marginRight:32,marginBottom: 28}}>
          {cardInfoText}
        </Text>
        {/*<View>*/}
        <HorizontalLine />
        <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.setupCreditCard()}>
          {buttonCTA}
        </Button>
        <HorizontalLine fullWidth={true} />
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:24,marginBottom:25}}>Fitspot Credit</Text>
          <Text style={{alignSelf: 'center',fontFamily:'System',fontSize:13, marginLeft: 50,marginRight:50,marginBottom: 24, textAlign: 'center'}}>You referred 10 new users. Your next discount will be $25.</Text>
        <HorizontalLine fullWidth/>
        <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:24,marginBottom:25}}>Referral Code</Text>
        <Text style={{alignSelf: 'center',fontFamily:'System',fontSize:13, marginLeft:32, marginRight: 32, textAlign: 'center', marginBottom: 24}}>Know a friend that would love Fitspot? Give them your referral code and when they sign up, youll get a cash reward!</Text>
        <Text style={{letterSpacing:3,alignSelf: 'center',fontFamily:FONT_DAYTONA_REG,fontSize:18, marginBottom: 24}}>DEBJ0466327</Text>
        <HorizontalLine fullWidth/>
          <Button buttonStyle={[styles.buttonStyle, {marginTop: 24}]} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.logout()}>
            Log Out
          </Button>
          {/*<Button onPress={()=> alert('Need to Implement')} buttonStyle={[styles.buttonStyle,{opacity: this.props.user.userType === CONSTS.USER_TYPE.TRAINER ? 0 : 1}]} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.chooseLocation}>
            Become a Trainer
          </Button> */}

      </ScrollView>
    )
  }

  renderPaymentHistory(){
    return(
      <PaymentHistory getPayoutInfo={this.props.getPayoutInfo} payoutItems={this.props.payoutItems}/>
    )
  }


  render (){
    var trainerPadding = 6;
    return (
    <View style={{marginTop:63, marginBottom: 55}}>
      { this.props.user.userType === CONSTS.USER_TYPE.TRAINER  ?
        <View style={{flexDirection:'row',}}>
          <Button buttonStyle={[styles.topButtonStyle,{borderBottomWidth:1,borderBottomColor:this.state.showPayment ? DEFAULT_GREEN_COLOR : '#F2F2F2'}]} buttonTextStyle={[styles.topButtonTextStyle,{color:this.state.showPayment ? DEFAULT_GREEN_COLOR : '#E8E8E8'}]} onPress={() => this.toggleInformation(true)}>
            Payment
          </Button>
          <Button buttonStyle={[styles.topButtonStyle,{borderBottomWidth:1,borderBottomColor:!this.state.showPayment ? DEFAULT_GREEN_COLOR : '#F2F2F2'}]} buttonTextStyle={[styles.topButtonTextStyle,{color:!this.state.showPayment ? DEFAULT_GREEN_COLOR : '#E8E8E8'}]} onPress={() => this.toggleInformation(false)}>
            History
          </Button>
        </View>
        :
        <View></View>
      }
        { this.state.showPayment ?
          this.renderPayment() :
          this.renderPaymentHistory()
        }

      </View>
    )
  }
}

export default Profile
