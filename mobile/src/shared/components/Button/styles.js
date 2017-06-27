/* @flow */

import { StyleSheet } from 'react-native'
import { DEFAULT_TEXT_COLOR, DEFAULT_GREEN_COLOR } from '@theme/colors'

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    width: 124,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonTextStyle: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
})

export default styles
