import React, { PureComponent } from 'react';
import {  TouchableOpacity, Platform, Alert, BackHandler } from 'react-native';
import {Container,
        Body,
        Header,
        Title,
        Right,
        Left,
        Text,
        Icon,
        View,
        Fab,
        Button} from 'native-base';
import firebase from  'react-native-firebase';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'
import Communications from 'react-native-communications';
import KeepAwake from 'react-native-keep-awake';
import { AudioRecorder } from 'react-native-audio';
//--------------------------------------------------------->
//--------------------------------------------------------->
//import  mapstyles   from './../assets/styles/mapstyles';
import { form,showMapStyle } from '../assets/styles';
//--------------------------------------------------------->
//--------------------------------------------------------->
import ShowMapAlarm from './../model/ShowMapAlarm';
import ShowMapHelper from './../model/ShowMapHelper';
import pbFun from './../module/PublicFunction';
import edData from './../module/EncryptDecryptData';
import lng from './../module/Language';
import TTSpeech  from './../module/TextToSpeech';
import MChat from './../module/MakeChat';
import pAudio from './../model/PlayAudio';
import MakePermissionsAndroid from './../module/MakePermissionsAndroid'
//--------------------------------------------------------->

let alarmUserTel =''
let alarmUserGetDirec = []
let userAlarmID = ''
let acceptHelper= false


//56.868452, 14.819463
export default class ShowMap extends PureComponent {
  constructor(){
    super()

    this.state = {
      region : { 
          latitude: 0,
          longitude: 0,
          latitudeDelta:  0.025,
          longitudeDelta: 0.025
        },
        alarmUserPosition :[],
        showMapStyle: 'standard',
        setShowTrafic: false,
        markers: [],
        helpersCount: 0,
        fabActive: true,
        myPlace: false,
        getAlarm: false,
        alarmType:0,
        sendType: 2,
        sendTestAlarm: false,
        language: {
            lngCheckAlarmMSG: '',
            lngDelAllAlarm: '',
            lngDelOneAlarm: '',
            lngCancelAlarm: '',
            lngTestAlarm: '',
            lngCallMSG: '',
            lngAcceptMSG: '',
            lngNoPrivateHelper: ''
        },
        userAlarmID : '',
        getPosInt:'',
        chatCounter: '',
        forceRenderTimer:'',
        showChatForm: false, 
        audioPath: '',
        pauseRecording: false,
        recordVoice: false
    }

    this.setAcceptHelper = this.setAcceptHelper.bind(this)
    this.deleteHelperByUser = this.deleteHelperByUser.bind(this)
    this.deleteAlarmUser = this.deleteAlarmUser.bind(this)
    this.handleGetDirections = this.handleGetDirections.bind(this)
    this.navigateToMainPage = this.navigateToMainPage.bind(this)
    this.renderMarker = this.renderMarker.bind(this)
    this.callTel = this.callTel.bind(this)
    this.getAndSetMapStyle = this.getAndSetMapStyle.bind(this)
    this.getChatStatus = this.getChatStatus.bind(this)
    this.fabActive = this.fabActive.bind(this)
    this.userRecordVoice = this.userRecordVoice.bind(this)


  }

    fabActive(){
        this.setState({ fabActive: !this.state.fabActive })
    }  


     //-------------------------------------------Start set Language
     async getLanguage () {
        
        let lngValues= await lng.showMapLang()
        this.setState({
            language: {
                lngCheckAlarmMSG: lngValues.lngCheckAlarmMSG,
                lngDelAllAlarm: lngValues.lngDelAllAlarm,
                lngDelOneAlarm: lngValues.lngDelOneAlarm,
                lngCancelAlarm: lngValues.lngCancelAlarm,
                lngTestAlarm: lngValues.lngTestAlarm,
                lngCallMSG: lngValues.lngCallMSG,
                lngAcceptMSG: lngValues.lngAcceptMSG,
                lngNoPrivateHelper: lngValues.lngNoPrivateHelper
            }
        })
    }
    //-------------------------------------------End Language

