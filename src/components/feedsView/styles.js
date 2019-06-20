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
    justifyContent:'center',
    height: 80
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    zIndex: 1,
    elevation: 2
  },
  headerleft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  title: {
    fontWeight: '100',
    fontFamily: 'saira light',
    fontSize: 25,
    letterSpacing: 1.2,
    color: '#fff',
    marginLeft: 40,
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
  infoMessage: {
    color:'#95afc0'
  }
})