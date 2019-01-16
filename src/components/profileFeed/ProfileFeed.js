import React from 'react'
import { View, TouchableOpacity, Animated, Text, Image } from 'react-native'
import {  Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from './styles'
 
export class ProfileFeed extends React.PureComponent {

  render () {

    const { feed } = this.props

    return (
      <View style={styles.container}>
        <Image source={{uri: feed.postMedia.url}} style={styles.image} />
        <View style={styles.descriptionBox}>
          
          <Text style={styles.description}>{feed.postText}</Text>
          {feed.location.description !== undefined && feed.location.description !== '' && (
            <View style={styles.postLocation} >
             
              <Text style={styles.postLocationText}>
                  {feed.location.description}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.removeBtn}>
            <Text style={styles.removeBtnText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}