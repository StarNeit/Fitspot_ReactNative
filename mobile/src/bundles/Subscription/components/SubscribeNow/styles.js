import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: null,
    height: null,
    marginBottom: 60,
    marginTop:65,
  },
  headerText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 14,
    marginTop: 31,
    color: '#fff',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  row: {
    flex: 1,
    // flexDirection:'row',
    backgroundColor: 'rgba(255,255,255,1)',
    width: null,
    height: 115,
    alignSelf: 'stretch',
    marginLeft:32,
    marginRight: 32,
    marginBottom: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  rowTop: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  bold: {
    fontFamily: FONT_DAYTONA_BOLD
  },
  rowTopTitle: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  rowBottom: {
    flex: 2,
    flexDirection: 'row',
  },
  rowBottomHeader: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    fontSize: 8
  },
  rowBottomText: {
    color: '#c4c4c4',
    fontSize: 20,
    fontFamily: FONT_DAYTONA_LIGHT
  },
  rowBottomColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  bestValue: {
    position: 'absolute',
    top: 33,
    left: -5
  },
  registerButton: {
    height: 50,
    width: null,
    marginLeft: 32,
    marginRight: 32,
    // flexDirection: 'row',
    backgroundColor: DEFAULT_GREEN_COLOR,
    justifyContent: 'center',
    // marginTop: 15

  },
  registerButtonText: {
    fontSize: 12,
    color: 'white',
    // alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
    textAlign:'center'
  },
  editButton: {
    flex:1,
    height:44,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    // marginTop: 15
    borderWidth: .5,
    borderLeftWidth:0,
    borderColor: '#D4D2D9'
  },
  editButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR ,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex:1,
        height:44,
    flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    // marginTop: 15
    borderWidth: .5,
    borderColor: '#D4D2D9'
  },
  cancelButtonText: {
    fontSize: 12,
    color: '#EB6464',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  cancelEditSubscriptionButton: {
    width: null,
    marginLeft:32,
    marginRight:32,
        height:44,
    flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignSelf:'stretch',
    // marginTop: 15
    borderWidth: .5,
    borderColor: '#D4D2D9'
  }
})

export default styles
