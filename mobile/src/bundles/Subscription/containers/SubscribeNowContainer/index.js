import React, { Component } from 'react'
import {TouchableOpacity, Image,} from 'react-native'
import SubscribeNow from '@Subscription/components/SubscribeNow'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { cancelSubscription } from '@store/modules/auth/actions'
import { activateSinglePurchaseBooking } from '@store/modules/booking/actions'


type Props = {
  items: Array,
  currentUser: Object,
  cancelSubscription: Function,
  plans: Array,
  purchaseSingleWorkout: Function,
  appSettings : Object,
  workoutInfo: Object,
}


class SubscribeNowContainer extends Component {

  props: Props

  constructor(props){
    super(props)
    this.state = {
      modalVisible : false,
      currentUser: props.currentUser,
      workoutInfo:Object,
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.currentUser !== null){
      this.setState({currentUser: nextProps.currentUser})
    }
  }


  componentDidMount() {

    Actions.refresh({ renderRightButton: this.renderRightButton})
  }

  renderRightButton = () => {

    var imgLocation = require('@images/help-icon.png');

    return (
      <TouchableOpacity onPress={ () => {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Commit to Fit.',
          detailsText: 'A subscription package with Fitspot allows you to Commit to Fit!\n\n Workouts may be redeemed at any location for any activity using any of our trainers whenever you want! We truly provide a customized experience.\n\n You can cancel or pause your membership any time you want with no fees by emailing info@fitspotapp.com.',
          onOkay:null,
          okayButtonText: 'Get Started',
          showCancelButton: false,
          showLinkButton: true,
          linkButtonText: 'Email Fitspot',
          linkButtonAction: 'mailto:info@fitspotapp.com?subject=Change Membership',
        }
        )
        }}>
          <Image source={imgLocation}/>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SubscribeNow appSettings={this.props.appSettings} purchaseSingleWorkout={this.props.purchaseSingleWorkout} items={this.props.items} plans={this.props.plans} cancelSubscription={this.props.cancelSubscription} {...this.state} />
    )
  }

}



const mapStateToProps = (state) => {
  return {
    items: state.plans.planItems,
    currentUser: state.auth.user,
    plans : state.plans.planItems,
    appSettings: state.auth.appSettings,
    workoutInfo: state.auth.user.workoutInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelSubscription: () => {
      dispatch(cancelSubscription())
    },
    purchaseSingleWorkout: () => {
      dispatch(activateSinglePurchaseBooking())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SubscribeNowContainer)
