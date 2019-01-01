/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import LocationFeeds from '../locationFeeds/LocationFeeds'
import AllFeeds  from '../allFeeds/AllFeeds'
import ActiveUserFeeds from '../profle/ActivaUserFeeds'
import {  Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from 'react-navigation'

export default createBottomTabNavigator({
 
  'Hot': {
    screen: AllFeeds,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name={'fire'} size={25} color={tintColor} />
      },
    })
  },
  'Near you': {
    screen: LocationFeeds,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name={'location'} size={25} color={tintColor} />
      },
    })
  },
  Profile: {
    screen: ActiveUserFeeds,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name={'ios-person-add'} size={25} color={tintColor} />
      },
    })
  },
},{
  tabBarPosition: 'top',
  tabBarOptions: {
    activeTintColor: "#ffffff",
    inactiveTintColor: "#bdc3c7",
    style: {
      backgroundColor: "#00bcd4",
      padding: 8,
      height: 64,
    }
  },
})
