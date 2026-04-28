import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import pbf from '../module/PublicFunction'
import PushNotification from './../module/PushNotification';
import RegisterM from './Register'
import Splash from './Splash';
import UInfo from './UserInfo';
import MakePermissionsAndroid from './../module/MakePermissionsAndroid'

export default  {
    getAppName(){
        return pbf.appInformation().Name
    },
    

    logInFasebook(nav){
        return new Promise(resolve =>{
            try{            

                LoginManager.logInWithPermissions(['public_profile', 'email'])
                .then((result) => {
                if (result.isCancelled) {
                    resolve(false)
                    return Promise.reject(new Error('The user cancelled the request'));
                }
                // Retrieve the access token
                return AccessToken.getCurrentAccessToken();
                })
                .then((data) => {
                // Create a new Firebase credential with the token
                
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                pbf.setAsyncStorageData('fAccessToken',data.accessToken)
    
                // Login with the credential
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
                })
                .then(async () => {
                    this.loginToApp(nav , firebase.auth().currentUser )
    
                })
                .catch((error) => {
                const { code, message } = error;
                console.log('logInFasebook:', message)
                
                resolve(false)
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
                });
    
            }catch(error){
                console.log('E-logInFasebook:',error)
                resolve(false)
            }
        })
       
    },

    cleanDeleteLog(user){
        try{
            firebase.database().ref()
            .child('userLog/' + user.uid + '/delectAccount').remove()
            .catch((err)=>{
                console.log('cleanDeleteLog1:',err)
            })
        }catch(err){
            console.log('cleanDeleteLog:',err)
        }
    },

    async loginToApp(nav , user){
        try{
            
            console.log('loginToApp', nav , user)

            await this.cleanDeleteLog(user)

            await MakePermissionsAndroid.startLocationPermission()

            firebase.database().ref()
            .child('usersInfo/' + user.uid + '/userRegister')
            .once('value', (data) => {

                PushNotification.PushNoti()

                if(data.hasChildren())
                    {
                        Splash.getPublicMessage()
                        .then((value) => {
                            if(value){
                                UInfo.getUserInfoStatus(nav)
                                .then((uValue) => {
                                    if(uValue)
                                    nav.replace('home')
                                })
                            }
                        })
                    } 
                else
                    RegisterM.saveNewUserInformation( nav)

            }).catch((error)=>{
                 console.log('loginToApp2',error)

                RegisterM.saveNewUserInformation( nav)

            })

        }catch(err){
            console.log('loginToApp:',err)
        }
    }

}