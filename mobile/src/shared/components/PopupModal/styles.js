/* @flow */

import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    position: 'absolute',
    top:0,
    left:0,
    bottom: 0,
    right: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    zIndex: 9999,
  },
  contentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    width: null,
    height: null,
  },
  modalTitleContainer: {
    position: 'absolute',
    top: 41,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    color : '#FFF',
    fontWeight: 'bold',
  }
});

export default styles
