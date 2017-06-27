import React, { Component } from 'react'
import { TouchableOpacity,Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import EditProfile from '@Profile/components/EditProfile'
import { updateCustomer, updateTrainer,deleteAttachment } from '@store/modules/auth/actions'
import CONSTS from '@utils/Consts'


type Props = {
  user: Object,
  onUpdateClick: Function,
  onUpdateTrainerClick: Function,
  allActivities: Array,
  editingStatus: String,
  deletingStatus: String,
  deleteAttachment: Function,
  isFetching: boolean,
  error: String,
}


class EditProfileContainer extends Component {

  props: Props
  constructor(props){
    super(props)
    this.state= {
      isUpdating: false,
      isFetching: false,
    }
  }

  componentWillReceiveProps(nextProps){

    if((nextProps.isFetching == false && this.state.isUpdating) && nextProps.error === null){
      this.setState({isUpdating:false})
      Actions.refresh({ renderRightButton: this.renderRightButton})
    }
  }

  componentDidMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton})
  }
  updatePress(){
    
    this.setState({isUpdating:true})
    Actions.refresh({ renderRightButton: this.renderRightButton})

    if(this.props.user.userType !== CONSTS.USER_TYPE.TRAINER){
      this.props.onUpdateClick(this.props.user)
    }else{
      this.props.onUpdateTrainerClick(this.props.user)
    }
  }

  renderRightButton = () => {
    return (
      <TouchableOpacity onPress={() => this.updatePress()}>
          { this.state.isUpdating ?
            <ActivityIndicator style={{}}/>
            :
          <Text>Save</Text>
          }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <EditProfile {...this.props}/>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allActivities: state.auth.appSettings.activities,
    editingStatus: state.auth.updatingStatus,
    deletingStatus: state.auth.deletingFileStatus,
    isFetching: state.auth.isFetching,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateClick: (user) => {
      dispatch(updateCustomer(user))
    },
    onUpdateTrainerClick: (user) => {
      dispatch(updateTrainer(user))
    },
    deleteAttachment: (id) => {
      dispatch(deleteAttachment(id))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(EditProfileContainer)
