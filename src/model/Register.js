
import firebase from 'react-native-firebase'

import pbf from '../module/PublicFunction'
import edData from './../module/EncryptDecryptData';
import SettingsM from '../model/Settings'

export default {


    getAppName(){
        return pbf.appInformation().Name
    },

    async getUserIfo(){
        try{
            let user = await firebase.auth().currentUser;
            return user.displayName
        }catch(error){
            console.log('getUserIfo:',error)
        } 
    },

    getLegalAge(){

        return  new Promise(async (resolve ) =>{
            try{
                firebase.database().ref().child('appSetting/legalAge')
                .once('value', (data)=>{
                    if (data.val())
                        resolve( data.val())
                })
                .catch((err) => {
                    console.log('getLegalAge:',err)
                    resolve(12)
                })
            }catch(error){
                console.log('getLegalAge:',error)
            } 
        })
    },


    async saveNewUserInformation( nav  )
    {
        try{

            let user = await firebase.auth().currentUser;
            let { displayName, phoneNumber, email } = user
            if(!displayName ) displayName=''
            if(!phoneNumber ) phoneNumber=''
            if(!email ) email=''

            firebase.auth().signInWithCredential
            firebase.database().ref()
            .child('usersInfo/' +  user.uid + '/userRegister').set({
                pNumber : '',
                uName : await edData.encryptData(displayName),
                tNumber : await edData.encryptData(phoneNumber),
                eMail : await edData.encryptData(email),
                privateKey: '',
                regDate: pbf.getCorrectDate(),
                saveDate : pbf.getCorrectDate()
            }).then(() => {
                SettingsM.setDefaultUserSetting()
                nav.navigate('welComePage')
            }).catch((error)=>{
                console.log('userRegister:',error)
            })
            
        }
           catch (error){ 
              console.log('E-UserRegister:',error) 
        }
    },

    checkUserPersonNumber( pNumber , text , legalAge){

        let cuDateYear = new Date().getFullYear()

        //<-- Year -------------------------------------------------------------
        if ( text.substring(0,1) != 2 && text.substring(0,1) != 1 ) return''
        // if ( text.substring(0,1) == 1 && pNumber == '' ){
        //     return '19'
        // }
        // if ( text.substring(0,1) == 2  && pNumber == '' ){
        //     return '20'
        // }

        if (text.length >= 4){
            if( text.substring(0,4) > cuDateYear - legalAge)
                return '20'
        }

        if (text.length >= 2){
            if ( text.substring(0,1) == 1 ){
                if ( text.substring(1,2) != 9 ) return ''
            }

            if ( text.substring(0,1) == 2 ){
                if ( text.substring(1,2) != 0 ) return ''
            }
        }  
       //-- End Year ------------------------------------------------------------>

       //<-- Mounth --------------------------------------------------------------
        if (text.length >= 5){
         if ( text.substring(4,5) != 1 && text.substring(4,5) != 0 ) return  ''
        }
        
        if (text.length >= 6){
            if ( text.substring(4,5) == 1 )
            if ( text.substring(5,6) != 0 && text.substring(5,6) != 1 && text.substring(5,6) != 2 ) return ''

            if ( text.substring(4,5) == 0 )
            if ( text.substring(5,6) == 0 ) return ''           
        }
        //-- End Mounth --------------------------------------------------------->

       //<-- Day -----------------------------------------------------------------
        if (text.length >= 7){
            if ( text.substring(6,7) != 0 
            && text.substring(6,7) != 1
            && text.substring(6,7) != 2
            && text.substring(6,7) != 3 ) return ''
        }

        if (text.length >= 8){
            if ( text.substring(6,7) == 3 )
            if ( text.substring(7,8) != 0 && text.substring(7,8) != 1 ) return ''

            if ( text.substring(6,7) == 0 )
            if ( text.substring(7,8) == 0 ) return ''
        }
        //-- End Day --------------------------------------------------------->

        return text

    }
}