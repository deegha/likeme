import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const styles = StyleSheet.create({
  container: {
    backgroundColor: shared.backGround,
    height: '100%',
    flex: 1
  },
  headerContainer: {
    backgroundColor: '#00bcd4',
    alignItems:'center',
    elevation: 3,
    justifyContent:'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    letterSpacing: 1.5,
    color: '#ffffff',
    fontFamily: 'saira bold'
  },
  creatingContainer: {
    marginTop: 22,
    width: '100%',
    zIndex:4
  },
  creating: {
    width: '96%',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  creatingText: {
    fontSize: 18,
    fontWeight: '100'
  },
  rightBtn: {
    fontWeight: '600'
  },
  scrollView: {
    backgroundColor: '#000',
    flex:1,
  },
  profileArea: {
    flexDirection: 'row',
    alignItems:'center'
  },
  profileName: {
    marginRight: 5,
    fontFamily: 'saira bold',
    color:'#ffffff',
    fontSize: 18,
    letterSpacing: 1.2
  },
  xComponentContainer: {
    width:'100%',
    alignItems: 'center',
    marginBottom: -40
  },
  xComponentTop: {
    width: '100%',
    backgroundColor: '#00bcd4',
    height: 50,
    
  },
  xComponenBottom: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '90%', 
    height: 150,
    position: 'relative',
    top: -40,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  xComponenBottomRow: {
    marginVertical: 20 ,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconlable: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'inter regular',
    lineHeight: 15
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40
  },
  sectionlable: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  listheaderContainer: {
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  listheadertext: {
    fontWeight: 'bold',
    color: '#353b48'
  },
  initialText: {
    color: shared.floatingBtnColor,
    fontFamily: 'saira bold',
    fontSize: 70
  },
  initialTextContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})