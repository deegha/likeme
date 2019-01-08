import React from 'react'
import { View, TouchableOpacity, Animated, Text, Image } from 'react-native'

import { styles } from './styles'
 
export class ProfileFeed extends React.PureComponent {

  render () {

    const { feed } = this.props

    return (
      <View style={styles.container}>
        {feed.postMedia.url && <Image source={feed.postMedia.url} style={styles.image} /> }
        <View>
          <Text style={styles.description}>{feed.postText}</Text>
          {feed.location.description !== undefined && feed.location.description !== '' && (
            <View style={styles.postLocation} >
              <Entypo name="location-pin" size={11} color="black" />
              <Text style={styles.postLocationText}>
                  {feed.location.description}
              </Text>
            </View>
          )}
          
        </View>
      </View>
    )
  }
}