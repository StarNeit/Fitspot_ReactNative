import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  TextInput
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import GreenBackButton from '@components/GreenBackButton'
import styles from './styles'
import Button from '@components/Button'
import HorizontalLine from '@components/HorizontalLine'
import ApiUtils from '@utils/ApiUtils'
import { NativeModules } from 'react-native';
import AwesomeButton from '@components/AwesomeButton';



import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'

type Props = {
  chosenSubscription: Object,
  appSettings: Object,
  selectedPlan: Function,
}

class BuySubscription extends React.Component {

  props: Props

  constructor(props){
    super(props)
    this.state = {
      btnBuyState: 'idle',
    }
  }

  async buyItem(rowData){
    var appSettings = this.props.appSettings
    this.setState({btnBuyState: 'busy'})
    if(appSettings.braintreeClientToken === null){
      //need to get everything first.
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Client Error',
        detailsText: "Please contact fitspot. ERROR: Client payment token missing.",
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
    }else{
      //use the token
      // 'plan_id': ('planId', parse.Integer(required=True, nullable=False)),
      // 'payment_token': ('paymentToken', parse.String(required=True, nullable=False))
      var BrainTreePayManager = NativeModules.BrainTreePayManager;

      try {
        var token = await BrainTreePayManager.showDropIn(appSettings.braintreeClientToken);
        if(token[0] === 'error'){
          if(token[1] === 'cancelled'){
            this.setState({btnBuyState: 'idle'})
            return
          }else{
            Actions.mainAppModal(
            {
              uniqId: new Date().getTime(),
              visible: true,
              headerText: 'Credit Card Error',
              detailsText: token[1],
              onOkay:null,
              okayButtonText: 'OK',
              showCancelButton: false,
            }
            )
            return
          }
        }

        ApiUtils.post('customers/purchase-plan',{planId: this.props.chosenSubscription.id, paymentNonce: token[0]}).then(([response, jsonBody]) => {
          // do stuff with both.
          // console.log(response)
          // console.log(jsonBody)
          if (response.status == 200) {
            jsonBody.plan = this.props.chosenSubscription;

            this.props.selectedPlan(jsonBody)
            this.setState({btnBuyState: 'success'})
            Actions.pop()
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

  render(){
    var chosenSub = this.props.chosenSubscription
    var appSettings = this.props.appSettings
    var totalPrice = appSettings.priceBase * chosenSub.numWorkouts
    var percentDiscount = 100 - Math.ceil(((chosenSub.price / totalPrice)* 100))

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{chosenSub.name}</Text>
      <View style={styles.packBlockContainer}>
        <View style={styles.packBlockColumn}>
          <Text style={styles.packBlockBigText}>{chosenSub.numWorkouts}</Text>
          <Text style={styles.packBlockSmallText}>WORKOUTS PER MONTH</Text>
        </View>
        <View style={styles.packBlockColumn}>
          <Text style={styles.packBlockBigText}>-{percentDiscount}%</Text>
          <Text style={styles.packBlockSmallText}>${chosenSub.pricePerWorkout} PER WORKOUT</Text>
        </View>
      </View>
      <View style={{width:null,alignSelf:'stretch',marginLeft:32,marginRight:32,}}>
        <HorizontalLine/>
        <View style={styles.lineItemContainer}>
          <Text style={styles.lineItemLeftText}>Number of Workouts</Text>
          <Text style={styles.lineItemRightText}>{chosenSub.numWorkouts}</Text>
        </View>
        <HorizontalLine/>
        <View style={styles.lineItemContainer}>
        <Text style={styles.lineItemLeftText}>Price of {chosenSub.numWorkouts} Workouts</Text>
        <Text style={styles.lineItemRightText}>${totalPrice}</Text>
        </View>
        <HorizontalLine/>
        <View style={styles.lineItemContainer}>
        <Text style={styles.lineItemLeftText}>Subscription Discount</Text>
        <Text style={styles.lineItemRightText}>{percentDiscount}%</Text>
        </View>
        <HorizontalLine/>
        <View style={styles.lineItemContainer}>
        <Text style={styles.lineItemLeftText}>Total Billed Monthly</Text>
        <Text style={styles.lineItemRightText}>${chosenSub.price}</Text>
        </View>
        <HorizontalLine/>
      </View>
      <Text style={styles.legalText}>* Legal disclaimer suff, you will be billed at the start of the month, subscriptions can be cancelled at any time, etc.</Text>
      <View style={{width:null,alignSelf:'stretch',marginLeft:32,marginRight:32,}}>
      <AwesomeButton backgroundStyle={styles.registerButton} labelStyle={styles.registerButtonText}
        transitionDuration={200} buttonState={this.state.btnBuyState}
              states={{
                idle: {
                  text: "Confirm Purchase of "+ chosenSub.price + "/ Month",
                  onPress: () => this.buyItem(),
                  backgroundColor: '#5fb13d',
                  textColor: '#ffffff',
                },
                busy: {
                  text: 'Purchasing',
                  backgroundColor: '#5fb13d',
                  spinner: true,
                  textColor: '#ffffff'
                },
                success: {
                  text: 'Purchased!',
                  backgroundColor: '#ffffff',
                  textColor: '#5fb13d',
                },
                error: {
                  text: 'Error Purchasing, Try again',
                  backgroundColor: '#ff0000',
                  onPress: () => this.buyItem(),
                  textColor: '#ffffff'
                }
              }}

              ></AwesomeButton>
        </View>
              {/*<Button onPress={() => this.buyItem()} buttonStyle={styles.registerButton} buttonTextStyle={styles.registerButtonText}>Confirm Purchase of ${chosenSub.price} / Month</Button>*/}
    </View>
  )
  }
}


export default BuySubscription
