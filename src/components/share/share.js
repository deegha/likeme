import React from 'react'

import { Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native'
import { Foundation, Ionicons } from '@expo/vector-icons'
import { Share } from 'react-native'
import { WEB_URL } from '../sharedConstants/settingsConstants'
export class Sharebtn extends React.PureComponent {


  onShare = ({
    postText,
    url,
    id,
    displayName
    }) => async () => {

    const body = `${WEB_URL}/feed?slug=${id}`  

    try {
      const result = await Share.share({
        message: body,
        url: `${WEB_URL}?feed?slug=${id}`,
        title: `${postText}`
        }, {
        dialogTitle: `${postText}`,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType, "result.activityType")
        } else {
          console.log("shared")
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render () {
    const { id, postText, postMedia: {url}, userObj:{displayName}} = this.props.feed

    return (
      <TouchableOpacity style={styles.btnContainer} onPress={this.onShare({
        postText,
        url,
        id,
        displayName
      })}>
          <Ionicons name="md-share" size={20} color="#00bcd4" />
          {/* <Text style={styles.statText}>120</Text> */}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
	btnContainer: {
		height: 20,
		display:'flex',
		justifyContent:'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 100,
		margin: 8
	},

  statText: {
    fontSize: 11,
    textAlign: 'center',
    color: "#95a5a6",
    marginLeft: 5
  }
})