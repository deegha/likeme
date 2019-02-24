import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo'
import {  Entypo } from '@expo/vector-icons'

import { FadeInView, LikeBtn, Sharebtn, TagDisplay } from '../'

import { WithImage } from './withImage'
import { styles } from './styles'

import moment from 'moment'

export class FeedView extends React.Component {

  componentDidUpdate() {
    console.log('updated feed')
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.feed !== this.props.feed)
      return true
    else 
      return false
  }

  render() {
    const { feed } = this.props

    const x = feed.createdAt

    return (
      <FadeInView>
      <View style={styles.container}>
  
        <View style={styles.contentArea}>
          {/* <View style={styles.userImageContainer}> */}
            <Image style={styles.userImage} source={{uri: feed.userObj.image}} />
          {/* </View> */}
          <View style={styles.postContent}>
            <Text style={styles.userName}>{feed.userObj.name}</Text>
  
            <Text style={styles.createdAt}>
            {moment(feed.createdAt).fromNow()}
            </Text>
       
             {feed.postMedia.url !== "" && (
                <Text style={styles.postText}>
                  {feed.postText}
                </Text>
             )}
           
          </View>   
        </View>
  
        <View style={styles.imageArea}> 
          {feed.postMedia.url !== "" ?(
             <WithImage url={feed.postMedia.url} />
          ):(
            <View style={styles.postBox}>
            <LinearGradient style={{padding: 40, width:'100%'}} colors={['#00bcd4', 'transparent']}>
              <Text style={styles.postBoxText}>
                {feed.postText}
              </Text>
              </LinearGradient>
              </View>  
            )
          } 
        </View>
       
        {feed.location && feed.location.description !== undefined && feed.location.description !== '' && (
          <View style={styles.postLocation} >
            <Entypo name="location-pin" size={11} color="#00bcd4" />
            <Text style={styles.postLocationText}>
                {feed.location.description}
            </Text>
          </View>
        )}
        <View style={styles.actionAreaContainer}>
          <View style={styles.actionArea}>
            <View style={styles.action}>
              <Sharebtn feed={feed} />
            </View>
            <View style={styles.action}>
              <LikeBtn feedId={feed.id} likeCount={feed.voteUp} liked={feed.currentUserLiked} />
            </View>
          </View>
          <View style={styles.action}>
            <TagDisplay title={feed.category} />
          </View>
        </View>
      </View>
      </FadeInView>
    )
  }
}
