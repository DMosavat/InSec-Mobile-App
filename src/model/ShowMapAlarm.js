import firebase from 'react-native-firebase'
import { Alert } from 'react-native';

import pbf from '../module/PublicFunction';
import TTSpeech  from './../module/TextToSpeech'
import lng from './../module/Language'
import PositionFun from './../module/PositionFunction';
import UInfo from './../model/UserInfo';


export default {

    getAppName(){
        return pbf.appInformation().Name
    },

    //OK
     async setPositionForUser(poInfo){
       
        try{
            let ref = firebase.database().ref()
            let user = await firebase.auth().currentUser;

            ref.child('usersInfo/' +  user.uid ).update({
                latitude: poInfo.latitude,
                longitude: poInfo.longitude,
                savePDate : pbf.getCorrectDate()

            }).then(() =>{
                pbf.setAsyncStorageData('userlatitude',poInfo.latitude.toString())
                pbf.setAsyncStorageData('userlongitude',poInfo.longitude.toString())

            }).catch((error)=>{
                console.log('setPositionForUser:',error)
            })

        }catch (error){ 
            console.log('E-setPositionForUser:',error) 
        }
        
            
    },

    getUserAlarmBlockStatus(){
        return  new Promise( async (resolve ) =>{
            try{

                let user = await firebase.auth().currentUser;

                firebase.database().ref()
                .child('usersInfo/' + user.uid )
                .once('value',data => {
                    if (data.hasChild('blockAlarm')) {
                        resolve(data.val().blockAlarm)
                    }else{
                        resolve(false)
                    }
                })
                .catch((err)=>{
                    console.log('getUserAlarmBlockStatus:',err)
                })
            }
            catch (error){ 
                console.log('E-getUserAlarmBlockStatus:',error) 
            }
        })
    },
    
    getUserAlarmSendCounterStatus(){
        return  new Promise( async (resolve) =>{
            try{

                let user = await firebase.auth().currentUser;
                let blockCnt = 2
                
                firebase.database().ref()
                .child('appSetting/blockCnt')
                .once('value',(data) => {
                    blockCnt = data.val()
                })
                .catch((err)=>{
                    console.log('getUserAlarmSendCounterStatus1:',err)
                })


                firebase.database().ref()
                .child('userLog/' + user.uid + '/' + pbf.getCorrectUTCDate() )
                .once('value',(data) => {
                    if (data.hasChildren()){
                        let sAlarm = 0
                        data.forEach((value1)=>{
                            if ( value1.val().sendAlarm === true)
                                sAlarm += 1
                        })

                        if (sAlarm > blockCnt )
                            resolve(true)
                        else
                            resolve(false)
                    }else{
                        resolve(false)
                    }
                })
                .catch((err)=>{
                    console.log('getUserAlarmSendCounterStatus2:',err)
                })

            }catch (error){ 
                console.log('E-getUserAlarmSendCounterStatus:',error) 
            }
        })
    },

    getUserAlarmBlockPublicStatus(){
        return  new Promise( async (resolve) =>{
            try{
                
                firebase.database().ref()
                .child('appSetting/stopPublicMSG')
                .once('value',(data) => {
                    resolve(data.val())
                })
                .catch((err)=>{
                    console.log('getUserAlarmBlockPublicStatus1:',err)
                })

            }catch (error){ 
                console.log('E-getUserAlarmBlockPublicStatus:',error) 
            }
        })
    },
    
    //Ok
    async setAlarmForUser(alarmType ,sendType=3){
        // alarmType :
        // 1 = Heart 
        // 2 = Fire 
        // 3 = First Aid 
        // 4 = Company 
        // 5 = Volume key
        // 6 = Shake device
        // 8 = General
        // 9 = Voice Recognize 
        return new Promise( async resolve =>{
            try{


                let userSendAlarmStatus = await this.getUserAlarmBlockStatus()
                let userSendAlarmCounter = await this.getUserAlarmSendCounterStatus()
                let lngValues= await lng.modelShowAlarmLang()


                if ( userSendAlarmStatus )
                {
                    Alert.alert(pbf.appInformation().Name,lngValues.lngBlockUser )
                    resolve(false);
                    return;
                }

                if ( sendType === 1 ){
                    if ( userSendAlarmCounter )
                    {
                        Alert.alert(pbf.appInformation().Name, lngValues.lngBlockMore )
                        resolve(false);
                        return;
                    }
                }

                let lastLatitude = await pbf.getAsyncStorageData('userlatitude')
                if ( lastLatitude === '' || lastLatitude === '0' ){
                    Alert.alert(pbf.appInformation().Name,
                    lngValues.lngInterConn )
                    resolve(false);
                    return;
                }

                let toggleTestAlarm = await pbf.getAsyncStorageData('toggleTestAlarm')
                if( toggleTestAlarm === 'false' ){

                    TTSpeech.startTalk( 0 )

                    let user = await firebase.auth().currentUser
                    let ref = firebase.database().ref()
                    let userLogPath = 'userLog/' + user.uid + '/' + pbf.getCorrectUTCDate() + '/' + pbf.getCurrentTime()
                    
                    console.log(sendType)
                    ref.child('usersInfo/' + user.uid + '/alarm').update({
                        userLogPath,
                        alarmType,
                        sendType,  //1-public message 2-private message 3-Network
                        saveDate : pbf.getCorrectDate()
        
                    }).then(async () =>{
                                
                        //------set count of sendig public and private alarm
                        ref.child('usersInfo/' + user.uid)
                        .once('value', aCount => {
                            if(!aCount.hasChild('alarmsPrCount')){
                                ref.child('usersInfo/' + user.uid).update({ alarmsPrCount:0, alarmsPuCount:0, alarmsNetCount:0 })
                            }else{
                                let alarmsNetCount = sendType===3?aCount.val().alarmsNetCount + 1:aCount.val().alarmsNetCount
                                let alarmsPrCount = sendType===2?aCount.val().alarmsPrCount + 1:aCount.val().alarmsPrCount
                                let alarmsPuCount = sendType===1?aCount.val().alarmsPuCount + 1:aCount.val().alarmsPuCount
                                ref.child('usersInfo/' + user.uid).update({ alarmsPrCount, alarmsPuCount, alarmsNetCount })
                            }
                        })
                        //--------------------------------------------------

                        //------------------------------- Make log for alarm
                        let lastLongitude = await pbf.getAsyncStorageData('userlongitude')

                        ref.child(userLogPath)
                        .update({ sendAlarm: true, latitude: lastLatitude , longitude: lastLongitude, alarmType, sendType })
                        //-------------------------------------------------
                        

                    }).then(() => {
                        resolve(true);

                    }).catch((error)=>{
                        console.log('setAlarmForUser:',error)
                    })
                }
                else{
                    //Send Alarm as a test
                    resolve(true);
                }

                

            }catch (error){ 

                console.log('E-setAlarmForUser:',error) 
            }
        })
    },


    getUserAlarmStatus(nav){

        try{
            let user = firebase.auth().currentUser;
            let ref = firebase.database().ref()
            let fun1 =false
            let fun2 =false

            ref.child('usersInfo/' + user.uid + '/helper' )
            .once('value', (data)=>{
                if( data.hasChildren() ){
                    
                    data.forEach((stage1) =>{
                        
                        ref.child('usersInfo/' + stage1.key )
                        .once('value', (stage2)=>{

                            if( stage2.hasChild('alarm/alarmType') ){
                                PositionFun.getCurrentPosition()
                                nav.replace('map')
                                return
                            }else{
                                fun1 = true
                                ref.child('usersInfo/' + user.uid + '/helper/' + stage1.key ).remove()
                                .catch((err) => {
                                    console.log('getUserAlarmStatus1:',err)
                                })

                            }
                        })
                    })

                }else{
                    fun1 = true
                }                    
            })
            
            ref.child('usersInfo/' + user.uid + '/alarm' )
            .once('value', (data)=>{
                if( data.hasChild('alarmType') ){
                    PositionFun.getCurrentPosition()
                    nav.replace('map', { alarmType: data.val().alarmType }) 
                    return
                }else  { 
                    fun2 = true
                }
            }).then(() => {
                if (fun1 && fun2){
                    UInfo.getUserInfoStatus(nav)
                    .then((uValue) => {
                        if(uValue)
                        nav.replace('home')
                    })
                }
            })
            
         

        }catch(err){
            console.log('getUserAlarmStatus:',err)
        }
 
    },

   
    deleteAlarmUser(){

        return new Promise(async resolve =>{
            try{

                let user = await firebase.auth().currentUser;
                let ref = firebase.database().ref()
                    
                ref.child('usersInfo/' + user.uid + '/alarm').remove()
                .then(async ()=>{
                    //<---------------------------------------------------------------
                    let lastLatitude = await pbf.getAsyncStorageData('userlatitude')
                    let lastLongitude = await pbf.getAsyncStorageData('userlongitude')

                    ref.child('userLog/' + user.uid
                    + '/' + pbf.getCorrectUTCDate() + '/' + pbf.getCurrentTime())
                    .update({
                        deleteAlarm: true, latitude: lastLatitude , longitude: lastLongitude
                    })
                    //----------------------------------------------------------------->
                }).then(()=>{
                    ref.child('allAlarms/' + user.uid ).remove()
                    .catch((err) => {
                        console.log('deleteAlarmUser:',err)
                    })

                }).then(()=>{
                    resolve(true)
                })

            }
               catch (error){ 
                   console.log('E-deleteAlarmUser:',error) 
                   resolve(true)
            }
        })
        
    },
    
    
    deleteOldAlarms(){

        try{
            let ref = firebase.database().ref()

            ref.child('appSetting/alarmTimeOut')
            .once('value')
            .then( async (data)=>{
                if (data.val())
                {
                    ref.child('allAlarms' )
                    .once('value', (data1)=>{

                        data1.forEach((data2) =>{
                            
                            if (data2.val() != 0){

                                ref.child('usersInfo/' + data2.key + '/alarm')
                                .once('value', data3 => {

                                    if(data3.hasChild('saveDate'))
                                    {
                                        let minut = pbf.getDifferenceBetweenTwoTimes(data3.val().saveDate)

                                        if( data.val() <= minut){

                                            ref.child('usersInfo/' + data2.key + '/alarm').remove()
                                            .catch((error)=>{
                                                console.log('deleteOldAlarms3:',error)
                                            })

                                            ref.child('allAlarms/' + data2.key ).remove()
                                            .catch((err) => {
                                                console.log('deleteAlarmUser:',err)
                                            })
                                        }
                                    }
                                }) 
                            }
                        })
                    })
                    .catch((error) => {
                        console.log('deleteOldAlarms2:',error)
                    })
                }
            })
            .catch((err)=>{
                console.log('deleteOldAlarms1:',err)
            })

        }catch (error){ 
            console.log('E-deleteOldAlarms:',error) 
        }

    }
}