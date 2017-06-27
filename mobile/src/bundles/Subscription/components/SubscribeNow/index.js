import React from 'react'
import {View,Image,Text,StatusBar,TouchableHighlight,ListView,Dimensions,Alert} from 'react-native'
import {Actions} from 'react-native-router-flux'
import moment from 'moment'
import Logo from '@components/Logo'
import Button from '@components/Button'
import PopupModal from '@components/PopupModal'
import HomeHelpModalPopup from '@components/PopupHelpModal/modalPopup'
import styles from './styles'
import ButtonHelp from '@components/ButtonHelp'

type Props = {
  items: Array,
  currentUser: Object,
  cancelSubscription: Function,
  modalVisible: Bool,
  plans: Array,
  purchaseSingleWorkout: Function
}

class SubscribeNow extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      items: props.items,
      dataSource: ds,
      modalVisible: props.modalVisible,
      viewPackages: false,
      currentUser: props.currentUser,
    }
  }

  pressRow(rowData) {

  }



  cancelConfirm(){
    Actions.mainAppModal(
      {
        uniqId: new Date().getTime() + Math.random(5),
        visible: true,
        headerText: 'Cancel Subscription',
        detailsText:'Are you sure you want to cancel your subscription?',
        showSubDetails: false,
        onOkay: () => this.props.cancelSubscription(),
        okayButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        onCancel: null,
      }
    )

  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.currentUser !== null &&  (typeof nextProps.currentUser.workoutInfo !== 'undefined')){
      var cu = this.state.currentUser
      var planId = nextProps.currentUser.workoutInfo.planId
      cu.workoutInfo.plan = this.props.plans.filter( item => {return item.id === planId})[0]
      this.setState({currentUser: cu})
    }
  }


  componentDidMount() {
    if(this.state.currentUser.workoutInfo != null){

      var rowData = this.state.currentUser.workoutInfo.plan
      Actions.refresh({title: rowData.name})
    }
    if(this.state.items.length === 0){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'API Error',
        detailsText: 'Error retrieving plans from the API.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
    }
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.items)})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  buySubscription(rowData){
    Actions.buySubscription({chosenSubscription: rowData})
    if(this.state.viewPackages){
      this.setState({viewPackages:false})
    }
  }

  renderRow(rowData) {

    var appSettings = this.props.appSettings
    var totalPrice = appSettings.priceBase * rowData.numWorkouts
    var percentDiscount = 100 - Math.ceil(((rowData.price / totalPrice)* 100))

    return (
      <TouchableHighlight onPress={() => this.buySubscription(rowData)} underlayColor={'#00000000'}>
        <View style ={styles.row}>
          <View style={[styles.rowTop, {backgroundColor: rowData.color}]}>
            <Text style={styles.rowTopTitle}>{rowData.name}
            </Text>
          </View>
          <View style={styles.rowBottom}>
            <View style={[styles.rowBottomColumn, {marginLeft: -5}]}>
              <View style={{alignSelf:'center'}}>
                <Text style={styles.rowBottomHeader}>WORKOUTS</Text>
                <Text style={styles.rowBottomText}><Text style={styles.bold}>{rowData.numWorkouts}</Text>/month</Text>
              </View>
            </View>
            <View style={[styles.rowBottomColumn, {marginRight: 10}]}>
              <View style={{alignSelf:'center'}}>
                <Text style={styles.rowBottomHeader}>{percentDiscount}% OFF</Text>
                <Text style={styles.rowBottomText}><Text style={styles.bold}>${Math.ceil((rowData.price / rowData.numWorkouts))}</Text>/workout</Text>
                </View>
            </View>
          </View>
          <Image source={require('../../assets/best-value.png')} style={[styles.bestValue,{ opacity: rowData.bestValue ? 1 : 0}]}/>
        </View>
      </TouchableHighlight>
    )
  }

  renderWorkoutSquares(plan){
    var workoutInfo = this.state.currentUser.workoutInfo;

    var numWorkoutsLeft = workoutInfo.numWorkoutsLeft
    var viewArray = []
    for (var i = 0; i < plan.numWorkouts; i++) {
      var color = numWorkoutsLeft > 0 ? 'green' : '#D8D8D8'
      var width = Dimensions.get('window').width <= 320 ? 45 : 60
      var height = Dimensions.get('window').width <= 320 ? 22 : 40
      var marginTop = Dimensions.get('window').width <= 320 ? 6 : 30
      viewArray.push(
        <View key={Math.random()} style={{borderColor:color,borderWidth:1,height:height, width:width,margin:4}}>
        </View>
      )
      numWorkoutsLeft --;
    }
    return (
      <View style={{flexDirection:'row', flexWrap:'wrap',marginLeft:32,marginRight:32, marginTop:marginTop, alignSelf:'center'}}>
        { viewArray }
      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  singlePurchase(){
    this.props.purchaseSingleWorkout()
    Actions.chooseActivity()
  }

  render() {
    if(this.state.currentUser.workoutInfo != null && this.state.currentUser.workoutInfo.isActive && !this.state.viewPackages){

      var rowData = this.state.currentUser.workoutInfo.plan
      var workoutInfo = this.state.currentUser.workoutInfo;
      var numWorkoutsLeft =workoutInfo.numWorkoutsLeft

      var appSettings = this.props.appSettings
      var totalPrice = appSettings.priceBase * rowData.numWorkouts
      var percentDiscount = 100 - Math.ceil(((rowData.price / totalPrice)* 100))


      return (
        <View style={{flex:1, marginTop:65}}>
          <PopupModal visible={this.state.modalVisible} onDismiss={() => this.setModalVisible(false)}>
            <HomeHelpModalPopup/>
          </PopupModal>
          <View style={{flex:1,marginTop:12}}>
            <View style={{flexDirection:'row'}}>
              <View style={[styles.rowBottomColumn, {marginLeft: -5}]}>
                <View style={{alignSelf:'center'}}>
                  <Text style={[styles.rowBottomHeader,{color:'#4C4C4C'}]}>WORKOUTS</Text>
                  <Text style={[styles.rowBottomText,{color:'#4C4C4C'}]}><Text style={[styles.bold,{color:'#4C4C4C'}]}>{rowData.numWorkouts}</Text>/month</Text>
                </View>
              </View>
              <View style={[styles.rowBottomColumn, {marginRight: 10}]}>
                <View style={{alignSelf:'center'}}>
                  <Text style={[styles.rowBottomHeader,{color:'#4c4c4c'}]}>{percentDiscount}% OFF</Text>
                  <Text style={[styles.rowBottomText,{color:'#4C4C4C'}]}><Text style={[styles.bold,{color:'#4C4C4C'}]}>${Math.ceil((rowData.price / rowData.numWorkouts))}</Text>/workout</Text>
                </View>
              </View>
          </View>
          <View style={{flex:1,marginBottom:55,marginTop:12, alignSelf:'stretch',justifyContent:'space-around',backgroundColor:'#FAFAFA',borderTopWidth:1,borderTopColor:'#E6E6E6'}}>
            <View>
              <Text style={[styles.bold,{color:'#4E4E4E',fontSize:13, textAlign:'center',marginTop:20}]}>My Workouts</Text>
              <Text style={[{fontFamily:'System',fontWeight:'700',fontSize:12,marginTop:12,textAlign:'center'}]}>{numWorkoutsLeft} of {rowData.numWorkouts} workouts left this month</Text>
              <Text style={{fontSize:12,fontFamily:'System',textAlign:'center'}}>if not booked expire on { moment(workoutInfo.nextBillingDate).local().format("MMM DD")}</Text>
            </View>
            <View>
              { this.renderWorkoutSquares(rowData) }
            </View>
          <Button buttonStyle={styles.registerButton} buttonTextStyle={styles.registerButtonText} onPress={() => this.singlePurchase() } >Buy Single Workout</Button>
            <View style={{flexDirection:'row'}}>
              <Button buttonStyle={styles.cancelButton} buttonTextStyle={styles.cancelButtonText} onPress={() => this.cancelConfirm() }>Cancel Subscription</Button>
              <Button buttonStyle={styles.cancelButton} buttonTextStyle={styles.editButtonText} onPress={() => this.setState({viewPackages: true}) }>Edit Subscription</Button>
            </View>
          </View>
        </View>
      </View>
      )
    }else{
      return (
        <Image source={require('../../assets/subscribe-now-bg-white.jpg')} style={styles.clientContainer}>
          <StatusBar barStyle='dark-content'/>
          <PopupModal visible={this.state.modalVisible} onDismiss={() => this.setModalVisible(false)}>
            <HomeHelpModalPopup/>
          </PopupModal>
          <ListView enableEmptySections={true} style={{width:Dimensions.get('window').width,}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
          { this.state.viewPackages ?
          <Button buttonStyle={styles.cancelEditSubscriptionButton} buttonTextStyle={styles.cancelButtonText} onPress={() => this.setState({viewPackages:false}) }>Cancel</Button>
            :
            null
          }

        </Image>
      )
    }
  }
}

export default SubscribeNow