  callTel()
  {
    try{
        if (!alarmUserTel){
        Alert.alert(pbFun.appInformation().Name, this.state.language.lngCallMSG )
        return
        }
          
        if (alarmUserTel)
        Communications.phonecall( alarmUserTel,false )
    }catch(error){
          //console.log(error)
    }

  }

  navigateToMainPage = async () => {

    if( this.state.showChatForm ){
        this.setState({ showChatForm: !this.state.showChatForm })
        this.chatRecordVoice()
        return;
    }


    if (this.state.alarmType > 0 && !this.state.myPlace )
        this.deleteAlarmUser()
    else if (this.state.alarmType === 0 && !this.state.myPlace )
        this.deleteHelperByUser(true)()
    else{
        this.stopRecordAudio()
        .then((value)=>{
            if(value){
                this.props.navigation.replace('home')
            }
        })
        
    }

  }


  setAcceptHelper =() => {

    if (acceptHelper){
        Alert.alert(pbFun.appInformation().Name, this.state.language.lngAcceptMSG )
        return
    }
    acceptHelper = true 
    ShowMapHelper.setHelperAccept(userAlarmID, alarmUserTel)
  }

//   async getHelperStatus (alarmUserPath) {
//     let acceptHelper = await ShowMapHelper.getHelperStatus(alarmUserPath)
//     this.setState({ acceptHelper }) 
//   }
  

  deleteHelperByUser = ( deleteAll = false ) => () =>{

    let msg = ''
    if(deleteAll)
        msg = this.state.language.lngDelAllAlarm
    else
        msg = this.state.language.lngDelOneAlarm

    Alert.alert(
        pbFun.appInformation().Name,msg,
        [
          {text: 'Cancel', onPress: () => { return }  , style: 'cancel'},
          {text: 'OK', onPress: () => { 
            
            this.stopRecordAudio()
            .then((value)=>{
                if(value){
                    if(deleteAll)
                        ShowMapHelper.deleteAllHelperByUser()
                    else
                        ShowMapHelper.deleteHelperByUser(userAlarmID)
                }
            })

          }, style: 'ok'}
        ],
        { cancelable: false }
    )

  }


  deleteAlarmUser(){

    Alert.alert(
        pbFun.appInformation().Name,
        this.state.language.lngCancelAlarm,
        [
          {text: 'Cancel', onPress: () => { return }  , style: 'cancel'},
          {text: 'OK', onPress: () => { 

            this.stopRecordAudio()
            .then((value)=>{
                if(value){
                    ShowMapAlarm.deleteAlarmUser()
                    .then(()=>{
                        this.props.navigation.replace('home')
                    })
                }
            })


 
          }, style: 'ok'}
        ],
        { cancelable: false }
    )
  }


  async chatRecordVoice() {
    if( this.state.recordVoice )
        {
            if ( !this.state.recordVoice ) return;

            if( Platform.OS === 'android'){
                AudioRecorder.stopRecording()
            }else{
                AudioRecorder.pauseRecording()
            }
            this.setState({ pauseRecording: true, recordVoice: false })
        }
        
    else if( this.state.pauseRecording ){
        if( Platform.OS === 'android'){
            await this.setState({ pauseRecording: false })
        }
        this.stratRecordAudio( );
    }
  

  }

  userRecordVoice() {
        if( this.state.recordVoice )
            this.pausRecordAudio()
        else
            this.stratRecordAudio( true );

  }

