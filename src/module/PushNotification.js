//import dbfirebase from 'firebase';
import firebase from 'react-native-firebase';
import {  Platform } from 'react-native'
import pbf from './../module/PublicFunction';
import HomeM from './../model/Home';



export default  {

    async PushNoti (){
        try{
            let platform = Platform.OS

            let user = await firebase.auth().currentUser;
            let ref = firebase.database().ref()
            .child('usersInfo/' + user.uid + '/userPToken/' + platform);

            firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                firebase.messaging().getToken().then(token => {
                    pbf.setAsyncStorageData('pToken' + platform,token)
                    ref.set({ pushToken: token });
                })
                // user has permissions
                } else {
                firebase.messaging().requestPermission()
                    .then(() => {
                        firebase.messaging().getToken().then(token => {
                            pbf.setAsyncStorageData('pToken' + platform,token)
                            ref.set({ pushToken: token });
                        })
                    })
                    .catch(error => {
                    console.log("Error", error)
                    // User has rejected permissions  
                    });
                }
            });
        }catch(error){
            console.log('PushNoti:',error)
        }
    },

    notificationListener () { 
        try{
            // firebase.notifications().displayNotification()
            this.checkPushTokenStatus()

            firebase.notifications().onNotification( async (notification) => {
            // Process  notification as required
                
                let pMsg = await pbf.getAsyncStorageData('pMsg')
                if (pMsg =='true') return
                await pbf.setAsyncStorageData('pMsg','true') 
                
                const {
                body,
                data,
                notificationId,
                sound,
                subtitle,
                title
                } = notification;
                
                if (title == 'InSec : Offentligt meddelande'){
                    HomeM.getPublicMessage()
                    return
                }

                pbf.setAsyncStorageData('pMsg','false') 
                
                // Alert.alert( pbf.appInformation().Name , body, [
                        // {text: 'Cancel', onPress: () => { 
                        //     ShowMapHelper.deleteHelperByUser()
                        //     this.props.navigation.replace('home',
                        //     {   alarmType: false, 
                        //         acceptHelper: 0,
                        //         helperStatus: false}
                        //     )
                        //  }  , style: 'cancel'},
                        // {text: 'OK', onPress: () => 
                        // {
                        //   ShowMapAlarm.getUserAlarmStatus(nav, false)
                            
                    // }, style: 'ok'} ]) 
                
        
            });
        }catch(error){
            console.log('notificationListener:',error)
        }
    },

    async checkPushTokenStatus(){
        try{

            let platform = Platform.OS

            let pToken = await pbf.getAsyncStorageData('pToken' + platform)
            if (!pToken) this.PushNoti()

        }catch(error){
            console.log('checkPushTokenStatus',error)
        }

    }

}