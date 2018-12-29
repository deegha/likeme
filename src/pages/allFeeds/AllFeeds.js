import React from 'react'
import { View, Text } from 'react-native'

export class AllFeeds extends React.Component  {

  componentDidMount() {
    this.props.navigation.navigate('login')
  }

  render() {
    return (
      <View>
        <Text>all feeds</Text>
      </View>
    )
  }
}