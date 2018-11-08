import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'

import { styles } from './styles'

export const RoundBtn = ({children, onPress, color, loading}) => {
  let exStyles = {}

  color !== '' && color !== undefined ? exStyles = {backgroundColor: color, borderColor:color}: {} 

  return (
    !loading? <TouchableOpacity onPress={onPress} style={[styles.roundBtn, exStyles]}>
      <Text style={color !== undefined ?{color:'#ffffff'}:{}}>{children}</Text>
    </TouchableOpacity>:  <View style={[styles.roundBtn, exStyles]}>
      <Text style={color !== undefined ?{color:'#ffffff'}:{}}>Loading...</Text>
    </View>
  )
}