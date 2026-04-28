
//import * as firebase from 'firebase'
import  firebase from 'react-native-firebase'

import { Alert } from 'react-native';
import ShowMapAlarm from './ShowMapAlarm'
import lng from './../module/Language'

import pbf from '../module/PublicFunction'
import RegisterM from './Register'
import MakePermissionsAndroid from './../module/MakePermissionsAndroid';


export default {

    getAppInfo(){
        data = {}
        data.Name =  pbf.appInformation().Name
        data.SplashName =  pbf.appInformation().SplashName
        data.license =  pbf.appInformation().license
        return data
    },

    //-----------------------------------------------------------------
    checkUserLogin(nav){
        try{

            this.loginByPhoneNumber(nav)
            .then((pValue) => {
                
                if(!pValue){
                    this.loginByFaceBook(nav)
                    .then((fValue) => {               

                        if(!fValue)
                            nav.replace('auth')
                    })
                }
            })
            
        }catch(error){
            console.log('E-checkUserLogin:',error)
            nav.replace('auth')
        }
    },
    //-----------------------------------------------------------------

    loginByPhoneNumber(nav){
        return new Promise( resolve =>{
           
            try{
                firebase.auth().onAuthStateChanged((user) =>{
                    try{
                        
                        if (user){
                            if(user.uid){
                                this.openAppPage(user.uid, nav )
                                resolve(true)
                            }else
                            resolve(false);
                        }else
                            resolve(false);
                            
                    }catch(err){
                        console.log('loginByPhoneNumber:',err)
                        resolve(false)                
                    }
                })
            }catch(err){
                console.log('loginByPhoneNumber1:',err)
                resolve(false)                
            }
        })
    },

    loginByFaceBook(nav)
    {
        return new Promise( async  resolve =>{
            try{
                let token= await pbf.getAsyncStorageData('fAccessToken')

                if (token){
                    const credential = firebase.auth.FacebookAuthProvider.credential(token);
                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then((cuser)=>{
        
                        this.openAppPage(cuser.user.uid, nav )
                        resolve(true)
                    })
                    .catch(async ()=>{
                        let lngValues= await lng.modelSplashLang()
                        Alert.alert(pbf.appInformation().Name, lngValues.lngInternetConect )
                        resolve(false)
                    })
                }else{
                    resolve(false)
                }

            }catch(err){
                console.log('loginByFaceBook:',err)
                resolve(false)
            }
            
        })
    },


    openAppPage(userID , nav){
        try{
            firebase.database().ref('usersInfo/' + userID )
            .once('value',async (data) => {
                if(data.hasChild('adminMSG'))
                {
                    let adminMSG = await pbf.getAsyncStorageData('adminMSG')
                    if( data.val().adminMSG !='' && data.val().adminMSG != adminMSG){
                        pbf.setAsyncStorageData('adminMSG',data.val().adminMSG)
                        Alert.alert(pbf.appInformation().Name + ' - Admin', data.val().adminMSG)
                    }
    
                }
            
                let adminBlock = false
                if(data.hasChild('adminBlock'))
                {
                    adminBlock = data.val().adminBlock
                }
    
                if (!adminBlock){
                    firebase.database().ref('usersInfo/' + userID +'/userRegister')
                    .once('value', (data) => {
                        if(data.hasChildren()){
                            //this.makeWarmSendALarmFunc(userID) 
                            this.getPublicMessage()
                            .then((value) => {
                                if(value){
                                    ShowMapAlarm.deleteOldAlarms()
                                    ShowMapAlarm.getUserAlarmStatus(nav)    
                                }
                            })
                            
    
                        }else{
                            this.setNewUserInformation(nav)
                        }
                    })
                }
            }).catch((err)=>{   
                this.setNewUserInformation(nav)
                console.log('E-openAppPage1:',err)
    
            })
        }catch(err){
            console.log('openAppPage:',err)
        }
        
    },

    async setNewUserInformation( nav ){
        try{

            await MakePermissionsAndroid.startLocationPermission()
            RegisterM.saveNewUserInformation( nav)

        }catch(err){

        }
    },

    getPublicMessage(){
        return new Promise( resolve => {
            try{
                firebase.database().ref()
                .child('appSetting/messagePu')
                .once('value',async (data)=>{

                    let puMSG = await pbf.getAsyncStorageData('puMSG')
                    if (data.val() !== '' && puMSG !== data.val())
                    {
                        
                        pbf.setAsyncStorageData('puMSG',data.val())
                        Alert.alert(pbf.appInformation().Name  + ' - Public message' ,data.val(),
                        [
                            {text: 'OK', onPress: () => { 
                                resolve(true)
                            }, style: 'ok'}
                        ])
                    }else{
                        resolve(true)
                    }
  
                }).catch((err)=>{
                    resolve(true)
                    console.log('getPublicMessage1:',err)
                })

            }catch(error){
                resolve(true)
                console.log('getPublicMessage2:',error)
            }
        })
    },


}