  async stratRecordAudio(userRecordVoice = false){
        try{


            // await MakePermissionsAndroid.startRAudioPermission();
            // await MakePermissionsAndroid.startReadWritePermission();

            let runRecordVoice = await pbFun.getAsyncStorageData('toggleRecordVoice')
            if ( runRecordVoice === 'true' || userRecordVoice ){

                //setTimeout(() => {
                    // AudioRecorder.requestAuthorization().then(async(isAuthorised) => {
                    
                    //     if (!isAuthorised) return
                                                            

                if ( this.state.pauseRecording ){
                    console.log('resumeRecording')

                    await AudioRecorder.resumeRecording()
                    this.setState({ recordVoice: true, pauseRecording: false })

                }else{
                    console.log('startRecording')
                    await MakePermissionsAndroid.startRAudioPermission();
                    MakePermissionsAndroid.startReadWritePermission()
                    .then(async (value)=>{

                        if(!value) return;
                        
                        AudioRecorder.prepareRecordingAtPath( this.state.audioPath, {
                            SampleRate: 22050,
                            Channels: 1,
                            AudioQuality: "Low",
                            AudioEncoding: "aac",
                            AudioEncodingBitRate: 32000
                        })
                        await AudioRecorder.startRecording()

                        this.setState({ recordVoice: true, pauseRecording: false })
                    }).catch((err)=>{
                        console.log(err)
                    })
            
                }

                    //})  
                //}, 100);
            }


        }catch(e){
            console.log('stratRecordAudio:',e)
        }

  }

  async pausRecordAudio(){
    if ( !this.state.recordVoice ) return;

    try{
        await AudioRecorder.pauseRecording();
            
        this.setState({ pauseRecording: true, recordVoice: false })
        console.log('paus rec',pStatus)
    }catch(e){
        console.log('pausRecordAudio:',e)
        this.setState({ pauseRecording: true, recordVoice: false })
    }

  }

  stopRecordAudio(){
      return new Promise( async (resolve ) =>{
            try{
                await AudioRecorder.stopRecording();
                console.log('stop rec')
                resolve(true)
            }catch(e){
                console.log('stopRecordAudio:',e)
                resolve(true)
            }
      })
   }

  async getParameter(){
    try{
        let audioPath = await  pAudio.getRecordAudioFilePath()
        
        let alarmType = await this.props.navigation.getParam('alarmType')
        if (alarmType === undefined)
            alarmType = 0;

        let sendType = await this.props.navigation.getParam('sendType')
        if (sendType === undefined)
            sendType = 2;

        let myPlace = await this.props.navigation.getParam('myPlace')
        if (myPlace === undefined)
            myPlace = false;

        let getAlarm = await this.props.navigation.getParam('getAlarm')
        if (getAlarm === undefined)
        getAlarm = false;
            
        this.setState ({ alarmType, sendType, myPlace, getAlarm, audioPath })

    }catch(err){
        console.log('getParameter',err)
    }
  }

    async componentWillUnmount(){

        KeepAwake.deactivate();
        TTSpeech.stopTalk()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  

        clearInterval(this.state.getPosInt)
        clearInterval(this.state.forceRenderTimer)
    }


   async componentDidMount(){

        alarmUserTel =''
        alarmUserGetDirec = []
        userAlarmID = ''
        acceptHelper= false

        this.getLanguage()

        await this.getParameter()

        this.setPositionForUser()

        KeepAwake.activate();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );

        if ( this.state.myPlace )
        return;

