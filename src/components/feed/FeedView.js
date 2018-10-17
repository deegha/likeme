import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'

import { RoundButton } from '../'
import { Ionicons } from '@expo/vector-icons'

import propic from '../../../assets/propic.jpg'
import { VOTE_UP, VOTE_DOWN, CLICK_ACTION, SHARE } from './actionsConstants' 

import { WithImage } from './withImage'
import { styles } from './styles'

export const FeedView = ({feed, makeAction}) => {
  return (
    <View style={styles.container}>

      <View style={styles.contentArea}>
        <View style={styles.userImageContainer}>
          <Image style={styles.userImage} source={propic} />
        </View>
        <View style={styles.postContent}>
          <Text style={styles.userName}>Deegha Galkissa</Text>
          <Text style={styles.postText}>
            {feed.postText}
          </Text>
        </View>   
      </View>

      <View style={styles.imageArea}> 
        {feed.postMedia.url !== "" &&
          <WithImage url={feed.postMedia.url} />} 
      </View>

      <View style={styles.actionArea}>
        <View>
          <Text style={styles.statText}>120 up</Text>
          <RoundButton callBack={makeAction(VOTE_UP, feed.id)}>
            <Ionicons name="ios-thumbs-up" size={20} color="black" />
          </RoundButton>
        </View>
        <View>
        <Text style={styles.statText}>14 down</Text>
          <RoundButton callBack={makeAction(VOTE_DOWN, feed.id)}>
            <Ionicons name="ios-thumbs-down" size={20} color="black" />
          </RoundButton>
        </View>
        <View>
          <Text style={styles.statText}>120 actions</Text>
          <RoundButton callBack={makeAction(CLICK_ACTION, feed.id)}>
            <Ionicons name="md-chatboxes" size={20} color="black" />
          </RoundButton>
        </View>
        <View>
          <Text style={styles.statText}>120 shares</Text>
          <RoundButton callBack={makeAction(SHARE, feed.id)}>
            <Ionicons name="md-share" size={20} color="black" />
          </RoundButton>
        </View>
        
      </View>

    </View>
  )
}