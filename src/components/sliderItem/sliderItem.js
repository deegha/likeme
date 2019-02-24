import React from 'react'
import { View, TouchableOpacity, Animated, Text, Image } from 'react-native'
import {  Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { Sharebtn, LikeBtn } from '../'

export class SliderItem extends React.Component {

  shouldComponentUpdate(preProps) {
    preProps.feed !== this.props.feed
  }

  render () {

    const { feed } = this.props 
    return(
      <View style={styles.containerHorizontal}>
        <View style={styles.container}>
          
          <Image  
            ImageResizeMode={'contain'}
            source={{uri: feed.postMedia.url}} style={styles.image} />

          <View style={styles.descriptionBox}>
            <View style={styles.profileimageContainer}>
              <Image  
                source={{uri: feed.userObj.image}} style={styles.profileimage} />

              <Text style={styles.profileName}>{feed.userObj.name}</Text>
            </View>
            

            <Text style={styles.description}>{feed.postText.substring(0, 100)}</Text>
            {feed.location.description !== undefined && feed.location.description !== '' && (
              <View style={styles.postLocation} >
                <Entypo name="location-pin" size={11} color="#00bcd4" />
                <Text style={styles.postLocationText}>
                  {feed.location.description}
                </Text>
              </View>
            )}
          
            <View style={styles.actionArea}>
              <View style={styles.action}>
                <Sharebtn feed={feed} />
              </View>
              <View style={styles.action}>
                <LikeBtn feedId={feed.id} likeCount={feed.voteUp} liked={feed.currentUserLiked} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}