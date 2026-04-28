import firebase from 'react-native-firebase'

import pbf from '../module/PublicFunction';
import SettingsM from './Settings';

export default {
     
     //OK
     async setHelperAccept(alarmUserID, alarmUserTel){
        try{
            let user = await firebase.auth().currentUser;
            let ref = firebase.database().ref()
            
            ref.child('usersInfo/' +  alarmUserID + '/alarm' )
                .once('value',  (data)=>{
                if (data.hasChild('userLogPath')){
                    
                    ref.child(data.val().userLogPath + '/helper/' + user.uid)
                    .update({ 
                        addDate : pbf.getCorrectDate(),
                        familyAlarm: alarmUserTel? true: false

                    }).then(() => {
                        //just for update user position
                        ref.child('usersInfo/' +  alarmUserID + '/alarm' )
                        .update({ acceptDate: pbf.getCorrectDate() })
                        .catch((err)=>{console.log('setHelperAccept2:', err)})
                    }).catch((err)=>{
                        console.log('setHelperAccept1:', err)
                    })
                    
                }

            })
        }
           catch (error){ 
               console.log('E-setHelperAccept:',error) 
        }
    },


    getHelperStatus(alarmUserPath){

        return new Promise(resolve => {
            try{
                let user =  firebase.auth().currentUser;
                let ref = firebase.database().ref()
                
                ref.child(alarmUserPath + '/helper/' + user.uid)
                    .once('value',  (data)=>{
                    if (data.hasChild('addDate'))
                        resolve(true)
                    else
                        resolve(false)
                })
            }catch(err){ 
                console.log('E-setHelperAccept:',err) 
            }
        })
    },

      //OK
    async deleteHelperByUser(alarmUserID){
       
        try{
        
            let user = await firebase.auth().currentUser;
            let ref = firebase.database().ref()
            
            ref.child('usersInfo/' +  alarmUserID + '/alarm' )
            .once('value',  (data)=>{
                if (data.hasChild('userLogPath')){
                    ref.child(data.val().userLogPath + '/helper/' + user.uid).remove()
                }
            })
            .catch((err)=>{
                console.log('deleteHelperByUser2:', err)
            })

            ref.child('usersInfo/' + user.uid + '/helper/' + alarmUserID).remove()
            .catch((err)=>{
                console.log('deleteHelperByUser1:', err)
            })

        }
            catch (error){ 
                console.log('E-deleteHelper:',error) 
        }    
    },


    async deleteAllHelperByUser(){
       
        try{
        
            let user = await firebase.auth().currentUser;
            let ref = firebase.database().ref()
            
            ref.child('usersInfo/' + user.uid + '/helper')
            .once('value', (data) => {
                data.forEach(alarmUser =>{

                    ref.child('usersInfo/' +  alarmUser.key + '/alarm' )
                    .once('value',  (data1)=>{
                        if (data1.hasChild('userLogPath')){
                            ref.child(data1.val().userLogPath + '/helper/' + user.uid).remove()
                        }
                    })
                    .catch((err)=>{
                        console.log('deleteHelperByUser2:', err)
                    })
                })

            }).then(()=>{
                ref.child('usersInfo/' + user.uid + '/helper').remove()
                .catch((err)=>{
                    console.log('deleteHelperByUser1:', err)
                })

            }).catch((err)=>{
                console.log('deleteHelperByUser3:', err)
            })

        }catch (error){ 
            console.log('E-deleteHelper:',error) 
        }    
    },

    checkPrivateAlarmHelper(){
        return new Promise( async resolve =>{
            try{
                await SettingsM.getUserSetting()
                .then((data)=>{
                    if(!data.error){
                        if(!data.pNum1 && !data.pNum2 && !data.pNum3 && !data.pNum4 && !data.pNum5 ){
                            resolve(true)
                        }else{
                            resolve(false)
                        }
                    }
                })
            }catch(err){
                console.log('checkPrivateAlarmHelper:',err)
            }
        })
    },

    findAlarmuserdistance( lat2, lon2) {
        return new Promise(async resolve =>{
            try{
                let lat1 = await pbf.getAsyncStorageData('userlatitude')
                let lon1 = await pbf.getAsyncStorageData('userlongitude')
        
                var radlat1 = Math.PI * lat1/180
                var radlat2 = Math.PI * lat2/180
                var theta = lon1-lon2
                var radtheta = Math.PI * theta/180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist)
                dist = dist * 180/Math.PI
                dist = dist * 60 * 1.1515
                dist = dist * 1.609344  //k
                //if (unit=="N") { dist = dist * 0.8684 }
                //return dist
                //console.log(dist)
                let res = dist * 0.032
                if (res > 180)
                res= 180;

                resolve( res )

            }catch(err){
                console.log('findAlarmuserdistance:',err)
            }
        })
   }
    

}