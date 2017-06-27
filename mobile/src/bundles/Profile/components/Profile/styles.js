import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT } from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
  flex: 1,
},
buttonStyle: {marginBottom: 24,alignSelf:'stretch',marginLeft:35,marginRight:35,backgroundColor:'white',height:50, justifyContent:'center',borderColor: '#5D5D5F',borderWidth:1},
buttonTextStyle: {color: '#5D5D5F', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
createAccountButton: {
  height: 44,
  backgroundColor: DEFAULT_GREEN_COLOR,
  borderColor: DEFAULT_GREEN_COLOR,
  borderWidth: 1,
  // alignSelf: 'stretch',
  alignSelf: 'stretch',
  justifyContent: 'center',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
},
createAccountButtonText: {
  fontSize: 12,
  color: 'white',
  alignSelf: 'center',
  justifyContent: 'center',
  fontFamily: 'System',
  fontWeight: 'bold'
},
dismissButton: {
  position:'absolute',
  width:40,
  height:40,
  top:5,
  left: 10
},
})

export default styles
