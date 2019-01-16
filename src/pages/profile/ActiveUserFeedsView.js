import React from 'react'
import { Image, 
        View, 
        ScrollView,
        TouchableOpacity, 
        Animated, 
        Text, 
        FlatList,
        SafeAreaView } from 'react-native'

import { styles } from './styles'
import { ProfileFeed } from '../../components'

const Listheader = ({children}) => {
  return (
    <View style={styles.listheaderContainer}>
      <Text style={styles.listheadertext}>{children}</Text>
    </View>
  )
}

export const ActiveUserFeedsView = ({
  user,
  userFeeds,

  handleScroll,
  headerPaddingTop,
  headerPaddingBottom,
  titleFontSize,
  imageWidth
}) => {

  console.log(userFeeds,"userFeeds")

  return (

      <View style={styles.container}>
        <Animated.View style={[styles.header, {
          paddingTop: headerPaddingTop,
          paddingBottom: headerPaddingBottom
        }]}>
          <View style={styles.informationArea}>
            <Animated.Text style={[styles.displayName, {
              fontSize: titleFontSize
            }]}>{user.displayName}</Animated.Text>
            <View  style={styles.profileDetails}>
              <Text style={styles.detail}>10 Followers</Text>
              <View style={{width: 10}} />
              <Text style={styles.detail}>20 Following</Text>
              <View style={{width: 10}} />
              <Text style={styles.detail}>50 Promotions</Text>
            </View>
          </View>
          <Animated.Image style={[styles.displayImage,{
              height: imageWidth,
              width: imageWidth,
          }]} source={{uri: user.image}} /> 
        </Animated.View>
        <View  style={styles.body}>
        <ScrollView onScroll={handleScroll}>
          {/* <Text style={styles.listtitle}>Your feeds</Text> */}
          { userFeeds.length > 0 &&
          <FlatList
            scrollEventThrottle={16}
            data={userFeeds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>  <ProfileFeed feed={item} />}
            ListHeaderComponent={() => <Listheader>Added by you  </Listheader>}
            stickyHeaderIndices={[0]}
            initialNumToRender={4}
            
            />}
 
          {/* <FlatList
            scrollEventThrottle={16}
            data={Object.keys(feeds)}
            keyExtractor={(item) => item.toString()}
            renderItem={({item}) =>  <ProfileFeed feed={feeds[item]} />}
            initialNumToRender={4}
            ListHeaderComponent={() => <Listheader>Liked by you</Listheader>}
            /> */}
          </ScrollView>
        </View>
      </View>

  )
}