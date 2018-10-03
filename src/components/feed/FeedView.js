import React from 'react'
import { View, Text, Image } from 'react-native'
// import Image from 'react-native-scalable-image'
import { styles } from './styles'
import { RoundButton } from '../'

export const FeedView = ({feed}) => {

  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        <Image  style={styles.image} source={feed.media.url} resizeMode="contain" /> } />
      </View>
      <View style={contentArea}>
        <RoundButton>
          Up
        </RoundButton>
        <RoundButton>
          Down
        </RoundButton>
        <RoundButton>
          Action
        </RoundButton>
        <RoundButton>
          Share
        </RoundButton>
      </View>
    </View>
  )
}