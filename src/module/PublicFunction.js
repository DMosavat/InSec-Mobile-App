import { Alert, NetInfo } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import lng from './../module/Language';


export default {

    appInformation(){
        
        let data = {}
        data.Name =  'InSec' 
        data.Manual = 'Welcome to InSec' 
        data.SplashName =  'Intelligent Security' 
        data.license =  '© 2018-2019 Solution Valley AB'
        data.Version =  '3.0.1'

        
        data.companyName = ''
    
        return data
        
    },    

    alertOk(message){
         Alert.alert( this.appInformation().Name , message, [{text: 'OK'}, ])
    },

    validateEmail(email){
        try{
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return (true)
            else
            return (false)

        }catch(error){
            console.log('validateEmail:',error)
        }
    },

    async getAsyncStorageData(key){
        return await AsyncStorage.getItem(key,
        (error)=>{
            return ''
        })
    },

    async setAsyncStorageData(key,value){
        await AsyncStorage.setItem(key,value)
    },

    getCorrectDate(){

        let cuDate = new Date()
        return cuDate.toUTCString()

    },
    
    getCorrectDateForChat(){

        let cuDate = new Date()
        return cuDate.toLocaleString()

    },

    getDifferenceBetweenTwoTimes(dateOld){
        try{
            let dateO = new Date(dateOld)
            let dataT = new Date()
            let dateN = new Date(dataT.toUTCString())
            let minut =  Math.floor(((dateN  - dateO )/1000)/60) 
            return minut 
        }catch(error){
            console.log('getDifferenceBetweenTwoTimes:',error)
        }
    },

    getDifferenceBetweenTwoTimesSecound(dateOld){
        try{
            let dateO = new Date(dateOld)
            let dataT = new Date()
            let dateN = new Date(dataT.toUTCString())
            let minut =  Math.floor(((dateN  - dateO )/1000)) 
            return minut 
        }catch(error){
            console.log('getDifferenceBetweenTwoTimes:',error)
        }
    },

    getCorrectUTCDate(days){
        try{
            let aa = new Date()
            bb = aa.toLocaleDateString().split('/')
            return bb.join('-')
        }catch(error){
            console.log('getCorrectUTCDate:',error)
        }
    },

    getCurrentTime(){
        let time = new Date()
        return time.toLocaleTimeString()
    },

    async openAppWebLink(pageType){
        let lngType= await lng.getLngType()
        if (lngType !== 'sv' ){
            switch (pageType) {
                case 0://TermAndConditionPage
                    return 'https://www.solutionvalleyab.se/app-terms-conditions-en';
                
                case 1://PrivacyPolicy
                    return 'https://www.solutionvalleyab.se/app-privacy-policy-en';
               
                case 2://AboutUs
                    return 'https://www.solutionvalleyab.se/about/'

                case 3://ContactUs
                    return 'https://www.solutionvalleyab.se/contact/'

                case 4://Insec Docs
                    return  'https://insec-docs.web.app/docs?lang=en'  
                    //return  'http://0.0.0.0:3000/docs?lang=en'//ios  //'http://10.0.2.2:3000/docs' //Android

                default:
                    return 'https://solutionvalleyab.se'
            }

        }else{
            
            switch (pageType) {
                case 0://TermAndConditionPage
                    return 'https://www.solutionvalleyab.se/app-terms-conditions-sw';
                
                case 1://PrivacyPolicy
                    return 'https://www.solutionvalleyab.se/app-privacy-policy-sw';
                
                case 2://AboutUs
                    return 'https://www.solutionvalleyab.se/about/'
                
                case 3://ContactUs
                    return 'https://www.solutionvalleyab.se/contact/'
                    
                case 4://Insec Docs
                    return  'https://insec-docs.web.app/docs?lang=sv'  
                   //return  'http://0.0.0.0:3000/docs?lang=sv'//ios  //'http://10.0.2.2:3000/docs' //Android

                default:
                    return 'https://solutionvalleyab.se'
            }
        }

    },


    networkConection(){
        return new Promise(async resolve => {
            try{
                NetInfo.isConnected.fetch().then(() => {
                    NetInfo.isConnected.fetch()
                    .then(async isConnected => {
                        if(isConnected){
                            resolve(true)
                        }
                        else{
                            Alert.alert( this.appInformation().Name, 'Nätverk Sanslutningsfel, snälla försök igen senare')
                            resolve(false)
                        }
                    })
                    .catch((err)=>{
                        console.log('networkConection1:',err)
                    })
                })
                .catch((err)=>{
                    console.log('networkConection2:',err)
                })
            }catch(error){
                console.log('EndNetworkConection:',error)
            }
        })
    }
}