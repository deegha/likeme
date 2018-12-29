import React from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'

import { styles } from './styles'  

export const BottomNav = ({selected, selectTab}) => {

  return (
  <View style={styles.bottomNav}>
    <TouchableOpacity onPress={selectTab('home')} style={styles.bottomNavIcon}>
      <Ionicons name="md-home" size={26} color={selected==='home'?"white":"silver"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={selectTab('cur-location')} style={styles.bottomNavIcon}>
      <Entypo name="location" size={26} color={selected==='cur-location'?"white":"silver"} />
    </TouchableOpacity>
  </View>
  )
}