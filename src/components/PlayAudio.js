import React from 'react';
import { Container,
         Header,
         Left,
         Right,
         Body,
         Text,
         Title,
         View,
         Icon } from 'native-base';
import {  TouchableOpacity ,Platform, Alert, BackHandler } from 'react-native';
import VolumeControl from "react-native-volume-control";
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';


//--------------------------------------------------------->

//--------------------------------------------------------->
import { form, pAudio } from '../assets/styles';
import pbf from './../module/PublicFunction'
import lng from './../module/Language';
import plAudio from './../model/PlayAudio';
//--------------------------------------------------------->


let pSound = ''

export default class UserInfo extends React.PureComponent {
    constructor(props){
        super(props)
        this.state={
            playAudio: false,
            pauseAudio: false,
            filePath: '',
            shareFile: false,
            flieDate: '',
            fileTime: '',
            fileSize:'',
            fileduration: '00:00:00',
            filePlayTime: '00:00:00',
            cuTimer:'',
            delAudio: false
        }
        this.backToHomePage = this.backToHomePage.bind(this)
        this.playRecordAudio = this.playRecordAudio.bind(this)
        this.PauseRecordAudio = this.PauseRecordAudio.bind(this)
        this.stopPlayAudio = this.stopPlayAudio.bind(this)
        this.delRecordAudioFile = this.delRecordAudioFile.bind(this)
        //this.shareRecordFile = this.shareRecordFile.bind(this)
    }


    async backToHomePage(){
        
        await pSound.release();
        pSound = null;
        this.props.navigation.replace('home')

    }


    async playRecordAudio(){
        try {
            if( !this.state.filePath )
            return;

            if( this.state.pauseAudio){
                this.setState({ playAudio: true, pauseAudio: false })                
                pSound.play((success) => {
                    clearInterval(this.state.cuTimer)
                    if (success) {
                        this.setState({ playAudio: false })
                        console.log('successfully finished playing');
                    } else {
                        this.setState({ playAudio: false })
                        console.log('playback failed due to audio decoding errors');
                    }
                });

            }else{

                setTimeout(() => {
                    let date = new Date(null);

                    let cuTimer = setInterval(()=>{

                        if( !this.state.delAudio ){
                            pSound.getCurrentTime((seconds) => {
                                date.setSeconds( seconds + 1 )
                                this.setState({ filePlayTime: date.toISOString().substr(11, 8)}) 
                            });
                        }

                    },1000)

                    this.setState({ playAudio: true, cuTimer })

                    pSound.play((success) => {
                        clearInterval(this.state.cuTimer)
                        if (success) {
                            this.setState({ playAudio: false })
                            console.log('successfully finished playing');
                        } else {
                            this.setState({ playAudio: false })
                            console.log('playback failed due to audio decoding errors');
                        }
                    });
                }, 100);

            }


        } catch (error) {
            console.log('playRecordAudio:',error)
        }
    }

    PauseRecordAudio(){
        try {
            if( !this.state.filePath )
            return;

            pSound.pause()
            this.setState({ playAudio: false, pauseAudio: true })

        } catch (error) {
            console.log('playRecordAudio:',error)
        }
    }

    stopPlayAudio(){
        try {
            if( !this.state.filePath )
            return;

            pSound.stop()
            pSound.setCurrentTime(0)
            clearInterval(this.state.cuTimer)
            this.setState({ playAudio: false, pauseAudio: false, filePlayTime:'00:00:00' })

        } catch (error) {
            console.log('playRecordAudio:',error)
        }
    }

