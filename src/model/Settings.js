
import firebase from 'react-native-firebase'
import Rate, { AndroidMarket } from 'react-native-rate'
import { Alert } from 'react-native'
import pbf from '../module/PublicFunction'
import lng from './../module/Language';
import edData from './../module/EncryptDecryptData';

//import MakePermissionsAndroid from './../module/MakePermissionsAndroid'

export default {


    getAppName(){
        return pbf.appInformation().Name
    },
    getAppVersion(){
        return pbf.appInformation().Version
    },
    getAppSplashName(){
        return pbf.appInformation().SplashName
    },
    getApplicense(){
        return pbf.appInformation().license
    },

     //-------------------------------------------make AppRate
     async makeAppRate() {

        let options = {
            AppleAppID:"1440774541",
            GooglePackageName:"com.solutionvalleyab.insec",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:false,
            openAppStoreIfInAppFails:true
        }

        Rate.rate(options, success=>{

        })

      },
    //-------------------------------------------End Make App Rate


    saveUserSetting(uData)
    {
        return new Promise( async (resolve) => {
        
            try{
                let user = await firebase.auth().currentUser;

                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings').update({
                    togglePolis : uData.togglePolis,
                    toggleAmbu : uData.toggleAmbu,
                    toggleSRecord : uData.toggleSRecord,
                    toggleAAlarm : uData.toggleAAlarm,
                    toggleOpen : uData.toggleOpen,
                    toggleplaysound : uData.toggleplaysound,
                    toggleVoice : uData.toggleVoice,
                    toggleAssistant : uData.toggleAssistant,
                    togglePrivateLocation: uData.togglePrivateLocation,
                    toggleRecordVoice: uData.toggleRecordVoice,
                    toggleAutoMode: uData.toggleAutoMode,
                    toggleDarkMode: uData.toggleDarkMode,
                    toggleShakeAlarm: uData.toggleShakeAlarm,
                    alarmText : uData.alarmText,
                    saveDate : pbf.getCorrectDate(),
                }).then(async () => {
                    await pbf.setAsyncStorageData('darkMode', uData.toggleDarkMode.toString())
                    await pbf.setAsyncStorageData('AutoMode', uData.toggleAutoMode.toString())
                    resolve(true)
                }).catch((error)=>{
                    console.log('userSettings:',error)
                    resolve(true)
                })
                
            }
            catch (error){ 
                console.log('E-userSettings:',error,uData.toggleAAlarm) 
                resolve(true)
            }
        })
    },


    saveUserPrivateNUm(uData)
    {
        return new Promise( async (resolve) => {
        
            try{
                let user = await firebase.auth().currentUser;

                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings').update({
                    pNum1 : uData.pNum1,
                    pNum2 : uData.pNum2,
                    pNum3 : uData.pNum3,
                    pNum4 : uData.pNum4,
                    pNum5 : uData.pNum5,
                    pNum6 : uData.pNum6,
                    pNum7 : uData.pNum7,
                    pNum8 : uData.pNum8,
                    pNum9 : uData.pNum9,
                    pNum10 : uData.pNum10,
                }).then(async () => {
                    resolve(true)
                }).catch((error)=>{
                    console.log('userSettings:',error)
                    resolve(true)
                })
                
            }
            catch (error){ 
                console.log('E-userSettings:',error,uData.toggleAAlarm) 
                resolve(true)
            }
        })
    },


    saveUserNetwork(uData)
    {
        return new Promise( async (resolve) => {
        
            try{
                let user = await firebase.auth().currentUser;

                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings').update({
                    networkCode1 : uData.networkCode1,
                    networkCode2 : uData.networkCode2,
                    networkCode3 : uData.networkCode3,
                    networkCode4 : uData.networkCode4,
                    networkCode5 : uData.networkCode5,
                    networkCode6 : uData.networkCode6,
                    networkCode7 : uData.networkCode7,
                    networkCode8 : uData.networkCode8,
                    networkCode9 : uData.networkCode9,
                    networkCode10 : uData.networkCode10,
                }).then(async () => {
                    await pbf.setAsyncStorageData('networkCode1', uData.networkCode1.toString())
                    resolve(true)
                }).catch((error)=>{
                    console.log('userSettings:',error)
                    resolve(true)
                })
                
            }
            catch (error){ 
                console.log('E-userSettings:',error,uData.toggleAAlarm) 
                resolve(true)
            }
        })
    },


    async getUserSetting()
    {
        return  new Promise(async (resolve ) =>{

            try{
                let userData = {}
                let user = await firebase.auth().currentUser;
                
                console.log(user.uid)

                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings')
                .once('value', async (data)=>{

                    if (data.hasChild('togglePolis')){
                        userData.togglePolis = data.val().togglePolis,
                        userData.toggleAmbu = data.val().toggleAmbu,
                        userData.toggleSRecord = data.val().toggleSRecord,
                        userData.toggleAAlarm = data.val().toggleAAlarm,
                        userData.toggleOpen = data.val().toggleOpen,
                        userData.toggleplaysound = data.val().toggleplaysound,
                        userData.toggleVoice = data.val().toggleVoice,
                        userData.toggleAssistant = data.val().toggleAssistant,
                        userData.toggleRecordVoice = data.val().toggleRecordVoice===undefined?false:data.val().toggleRecordVoice,
                        userData.toggleAutoMode = data.val().toggleAutoMode===undefined?false:data.val().toggleAutoMode,
                        userData.toggleDarkMode = data.val().toggleDarkMode===undefined?false:data.val().toggleDarkMode,
                        userData.toggleShakeAlarm = data.val().toggleShakeAlarm === undefined?false:data.val().toggleShakeAlarm,
                        userData.togglePrivateLocation = data.val().togglePrivateLocation===undefined?false:data.val().togglePrivateLocation,
                        userData.alarmText = data.val().alarmText,
                        userData.toggleTestAlarm = data.val().toggleTestAlarm,
                        userData.error = false
                        
                        resolve(userData)

                    }else{
                        userData.error = true
                    }
                }).catch((error)=>{
                    console.log('userSettings:',error)
                })
    
            }
            catch (error){ 
                console.log('E-userSettings:',error) 
            }
        })
        
    },


    getUserPrivateNum()
    {
        return  new Promise(async (resolve ) =>{

            try{
                let userData = {}
                let user = await firebase.auth().currentUser;
    
                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings')
                .once('value', async (data)=>{

                    if (data.hasChild('togglePolis')){
                        userData.pNum1 = data.val().pNum1 === undefined?'':data.val().pNum1,
                        userData.pNum2 = data.val().pNum2 === undefined?'':data.val().pNum2,
                        userData.pNum3 = data.val().pNum3 === undefined?'':data.val().pNum3,
                        userData.pNum4 = data.val().pNum4 === undefined?'':data.val().pNum4,
                        userData.pNum5 = data.val().pNum5 === undefined?'':data.val().pNum5,
                        userData.pNum6 = data.val().pNum6 === undefined?'':data.val().pNum6,
                        userData.pNum7 = data.val().pNum7 === undefined?'':data.val().pNum7,
                        userData.pNum8 = data.val().pNum8 === undefined?'':data.val().pNum8,
                        userData.pNum9 = data.val().pNum9 === undefined?'':data.val().pNum9,
                        userData.pNum10 = data.val().pNum10 === undefined?'':data.val().pNum10,
                        userData.pName1 =  await this.getPrivateUserName(data.val().pNum1),
                        userData.pName2 =  await this.getPrivateUserName(data.val().pNum2),
                        userData.pName3 =  await this.getPrivateUserName(data.val().pNum3),
                        userData.pName4 =  await this.getPrivateUserName(data.val().pNum4),
                        userData.pName5 =  await this.getPrivateUserName(data.val().pNum5),
                        userData.pName6 =  await this.getPrivateUserName(data.val().pNum6),
                        userData.pName7 =  await this.getPrivateUserName(data.val().pNum7),
                        userData.pName8 =  await this.getPrivateUserName(data.val().pNum8),
                        userData.pName9 =  await this.getPrivateUserName(data.val().pNum9),
                        userData.pName10 =  await this.getPrivateUserName(data.val().pNum10),

                        resolve(userData)

                    }else{
                        userData.error = true
                    }
                }).catch((error)=>{
                    console.log('getUserPrivateNum1:',error)
                })
    
            }
            catch (error){ 
                console.log('E-getUserPrivateNum:',error) 
            }
        })
        
    },

    getPrivateUserName(privateKey)
    {
        if(!privateKey) return
        //console.log(privateKey)

        return  new Promise(async (resolve ) =>{

            try {
                firebase.database().ref()
                .child('usersInfo')
                .orderByChild('userRegister/privateKey')
                .equalTo(privateKey)
                .once('value',data => {
                    if( data.hasChildren()){
                        data.forEach( async (data1)=>{
                            resolve(await edData.decryptData(data1.child('userRegister').val().uName))
                        })
                    }else{
                        console.log(`It's not valid.`, privateKey)
                        resolve(``)
                    }
                })

            } catch (error) {
                console.log('getPrivateUserName:',error)
            }    
        })
    },


    async getUserNetwork()
    {
        return  new Promise(async (resolve ) =>{

            try{
                let userData = {}
                let user = await firebase.auth().currentUser;
    
                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings')
                .once('value', async (data)=>{

                    if (data.hasChild('togglePolis')){
                        userData.networkCode1 = data.val().networkCode1 === undefined?'':data.val().networkCode1,
                        userData.networkCode2 = data.val().networkCode2 === undefined?'':data.val().networkCode2,
                        userData.networkCode3 = data.val().networkCode3 === undefined?'':data.val().networkCode3,
                        userData.networkCode4 = data.val().networkCode4 === undefined?'':data.val().networkCode4,
                        userData.networkCode5 = data.val().networkCode5 === undefined?'':data.val().networkCode5,
                        userData.networkCode6 = data.val().networkCode6 === undefined?'':data.val().networkCode6,
                        userData.networkCode7 = data.val().networkCode7 === undefined?'':data.val().networkCode7,
                        userData.networkCode8 = data.val().networkCode8 === undefined?'':data.val().networkCode8,
                        userData.networkCode9 = data.val().networkCode9 === undefined?'':data.val().networkCode9,
                        userData.networkCode10 = data.val().networkCode10 === undefined?'':data.val().networkCode10,
                       
                        userData.networkName1 =  await this.getUserNetworkName(data.val().networkCode1),
                        userData.networkName2 =  await this.getUserNetworkName(data.val().networkCode2),
                        userData.networkName3 =  await this.getUserNetworkName(data.val().networkCode3),
                        userData.networkName4 =  await this.getUserNetworkName(data.val().networkCode4),
                        userData.networkName5 =  await this.getUserNetworkName(data.val().networkCode5),
                        userData.networkName6 =  await this.getUserNetworkName(data.val().networkCode6),
                        userData.networkName7 =  await this.getUserNetworkName(data.val().networkCode7),
                        userData.networkName8 =  await this.getUserNetworkName(data.val().networkCode8),
                        userData.networkName9 =  await this.getUserNetworkName(data.val().networkCode9),
                        userData.networkName10 =  await this.getUserNetworkName(data.val().networkCode10),

                        resolve(userData)

                    }else{
                        userData.error = true
                    }
                }).catch((error)=>{
                    console.log('getUserNetwork1:',error)
                })
    
            }
            catch (error){ 
                console.log('E-getUserNetwork:',error) 
            }
        })
        
    },

    async getUserNetworkName(networkCode)
    {

        if(!networkCode) return

        return  new Promise(async (resolve ) =>{

            try {
                firebase.database().ref()
                .child('OrgsInfo')
                .orderByChild('privateKey')
                .equalTo(networkCode)
                .once('value',data => {
                    if( data.hasChildren()){
                        data.forEach((data1)=>{
                            resolve(data1.val().orgName)
                        })
                    }else{
                        console.log('getUserNetworkName: no network name')
                        resolve()
                    }
                })

            } catch (error) {
                console.log('getUserNetworkName:',error)
            }    
        })
    },

    async getUserThemeSetting()
    {
        return  new Promise(async (resolve ) =>{

            try{
                let userData = {}
                let user = await firebase.auth().currentUser;
    
                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userSettings')
                .once('value', async (data)=>{
                    if (data.hasChild('togglePolis')){
                        userData.toggleAutoMode = data.val().toggleAutoMode===undefined?false:data.val().toggleAutoMode,
                        userData.toggleDarkMode = data.val().toggleDarkMode===undefined?false:data.val().toggleDarkMode,
                        userData.error = false

                        resolve(userData)

                    }else{
                        userData.error = true
                    }
                }).catch((error)=>{
                    console.log('getUserThemeSetting:',error)
                })
    
            }
            catch (error){ 
                console.log('E-getUserThemeSetting:',error) 
            }
        })
        
    },

    
    setUserToggleTestAlarm(flag)
    {
        try{
            let user = firebase.auth().currentUser;
            firebase.database().ref()
            .child('usersInfo/' +  user.uid + '/userSettings')
            .update({ toggleTestAlarm: flag })
            .catch((err)=>{
                console.log('setUserToggleTestAlarm1',err)
            })

        }catch(err){
            console.log('setUserToggleTestAlarm',err)
        }
    },

    async setDefaultUserSetting()
    { 
    
        try{
            let user = await firebase.auth().currentUser;

            firebase.database().ref()
            .child('usersInfo/' +  user.uid + '/userSettings')
            .once('value', (data)=>{
                if (!data.hasChild('togglePolis')){
                    firebase.database().ref()
                    .child('usersInfo/' +  user.uid + '/userSettings').set({
                        togglePolis : false,
                        toggleAmbu : false,
                        toggleSRecord : false,
                        toggleAAlarm : true,
                        toggleOpen : false,
                        toggleplaysound : false,
                        toggleVoice: false,
                        toggleAssistant: true,
                        toggleTestAlarm: true,
                        togglePrivateLocation: true,
                        toggleRecordVoice: false,
                        toggleAutoMode: false,
                        toggleDarkMode: false,
                        toggleShakeAlarm: false,
                        pNum1 : '',
                        pNum2 : '',
                        pNum3 : '',
                        pNum4 : '',
                        pNum5 : '',
                        pNum6 : '',
                        pNum7 : '',
                        pNum8 : '',
                        pNum9 : '',
                        pNum10 : '',
                        networkCode1 : '',
                        networkCode2 : '',
                        networkCode3 : '',
                        networkCode4 : '',
                        networkCode5 : '',
                        networkCode6 : '',
                        networkCode7 : '',
                        networkCode8 : '',
                        networkCode9 : '',
                        networkCode10 : '',
                        alarmText: '',
                        saveDate : pbf.getCorrectDate()
                    }).then(() => {
                        pbf.setAsyncStorageData('toggleShakeAlarm','false')
                        pbf.setAsyncStorageData('toggleVoice','false')
                        pbf.setAsyncStorageData('toggleAssistant','true')
                        pbf.setAsyncStorageData('alarmText','')
            
                        console.log('Make default setting - ok')
                    }).catch((error)=>{
                        console.log('setDefaultUserSetting:',error)
                    })
                }
            })
        }catch(error){
            console.log('End-setDefaultUserSetting:',error)
        }
    },
   
    async deleteUserAccount(nav)
    { 
        let lngValues= await lng.settingLang()
        try{
            Alert.alert(
                pbf.appInformation().Name,
                lngValues.lngDeleteAccount ,
                [
                  {text: 'Cancel', onPress: () => { return }  , style: 'cancel'},
                  {text: 'OK', onPress: () => { this.deleteUserAccountAccept(nav) }, style: 'ok'}
                ],
                { cancelable: false }
            )
            
        }catch(error){
            console.log('End-deleteUserAccount:',error)
        }
    },

    async deleteUserAccountAccept(nav)
    { 
    
        try{

            pbf.setAsyncStorageData('userlatitude','')
            pbf.setAsyncStorageData('userlongitude','')

            let user = await firebase.auth().currentUser;
            let ref = firebase.database().ref()

            let userInfo = {}
            
            ref.child('usersInfo/' +  user.uid + '/userRegister')
            .once('value',(data)=>{
                userInfo.pNumber = data.val().pNumber
                userInfo.tNumber = data.val().tNumber
                userInfo.uName = data.val().uName
                userInfo.eMail = data.val().eMail
            })
            .then(()=>{

                    ref.child('userLog/' + user.uid + '/delectAccount')
                    .update({
                        userEmail: userInfo.eMail,
                        userName: userInfo.uName,
                        userPNumer: userInfo.pNumber,
                        userTNumber: userInfo.tNumber,
                        deleteAccoutn: true,
                        delDate: pbf.getCorrectDate()
    
                    })
                })

            .then(async ()=>{
                await pbf.setAsyncStorageData('fAccessToken','')
                firebase.auth().signOut()
                nav.replace('auth')
            })

            
        }catch(error){
            console.log('End-deleteUserAccount:',error)
        }
    },


}