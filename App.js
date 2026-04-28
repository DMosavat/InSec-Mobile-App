
 import React from 'react';
 import EStyleSheet from 'react-native-extended-stylesheet';
 import { createStackNavigator } from 'react-navigation';
 import { StatusBar,View } from 'react-native'
 import firebase from  'react-native-firebase';


// Components
import Login from "./src/components/LoginFG";
import Register from "./src/components/Register";
import ShowMap from "./src/components/ShowMap";
import Settings from "./src/components/settings/index";
import MakePrivateGroup from "./src/components/settings/MakePrivateGroup";
import FindNetwork from "./src/components/settings/FindNetwork";
import Home from "./src/components/Home";
import Splash from "./src/components/Splash";
import UserInfo from './src/components/UserInfo';
import Alarm from './src/components/Alarm';
import LoginByPhone from './src/components/LoginByPhone';
import PlayAudio from './src/components/PlayAudio';
import OpenWebPage from './src/components/OpenWebPage';
import ShareApp from './src/module/ShareApp'

import WelComePage from './src/components/start/Welcome'
import Start from './src/components/start/Start'
//import VoiceSync from './src/components/VoiceSync';

//Modules
import ApiKeys from './src/module/ApiKeys'
import pbf from './src/module/PublicFunction'


const RootStack = createStackNavigator(
  {
    splash: Splash,
    home: Home,
    auth: Login,
    authPhone: LoginByPhone,
    reg: Register,
    map: ShowMap,
    setting: Settings,
    makePGroup: MakePrivateGroup,
    findNet: FindNetwork,
    profile: UserInfo,
    alarm: Alarm,
    shareApp: ShareApp,
    pAudio: PlayAudio,
    oWebPage: OpenWebPage,
    //------------------------ start pages
    welComePage: WelComePage,
    start: Start,
    //--------------------------------
  },
  {
    initialRouteName: 'splash',
    headerMode: 'none' , 
  }
);
  
console.disableYellowBox = true

export default class App extends React.PureComponent {

  constructor(props){
      super(props)
      this.state = {
        runApp: false
      }
  }

  initializeFirebase(){
    if(!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig)
    }
  }

  componentWillMount(){
      this.initializeFirebase()
      StatusBar.setHidden(true)

      this.getUserThemeSetting()
      .then((val) => {
          if( val )
          this.setState({ runApp: true })
      })

  }

  getUserThemeSetting(){
    
    return new Promise( async (resolve) => {
  
      try{

          let darkMode = await pbf.getAsyncStorageData('darkMode')
          let AutoMode = await pbf.getAsyncStorageData('AutoMode')
          console.log(darkMode,AutoMode)
          let bgColor = ''
          let bgColor2 = ''
          let iconColor1 = ''
          let textColor1 = ''
          
          let time = pbf.getCurrentTime().split(':')
          let timeMode = false
          if ( time[0] >= 21 || time[0]<= 6 )
          timeMode= true;

          if ( (darkMode !== 'true' && AutoMode !== 'true') || ( AutoMode === 'true' && timeMode === false )){
            pbf.setAsyncStorageData('alarmbuttonImage', 'green')
            bgColor = '#FFFFFF'//'#E6E6E6'
            bgColor2 = '#51B948'
            iconColor1 = '#585858'
            textColor1 = '#000'
          }else{
            pbf.setAsyncStorageData('alarmbuttonImage', 'black')
            bgColor = '#000'
            bgColor2 = '#000'
            iconColor1 = '#F2F2F2'
            textColor1 = '#FFF'
          }
    
          EStyleSheet.build({
            $bgColor : bgColor,
            $bgColor2 : bgColor2,
            $iconColor1 : iconColor1,
            $textColor1 : textColor1
          })

          resolve(true)

      }catch(err){
          console.log('getUserThemeSetting:',err)
      }
      
    })
  
  
  }

  render() {
    
      if ( this.state.runApp )
        return <RootStack />;
      else
        return <View />;

    
  }
}


//insec_jxzhupb_user@tfbnw.net