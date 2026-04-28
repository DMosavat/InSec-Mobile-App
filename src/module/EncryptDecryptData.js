import CryptoJS from 'crypto-js'
import firebase from 'react-native-firebase'
import pbf from './PublicFunction';

const key1 = 'ksjdkssnn@nskdskdm &^&^%$##$ 8293829'
const enTKey = 'dfkkjkdslfsd 4543543 45 fgd f @#@(*( dfjd 39849&* ksjks(*(344'

export default {
    
    // async encryptKey(){
    //     let aa = await CryptoJS.AES.encrypt("" ,key1)
    //     console.log(aa.toString())
    // },

    getKey(){

         return  new Promise(async (resolve) =>{
            try{

                firebase.database().ref()
                .child('appSetting')
                .once('value', (data)=>{
                    if (data.hasChild('edData')){
                        let key = CryptoJS.AES.decrypt(data.val().edData,key1)
                        let key2 = key.toString(CryptoJS.enc.Utf8);
                        resolve(key2)

                        this.encryptTempKey(key2)

                    }
                }).catch((error)=>{
                    console.log('getKey:',error)
                    return ''
                })
            }catch(err){
                return ''
            }  
         })

    },
    
    encryptTempKey(Key){
        try{
            let eKey = CryptoJS.AES.encrypt(Key ,enTKey)
            pbf.setAsyncStorageData('tempData',eKey.toString())
        }catch(err){

        }
    },

    async decryptTempKey(){
        try{
            let key = await pbf.getAsyncStorageData('tempData')
            if(!key) return '';

            let ddata = CryptoJS.AES.decrypt(key ,enTKey)
            let ddata2 = ddata.toString(CryptoJS.enc.Utf8);
            return  ddata2
        }catch(err){
            return ''
        }
    },
    

    async encryptData(data){
        try{
            if (!data) return ''

            let key = await this.decryptTempKey()
            if(!key){
                 key = await this.getKey();
                 if(key){
                    let edata = CryptoJS.AES.encrypt(data ,key.toString())
                    return edata.toString()
                 }else{
                    return ''
                 }

            }else{
                let edata = CryptoJS.AES.encrypt(data ,key.toString())
                return edata.toString()
            }
        }catch(err){
            return ''
        }
    },

    async decryptData(data ){
        try{
            if (!data) return ''

            let key = await this.decryptTempKey()
            if(!key){
                 key = await this.getKey();
                 if (key){
                     let ddata = CryptoJS.AES.decrypt(data ,key.toString())
                     let ddata2 = ddata.toString(CryptoJS.enc.Utf8);
                     return  ddata2
                 } else{
                     return ''
                 }
            }else{
                let ddata = CryptoJS.AES.decrypt(data ,key.toString())
                let ddata2 = ddata.toString(CryptoJS.enc.Utf8);
                return  ddata2
            }

        }
        catch(err){
            return ''
        }
    }

}

