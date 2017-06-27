import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: null,
    height: null
  },
  entryContainer: { justifyContent: 'space-between', width: Dimensions.get('window').width,marginTop: 12,flexDirection:'row',paddingTop: 20, paddingBottom: 20,borderTopWidth:1,borderTopColor: '#c0c0c0'},
  title: {alignSelf:'center', marginLeft: 20, fontFamily: FONT_DAYTONA_BOLD},
  buttonStyle: {marginBottom: 60,width: Dimensions.get('window').width,backgroundColor: DEFAULT_GREEN_COLOR,height:50, justifyContent:'center'},
  buttonTextStyle: {color: 'white', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
  

})

export default styles
