import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image'


import { styles } from './styles'

export const WithImage = ({url, text}) => {
  return (
    <View style={styles.withImageContainer}>
      <Image width={Dimensions.get('window').width} source={{uri:url}} resizeMode="contain" />
    </View>
  )
} 