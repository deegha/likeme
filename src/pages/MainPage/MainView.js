/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import LocationFeeds from '../locationFeeds/LocationFeeds'
import { AllFeeds } from '../allFeeds/AllFeeds'
import {  Entypo, Ionicons } from '@expo/vector-icons'

import { createBottomTabNavigator } from 'react-navigation'

export default createBottomTabNavigator({
  LocationFeeds: {
    screen: LocationFeeds,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name={'location'} size={25} color={tintColor} />
      },
    })
  },
  Feeds: {
    screen: AllFeeds,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name={'home'} size={25} color={tintColor} />
      },
    })
  },
  Profile: {
    screen: AllFeeds,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name={'ios-person-add'} size={25} color={tintColor} />
      },
    })
  },
},{
  tabBarPosition: 'top',
  tabBarOptions: {
    activeTintColor: "#000",
    inactiveTintColor: "#ffffff",
    style: {
      backgroundColor: "#00bcd4",
      padding: 8,
      height: 64
    }
  },
})
