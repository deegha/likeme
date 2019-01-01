import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'

import { RoundButton } from '../'
import { Ionicons, Foundation, FontAwesome, Entypo } from '@expo/vector-icons'

import propic from '../../../assets/propic.jpg'
import { VOTE_UP, VOTE_DOWN, CLICK_ACTION, SHARE } from './actionsConstants' 
import { FadeInView } from '../'

import { WithImage } from './withImage'
import { styles } from './styles'

export const FeedView = ({feed, makeAction}) => {
  
  return (
    <FadeInView>
    <View style={styles.container}>

      <View style={styles.contentArea}>
        <View style={styles.userImageContainer}>
          <Image style={styles.userImage} source={{uri: feed.userObj.image}} />
        </View>
        <View style={styles.postContent}>
          <Text style={styles.userName}>{feed.userObj.name}</Text>
          <Text style={styles.postText}>
            {feed.postText}
          </Text>
        </View>   
      </View>

      <View style={styles.imageArea}> 
        {feed.postMedia.url !== "" &&
          <WithImage url={feed.postMedia.url} />} 
      </View>
      {feed.location.description !== undefined && feed.location.description !== '' && (
        <View style={styles.postLocation} >
          <Entypo name="location-pin" size={11} color="black" />
          <Text style={styles.postLocationText}>
              {feed.location.description}
          </Text>
        </View>
      )}
      <View style={styles.actionArea}>
        <View style={styles.action}>
          
          <RoundButton callBack={makeAction(VOTE_UP, feed.id)}>
            <Foundation name="heart" size={20} color="#e74c3c" />
            <Text style={styles.statText}>{ feed.voteUp.length }220</Text>
          </RoundButton>
          
        </View>
        {/* <View>
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
        </View> */}
        <View style={styles.action}>
          
          <RoundButton callBack={makeAction(SHARE, feed.id)}>
            <Ionicons name="md-share" size={20} color="black" />
            <Text style={styles.statText}>120</Text>
          </RoundButton>
          
        </View>
      </View>
    </View>
    </FadeInView>
  )
}