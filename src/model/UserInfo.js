
import firebase from 'react-native-firebase'
import pbf from '../module/PublicFunction'
import edData from './../module/EncryptDecryptData';


export default {


    getAppName(){
        return pbf.appInformation().Name
    },

    async savePrivateNumber( privateNUm )
    {
        try{
            let user = await firebase.auth().currentUser;
            firebase.database().ref()
            .child('usersInfo/' +  user.uid + '/userRegister').update({
                privateKey: privateNUm.toString()   
            }).catch((error)=>{
                console.log('savePrivateNumber:',error)
            })
            
        }
        catch (error){ 
               console.log('E-savePrivateNumber:',error) 
        }
    },

    async saveUserInfo(
        pNumber,
        uName,
        tNumber,
        eMail,
        privateKey)
    {
        try{
            let user = await firebase.auth().currentUser;

            firebase.database().ref()
            .child('usersInfo/' +  user.uid + '/userRegister').update({
                pNumber :pNumber,
                uName : await edData.encryptData(uName),
                tNumber : await edData.encryptData(tNumber),
                eMail : await edData.encryptData(eMail),
                privateKey: privateKey.toString(),
                appVersion: pbf.appInformation().Version,
                saveDate : pbf.getCorrectDate()               
            }).catch((error)=>{
                console.log('saveUserInfo:',error)
            })
            
        }
        catch (error){ 
               console.log('E-saveUserInfo:',error) 
        }
    },

    getUserInfo()
    {
        return  new Promise(async (resolve ) =>{

            try{
                let user = await firebase.auth().currentUser;
                let userData = {}
               
                firebase.database().ref()
                .child('usersInfo/' +  user.uid + '/userRegister')
                .once('value', async (data)=>{
                    if (data.hasChild('saveDate')){
                        userData.pNumber = data.val().pNumber,
                        userData.uName = await edData.decryptData(data.val().uName),
                        userData.tNumber = await edData.decryptData(data.val().tNumber),
                        userData.eMail = await edData.decryptData(data.val().eMail)
                        userData.saveDate = data.val().saveDate
                        data.hasChild('privateKey')? userData.privateKey = data.val().privateKey :
                        userData.privateKey =''
                        resolve(userData)
                    }
                }).catch((error)=>{
                    console.log('getUserInfo:',error)
                })
    
            }
            catch (error){ 
                console.log('E-getUserInfo:',error) 
            }
        })
        
    },

    makeRandomNumber(){
        return new Promise (resolve =>{

            try{
                let flag = true
                let ndate = new Date()
                let num =ndate.getUTCDate().toString() + ndate.getMilliseconds().toString()

                let timer = setInterval(()=>{
                    if (flag === true ){
                        flag = false

                        let min = 100000000 ;
                        num =  num.substring(1,10)
                        let max = parseInt(num - 9);
                        let rand =  Math.round( min + (Math.random() * (max-min)))

                        this.checkRandomNumber(rand)
                        .then((value)=>{
                            if (value === false ){
                                clearInterval(timer);
                                resolve(rand)
                                return
                            }
                            else
                                flag = value
                        })
                    }

                },500)
      
            }catch(error){
                console.log('makeRandomNumber:',error)
            }

        })
    },

    checkRandomNumber(randNUm)
    {
        return  new Promise( (resolve) =>{
            try{
                firebase.database().ref()
                .child('usersInfo' )
                .orderByChild('userRegister/privateKey')
                .equalTo(randNUm.toString())
                .once('value', (data)=>{
                    if (data.hasChildren()){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }).catch((error)=>{
                    resolve(false)
                    console.log('checkRandomNumber:',error)
                })
    
            }
            catch (error){ 
                console.log('E-checkRandomNumber:',error) 
            }
        })
        
    },

    getUserInfoStatus(nav){
        return new Promise( async resolve => {
            try{
                this.getUserInfo()
                .then( (data)=>{
                    if (  !data.uName || !data.tNumber )
                        nav.replace('profile')
                    else
                        resolve(true);
                    
                }).catch((err)=>{
                    console.log('getUserInfoStatus1:',err)
                    resolve(true)
                })
            }catch(err){
                console.log('getUserInfoStatus:',err)
                resolve(true)
            }
        })
        
    }

}