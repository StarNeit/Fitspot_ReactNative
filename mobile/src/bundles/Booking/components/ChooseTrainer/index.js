import React from 'react'
import {View, Text, TextInput, ListView,TouchableHighlight, Image,TouchableWithoutFeedback} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NavigationSteps from '@components/NavigationSteps'
import styles from './styles'
import TrainerDetail from '@Trainer/components/TrainerDetail'
import Popover from '@components/Popover'
import LoadingDataView from '@components/LoadingDataView'
import CONSTS from '@utils/Consts'
import Icon from 'react-native-vector-icons/FontAwesome';


import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

type Props = {
  trainers: Array,
  activities: Array,
  bookingState: Object,
  selectTrainer: Function,
  workoutInfo: Object,
  getTrainerAvailability: Function
}

class ChooseTrainer extends React.Component{

    constructor(props) {
      super(props);
      var source = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1,s2) => s1 !==s2
      });

      var trainers = this.props.trainers
      if(props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY){
        trainers.unshift({firstName: 'Fitspot', lastName: 'Choose', id: -1})
      }
      this.state = {
        currentStep: this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY ? 4 : 1,
        totalSteps: 4,
        buttonRect: {},
        ds: trainers,
        activities: this.props.activities,
        dataSource: source.cloneWithRows(this.props.trainers),
        filterVisible: false,
        detailsVisible: false,
        isBrowsingTrainers: true,
        activitiesChosen: [],
        selectedTrainer: {},
        trainers: this.props.trainers,
      }
    }

    convertTrainerArrayToMap(trainers){
      var trainerMap = {};
      trainerMap['Your Selected Time'] = [];
      trainerMap['Closest to Your Time'] = [];
      var trainers = this.props.trainers
      if(props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY){
        trainers.unshift({firstName: 'Fitspot', lastName: 'Choose', id: -1})
      }
      trainers.forEach(function(trainer){
        if(trainer.selectedTime){
          trainerMap['Your Selected Time'].push(trainer);
        }else{
          trainerMap['Closest to Your Time'].push(trainer);
        }
      });

      return trainerMap;
    }

    pressRow(rowData) {
    }

    filterTrainersByActivities(trainers){
      var theState = this.state
      if(theState.activitiesChosen.length === 0){
        return trainers
      }
      var newTrainers = trainers.map(function(trainer){
        var activitiesFound = trainer.trainer.activities.filter(function(trainerActivity){
          var foundChosen = theState.activitiesChosen.filter(function(chosen){
            return chosen == trainerActivity.id
          })
          return foundChosen? foundChosen[0] : null; // or undefined
        })
        if(activitiesFound.length > 0){
          return trainer;
        }else{
          return null;
        }
      })
      if(newTrainers[0] === null){
        return []
      }else{
        return newTrainers
      }

    }

    componentWillReceiveProps(nextProps){
      if(nextProps.trainers.length != 0 &&
        this.state.ds.length != nextProps.trainers.length){
          if(!this.state.isBrowsingTrainers){
            this.setState({
              dataSource: this.state.dataSource.cloneWithRowsAndSections(this.convertTrainerArrayToMap(nextProps.trainers))
            })
          }else{
            this.setState({
              dataSource:this.state.dataSource.cloneWithRows(this.filterTrainersByActivities(nextProps.trainers)),
              ds : nextProps.trainers,
              trainers: nextProps.trainers,
            })
          }
      }
    }


    updateDataSource(){
      if(!this.state.isBrowsingTrainers){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.convertTrainerArrayToMap())
        })
      }else{
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(this.filterTrainersByActivities(this.state.ds)),
        })
      }
    }


    changeColorIfActivitySelected(activityID){
      if(this.state.activitiesChosen.indexOf(activityID) != -1){
        return { backgroundColor: DEFAULT_GREEN_COLOR}
      }
    }
    changeTextColorIfActivitySelected(activityID){
      if(this.state.activitiesChosen.indexOf(activityID) != -1){
        return {color: 'white'}
      }
    }
    selectActivity(activityID){
      var chosenActivites = this.state.activitiesChosen
      var index = chosenActivites.indexOf(activityID)
      if( index > -1){
        // we've found it, let's remove it.
        chosenActivites.splice(index,1)
      }else{
        chosenActivites.push(activityID)
      }
      this.setState({activitiesChosen: chosenActivites})
      this.updateDataSource()
    }

    clearActivitiesChosen(){
      var activitiesChosen = []
      this.setState({activitiesChosen : []})

    }

    componentDidUpdate(prevProps, prevState){
      if(prevState.activitiesChosen.length > 0 &&
        this.state.activitiesChosen.length == 0){
          this.updateDataSource()
        }
    }

    selectTrainer(trainer){
      if(trainer.id < 0){

        Actions.mainAppModal(
          {
            uniqId: new Date().getTime() + Math.random(5),
            visible: true,
            headerText: "We'll find a trainer for you",
            detailsText: 'Fitspot will send an express message to all of our trainers to find you one at your selected time.',
            showSubDetails: false,
            onOkay: () => this.checkPaymentAndGo(),
            okayButtonText: 'Find My Trainer',
            showCancelButton: false,
            showImage: true,
            image: require('@images/fitSpotGreenLogo.png'),
          }
        )
        return;
      }
      this.setState({
        detailsVisible : true,
        selectTrainer: trainer
      })
    }

    checkPaymentAndGo(){
      if((this.props.workoutInfo == null ||
        (this.props.workoutInfo.numWorkoutsLeft == 0 &&
        !this.props.workoutInfo.isActive) ||
        this.props.workoutInfo.numWorkoutsLeft == 0
        ) &&
        (!this.props.bookingState.isSinglePurchase)
      ){
        Actions.bookingSubscriptionOptions()
      }else{
        Actions.bookingConfirmation()
      }
    }

    setTrainer(trainer){
      this.props.selectTrainer(trainer)
      if(this.props.bookingState.isEditing){
        Actions.pop()
      }else{
        if(this.props.bookingState.bookingType === CONSTS.BOOKING_TYPE.BY_TRAINER){
          this.props.getTrainerAvailability(trainer)
          Actions.chooseActivity()
        }else{
          this.checkPaymentAndGo()
        }
      }

    }

    renderRow(rowData) {
      var name = rowData.firstName + ' ' + (rowData.id < 0 ? rowData.lastName : rowData.lastName.slice(0,1))

      return (
        <TouchableHighlight onPress={() => this.selectTrainer(rowData)} style ={styles.rowStyle} underlayColor={'rgba(0,0,0,0)'}>
          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center', marginBottom:6}}>

            { rowData.id < 0 ?
              <Image source={require('@images/fitspotChoose.png')} style={{width:72,height:72 ,borderRadius:36}} />
              :
            <View>
              <Image source={{uri: rowData.avatar.url }} style={{width:72,height:72 ,borderRadius:36}}/>
              {rowData.sessionInfo.like ? <Icon name="star" size={15} color="#F6A623"
                style={{position: 'absolute', top: 5, right:0,
                  textShadowColor: '#fff',
                  textShadowOffset: {width: 0.01, height: 1} }}/> : <View></View>
              }

            </View>
            }
            <Image source={require('@images/fav-star.png')} style={[{position:'absolute', top:0,right:0},{height: rowData.starIcon ? 16:0,}]} />
            <Text style={{textAlign:'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:11, marginTop: 6}}>{name}</Text>
            <Text style={{textAlign:'center',fontFamily:FONT_DAYTONA_REG,fontSize:9, marginTop: 6}}>{}</Text>

          </View>
        </TouchableHighlight>
      )
    }

    showPopover() {
      this.filterButton.measure((ox, oy, width, height, px, py) => {
        this.setState({
          filterVisible: true,
          buttonRect: {x: px, y: 0, width: width, height: height}
        });
      });
    }
    closePopover() {
      this.setState({filterVisible: false});
    }


    renderSectionHeader(sectionData,category){
      return(
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLine}></View>
               <Text style={styles.sectionHeaderText}>{category}</Text>
            <View style={styles.sectionHeaderLine}></View>
        </View>
      )
    }
    renderActivities(){
      var items = []
      if(typeof this.props.activities === 'undefined'){
        return (
          <View></View>
        )
      }
      if(this.props.activities.length == 0){
        return (
          <View></View>
        )
      }
      for (var i = 0; i < this.props.activities.length; i++) {
        let activity = this.props.activities[i]
        let activity2 = null
        if((i + 1) < this.props.activities.length){
          activity2 = this.props.activities[i+1]
          i++;
        }
        items.push(
        <View key={activity.id + `-activity`} style={{flexDirection:'row',borderBottomWidth: 1,borderBottomColor: DEFAULT_GREY_COLOR,}}>
          <TouchableHighlight onPress={() => this.selectActivity(activity.id) } underlayColor={'rgba(0,0,0,0)'}
            style={[{width:125,height:40,justifyContent:'center'},this.changeColorIfActivitySelected(activity.id)]}>
            <Text style={[{fontFamily:FONT_DAYTONA_REG,fontSize:13,textAlign:'center'},this.changeTextColorIfActivitySelected(activity.id)]}>{activity.name}</Text>
          </TouchableHighlight>
          <View style={ activity2 != null ? {width:1, backgroundColor:DEFAULT_GREY_COLOR} : {}}></View>
          <TouchableHighlight onPress={() => this.selectActivity(activity2.id) } underlayColor={'rgba(0,0,0,0)'}
            style={[{width:125,height:40,justifyContent:'center'}, this.changeColorIfActivitySelected(activity2.id)]}>
            <Text style={[{width:125,fontFamily:FONT_DAYTONA_REG,fontSize:13,textAlign:'center'},this.changeTextColorIfActivitySelected(activity2.id)]}>{ activity2 != null ? activity2.name : null}</Text></TouchableHighlight>
        </View>)
      }
      return(
        <View>
          { items }
          <View>
            <TouchableHighlight style={{margin:10}} underlayColor={'rgba(0,0,0,0)'} onPress={() => this.clearActivitiesChosen()}><Text style={{textAlign:'center',fontFamily:FONT_DAYTONA_REG,fontSize:13}}>All Activities</Text></TouchableHighlight>
          </View>


        </View>
      )
    }


    closeDetails(){
      this.setState({detailsVisible: false});
    }
    buttonTitle(){
      var title = 'All Activities'
      var foundActivities = []

      for (activity of this.state.activities) {
        if(this.state.activitiesChosen.indexOf(activity.id) > -1){
          foundActivities.push(activity.name)
        }
      }
      if(foundActivities.length > 0){
        title = foundActivities.join(', ')
      }
      return title;
    }

    renderFilter(){
      if(this.props.bookingState.bookingType === CONSTS.BOOKING_TYPE.BY_ACTIVITY){
        return null
      }
      return(
        <View style={{marginTop:6, zIndex:6,
          borderTopWidth: 1,
          borderTopColor: DEFAULT_GREY_COLOR,
          borderBottomWidth: 1,
          borderBottomColor: DEFAULT_GREY_COLOR}}>
          <TouchableHighlight underlayColor={'rgba(0,0,0,0)'}  ref={(input) => { this.filterButton = input; }}
             style={styles.button} onPress={() => this.showPopover()} >
            <Text style={{textAlign:'center', marginTop:15,marginBottom: 15,fontSize:12,
              color: DEFAULT_GREEN_COLOR
            }}>{this.buttonTitle()}</Text>
          </TouchableHighlight>

          <Popover
            isVisible={this.state.filterVisible}
            fromRect={this.state.buttonRect}
            onClose={() => this.closePopover()}
            popoverStyle={{
              backgroundColor:'rgba(0,0,0,0)',
              borderColor:'#afafaf',
              borderWidth:1,
              // shadowColor: 'black',
              // shadowOffset: {width: 0, height: 2},
              // shadowRadius: 2,
              // shadowOpacity: 0.8,
            }}
            >
            { this.renderActivities() }
          </Popover>
        </View>
      )
    }

    onSearchChange(text) {
      console.log(text)
      var filter = text.toLowerCase(),
          newFilter = [];
      console.log(this.props.trainers);
      this.props.trainers.forEach(function(item) {
        if (item.publicId.toLowerCase().indexOf(filter) !== -1) {
          newFilter.push(item)
        }
      });
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newFilter)
      });

    }
    render(){
      return (
        <View style={styles.container}>

          <TouchableWithoutFeedback onPress={()=> this.closePopover()}><View style={{position:'absolute',backgroundColor:'rgba(0,0,0,0)',top:0,left: this.state.filterVisible ? 0 : 900,right:0,bottom:0,zIndex:2}}></View></TouchableWithoutFeedback>
          <NavigationSteps currentNumber={this.state.currentStep} style={{opacity: this.props.bookingState.isEditing ? 0 : 1}} numberOfSteps={this.state.totalSteps}  />
          {this.renderFilter()}
          <View style={{ flex: 1,
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'green'}}>
                  <TextInput
                    style={{height: 30,
                      flex: 1,
                      paddingHorizontal: 8,
                      fontSize: 12,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 2, fontFamily: FONT_DAYTONA_REG}}
                    placeholder="Search Trainers using their ID..."
                    clearButtonMode='while-editing'
                    onChangeText={(text) => this.onSearchChange(text)}
                  />
          </View>
          <View style={{flex: 16}}>

              { this.state.ds.length > 0 ?
                <ListView style={styles.listStyle} contentContainerStyle={styles.listContainerStyle}
                  dataSource={this.state.dataSource}
                   renderRow={this.renderRow.bind(this)}
                   renderSectionHeader={ this.state.isBrowsingTrainers ? null : this.renderSectionHeader.bind(this)}
                   >
                </ListView>
                :
                <LoadingDataView headerText={'Loading Trainers Near you.'} descriptionText={'Some Copy here perhaps?'} />
              }
          </View>

          <TrainerDetail visible={this.state.detailsVisible} selectedTrainer={this.state.selectedTrainer} trainers={ this.state.trainers }
            onChooseClick={this.setTrainer.bind(this)} activities={this.props.activities} onCancelClick={this.closeDetails.bind(this)} />
        </View>

      )
    }
  }

export default ChooseTrainer
