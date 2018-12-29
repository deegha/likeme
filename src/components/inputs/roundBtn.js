import React from 'react'
import { TouchableOpacity, Text, View, Animated, Easing } from 'react-native'
import { FadeInView } from '../'

import { styles } from './styles'

export class RoundBtn extends React.Component {


  render() {
    const { disabled, children, onPress, color, loading, fontColor } = this.props

    let exStyles = {}

    color !== '' && color !== undefined ? exStyles = {backgroundColor: color, borderColor:color}: {} 

    if(disabled)
      return (
        <View style={[styles.roundBtn,{backgroundColor: "#bdc3c7"}]}>
          <Text style={{fontWeight:'bold'}}>{loading?"Loading":children}</Text>
        </View>
      )

    else if(loading)
        return (
          <View style={[styles.roundBtn, exStyles]}>
            <Text style={color !== undefined ?{fontWeight:'bold',color: fontColor?fontColor :'#ffffff'}:{}}>Loading...</Text>
          </View>
        )
    
    return (
      <FadeInView initial={0.2} >
        <TouchableOpacity onPress={onPress} style={[styles.roundBtn, exStyles]} >
          <Text style={color !== undefined ?{fontWeight:'bold'  , color: fontColor?fontColor :'#ffffff'}:{}}>
            {children}
          </Text>
        </TouchableOpacity>
      </FadeInView>
    )
        
  }
}