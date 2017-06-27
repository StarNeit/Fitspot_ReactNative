import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 64,
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',

  },
  dateContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'rgb(118,196,50)',
    padding: 5,
  },
  dateText: {
    color: 'white',
    fontSize: 20,
    fontFamily:FONT_DAYTONA_REG,
  },
  trainerInfoContainer: {
    flex:7,
    flexDirection: 'column',
  },
  trainerContainer: {
    flex:4,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5
  },
  avatarContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    height:36,
    width: 36,
    borderRadius: 18,
  },
  namePlusContainer: {
    flex:7,
    flexDirection:'column',
    paddingLeft: 15,
  },
  nameContainer: {
    flex:1,
    margin: 2,
  },
  nameText: {
    color: DEFAULT_GREEN_COLOR,
    fontWeight: 'bold',
    fontFamily: FONT_DAYTONA_BOLD
  },
  ratingContainer: {
    flex:1,
    margin: 2,
    flexDirection: 'row'
  },
  ratingText: {
    color: DEFAULT_GREEN_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONT_DAYTONA_BOLD
  },
  startContainer: {
    flex:1,
    paddingLeft: 5,
    flexDirection: 'row'
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
  },
  timeText: {
    color: DEFAULT_GREEN_COLOR,
    paddingLeft: 5,
    paddingTop: 1,
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: FONT_DAYTONA_BOLD
  },
  buttonParentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: DEFAULT_GREEN_COLOR,
    height: 30,
    width: 100,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    alignSelf:'center',
    fontWeight: 'bold',
    fontFamily: FONT_DAYTONA_BOLD
  },
  coWorkerText: {
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 10,
    fontFamily: FONT_DAYTONA_BOLD
  },
  bookButtonStyle: {
    marginBottom: 24,
    alignSelf: 'stretch',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: DEFAULT_GREEN_COLOR,
    height: 50,
    justifyContent: 'center',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1
  },
  bookButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
})

export default styles
