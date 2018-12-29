import React from 'react'

import { View, Text,Animated, TouchableOpacity } from 'react-native'
import { FeedView } from '../../components'
import { styles } from './styles'
import { FloatingBtn } from '../../components/'

export const LocationFeedsView = ({
  handleScroll,
  feedsItem,
  titleMarginTop,
  subTitleMarginTop,
  titleFontSize ,
  auth,
  navigateTol,
  logout
}) => {

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { marginTop: titleMarginTop }]}>
        <Animated.Text style={[styles.title, {fontSize: titleFontSize}]} >
          Promo app
        </Animated.Text>
        <TouchableOpacity onPress={auth.authenticated?logout:navigateTol} >
          <Text style={[styles.rightBtn]}>{auth.authenticated?"Logout":"Login"}</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView  
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{flexGrow : 3, alignItems : 'center'}}>

        {feedsItem && Object.keys(feedsItem).map( 
          feed => feedsItem[feed].id && <FeedView 
                                          makeAction={()=>()=>console.log("dsfsd")} 
                                          key={feedsItem[feed].id} 
                                          feed={feedsItem[feed]} /> )}
      </Animated.ScrollView >

    </View>
  )
}