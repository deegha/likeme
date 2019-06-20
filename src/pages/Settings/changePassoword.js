import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Fire from '../../services/firebase'

import { TextFeild } from '../../components'

export class ChangePasword extends React.Component {
  static navigationOptions = {
		title: 'Change password'
  }

  state = {
    propic: '',
    loading: false
  }

  render() {
    return (
      <View>
        <View style={styles.innerContainer}>
          <TextFeild 
            onChange={onChange} 
            feild="email"  
            type="email"
            placeholder="Email" />
        </View>
      </View>
    )
  }
}


import { StyleSheet } from 'react-native'  

export const styles = StyleSheet.create({
  form: {
    display: 'flex',
    width: '80%',
},
}) 