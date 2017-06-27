import React from 'react'

import {View,Image,Text,StatusBar,TouchableHighlight,ListView,Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import PopupModal from '@components/PopupModal'
import HomeHelpModalPopup from '@components/PopupHelpModal/modalPopup'
import styles from './styles'
import ButtonHelp from '@components/ButtonHelp'
import ApiUtils from '@utils/ApiUtils'
import HorizontalLine from '@components/HorizontalLine'


type Props = {
  items:Array,
  authState: Object,
  selectedPlan: Function,
  addSubscriptionOption: Function,
  activateSinglePurchaseBooking: Function,
  bookingState: Object,
}

class BookingSubscriptionOptions extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      items: this.props.items,
      dataSource: ds,
      modalVisible: false
    }
  }

  pressRow(rowData) {


    //
    // var newDs = [];
    // newDs = this.state.ds.slice();
    // newDs[0].Selection = newDs[0] == "AwayTeam"
    //   ? "HomeTeam"
    //   : "AwayTeam";
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(newDs)})

  }

  componentDidMount() {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.items)})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  buyItem(rowData){
    if(rowData === null){
      this.props.activateSinglePurchaseBooking()
    }
    this.props.addSubscriptionOption(rowData)
    if(this.props.bookingState.isEditing){
      Actions.pop()
    }else{
      Actions.bookingConfirmation()
    }

  }


  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={Actions.buySubscription} onPress={() => this.buyItem(rowData)} underlayColor={'#00000000'}>
          <View style={[styles.rowTop]}>
            <Text style={styles.rowTopTitle}>{rowData.name}
            </Text>
            <Text style={{fontFamily:'System',fontSize:10,textAlign:'center', color:'#4c4c4c',}}>{rowData.numWorkouts} workouts pack, ${(rowData.price /rowData.numWorkouts).toFixed(0)}/workout
            </Text>
          </View>
      </TouchableHighlight>
    )
  }

  render() {
    var singleWorkout = {

    }
    return (
      <View style={{flex:1}}>
        <View style={styles.headerMainView}>
          <Text style={styles.headerMainText}>Subscription Options</Text>
          <Button buttonStyle={styles.dismissButton} buttonTextStyle={styles.dismissButtonStyle} onPress={() => this.onClosePress()}>X</Button>
          <HorizontalLine fullWidth />
        </View>
        <TouchableHighlight onPress={Actions.buySubscription} onPress={() => this.buyItem(null)} underlayColor={'#00000000'} style={{marginTop:20,height:80}}>
            <View style={[styles.rowTop]}>
              <Text style={styles.rowTopTitle}>Buy as single workout
              </Text>
              <Text style={{fontFamily:'System',fontSize:10,textAlign:'center', color:'#4c4c4c',}}>single purchase, ${this.props.authState.appSettings.priceBase}
              </Text>
            </View>
        </TouchableHighlight>
        <Text style={{textAlign:'center', fontFamily:'System',fontWeight:'500',fontSize:10}}>Or, as part of a workout pack: </Text>
        <ListView enableEmptySections={true} style={{width:Dimensions.get('window').width,marginTop:20, marginBottom:0,}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
        <Text style={{textAlign:'center', fontFamily:'System',fontWeight:'500',fontSize:10, marginBottom:70,color:'#666666',marginLeft:32,marginRight:32}}>Workouts are pre-paid in advance, and must be booked within 60 days of workout pack purchase.</Text>
      </View>
    )
  }
}

export default BookingSubscriptionOptions