        if (this.state.getAlarm)
            this.setHeaderButtonStatus()
        else
            this.setHeaderButtonStatus();

    }

    //------------------------------------------------------------------
    handleBackButtonClick = () => {
        this.navigateToMainPage()
        return true;
    }
    //------------------------------------------------------------------
    
    // getUserToggleTestAlarm(){

    //     return  new Promise( (resolve ) =>{
    //         SettingM.getUserToggleTestAlarm()
    //         .then( (sendTestAlarm) => {
    //            this.setState({ sendTestAlarm }) 
    //            resolve(sendTestAlarm)
    //         })
    //         .catch(()=>{
    //             resolve(false)
    //         })
    //     })
    // }

    //------------------------------------------------------------------------
    async setPositionForUser(){

        try{    
            lastLatitude = await pbFun.getAsyncStorageData('userlatitude')
            Lastlongitude = await pbFun.getAsyncStorageData('userlongitude')
            if(lastLatitude && Lastlongitude){
                this.setState({ region: {
                    latitude: parseFloat(lastLatitude),
                    longitude: parseFloat(Lastlongitude),
                    latitudeDelta:  this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta
                } })
            }

            let cntPos=0
            let getPosInt = setInterval( async ()=>{

                lastLatitude = await pbFun.getAsyncStorageData('userlatitude')
                Lastlongitude = await pbFun.getAsyncStorageData('userlongitude')

                if(lastLatitude && Lastlongitude  ){
                    if(lastLatitude != this.state.region.latitude && Lastlongitude != this.state.region.longitude ){
                        this.setState({ region: {
                            latitude: parseFloat(lastLatitude),
                            longitude: parseFloat(Lastlongitude),
                            latitudeDelta:  this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta
                        } })

                    }else{
                        cntPos += 1
                        if( cntPos >= 5 ){
                            clearInterval(getPosInt)
                            return
                        }
                    }
                }

            },5000)
        
            this.setState({ getPosInt })
            
        }catch(err){
            console.log('setPositionForUserSM1:',err)
        }

    }
    //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   async setHeaderButtonStatus(){
      try{
    
        if ( this.state.alarmType === 0 ) {
            this.getAlarmUserPosition()
            this.forceRenderPage()
    
        }else{
            TTSpeech.startTalk( 6 )
            this.stratRecordAudio()

            let toggleTestAlarm = await pbFun.getAsyncStorageData('toggleTestAlarm')
            if( toggleTestAlarm === 'false' ){
                this.getAlarmUserHelper()
            }else{
                this.setState({ sendTestAlarm: true }) 
            }

        }
      }
      catch(err){
          console.log('setHeaderButtonStatus:',err)
      }
    
   }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   forceRenderPage(){
        let forceRenderTimer = setInterval( async ()=>{

            if(userAlarmID != this.state.userAlarmID){
                this.setState({
                    userAlarmID
                })
                this.getChatStatus()
            }
        }, 1000 )

        this.setState({ forceRenderTimer })
   }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
    getChatStatus = () =>{

        this.setState({ chatCounter: '' })
        if((!acceptHelper && this.state.alarmType <= 0 && !alarmUserTel ) || !userAlarmID)
        return; 

        let ref =  firebase.database().ref()
        ref.child('usersInfo/' + userAlarmID + '/alarm')
        .once('value', data => {
            if (data.hasChild('userLogPath')){
                ref.child(data.val().userLogPath + '/chat')
                .on('value', (chatData)=>{
                    let userID = data.child('userLogPath').val().toString().split('/')
                    
                    if(chatData.hasChildren() && userAlarmID === userID[1] ){
                        this.setState({ chatCounter: chatData.numChildren() })
                    }
                })
            }
        })

    }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
    getAlarmUserPosition(){
    try{
        let user =  firebase.auth().currentUser;
        let ref =  firebase.database().ref()
        
        let alarmCuData = []

        let tackHelper = false
       // let userPTimer = setInterval(async () => {

            ref.child('usersInfo/' + user.uid + '/helper' )
            .on('value', (data)=>{
                if( data.hasChildren() ){
                    alarmCuData = []
                    
                    if (data.numChildren() < this.state.alarmUserPosition.length )
                    this.setState({ alarmUserPosition: [] })

                    data.forEach((stage1) =>{
                                               
                        ref.child('usersInfo/' + stage1.key )
                        .on('value', async (stage2)=>{
                            
                            if( stage2.hasChild('alarm/alarmType') ){
                                tackHelper = false

                                let alarmtel = ''
                                let alarmuName = ''

                                //-- Private alarm --------------------
                                if (stage1.hasChild('familyAlarm')) {
                                    if (stage1.child('familyAlarm').val()){
                                        alarmtel =await edData.decryptData( stage2.child('userRegister').val().tNumber) 
                                        alarmuName = await edData.decryptData( stage2.child('userRegister').val().uName) 
                                        alarmuName = `Pr - ${alarmuName}`
                                    }
                                }
                                //-------------------------------------

                                //-- Network alarm --------------------
                                if (stage1.hasChild('orgAlarm')) { 
                                    if (stage1.child('orgAlarm').val() && !stage1.child('familyAlarm').val()){
                                        console.log('org')
                                       // alarmtel =await edData.decryptData( stage2.child('userRegister').val().tNumber) 
                                        alarmuName = await edData.decryptData( stage2.child('userRegister').val().uName) 
                                        alarmuName = `Net - ${alarmuName}`
                                    }
                                }
                                //-------------------------------------

                                this.findAlarmuserdistance(stage2.val().latitude, stage2.val().longitude)
                                
                                let acceptHelper1 = await ShowMapHelper.getHelperStatus(stage2.child('alarm').val().userLogPath)

                                alarmCuData.latitude= stage2.val().latitude,
                                alarmCuData.longitude= stage2.val().longitude,
                                alarmCuData.key= stage2.key,
                                alarmCuData.alarmUserTel= alarmtel,
                                alarmCuData.alarmUserName =  alarmuName,
                                alarmCuData.alarmType= stage2.child('alarm').val().alarmType
                                alarmCuData.acceptHelper = acceptHelper1
                                alarmCuData.saveDate = stage2.child('alarm').val().saveDate
    
                                if (!userAlarmID || userAlarmID === stage2.key){
                                    alarmUserTel = alarmtel
                                    alarmUserGetDirec = alarmCuData
                                    userAlarmID = stage2.key
                                    acceptHelper = acceptHelper1
                                }
                                
                                this.makeAlarmUserPositionMarker(alarmCuData)

                             }else{
                                tackHelper = true 
                                ref.child('usersInfo/' + user.uid + '/helper/' + stage1.key).remove()
                               
                            }
    
                        })

                    })
                }else{

                    if (!this.state.myPlace)
                    this.props.navigation.replace('home', {tackHelper: tackHelper}) 
                }
            })
      
    }
    catch (error){ 
        console.log('E-setAlarmUserPosition:',error) 
    }

   }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   makeAlarmUserPositionMarker(items) {
        try{
            this.setState( () =>{
                
                if(items === null){return}
                //if(this.state.markers ===[]){return}
                let getIndex =  this.state.alarmUserPosition.findIndex((ite) =>{
                    return (ite.key === items.key)
                })
                if (getIndex >= 0){
                    let temp  = this.state.alarmUserPosition.map(object => ({ ...object }))
                    temp[getIndex].latitude = items.latitude
                    temp[getIndex].longitude = items.longitude
                    temp[getIndex].alarmUserTel = items.alarmUserTel
                    temp[getIndex].alarmUserName = items.alarmUserName
                    temp[getIndex].acceptHelper = items.acceptHelper
                    temp[getIndex].alarmType = items.alarmType 
                    temp[getIndex].saveDate = items.saveDate
                    temp[getIndex].key = items.key

                    return { alarmUserPosition: temp.map(object => ({ ...object })) 
                    }
                    
                }

                if (getIndex === -1 ){

                    return {
                        alarmUserPosition: [
                            ...this.state.alarmUserPosition,
                            {
                                latitude: items.latitude,
                                longitude: items.longitude,
                                alarmUserTel : items.alarmUserTel,
                                alarmUserName: items.alarmUserName,
                                acceptHelper: items.acceptHelper,
                                alarmType : items.alarmType,
                                saveDate: items.saveDate,
                                key: items.key
                            }
                        ]
                    }
                }
            })
        }catch(err){
            console.log('makeHelperPositionMarker:',err)
        }

    }
    //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   findAlarmuserdistance(latitude, longitude){
       try{
            ShowMapHelper.findAlarmuserdistance(latitude ,longitude)
            .then( async (delta)=>{
                if (delta > this.state.region.latitudeDelta ){
                    this.setState({ 
                        region: {
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude,
                            latitudeDelta:  delta,
                            longitudeDelta: delta 
                        }
                    })
                }
            })
       }catch(err){
            console.log('findAlarmuserdistance:',err)
       }
  
    }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   async getAlarmUserHelper(){
        try{

            if( this.state.sendType === 2 ){
                let helperStatus = await  ShowMapHelper.checkPrivateAlarmHelper()
                if( helperStatus ){
                    Alert.alert(pbFun.appInformation().Name, this.state.language.lngNoPrivateHelper )
                    return 
                }   
            }


            let user = await firebase.auth().currentUser;
            let ref = firebase.database().ref()
            
            userAlarmID = user.uid
            
            //--------Count chat 
            this.getChatStatus()
            //------------------

            ref.child('usersInfo/' + user.uid + '/alarm')
            .on('value', (logData)=>{
                this.setState({ helpersCount: 0 })  

                if (logData.hasChild('userLogPath')){
                    ref.child(logData.val().userLogPath + '/helper').orderByKey()
                    .on('value', (data)=>{
                       this.setState({ helpersCount: 0 })  
                       
                        if (data.hasChildren()){
                            this.setState({ helpersCount: data.numChildren() })  
                            
                            if (this.state.helpersCount < this.state.markers.length )
                                this.setState({ markers: [] })
                                       
                            data.forEach( (data1) =>{

                                ref.child('usersInfo/' + data1.key )
                                .on('value', (dataPos)=>{

                                    ref.child(logData.val().userLogPath + '/helper/' + data1.key).orderByKey()
                                    .once('value', (dataEnd)=>{
                                        if( dataEnd.hasChildren()){

                                            this.findAlarmuserdistance(dataPos.val().latitude, dataPos.val().longitude)
        
                                            let uposition={}
                                            uposition.latitude = dataPos.val().latitude
                                            uposition.longitude = dataPos.val().longitude
                                            uposition.key = dataPos.key 
                                            this.makeHelperPositionMarker(uposition) 
                                        }
                                       
                                    })
        
                                })
                            
                            })  
                        }else{
                            this.setState({ markers: [] })

                        }
                    })
                }else{
                    this.props.navigation.replace('home')
                }
            })

        }
        catch (error){ 
            console.log('E-ShowMapgetAlarmUserHelper:',error) 
        }

   }
   //------------------------------------------------------------------------


   //------------------------------------------------------------------------
    makeHelperPositionMarker(items) {
        try{
            this.setState( () =>{

                if(items === null){return}
                //if(this.state.markers ===[]){return}
                let getIndex =  this.state.markers.findIndex((ite) =>{
                    return (ite.key === items.key)
                })

                if (getIndex >= 0){
                      let temp  = this.state.markers.map(object => ({ ...object }))
                      temp[getIndex].latitude = items.latitude
                      temp[getIndex].longitude = items.longitude
                      temp[getIndex].key = items.key

                      return { markers: temp.map(object => ({ ...object })) 
                    }
                    
                }

                if (getIndex === -1 ){

                    return {
                        markers: [
                            ...this.state.markers,
                            {
                                latitude: items.latitude,
                                longitude: items.longitude,
                                key: items.key
                            }
                        ]
                    }
                }
            })
        }catch(err){
            console.log('makeHelperPositionMarker:',err)
        }
    
    }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   renderMarker(marker , index) {
        try{
            return <MapView.Marker key={index} coordinate={marker} >
                     <Icon name='md-person' style={showMapStyle.helperPlace}/>
                  </MapView.Marker>
        
        }catch (error){
            console.log('renderMarker:',error)
        }
    }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
   renderAlarmUserMarker(marker , index) {
        try{//,alarmUserTel: await edData.decryptData(marker.alarmUserTel)
            let ret = <MapView.Marker key={index} coordinate={marker} 
            title={marker.saveDate}
            description={marker.alarmUserName }
            onPress={e => {
                userAlarmID = marker.key
                marker.alarmUserTel?alarmUserTel =  marker.alarmUserTel : alarmUserTel=''
                alarmUserGetDirec = marker
                acceptHelper = marker.acceptHelper
                eTemp = e._targetInst.tag

            }}
            >
            {marker.alarmType == 8 ? <Icon  name='md-umbrella' style={ marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace }/> :
            marker.alarmType == 1 ? <Icon  name='md-heart' style={ marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace}/> :
            marker.alarmType == 2 ? <Icon  name='md-flame' style={ marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace}/> :  
            marker.alarmType == 3 ? <Icon  name='md-medkit' style={ marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace}/> :
            marker.alarmType == 4 ? <Icon  name='md-walk' style={ marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace}/> : 
            marker.alarmType == 5 || marker.alarmType == 6 ? <Icon  name='md-radio-button-on' style={ marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace}/> :             
            marker.alarmType == 9 ? <Icon  name='md-mic' style={marker.alarmUserTel?showMapStyle.alarmPlaceTel:marker.acceptHelper?showMapStyle.alarmAccept:showMapStyle.alarmPlace}/> : null } 

            </MapView.Marker>

            return ret

        }catch (error){
            console.log('renderAlarmUserMarker:',error)
        }
    }
    //------------------------------------------------------------------------

   //------------------------------------------------------------------------
    handleGetDirections() {
        const data = {
           source: this.state.region
          ,
          destination: alarmUserGetDirec,
          params: [
            {
              key: "travelmode",
              value: "walking"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode 
            }
          ]
        }
        getDirections(data)
      }
   //------------------------------------------------------------------------

   //------------------------------------------------------------------------
    getAndSetMapStyle(){
        try{

       //standard satellite hybrid
            switch (this.state.showMapStyle) {
                case 'standard':
                    if(this.state.setShowTrafic == true)
                        this.setState({ showMapStyle: 'satellite', setShowTrafic:false} )         
                    else
                        this.setState({ showMapStyle: 'standard', setShowTrafic:true });
    
                    break;
                case 'satellite':
                    this.setState({ showMapStyle: 'standard', setShowTrafic:false} )         
                    break;

                default:
                    this.setState({ showMapStyle: 'standard', setShowTrafic:false} )         
                    break;
            }
    
        }catch (error){
            console.log(error)
        }
     }
   //------------------------------------------------------------------------

   startChat = () =>{
       this.setState({ showChatForm: !this.state.showChatForm })

       this.chatRecordVoice()

   }

