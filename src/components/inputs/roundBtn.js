import React from 'react'
import { TouchableOpacity, Text, View, Animated, Easing } from 'react-native'
import { FadeInView } from '../'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import { styles } from './styles'

export class RoundBtn extends React.Component {


  render() {
    const { disabled, children, onPress, color, loading, fontColor } = this.props

    let exStyles = {}

    color !== '' && color !== undefined ? exStyles = {backgroundColor: color, borderColor:color}: {} 

    if(disabled)
      return (
        <View style={[styles.roundBtn,{backgroundColor: "#ecf0f1"}]}>
          <Text style={[styles.roundBtnText]}>{loading?"Loading":children}</Text>
        </View>
      )

    else if(loading)
        return (
          <View style={[styles.roundBtn, exStyles]}>
            <Bars size={10} color="#FFF" />
          </View>
        )
    
    return (
      <FadeInView initial={0.2} >
        <TouchableOpacity onPress={onPress} style={[styles.roundBtn, exStyles]} >
          <Text style={[color !== undefined ?{ color: fontColor?fontColor :'#ffffff'}:{}, styles.roundBtnText]}>
            {children}
          </Text>
        </TouchableOpacity>
      </FadeInView>
    )
        
  }
}