import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import { LinearGradient } from 'expo'
import { RoundButton } from '../'
import { Ionicons, Foundation, FontAwesome, Entypo } from '@expo/vector-icons'

import propic from '../../../assets/propic.jpg'
import { VOTE_UP, VOTE_DOWN, CLICK_ACTION, SHARE } from './actionsConstants' 
import { FadeInView, LikeBtn } from '../'

import { WithImage } from './withImage'
import { styles } from './styles'

export class FeedView extends React.PureComponent {
  
  render() {
    const { feed, makeAction, userGeo } = this.props

    // console.log(feed)
    return (
      <FadeInView>
      <View style={styles.container}>
  
        <View style={styles.contentArea}>
          {/* <View style={styles.userImageContainer}> */}
            <Image style={styles.userImage} source={{uri: feed.userObj.image}} />
          {/* </View> */}
          <View style={styles.postContent}>
            <Text style={styles.userName}>{feed.userObj.name}</Text>

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
              <LinearGradient style={{padding: 40}} colors={['#00bcd4', 'transparent']}>
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
            <Entypo name="location-pin" size={11} color="black" />
            <Text style={styles.postLocationText}>
                {feed.location.description}
            </Text>
          </View>
        )}
        <View style={styles.actionArea}>
          <View style={styles.action}>
            <LikeBtn userGeo={userGeo} feedId={feed.id} likeCount={feed.voteUp} liked={feed.currentUserLiked} />
          </View>
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
}
