import {StyleSheet,Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'
import {FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    marginTop: 66,
    marginBottom: 50
  },
  headerText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 14,
    marginTop: 15,
    color: '#000'

  },
  // registerButton: {
  //   height: 50,
  //   marginLeft: 32,
  //   marginRight: 32,
  //   alignSelf:'stretch',
  //   flexDirection: 'row',
  //   backgroundColor: DEFAULT_GREEN_COLOR,
  //   justifyContent: 'center',
  //   // marginTop: 15
  // },
  // registerButtonText: {
  //   fontSize: 12,
  //   color: 'white',
  //   alignSelf: 'center',
  //   fontFamily: 'System',
  //   fontWeight: 'bold'
  // },
  registerButton: {
    height: 50,
    // width: 256,
    // marginLeft:32,
    // marginRight:32,
    alignSelf:'stretch',
    // flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    // justifyContent: 'center',
    marginTop: 45
  },
  registerButtonText: {
    // fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },




  packBlockContainer: {
    marginTop: 25,
    marginBottom: 25,
    // width: 256,
    marginLeft:32,
    marginRight:32,
    height: 44,
    backgroundColor: '#5FB13D',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center'
  },
  packBlockColumn: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  packBlockBigText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 24,
    color: 'white',
    marginRight: 6
  },
  packBlockSmallText: {
    width: 57,
    fontWeight: 'bold',
    fontSize: 9,
    color: 'white',
    flexWrap: 'wrap'
  },
  lineItemContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lineItemLeftText: {
    fontSize: 12,
    color: '#5F5F5F'
  },
  lineItemRightText: {
    width: 57,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#4C4C4C',
    flexWrap: 'wrap',
    textAlign: 'right'
  },
  legalText: {
    color: '#667080',
    // width: 256,
    marginLeft:32,
    marginRight:32,
    height: 42,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  }
});

export default styles
