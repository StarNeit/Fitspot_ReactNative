import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '@Profile/components/Profile'
import { refreshUser } from '@store/modules/auth/actions'
import { Actions } from 'react-native-router-flux'


type Props = {
  user: Object,
  isLoggedIn: boolean,
  refreshUser: Function,
}


class ProfileContainer extends Component {

  props: Props

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Profile { ...this.props}  />
    )
  }

}




const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: (state.auth.loggedIn == null) ? false : state.auth.loggedIn,
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    refreshUser: () => {
      dispatch(refreshUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
