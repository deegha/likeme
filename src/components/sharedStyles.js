import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export const primaryColor = "#000000"
export const secondaryColor = "#ffff"
export const thirdColor = '#47525E'
export const disabledText = '#bdc3c7'
export const borderColor = '#d6d7da'
export const backGround = '#f5f6fa'
export const silver = '#ecf0f1'
export const red = '#fc5c65'

export const primary_text = '#000000'
export const secondary_text = '#47525E'
export const floatingBtnColor = '#00bcd4'
export const btnBorder = '#8492A6'




//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale}