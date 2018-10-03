import {StyleSheet} from 'react-native'

import { primaryColor, secondaryColor } from '../sharedStyles'

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height:'100%',
        width: '100%',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height:55,
        backgroundColor:primaryColor,
        padding: 5
    },
    goback: {
        color: secondaryColor,
    },
    modalBody: {
        width: '100%'
    }
  })