import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import { styles } from './styles'

export const RoundBtn = ({children, onPress, color}) => {
  let exStyles = {}

  color !== '' && color !== undefined ? exStyles = {backgroundColor: color, borderColor:color}: {} 

  return (
    <TouchableOpacity onPress={onPress} style={[styles.roundBtn, exStyles]}>
      <Text style={color !== undefined ?{color:'#ffffff'}:{}}>{children}</Text>
    </TouchableOpacity>
  )
}