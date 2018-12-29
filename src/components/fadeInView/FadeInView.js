/**
 * Created by deegha on 21/12/2018
 */

import React from 'react'
import { Animated, Easing } from 'react-native'

export class FadeInView extends React.Component {

  state = {
    fadeAnim: new Animated.Value(this.props.initial?this.props.initial:0),
  }

  componentDidMount() {
    Animated.timing(                  
      this.state.fadeAnim,            
      {
        toValue: 1,    
        easing: Easing.back(),              
        duration: 400,              
      }
    ).start()                   
  }

  render() {
   
    let { fadeAnim } = this.state

    return (
      <Animated.View                
        style={{
          ...this.props.style,
          opacity: fadeAnim,         
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}