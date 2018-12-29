import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles'

export const styles = StyleSheet.create({
    textInputError: {
      color: 'red',
      fontSize: 12,
      padding: 10,
      paddingTop: 0
    },
    inputText: {
      width: '100%',
      padding: 10,
      fontSize: 17,
    },
    roundBtn: {
      borderColor: shared.btnBorder,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    SeachIconContainer: {
      width: '100%',
      padding: 7,
      paddingTop: 0
    },
    locationPlaceholder: {
      fontWeight: '100',
      color: '#bdc3c7'
    },
    locatoionText: {
      color: '#000000'
    },
    locationSeacrhContainer: {
      padding: 14,
      flex: 1,
      height: '100%'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height:55,
      backgroundColor:shared.floatingBtnColor,
      padding: 5
    }, goback: {
      color: shared.secondaryColor,
  },
  })