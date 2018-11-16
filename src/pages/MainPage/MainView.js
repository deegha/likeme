/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { View, Text, Button, ScrollView, RefreshControl, TouchableOpacity, Animated  } from 'react-native'

import { FeedView } from '../../components'
import { styles } from './styles'
import { FloatingBtn } from '../../components/'
import { Ionicons } from '@expo/vector-icons'
import { CREATE_POST } from '../../components/feed/actionsConstants'

export const MainView = ({auth, feedsItem, loading, fetchFeeds,makeAction, createPost, creating, logOut, navigateLogin, scrollY, headerTranslate, titleTranslate ,zIndex,titleSize, actionFontWeight}) => {

  return (
    <View style={{flex:1}}>
      {auth.authenticated && auth.user.type === "store" && <FloatingBtn action={createPost} >
        <Ionicons name="md-add" size={40} color="#fff" />
      </FloatingBtn>}
      {creating && 
      <View style={styles.creatingContainer}>
        <View style={styles.creating}>
          <Text style={styles.creatingText}>Creating post...</Text>
        </View>
      </View>}


      <Animated.View  style={[styles.header,{
                      transform: [{ translateY: headerTranslate }],
                    }]}>
          <Animated.Text style={[styles.title,{
            transform: [{ translateY: titleTranslate }]
          }]}>Black App</Animated.Text>
          <TouchableOpacity 
            style={{transform: [{ translateY: titleTranslate }]}}
            onPress={auth.authenticated?logOut:navigateLogin}>
            <Text style={[styles.rightBtn]}>{auth.authenticated?"Logout":"Login"}</Text>
          </TouchableOpacity>
      </Animated.View >



      <Animated.ScrollView  
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchFeeds}
          />
        }
        contentContainerStyle={{flexGrow : 3, alignItems : 'center'}}>
       
        <View style={{height:150}} ></View>
     
        {feedsItem && Object.keys(feedsItem).map( 
          feed => feedsItem[feed].id && <FeedView makeAction={makeAction} key={feedsItem[feed].id} feed={feedsItem[feed]} /> )}
        
      </Animated.ScrollView >
      
    </View>
  )
}