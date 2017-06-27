/* @flow */

import React from 'react'
import BuySubscriptionContainer from '@Subscription/containers/BuySubscriptionContainer'

type Props = {
  chosenSubscription: Object
}

class BuySubscriptionScene extends React.Component{

  props: Props

  constructor(props){
    super(props)
  }

  render(){
    return (
      <BuySubscriptionContainer {...this.props}/>
    )
  }
}

export default BuySubscriptionScene
