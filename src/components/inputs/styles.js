import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles'

export const styles = StyleSheet.create({
    inputText: {
      width: '100%',
      padding: 10,
      fontSize: 17,
    },
    roundBtn: {
      borderWidth: 1,
      borderColor: shared.btnBorder,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });