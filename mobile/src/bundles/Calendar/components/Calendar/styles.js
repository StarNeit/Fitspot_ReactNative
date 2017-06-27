import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#c9c9c9',
    marginTop: 24,
    marginBottom: 55
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
  },
  loginButtonStyle: {
    fontFamily: 'System',
    fontWeight: '700',
    marginBottom: 24,
    alignSelf: 'center',
    marginLeft: 35,
    marginRight: 35,
    height: 50,
    color: DEFAULT_GREEN_COLOR
  }
})

export default styles
