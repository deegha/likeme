import React from 'react'
import { View, Text, Button  } from 'react-native'

import { styles } from './styles'

export const MainView = ({setModalVisible, navigation}) => {

  return (
    <View style={styles.container}>
        <View style={{height:10}} />
      	{/* <Button
					color={"red"}
          title="create post"
          onPress={setModalVisible(true)}
        />
				<View style={{height:10}} />
				<Button
          title="login"
          onPress={() => navigation.navigate('login')}
        /> */}

        
    </View>
  )
}