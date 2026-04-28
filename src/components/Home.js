import React from 'react';
import { Container,
        Header ,
        Left ,
        View ,
        Icon ,
        Label ,
        Right ,
        Button,
        Text ,
        Body,
        Title ,
        Toast,
        Root,
        Switch} from 'native-base';
import {  Animated, TouchableOpacity, BackHandler , Platform, AppState, Vibration, StyleSheet } from 'react-native';
import Voice from 'react-native-voice';
import KeepAwake from 'react-native-keep-awake';
import firebase from 'react-native-firebase';
import VolumeControl, { VolumeControlEvents } from  "react-native-volume-control";
import RNShake from 'react-native-shake';
import pSound from 'react-native-sound';
import Swiper from 'react-native-swiper';

//<-- model ------------------------------------------------
import ShowMapAlarm from './../model/ShowMapAlarm'
import SettingsM from '../model/Settings'
import pbf from '../module/PublicFunction'
import plAudio from './../model/PlayAudio';
//--------------------------------------------------------->

//<-- module ----------------------------------------------
import PushNotification from './../module/PushNotification';
import VRecognize from './../module/VoiceRecognize'
import getUserPosition from './../module/PositionFunction'
import lng from './../module/Language';
import ShareApp from './../module/ShareApp';
import MakePermissionsAndroid from './../module/MakePermissionsAndroid'
import SelectLang from './../module/SelectLanguage'
import TooltipM from './../module/Tooltip'
//--------------------------------------------------------->

import { form, HomeForm } from '../assets/styles';


import ChatRoom from './chatPages/ChatRoom'
import SmartWatch from './smartWatch'


const helpIconColor = '#FF8000'
let lngType= 'en-US'
let alarmTime =''
let time2 = 0


export default class Home extends React.PureComponent {
    
    constructor(props){
        super(props)
        this.springValue = new Animated.Value(0.3);
        
        this.state = {
            footerTabAvtive :1,
            alarmFlag: false,
            toggleVoice: false,
            results: [],
            alarmbuttonImage: '1',
            micColor:'#585858',
            //touchDisable: false,
            sendAlarm: false,
            alarmText: '',
            toggleTestAlarm: true,
            languageType: 'En',
            openShare: false,
            recordAudio: false,
            nextAppState: 'active',
            backKeyHandel: false,
            stopToSendAlarm: false,
            showLangType: false,
            shakeTime: 0,
            toggleShakeAlarm: false,
            //------------------------------ Tooltip state
            settingToolTipVisible: false,
            profileToolTipVisible: false,
            shareToolTipVisible: false,
            pVoiceToolTipVisible: false,
            micToolTipVisible: false,
            alarmToolTipVisible: false,
            positionToolTipVisible: false,
            langToolTipVisible: false,
            testAlarmToolTipVisible: false,
            asissToolTipVisible: false,
            //-----------------------------
            helpBackground: '',
            backSound: new pSound(''),
            language: {
                lngToastMsg: '',
                lngMyPlace: '',
                lngNeedHelp: '',
                lngUseAlarm: '',
                lngTestAlarm: '',
                lngTestAlarmToastT: '',
                lngTestAlarmToastF: '',
            }
            // runVoiceRec: ''
        }
            
        
        //<-Voice Recognized -------------------------------------------
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        //Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
       // Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        Voice.onSpeechError = this.onSpeechError.bind(this);
        Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
        //-------------------------------------------------------------->

        this.navigationToPages = this.navigationToPages.bind(this)
        this.startRecognizing = this.startRecognizing.bind(this)
        this.setTestAlarmVAlue = this.setTestAlarmVAlue.bind(this)
        this.openShareApp = this.openShareApp.bind(this)
        this.setLanguageType = this.setLanguageType.bind(this)
        this.setActiveFooter = this.setActiveFooter.bind(this)

    }

    setActiveFooter = (footerTabAvtive) => () =>{
        this.setState({ footerTabAvtive })
    }

