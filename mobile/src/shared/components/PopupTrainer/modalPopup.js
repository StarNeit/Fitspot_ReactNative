/* @flow */
import React from 'react'
import {View, Text, Image, Modal, TouchableHighlight} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import Button from '@components/Button'

import styles from './styles'
type Props = {
}

class TrainerModalPopup extends React.Component {

  changeAcceptTime(){

  }
  suggestDifTime(){

  }
  cancelSession(){

  }
  renderDetail(){
    return (
      <View style={{height: 450,width: 350,}}>
        <View style = {styles.textContainer}>  
          <Text style={styles.headerText}><Text>Trainer Responded!</Text></Text>
          <Text style={styles.headerContentText}> Unfortunately, Rico can`t do 8:00am on Monday, and Suggested 9:00am.</Text>
        </View>
        <View style={styles.detailContainer}>
           <Text style={styles.contentText}>SUGGEST A DIFFERENT TIME</Text>
           <Button buttonStyle={[styles.rowBtn, {borderTopColor:'#E7E7E7',borderTopWidth:1}]} buttonTextStyle={styles.rowBtnText} onPress={this.cancelSession}>Mon 16th</Button>
           <Button buttonStyle={styles.rowBtn} buttonTextStyle={styles.rowBtnText} onPress={this.cancelSession}>9:00am</Button>
        </View>
        <View style={styles.btnContainer}>
           <Button buttonStyle={[styles.popBtn, {borderBottomColor:'green',borderBottomWidth: 1}]} buttonTextStyle={styles.popBtnText} onPress={this.changeAcceptTime}>Send New Time Proposal</Button>
           <Button buttonStyle={styles.popBtn} buttonTextStyle={styles.popBtnText} onPress={this.suggestDifTime}>Accept Rico`s Suggestion</Button>
           <Button buttonStyle={styles.popCancelBtn} buttonTextStyle={styles.popBtnText} onPress={this.cancelSession}>Cancel Session</Button>
        </View>
                 
      </View>
    )
  }
  renderMain(){
    return (
      <View style={styles.container}>
        <View style = {styles.textContainer}>  
          <Text style={styles.headerText}>Trainer Responded!</Text>
          <Text style={styles.headerContentText}> Unfortunately, Rico can`t do 8:00am on Monday, and Suggested 9:00am.</Text>
        </View>
        <View style={styles.btnContainer}>
           <Button buttonStyle={[styles.popBtn, {borderBottomColor:'green',borderBottomWidth: 1}]} buttonTextStyle={styles.popBtnText} onPress={this.changeAcceptTime}>Accept Time Change</Button>
           <Button buttonStyle={styles.popBtn} buttonTextStyle={styles.popBtnText} onPress={this.suggestDifTime}>Suggest a Different Time</Button>
           <Button buttonStyle={styles.popCancelBtn} buttonTextStyle={styles.popBtnText} onPress={this.cancelSession}>Cancel Session</Button>
        </View>
                 
      </View>
    )
  }
  render() {
     return this.renderDetail()
  }
}

export default TrainerModalPopup