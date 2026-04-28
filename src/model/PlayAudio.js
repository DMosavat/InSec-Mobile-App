import { Platform } from 'react-native';
import VolumeControl from  "react-native-volume-control";
import RNFS from 'react-native-fs';
import pSound from 'react-native-sound'
import { AudioUtils} from 'react-native-audio';

export default {

    async getRecordAudioFilePath(){
        try {

            return Platform.select({
                ios: AudioUtils.DocumentDirectoryPath + '/insec.aac' ,
                android: AudioUtils.MusicDirectoryPath + '/insec.aac', 
            });

        } catch (error) {
            return ''
        }
    },

     //play silent sound ------------------------------------------------
     async playAlarmSound(){
        try{

           // setTimeout(() => {
                const sound = new pSound('vib.mp3', pSound.MAIN_BUNDLE, async (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                    }
                    
                            VolumeControl.change(0.5)

                       // setTimeout(() => {
                            //sound.enableInSilenceMode(true)
                            sound.setCategory('Playback');
                            // play when loaded
                            sound.play();
                        //}, 100)
          
                    });
            //}, 100);
      
        }catch( err ){
            console.log('e2:',err)
        }

    },
    //------------------------------------------------------------------

    async getRecordAudioFile(){
        try {
            
            
            let filePath = await this.getRecordAudioFilePath()
            let fexists = await RNFS.exists(filePath)

            return fexists


        } catch (error) {
            return false;
        }
    },


}

    
