/* @flow */
import React from 'react'
import {View, Text, Image, Modal, TouchableHighlight, WebView, Linking } from 'react-native'
import {Actions} from 'react-native-router-flux'
import Button from '@components/Button'
import HorizontalLine from '@components/HorizontalLine'

import styles from './styles'
type Props = {
}

// URLS
const learnMoreURL = 'http://www.fitspotapp.com/at-work';
const giftCardURL = 'http://www.fitspotapp.com/gift-cards';

// Messages
const FriendEmailSubject = "Save $20 on yoga, circuit training, and other personal training sessions with Fitspot"
const FriendEmailTemplate = "Hey, use my referral code: _ to save $20 on any of Fitspot's workouts."
const HREmailSubject = "Save 20% on first Fitspot Team Workout!"
const HREmailTemplate = "Mention my referral code: _, to receive 20% off on our first team customized workout with vetted, insured, certified personal trainers that come to you across a wide variety of activities: yoga, massage, circuit training, kickboxing, and more. Fitspot is a benefit that employees enjoy and its one that can bring corporate wellness ROI. Learn more here: www.fitspotapp.com/at-work and call for a free consultation: 415-320-6972."

class HomeGiftModalPopup extends React.Component {

  mailto(subject, body) {
    return "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  getUserReferralCode() {
    return "123456"; // TODO get this from backend
  }

  render() {
    return (
          <View style={{ height: 400, width: 280,}}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft:32,
              marginRight:32,
            }}>
              <Text style={styles.modalTitle}> Refer Friends </Text>
              <Text style={styles.modalContent}>
                Refer a friend to get
                <Text style={styles.modalContentGreen}> $20 off </Text>
                of your and your friends's next session!
              </Text>
              <Button onPress={() => {
                Linking.openURL(this.mailto(FriendEmailSubject, FriendEmailTemplate.replace(/_/,this.getUserReferralCode())))
              }} buttonStyle={styles.modalButton} buttonTextStyle={styles.modalButtonText}>Send To Friends</Button>
              <HorizontalLine fullWidth={true} lineStyle={{marginTop: 20}}/>

              <Text style={styles.modalTitle}> Refer Your Employer </Text>
              <Text style={styles.modalContent}>
                <Text onPress={() => Linking.openURL(learnMoreURL)} style={styles.hyperlink}>Learn about </Text>
                how to get team workouts for free as a benefit through your employer! If your employer signs up, you get three personal sessions
                <Text style={styles.modalContentGreen}> free</Text>!
              </Text>
              <Button onPress={() => {
                Linking.openURL(this.mailto(HREmailSubject, HREmailTemplate.replace(/_/,this.getUserReferralCode())));
              }} buttonStyle={styles.modalButton} buttonTextStyle={styles.modalButtonText}>Send To HR</Button>
              <HorizontalLine fullWidth={true} lineStyle={{marginTop: 20}}/>

              <Text style={styles.modalTitle}> Gift Cards </Text>
              <Text style={styles.modalContent}>
                Spread the
                <Text style={styles.modalContentGreen}> Gift of Fit</Text>.
                Gift a loved one free sessions!
              </Text>
              <Button onPress={() => Linking.openURL(giftCardURL)} buttonStyle={[styles.modalButton,{marginBottom:20}]} buttonTextStyle={styles.modalButtonText}>Gift Fitspot</Button>
            </View>

          </View>
    )
  }
}

export default HomeGiftModalPopup
