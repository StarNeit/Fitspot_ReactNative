import React, { Component } from 'react'
import PhoneVerify from '@LoginRegistration/components/PhoneVerify'
import {verifyCurrentUser} from '@store/modules/auth/actions'
import {connect} from 'react-redux'

type Props = {
  verifyCurrentUser: Function,
  isFetching: boolean,
  user: Object
}


class PhoneVerifyContainer extends Component {

  props: Props

  constructor(props){
    super(props)
    this.state = {
      isFetching: props.isFetching
    }
  }

  componentWillReceiveProps(nextProps){
    
  }

  render() {
    return (
      <PhoneVerify  verifyCurrentUser={this.props.verifyCurrentUser}/>
    )
  }

}



const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    user : state.auth.user.isVerified
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyCurrentUser: (token) => {
      dispatch(verifyCurrentUser(token))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PhoneVerifyContainer)
