import React, { Component } from 'react'
import ChangePassword from '@Profile/components/ChangePassword'

type Props = {

}


class ChangePasswordContainer extends Component {

  props: Props
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ChangePassword {...this.props}/>
    )
  }

}


export default ChangePasswordContainer