    //play silent sound ------------------------------------------------
    async playSound(playStatus = false ){
        try{
            // VolumeControl.change(0.15)

  
            if( playStatus ){
                let backSound = new pSound('a2.mp4', pSound.MAIN_BUNDLE, async (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                    }else{
                        //sound.enableInSilenceMode(true)
                        backSound.setCategory('Playback');
                        backSound.setNumberOfLoops(-1);
                        backSound.play();
                        this.setState({ backSound })
                    }
                })
                
            }else{
                this.state.backSound.stop();
            }
            
      
        }catch( err ){
            console.log('playSound:',err)
        }

    }
    //------------------------------------------------------------------

    //-------------------------------------------Start set Language
    setLanguageType(){
        if( this.state.helpBackground === helpIconColor){
            this.setState({ langToolTipVisible: true })                                             
            return;
        }
        
        this.setState({ showLangType: !this.state.showLangType })
    }
    async getLngType () {
        lngType= await lng.getLngType()
        if (Platform.OS ==='ios' && lngType === null ){

            if( lngType === 'en'){
                await Voice.start('en-US');
           }else if( lngType === 'sv'){
                await Voice.start('sv-SE');
            }else if( lngType === 'es'){
                await Voice.start('es_ES');
            }

        }

        this.setState({ languageType: lngType.toUpperCase() })

    }

    async getLanguage () {
        let lngValues= await lng.homeLang()
        this.setState({
            language: {
                lngToastMsg: lngValues.lngToastMsg,
                lngMyPlace: lngValues.lngMyPlace,
                lngNeedHelp: lngValues.lngNeedHelp,
                lngUseAlarm: lngValues.lngUseAlarm,
                lngTestAlarm: lngValues.lngTestAlarm,
                lngTestAlarmToastT: lngValues.lngTestAlarmToastT,
                lngTestAlarmToastF: lngValues.lngTestAlarmToastF,
            }
        })
    }
    //-------------------------------------------End Language
    
    //<-Voice Recognized -------------------------------------------
     async onSpeechError(e) {
         await Voice.destroy().then(Voice.removeAllListeners);  
         if( this.state.toggleVoice )
           this.startRecognizing();
          // console.log(e);
        // this.setState({
        //      error: JSON.stringify(e.error)
        //  });
      }


      onSpeechStart(e) {
        this.setState({ micColor : '#B40404'})
      }

      onSpeechEnd(e) { 
          this.setState({ micColor : '#585858'})
         if( this.state.toggleVoice )
          this.startRecognizing()
        }

    //   onSpeechVolumeChanged(e) {
    //    console.log(e.value)
    //   }


      onSpeechResults(e) {
        this.setState({
          results: e.value,
        });
        this.sendVoiceAlarm(e)
      }

      onSpeechPartialResults(e){
        this.sendVoiceAlarm(e)
      }
    
      async sendVoiceAlarm(e){

        let alarmActive =  await VRecognize.alarmRecognize(e.value, this.state.alarmText)
        if (alarmActive === true ){

            if( this.state.sendAlarm === false )
            {
                Vibration.vibrate(500);
                this.setState({ sendAlarm: true })
                await ShowMapAlarm.setAlarmForUser(9)
                this.navigationToPages(9)()

            }    
        }


      }

     async startRecognizing(){
         this.setState({ micColor : '#585858'})
         
        //  if ( this.state.sendAlarm == false)
        //  {
            setTimeout( () => {
                this._startRecognizing()
            }, 100); 
        // }

     }
 
    async _startRecognizing(e) {
        this.setState({
        //   pitch: '',
        //   error: '',
          results: []
        });
        try {

            if(this.state.toggleVoice  ){
               if (Platform.OS ==='android') 
               {    
                    VolumeControl.change(0);
               }
            
               if( lngType === 'en'){
                    await Voice.start('en-US');
               }else if( lngType === 'sv'){
                    await Voice.start('sv-SE');
                }else if( lngType === 'es'){
                    await Voice.start('es_ES');
                }
            }
        } catch (e) {
            console.log(e)
        }
      }
      //-- End voice recognize function ---------------------->

    //------------------------------------------------------------------
    openShareApp(){

        if( this.state.helpBackground === helpIconColor){
            this.setState({ shareToolTipVisible: true })
            return
        }

        this.setState({ toggleTestAlarm:false, openShare: true })
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    //Get volume key action form volume listener when user push voulum button
    // down or up then after 6 secound this function raise alarm function
    volumeEvent = async event => {

        //<--
        //-- when app is active and voice recogniztion is active, 
        //-- user can't send alarm by using android device volume keys.
        if( this.state.appState !== 'background' )
        return;
        //--->

        //console.log('vol1',event.volume)

        if ( event.volume === 1 )
        VolumeControl.change(0.8);

        if ( event.volume === 0 )
        VolumeControl.change(0.5); //Set the sound
        //VolumeControl.change(0.2); //Set the sound

        if(alarmTime === ''){
            let dataT = new Date()
            alarmTime = dataT.toUTCString()
        }

        let time1 = pbf.getDifferenceBetweenTwoTimesSecound(alarmTime)
        //SettingsM.saveTestUserSetting(time1)

        if( time1 > 1 && time1 !== time2 + 1 && time1 !== time2 ){
            alarmTime = ''
            time2 = 0
        
        }else if ( time2 > time1 ){
            alarmTime = ''
            time2 = 0

        }else {
            time2 = time1

            if( time1 >= 5 && time1 <= 7 ){
                
                if( this.state.stopToSendAlarm ) return;

                //plAudio.playAlarmSound();
                Vibration.vibrate(500);

                this.setState({ stopToSendAlarm: true})

                await ShowMapAlarm.setAlarmForUser(5)
                this.navigationToPages(5)()
                //SettingsM.saveTestUserSetting(time1)
                alarmTime = ''

            }else if( time1 > 5 ) {
                alarmTime = ''
            }
        
        }

    }; 
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    async shakeEventFun(){
        try {

            if( this.state.stopToSendAlarm ) return;
    
            if ( !this.state.toggleShakeAlarm ) return;


            if( !this.state.shakeTime ){
                let cuTime = new Date()
                this.setState({ shakeTime: cuTime.toUTCString()  })
    
            }else{
                if( pbf.getDifferenceBetweenTwoTimesSecound(this.state.shakeTime) === 3){

                    Vibration.vibrate(500);
                     //plAudio.playAlarmSound();

                    this.setState({ shakeTime: '', stopToSendAlarm: true })
                    await ShowMapAlarm.setAlarmForUser(6)
                    this.navigationToPages(6)()
    
                }else if( pbf.getDifferenceBetweenTwoTimesSecound(this.state.shakeTime) > 3 ){
                    this.setState({ shakeTime: '' })
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    _handleAppStateChange = (nextAppState) => {

        if( this.state.backSound ){
            if ( nextAppState === 'background') {
                VolumeControl.change(0.5);
            }else{
                this.playSound(false)
            }
        }
        pbf.setAsyncStorageData('nextAppState', nextAppState)
        this.setState({ appState: nextAppState });
      };
    //------------------------------------------------------------------

     //------------------------------------------------------------------
     handleBackButtonClick = () => {
        if ( this.state.backKeyHandel ){
            return false;
        }else{
            this.setState({ backKeyHandel: true })
            return true;
        }

    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    componentWillUnmount(){
        try{
            //await Voice.destroy().then(Voice.removeAllListeners);
            KeepAwake.deactivate();  
            this.volEvent.remove();
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  
            AppState.removeEventListener('change', this._handleAppStateChange);
            RNShake.removeEventListener('ShakeEvent');

            
        }catch(err){

        }
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    async componentWillMount(){

        let alarmbuttonImage = await pbf.getAsyncStorageData('alarmbuttonImage')
        this.setState({ alarmbuttonImage })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );
        AppState.addEventListener('change', this._handleAppStateChange);

        //Set litiener for volume key
        this.volEvent = VolumeControlEvents.addListener(
            "VolumeChanged",
            this.volumeEvent
        );
        
        RNShake.addEventListener('ShakeEvent', () => {
            this.shakeEventFun()
        });
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    async componentDidMount(){
        try{

            //start show main button with animate
            this.spring();

            await this.openAssistantForFirstTime()

            this.getLngType()
            await this.getLanguage()

            getUserPosition.getCurrentPosition()

            this.showToastMessage()
            
            this.playSound(true)

            //this.playSound(true)
            
            PushNotification.notificationListener()

            setTimeout(()=>{
                //-----exit record audio for show play audio Icon
                plAudio.getRecordAudioFile()
                .then((recordAudio) => {
                    if (recordAudio) this.setState({ recordAudio })
                })
                //---

            },50)
            

            await this.getUserSettingStatus()

            setTimeout(()=>{
                this.getNewAlarm()
            },500)
                
            KeepAwake.activate();

        }catch(error){
            console.log('HomeComponentWillMount:',error)
        }
        

    }
    //------------------------------------------------------------------

  
    //------------------------------------------------------------------
    showToastMessage(){
        
        return new Promise( async  resolve =>{
            try{
           
                let tackHelper = await this.props.navigation.getParam('tackHelper')
                if (tackHelper === undefined){
                    resolve(false)
                    return
                }
                    
                if ( tackHelper ) {
                    Toast.show({
                        type: 'success',
                        text: this.state.language.lngToastMsg,
                        buttonText: 'Okay',
                        duration: 3000
                    })
                    resolve(true)
                }

            }catch(err){
                console.log('showToastMessage',err)
            }
        })
        
    }
    //------------------------------------------------------------------
    
    //------------------------------------------------------------------
    setTestAlarmVAlue = async (value) => {

        if( this.state.helpBackground === helpIconColor){
            this.setState({ testAlarmToolTipVisible: true })                                             
            return;
        }

        await pbf.setAsyncStorageData('showTestAlarm','true')
        this.showTestAlarmVAlue(value)

    }

    async showTestAlarmVAlue(value) {
        try{
        
            await this.setState({ toggleTestAlarm: value })
            SettingsM.setUserToggleTestAlarm(value)
            pbf.setAsyncStorageData('toggleTestAlarm',value.toString()) //Network code for organization

            let showTestAlarm = await pbf.getAsyncStorageData('showTestAlarm')
            if( showTestAlarm === 'false') return;

            Toast.show({
                type:'warning',// 'danger',
                text: value?this.state.language.lngTestAlarmToastT:this.state.language.lngTestAlarmToastF,
                buttonText: 'Okay',
                duration: 10000
            })

            pbf.setAsyncStorageData('showTestAlarm','false')

        }catch(err){
            console.log('setTestAlarmVAlue:',err)
        }
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    setToggleVoiceFalse(){
        return new Promise( async resolve =>{
            await this.setState({ toggleVoice: false })
            await Voice.stop()
            resolve(true)
        })
    }
    //------------------------------------------------------------------
    
    //------------------------------------------------------------------
    navigationToPages = (flag = 0 ) => async () => {
        try{

            if( this.state.helpBackground === helpIconColor){
                if (flag === 0){
                    
                }else if (flag === 1 ){
                    this.setState({ positionToolTipVisible: true })                                             
                }else if (flag === 2 ){
                    this.setState({ alarmToolTipVisible: true })                    
                }else if (flag === 3 ){
                    this.setState({ settingToolTipVisible: true })
                }else if (flag === 4 ){
                    this.setState({ profileToolTipVisible: true })
                }else if (flag === 7 ){
                    this.setState({ pVoiceToolTipVisible: true })
                }else if (flag === 20 ){
                    this.setState({ micToolTipVisible: true })
                }
                
                return
            }

            // if( this.state.toggleVoice )
            this.setToggleVoiceFalse()
            .then(()=>{
                if (flag === 0){
                    this.props.navigation.replace('map', { getAlarm: true })
                }else if (flag === 1 ){
                    this.props.navigation.replace('map', { myPlace: true })      
                }else if (flag === 2 ){
                    this.props.navigation.replace('alarm')
                }else if (flag === 3 ){
                    this.props.navigation.replace('setting')
                }else if (flag === 4 ){
                    this.props.navigation.replace('profile')
                }else if (flag === 5 ){
                    //Send alarm By Volume key
                    this.props.navigation.replace('map', { alarmType:5, sendType:3 })
                }else if (flag === 6 ){
                    //Send alarm By Shake
                    this.props.navigation.replace('map', { alarmType:6, sendType:3  })
                }else if (flag === 7 ){
                    this.props.navigation.replace('pAudio')
                }else if (flag === 9 ){
                    //Send alarm By Voice
                    this.props.navigation.replace('map', { alarmType:9, sendType:3 })
                }
            })
        }
        catch(err){
            console.log('navigationToPages:',err)
        }
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    getNewAlarm =() =>{
        try{
            let user =  firebase.auth().currentUser;
            let ref =  firebase.database().ref()

            ref.child('usersInfo/' + user.uid + '/helper' )
            .on('value', (data)=>{
                if( data.hasChildren() ){
                    this.navigationToPages(0)()
                }
            })
        }catch(err){
            console.log('getNewAlarm:',err)
        }
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    //-Get user setting for start voice recognition
    async getUserSettingStatus(){
        try{
            

         //VolumeControl.change(0.5);

            await SettingsM.getUserSetting()
            .then( async (data)=>{
                if(!data.error){
                    if( data.toggleVoice ){
                        //this.playSound(false)
                        await MakePermissionsAndroid.startRAudioPermission();
                        setTimeout(()=>{
                            this.startRecognizing()
                        },100)
                    }

                    if( data.toggleRecordVoice ){
                        await MakePermissionsAndroid.startRAudioPermission();
                        await MakePermissionsAndroid.startReadWritePermission();
                    }

        
                    this.setState({ toggleVoice: data.toggleVoice,
                                    alarmText: data.alarmText, 
                                    toggleTestAlarm: data.toggleTestAlarm,
                                    toggleShakeAlarm: data.toggleShakeAlarm });

                    pbf.setAsyncStorageData('toggleVoice',data.toggleVoice.toString())
                    pbf.setAsyncStorageData('toggleAssistant',data.toggleAssistant.toString())
                    pbf.setAsyncStorageData('toggleRecordVoice',data.toggleRecordVoice.toString())
                    pbf.setAsyncStorageData('networkCode',data.networkCode.toString()) //Network code for organization
                    pbf.setAsyncStorageData('toggleTestAlarm',data.toggleTestAlarm.toString()) //Network code for organization
                    pbf.setAsyncStorageData('nextAppState', '')

                    if( this.state.helpBackground !== helpIconColor){
                        this.showTestAlarmVAlue(this.state.toggleTestAlarm)
                    }

                    //<--- Its help to run volume key envent ???
                    // if( this.state.toggleVoice){
                    //     await VolumeControl.change(0);
                    
                    //     setTimeout( async () => {
                    //         Voice.start('en-US')
                    //         await Voice.stop() 
                    //         await Voice.destroy().then(Voice.removeAllListeners);  
                    //     }, 100);
                    // }
                    //----------------------------------------->
                }
                // this.setState({
                //     togglePolis : data.togglePolis,
                //     toggleAmbu : data.toggleAmbu,
                //     toggleSRecord : data.toggleSRecord,
                //     toggleAAlarm : data.toggleAAlarm,
                //     toggleOpen : data.toggleOpen,
                //     toggleplaysound : data.toggleplaysound,
                //     toggleVoice: data.toggleVoice,
                //     toggleAssistant: data.toggleAssistant,
                //     toggleRecordVoice : data.toggleRecordVoice,
                //     toggleShakeAlarm: data.toggleShakeAlarm,
                //     pNum1 : data.pNum1  ,
                //     pNum2 : data.pNum2  ,
                //     pNum3 : data.pNum3  ,
                //     pNum4 : data.pNum4  ,
                //     pNum5 : data.pNum5  ,
                //     networkCode: data.networkCode ,
                //     alarmText : data.alarmText,
                //     togglePrivateLocation: data.togglePrivateLocation
                // });
            })


           
            // let toggleVoice = await SettingsM.getUserToggleVoice()
            // if( toggleVoice ){
            //     await MakePermissionsAndroid.startRAudioPermission();
            // }

            // SettingsM.getUserToggleRecordVoice()
            // .then( async (value) => {
            //     if( value ){
            //         await MakePermissionsAndroid.startRAudioPermission();
            //         await MakePermissionsAndroid.startReadWritePermission();
            //     }
            // })
            
            // let alarmText = await pbf.getAsyncStorageData('alarmText')
            // let toggleTestAlarm = await SettingsM.getUserToggleTestAlarm()

            // this.setState({ toggleVoice, alarmText, toggleTestAlarm });

        }catch(err){
            console.log('getUserSettingStatus:',err)
        }
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    spring() {
        this.springValue.setValue(.9);
        Animated.spring(this.springValue, {
            toValue : 1,
            friction : 1,
            tension : 1
        }).start();
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    async openAssistantForFirstTime(){

         let getValue = await pbf.getAsyncStorageData('openAppForFirstTime')
        if( getValue !== '0' ){
            pbf.setAsyncStorageData( 'openAppForFirstTime', '0' )
            this.setState({  asissToolTipVisible:true })
          }
          
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    setToolTipVisible = () =>{
        this.setState({ 
            settingToolTipVisible: false,
            profileToolTipVisible: false, 
            shareToolTipVisible: false ,
            pVoiceToolTipVisible: false,
            micToolTipVisible: false,
            alarmToolTipVisible: false,
            positionToolTipVisible: false,
            langToolTipVisible: false,
            testAlarmToolTipVisible: false,
            asissToolTipVisible: false
        })
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    setHelpButtonBackColor = () =>{
        this.state.helpBackground !== helpIconColor?
        this.setState({ helpBackground: helpIconColor, asissToolTipVisible:true })
        :this.setState({ helpBackground: '' })

    }
    //------------------------------------------------------------------


    render() {

    if ( this.state.alarmbuttonImage === '1')
        return(<View></View>)
    else
        return (
            <Swiper style={styles.wrapper} showsButtons={true} index={1}>
                
                <View style={styles.slide1}>
                    <SmartWatch />
                </View>

                <Root >
                    <Container style={ form.formContainer} >
                
                        <Header key={Header.key} 
                            style={ Platform.OS==='ios'? form.formHeaderIOS:form.formHeaderAndroid}>
                        
                            <Left style={{flex:1, flexDirection: 'row'}}>
                            
                                <TouchableOpacity 
                                    onPressOut ={ this.setHelpButtonBackColor }
                                    >
                                    <TooltipM toolTipVisible={this.state.asissToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngAssistant'}>
                                        <Icon name='md-help-circle' 
                                            style={ this.state.helpBackground === helpIconColor ?
                                            { fontSize:36 ,color : this.state.helpBackground, marginLeft:5 }
                                            : HomeForm.helpIcon}  
                                        />
                                    </TooltipM>
                                </TouchableOpacity>

                                {
                                this.state.toggleVoice?
                                    <TooltipM toolTipVisible={this.state.micToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngMicClick'}>
                                        <Icon name='md-mic' 
                                        onPress ={ this.navigationToPages(20) }
                                        style={{color: this.state.micColor, fontSize:34, marginLeft:10}}/>
                                    </TooltipM>
                                :null
                                }
                                {
                                this.state.recordAudio?
                                    <TooltipM toolTipVisible={this.state.pVoiceToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngPlayVoice'}>
                                        <TouchableOpacity //disabled={ this.state.touchDisable } touchDisable: true })}>
                                            onPress={ this.navigationToPages(7) }>
                                            <Icon name='md-play'  style={ HomeForm.voiceRecord }/>
                                        </TouchableOpacity>
                                    </TooltipM>
                                :null
                                }

                            </Left>
                            <Body style={{flex:1}}>
                                <Title   style={form.formTitle}>
                                    {ShowMapAlarm.getAppName()}
                                </Title>
                            </Body>
                            {/*  */}
                            <Right style={{flex:1}}>

                                <TooltipM toolTipVisible={this.state.shareToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngShareApp'}>
                                    <TouchableOpacity //disabled={ this.state.touchDisable } touchDisable: true })}>
                                        onPress={ this.openShareApp }>
                                        <Icon name='md-share' style={form.headerRightIcon3} />
                                    </TouchableOpacity>
                                </TooltipM>

                                <TooltipM toolTipVisible={this.state.profileToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngProfileClick'}>
                                    <TouchableOpacity  //disabled={ this.state.touchDisable }  
                                        onPress={ this.navigationToPages(4)  }>
                                        <Icon name='md-contact' style={ form.headerRightIcon3} />
                                    </TouchableOpacity>  
                                </TooltipM>

                                <TooltipM toolTipVisible={this.state.settingToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngSettingClick'}>
                                    <TouchableOpacity //disabled={ this.state.touchDisable } 
                                        onPress={ this.navigationToPages(3)  }> 
                                        <Icon name='md-settings' style={form.headerRightIcon} />
                                    </TouchableOpacity>
                                </TooltipM>

                            </Right>
                        </Header>
                        
                    
                        <View style={ form.pageSecoundView }>
                            
                            <View style={ HomeForm.alarmButton}> 
                            
                                <TooltipM toolTipVisible={this.state.alarmToolTipVisible } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngAlarmClick'}>
                        
                                        <TouchableOpacity //disabled={ this.state.touchDisable } 
                                            style={{ borderRadius:200 }}
                                            onPress={ this.navigationToPages(2) }>

                                            <Animated.Image 
                                            source={ 
                                                this.state.alarmbuttonImage === 'green' ?
                                                require( './../assets/images/alarmg.jpg' )
                                                :require( './../assets/images/alarmb.jpg' )
                                            } 
                                            style={{ height : 290 , width : 290 , 
                                            transform : [{ scale : this.springValue }] }}/>

                                        </TouchableOpacity>

                                    </TooltipM>
                            </View>
        
                                    
                            <TooltipM toolTipVisible={this.state.positionToolTipVisible } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngPositionClick'}>
                                <TouchableOpacity //disabled={ this.state.touchDisable } 
                                    style={HomeForm.myPlaceButton} 
                                    onPress={ this.navigationToPages(1) }>
                                    <Text style={HomeForm.myPlaceButtonText} >{this.state.language.lngMyPlace}</Text>
                                </TouchableOpacity>
                            </TooltipM>

                            <View  style={HomeForm.buttonItems}>
                                <Label style={HomeForm.buttonLable}>{ this.state.language.lngNeedHelp }</Label>
                                <Label style={HomeForm.buttonLable}>{ this.state.language.lngUseAlarm }</Label>
                            </View>

                        </View>

                            <View  style={HomeForm.langTestAlarm}>
                                <View style={HomeForm.changeLang}>
                                    <TooltipM toolTipVisible={this.state.langToolTipVisible } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngChangeLangSweEn'}>
                                        <Button transparent
                                            style={{ height:30 }}
                                            // disabled={ this.state.touchDisable } 
                                            onPress= { this.setLanguageType }>
                                            <Text style={HomeForm.changeLangText} >{this.state.languageType}</Text>
                                        </Button>
                                    </TooltipM>
                                </View>
                                <View >
                                    <Right style={HomeForm.testAlarm}>
                                        <Label style={HomeForm.testAlarmText}>{ this.state.language.lngTestAlarm }</Label>
                                        <TooltipM toolTipVisible={this.state.testAlarmToolTipVisible } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'home'} objectName= {'lngTestAlarm'}>
                                            <Switch
                                                //disabled={ this.state.touchDisable }  
                                                onValueChange={ (value)=> this.setTestAlarmVAlue(value) } 
                                                value={ this.state.toggleTestAlarm } 
                                            />      
                                        </TooltipM>
                                    </Right>
                                </View>
                            </View>

                        

                        {
                            this.state.showLangType?
                            <SelectLang navigation={ this.props.navigation } setLanguageType={this.setLanguageType}/>  
                            :null
                        }
                        
                        {
                            this.state.openShare?
                            <ShareApp privateKey={''}  shareVisible={ this.state.openShare } visibleFalse={()=>this.setState({ openShare: false })}/> //touchDisable: false })}/>
                            :null
                        }
                
                    </Container>
                </Root>
                
                <View style={styles.slide1} >
                    <ChatRoom />
                </View>

            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,

    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
  })