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
  console.log("Dsfsdafd")
  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.informationArea}>
            <Text style={styles.displayName}>{user.displayName}</Text>
            <View  style={styles.profileDetails}>
              <Text style={styles.follow}>10Followers</Text>
              <View style={{width: 10}} />
              <Text style={styles.follow}>20Following</Text>
            </View>
          </View>
          <Image style={styles.displayImage} source={{uri: user.image}} /> 
        </View>
        <View  style={styles.body}>
          <Text>dsafdsa</Text>
        </View>
      </View>

  )
}