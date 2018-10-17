import { StyleSheet } from 'react-native'
import * as shared from '../sharedStyles'

export const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: shared.floatingBtnColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex:2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})