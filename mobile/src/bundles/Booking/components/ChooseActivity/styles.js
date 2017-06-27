import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    // backgroundColor: '#c0c0c0'
  },
  image: {
    width: Dimensions.get('window').width,
    height:107
  }
})

export default styles
