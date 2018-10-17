import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'

export const FloatingBtn = ({action, children}) => {

  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      {children}
    </TouchableOpacity>
  )
}