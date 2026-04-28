import { Alert } from 'react-native';
import firebase from 'react-native-firebase';

import pbf from './../module/PublicFunction';


export default {

    getPublicMessage(){
        return new Promise( resolve => {
            try{
                firebase.database().ref()
                .child('appSetting/messagePu')
                .once('value',async (data)=>{

                    let puMSG = await pbf.getAsyncStorageData('puMSG')
                    if (data.val() !== '' && puMSG !== data.val())
                    {
                        
                        pbf.setAsyncStorageData('puMSG',data.val())
                        Alert.alert(pbf.appInformation().Name  + ' - Public message' ,data.val(),
                        [
                            {text: 'OK', onPress: () => { 
                                resolve(true)
                            }, style: 'ok'}
                        ])
                    }else{
                        resolve(true)
                    }
  
                }).catch((err)=>{
                    console.log('getPublicMessage1:',err)
                })

            }catch(error){
                console.log('getPublicMessage2:',error)
            }
        })
    },

    // getUserInfoStatus(nav){
    //     return new Promise( async resolve => {
    //         try{
    //             await UserInfoM.getUserInfo()
    //             .then( (data)=>{
    //                 if (  !data.uName || !data.tNumber )
    //                 {
    //                     nav.replace('profile')

    //                 }else{
    //                     this.getPublicMessage()
    //                     .then((value) => {
    //                         if(value)
    //                           resolve(true);
    //                     })
    //                 }
    //             }).catch((err)=>{
    //                 console.log('getUserInfoStatus1:',err)
    //                 resolve(true)
    //             })
    //         }catch(err){
    //             console.log('getUserInfoStatus:',err)
    //             resolve(true)
    //         }
    //     })
        
    // }
}

    
