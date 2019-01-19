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
  imageWidth,
  likedFeeds
}) => {

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
              <Text style={styles.detail}>{userFeeds.length} Promotions</Text>
            </View>
          </View>
          <Animated.Image style={[styles.displayImage,{
              height: imageWidth,
              width: imageWidth,
          }]} source={{uri: user.image}} /> 
        </Animated.View>
        <View  style={styles.body}>
        <ScrollView style={styles.scrollView} onScroll={handleScroll}>
          {<Listheader>Liked by you  </Listheader>}
           <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={likedFeeds.likedFeeds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>  <ProfileFeed horizontal={true} feed={item} />}
            initialNumToRender={4}
            // ListHeaderComponent={() => <Listheader>Liked by you</Listheader>}
            />

          
          { userFeeds.length > 0 &&
          <FlatList
            
            scrollEventThrottle={16}
            data={userFeeds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>  <ProfileFeed  feed={item} />}
            ListHeaderComponent={() => <Listheader>Added by you  </Listheader>}
            stickyHeaderIndices={[0]}
            initialNumToRender={4}
            
            />}
 
         
          </ScrollView>
        </View>
      </View>

  )
}