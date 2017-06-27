import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-native-router-flux'
import scenes from './scenes'

type Props = {
  currentUser: Array,
}

class FitSpotRouter extends React.Component{
  props: Props
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Router key={`${this.props.currentUser.userType}`} scenes={scenes} />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FitSpotRouter)