render() {


    return (
        <Container  style={ form.formContainer}>
               <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                <Left style={{flex:1, flexDirection:'row'}}>
                
                    <TouchableOpacity 
                        onPress={ this.navigateToMainPage }>
                        <Icon name='md-arrow-round-back' style={ form.headerLeftIcon}/>
                    </TouchableOpacity>
                  
                    {this.state.alarmType == 8 ? <Icon name='md-umbrella' style={ showMapStyle.headerLeftAlarm}/> :
                    this.state.alarmType == 1 ? <Icon name='md-heart' style={ showMapStyle.headerLeftAlarm}/> :
                    this.state.alarmType == 2 ? <Icon name='md-flame' style={ showMapStyle.headerLeftAlarm}/> :  
                    this.state.alarmType == 3 ? <Icon name='md-medkit' style={ showMapStyle.headerLeftAlarm}/> :
                    this.state.alarmType == 4 ? <Icon name='md-walk' style={ showMapStyle.headerLeftAlarm}/> : 
                    this.state.alarmType == 5 || this.state.alarmType == 6 ? <Icon name='md-radio-button-on' style={ showMapStyle.headerLeftAlarm}/> :                     
                    this.state.alarmType == 9 ? <Icon name='md-mic' style={ showMapStyle.headerLeftAlarm}/> : null } 

                     {this.state.helpersCount >0 ? 
                     <Text style={showMapStyle.helperCounter}>{this.state.helpersCount}</Text> : null}   
                </Left>
                <Body style={{flex:1}}>
                    <Title  style={form.formTitle}>
                      { ShowMapAlarm.getAppName() }
                    </Title>
                </Body>
                <Right style={{flex:1}}>
                     {
                         !this.state.myPlace && (acceptHelper || this.state.alarmType > 0 || alarmUserTel)?
                        <TouchableOpacity  onPress={ this.startChat }>
                             {
                                this.state.chatCounter?
                                <View style={{ flexDirection:'row'}}>
                                    <Text style={{ color:'#FEEC33'  }}>{this.state.chatCounter}</Text>
                                    <Icon name='md-chatboxes' style={ form.headerRightIcon2}/>
                                </View>
                                :
                                <Icon name='md-chatboxes' style={ form.headerRightIcon2}/>
                            }
                        </TouchableOpacity>
                        :null
                     }   

                    {/* Record Voice Button */}
                    <TouchableOpacity  
                        onPress={ this.userRecordVoice }>
                        <Icon name='md-microphone' style={this.state.recordVoice?
                            showMapStyle.recordIconStart :
                            showMapStyle.recordIconStop }
                        />
                    </TouchableOpacity>
               
                    {/* {
                         this.state.alarmType <= 0  && !this.state.myPlace?
                        <TouchableOpacity  onPress={ this.deleteHelperByUser(true) }>
                            <Icon name='md-close' style={ form.headerRightIcon}/>
                        </TouchableOpacity>
                        :
                        this.state.alarmType > 0  && !this.state.myPlace?
                            <TouchableOpacity onPress={ this.deleteAlarmUser }>
                                <Icon name='md-checkmark' style={ form.headerRightIcon}/>
                            </TouchableOpacity>
                        :null
                    } */}

                </Right>
            </Header>
        
            {
               this.state.sendTestAlarm && !this.state.myPlace && !this.state.getAlarm?
               <Text style={ showMapStyle.testAlarmStatus }>{ this.state.language.lngTestAlarm }</Text>
               :null 
            }

                  
            <MapView
                style={{ flex : 1 }}
                region={this.state.region}
                showsUserLocation={true}
                mapType= {this.state.showMapStyle}
                //customMapStyle= { mapstyles.darkStyle() }
                showsTraffic= { this.state.setShowTrafic }
            >
                {
                    this.state.markers && this.state.alarmType && !this.state.myPlace?
                    this.state.markers.map(this.renderMarker)
                    :null
                }
                {
                    this.state.alarmUserPosition && !this.state.alarmType && !this.state.myPlace?
                    this.state.alarmUserPosition.map(this.renderAlarmUserMarker)
                    :null
                }

            </MapView >
       

            { this.state.showChatForm?
                <MChat userAlarmID={ userAlarmID }/>
            :

                <Fab
                    active={this.state.fabActive }  // 
                    direction="right"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#084B8A' }}
                    position="bottomLeft"
                    onPress={ this.fabActive }>
                    <Icon name="md-more" />
                    <Button style={{ backgroundColor: '#5067FF' }}
                        onPress={ this.getAndSetMapStyle }>
                        <Icon name="md-color-palette" />
                    </Button>

                    {!this.state.alarmType && !this.state.myPlace && userAlarmID  ?
                    <Button 
                        style={{ backgroundColor: '#5067FF' }}
                        onPress={ this.handleGetDirections }>
                        <Icon name="md-walk" />
                    </Button>
                    :null}

                    {!this.state.alarmType && !this.state.myPlace && userAlarmID && alarmUserTel  ?
                    <Button 
                        style={{ backgroundColor: '#5067FF' }}
                        onPress={ this.callTel }>
                        <Icon name="md-call" />
                    </Button>
                    :null}

                    {!this.state.alarmType && !this.state.myPlace && userAlarmID   ?
                    <Button 
                        disabled={acceptHelper}
                        style={!acceptHelper?{ backgroundColor: '#5067FF' }:{ backgroundColor: '#898984' }}
                        onPress={ this.setAcceptHelper }>
                        <Icon name="md-checkmark" />
                    </Button>
                    :null}

                    { !this.state.alarmType && !this.state.myPlace && userAlarmID  ?
                    <Button 
                        style={{ backgroundColor: '#5067FF' }}
                        onPress={ this.deleteHelperByUser() }>
                        <Icon name="md-close" />
                    </Button>
                    :null}
                </Fab>
            }

        </Container>
        )
    }

    
}


