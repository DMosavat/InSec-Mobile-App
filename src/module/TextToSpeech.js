import Tts from 'react-native-tts'
import { Platform, Vibration } from 'react-native'
import VolumeControl from "react-native-volume-control";

import lng from './Language'
import pbf from './PublicFunction';
//import playAlarm from './../model/PlayAudio';

export default {


    stopTalk(){
        Tts.stop()
    },

    async startTalk( talkType = 0 ){
  
      try{
        
        if ( talkType === 0 ){
            Vibration.vibrate(500);
        }

        //--stop app assistant in background mode 
        let nextAppState = await pbf.getAsyncStorageData('nextAppState')
        if( nextAppState === 'background') return;
        //------------------------------------------------------------

        let toggleAssistant = await pbf.getAsyncStorageData('toggleAssistant')
        if (toggleAssistant === 'false' && (talkType != 4 && talkType != 5)) return;


        let lngValues= await lng.ttSpeechLang()
        let lngType = await lng.getLngType()

        Tts.getInitStatus()
        .then(async () => {
            
            Tts.addEventListener('tts-start', event => {Platform.OS ==='android'?VolumeControl.change(0.6):null});
            Tts.addEventListener('tts-finish', event => {});
            Tts.addEventListener('tts-cancel', event => {});

            if( lngType === 'en'){
                Tts.setDefaultLanguage('en-US');
            }else if( lngType === 'es'){
                Tts.setDefaultLanguage('es_ES');
            }else{
                Tts.setDefaultLanguage('sv-SE');
            }
            
            Tts.setDefaultRate(0.5);
            if (Platform.OS ==='android') 
            {
                VolumeControl.change(0.6);
            }else{
                if( lngType === 'en')
                {
                    Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
                }else if( lngType === 'es'){
                    Tts.setDefaultVoice('com.apple.ttsbundle.Monica-compact');
                }else{
                    Tts.setDefaultVoice('com.apple.ttsbundle.Alva-compact');
                }
            }

            let ttsText=''
            switch (talkType) {
                case 0:
                    //ttsText = lngValues.lngAlarmSend  
                    break;
                case 1:
                    ttsText = lngValues.lngSelectOne          
                    break;
                case 2:
                    ttsText = lngValues.lngEditProfile            
                    break;
                case 3:
                    ttsText = lngValues.lngEditSetting    
                    //ttsText = 'You can insert five private number, and change alarm status. Private, Or, Public.'
                    break;
                case 4:
                    ttsText = lngValues.lngInsertPN 
                    break;
                case 5:
                    ttsText = lngValues.lngWelcome 
                    break;
                case 6:
                    ttsText = lngValues.lngSentAlarm
                    break;
            }

            let toggleVoice = await pbf.getAsyncStorageData('toggleVoice')
            if ( toggleVoice === 'true' ){
                if (Platform.OS ==='android') 
                {    
                     await VolumeControl.change(0)
                }
            }
            //Tts.setDucking(true)
            Tts.speak(ttsText ,false)

        }, (err) => {
            console.log('en',err,err.code)
            if (err.code === 'no_engine') {
              Tts.requestInstallEngine();
            }
        })
      }catch(error){
          console.log('startTalk:',error)
      }
  
    },

 
}