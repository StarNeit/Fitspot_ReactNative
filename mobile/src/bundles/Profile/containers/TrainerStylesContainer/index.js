import React, { Component } from 'react'
import { TouchableOpacity,Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import TrainerStyles from '@Profile/components/TrainerStyles'
import { updateCustomer, updateTrainer,deleteAttachment } from '@store/modules/auth/actions'
import CONSTS from '@utils/Consts'


type Props = {
  user: Object,
  onUpdateClick: Function,
}


class TrainerStylesContainer extends Component {

  props: Props
  constructor(props){
    super(props)
  }

  render() {
    return (
      <TrainerStyles {...this.props}/>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allActivities: state.auth.appSettings.activities,
    editingStatus: state.auth.updatingStatus,
    deletingStatus: state.auth.deletingFileStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateClick: (user) => {
      dispatch(updateCustomer(user))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TrainerStylesContainer)
