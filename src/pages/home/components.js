import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {  Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'

const IconContainer = ({children, lable, callBack}) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={callBack}>
      {children}
      <Text style={styles.iconlable}>{lable}</Text>
    </TouchableOpacity>
  )
} 

export const XComponent = () => {

  return (
    <View style={styles.xComponentContainer}>
      <View style={styles.xComponentTop} /> 
      <View style={styles.xComponenBottom}>
        <IconContainer lable={'Hot'}>
          <MaterialCommunityIcons name={'fire'} size={30} color={"#fc5c65"} />
        </IconContainer>
        <IconContainer lable={'On your location'}>
          <Entypo name={'location'} size={30} color={"#00bcd4"} />
        </IconContainer>
        <IconContainer lable={'Online'}>
          <MaterialIcons name={'computer'} size={30} color={"#4b7bec"} />
        </IconContainer>
      </View>     
    </View> 
  )
}

export const Listheader = ({children}) => {
  return (
    <View style={styles.listheaderContainer}>
      <Text style={styles.listheadertext}>{children}</Text>
    </View>
  )
}

export const Sections = ({children, lable}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionlable}>{lable}</Text>
      {children}
    </View>
  )
}