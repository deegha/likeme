import React from 'react'
import { Image, 
        View, 
        TouchableOpacity, 
        Animated, 
        Text, 
        FlatList,
        SafeAreaView } from 'react-native'

import { styles } from './styles'

export const ActiveUserFeedsView = ({
  user,
  feeds
}) => {
  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.informationArea}>
            <Text style={styles.displayName}>{user.displayName}</Text>
            <View  style={styles.profileDetails}>
              <Text style={styles.detail}>10 Followers</Text>
              <View style={{width: 10}} />
              <Text style={styles.detail}>20 Following</Text>
              <View style={{width: 10}} />
              <Text style={styles.detail}>50 Promotions</Text>
            </View>
          </View>
          <Image style={styles.displayImage} source={{uri: user.image}} /> 
        </View>
        <View  style={styles.body}>
          <Text></Text>
        </View>
      </View>

  )
}