    async delRecordAudioFile(){
        try {

            if( !this.state.filePath )
            return;

            let lngValues = await lng.playAudioLang()
            let delMsg = lngValues.lngDeleteFile

            let fExist = RNFS.exists(this.state.filePath)
            if ( fExist ) {

                this.setState({ playAudio: false })
                Alert.alert(
                    pbf.appInformation().Name,
                    delMsg,
                    [
                      {text: 'Cancel', onPress: () => { return }  , style: 'cancel'},
                      {text: 'OK', onPress: async () => { 
                          
                          await this.setState({ delAudio: true })
                          await pSound.release();
                          pSound = null;
                          RNFS.unlink(this.state.filePath)
                          .then(()=>{
                            this.props.navigation.replace('home')
                          })
             
                      }, style: 'ok'}
                    ],
                    { cancelable: false }
                )
                
            } 
        } catch (error) {
            console.log(error)
        }
     
    }



    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  
        clearInterval(this.state.cuTimer)
    }

    async componentDidMount(){
        try {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );


            let filePath = await  plAudio.getRecordAudioFilePath()
            let fState = await RNFS.stat(filePath)

            let dState = new Date(fState.ctime)

            this.setState({ 
                filePath, 
                fileSize: Math.round(fState.size / 1000),
                flieDate: dState.toDateString(), 
                fileTime: dState.toLocaleTimeString(),
            })

            setTimeout(() => {
                pSound = new Sound(filePath, '', async (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return
                    }

                    let date = new Date(null);
                    date.setSeconds(pSound.getDuration())

                    this.setState({ 
                        fileduration:  date.toISOString().substr(11, 8)
                    })
                        
                    VolumeControl.change(0.8);
                })
            }, 100);

        } catch (error) {
            console.log('componentDidMount:', error)
        }

    }

     //------------------------------------------------------------------
     handleBackButtonClick = () => {
        this.backToHomePage()
        return true;
    }
    //------------------------------------------------------------------
   

    render() {

        return (
            <Container style={ form.formContainer}>
                <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={ this.backToHomePage }>
                            <Icon name='md-arrow-round-back' style={ form.headerLeftIcon}/>
                        </TouchableOpacity>
                    </Left>                        
                    <Body style={{flex:1}}>
                        <Title  style={form.formTitle}>
                            { pbf.appInformation().Name }
                        </Title>
                    </Body>
                    <Right style={{flex:1}}/> 
                </Header>

                <View style={{ marginLeft:20, marginTop:10 }}>
                    <Text style={pAudio.fileInfo}>{this.state.flieDate}</Text>
                    <Text style={pAudio.fileInfo}>{this.state.fileTime}</Text>
                    <Text style={pAudio.fileInfo}>{this.state.fileSize} kB</Text>
                    <Text style={pAudio.fileInfo}>{this.state.fileduration}          {this.state.filePlayTime }</Text>
                    <Text style={pAudio.fileInfo}>insec.aac</Text>
                </View>

                <View style={ pAudio.mainIconView}>

                    {
                        this.state.playAudio?
                        <Icon name='md-podium' style={ pAudio.audioIconRun }/>
                        :
                        <Icon name='md-volume-mute' style={ pAudio.audioIcon }/>
                    }
                   
                    
                    <View style={ pAudio.playAudioView }>
                        <View style={{ flexDirection: 'row' }}>
                                {
                                    !this.state.playAudio?
                                    <TouchableOpacity onPress={ this.playRecordAudio }>
                                    <Icon name='md-play' style={ pAudio.playIcon }/>
                                    </TouchableOpacity>:
                                    <TouchableOpacity onPress={ this.PauseRecordAudio }>
                                        <Icon name='md-pause' style={ pAudio.playIcon }/>
                                    </TouchableOpacity>
                                }
                            
                                <TouchableOpacity onPress={ this.stopPlayAudio }>
                                    <Icon name='md-skip-backward' style={ pAudio.playIcon}/>
                                </TouchableOpacity>
                                
                                <View style={{ margin:40}}></View>
                                {/* <TouchableOpacity onPress={ this.shareRecordFile }>
                                    <Icon name='md-share' style={ pAudio.playIcon}/>
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={ this.delRecordAudioFile }>
                                    <Icon name='md-close' style={ pAudio.playIcon}/>
                                </TouchableOpacity>
                       
                        </View>
                    </View>

             

                </View>

              


              
            </Container>
        )
    }

}