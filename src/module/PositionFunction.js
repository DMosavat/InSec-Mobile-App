
import { Alert, Platform } from 'react-native'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
 
import setPositionForUser from './../model/ShowMapAlarm';
import pbf from './../module/PublicFunction';
import lng from './Language';

let posiErro =false
let tempLatitude = 0
let tempCntPos = 0

export default {


    getCurrentPositionByZoom(zoom) {
        let poInfo = {}
        return new Promise(resolve => {
            try{
                navigator.geolocation.watchPosition(
                    position => 
                    {
                        poInfo.latitude= position.coords.latitude,
                        poInfo.longitude= position.coords.longitude
                        poInfo.latitudeDelta=  0.00922 * zoom,
                        poInfo.longitudeDelta= 0.00421 * zoom

                        resolve(poInfo)
                    }
                    ,error => console.log('getCurrentPositionByZoom: ',error)
                    ,{ enableHighAccuracy : false , timeout : 20000 , maximumAge : 0 , distanceFilter: 10 })  
            }catch(error){
                    console.log('getCurrentPositionByZoom:',error)
            }    
        })
    },  


    getCurrentPosition() {
        let poInfo = {}
        try{
            navigator.geolocation.watchPosition(     
                           
                position => 
                {
                    poInfo.latitude= position.coords.latitude,
                    poInfo.longitude= position.coords.longitude

                    setPositionForUser.setPositionForUser(poInfo)
                }
                ,async error => 
                {
                    if (Platform.OS != 'ios'){
                        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
                        .then(data => {

                           // this.getCurrentPositionWithError()
    
                          // The user has accepted to enable the location services
                          // data can be :
                          //  - "already-enabled" if the location services has been already enabled
                          //  - "enabled" if user has clicked on OK button in the popup
                        }).catch( async err => {
                            
                            
                            if(!posiErro){
                                posiErro=true
                                let lng2 = await lng.positionLang()
                                Alert.alert(pbf.appInformation().Name, lng2.lngFindLocation )
                            }
                            
                          // The user has not accepted to enable the location services or something went wrong during the process
                          // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                          // codes : 
                          //  - ERR00 : The user has clicked on Cancel button in the popup
                          //  - ERR01 : If the Settings change are unavailable
                          //  - ERR02 : If the popup has failed to open
                        });
                    }else{

                        if(!posiErro){
                            posiErro=true
                            let lng2 = await lng.positionLang()
                            Alert.alert(pbf.appInformation().Name, lng2.lngFindLocation )
                        }
                    }
                    
                    let getPosInt = setInterval( async ()=>{
                        this.getCurrentPositionWithError()
                        if ( tempCntPos > 5 ){
                            clearInterval(getPosInt)
                        }
                    },2000)

                }
                ,{ enableHighAccuracy : false , timeout : 20000 , maximumAge : 1000 , distanceFilter: 2 })  
            
                
        }catch(error){
            console.log('getCurrentPosition:',error)
        }

    },  

    getCurrentPositionWithError() {
        let poInfo = {}
        try{

            navigator.geolocation.getCurrentPosition(     
                           
                position => 
                {
                    poInfo.latitude= position.coords.latitude,
                    poInfo.longitude= position.coords.longitude
                    setPositionForUser.setPositionForUser(poInfo)
                    tempLatitude = position.coords.latitude
                    if(tempLatitude>0)
                         tempCntPos += 1
                    else
                         tempCntPos = 0
                }
                ,async error => 
                {
                    console.log(error)
                }
                ,{ enableHighAccuracy : false , timeout : 20000 , maximumAge : 1000   }
            )  
            
                
        }catch(error){
            console.log('getCurrentPosition:',error)
        }

    },  


    calculateDistance(lat1,lon1,lat2,lon2){
        try{
            
            unit='K'  
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            
            return Math.round(dist)

        }catch(error){
            console.log('calculateDistance:',error)
        }

    },

    getNewDistance(latitude,longitude){
        try{
            
            // latitude= 56.868452 
            // longitude= 14.819463

            let newPosition = {}

            let earth = 6378.137,  //radius of the earth in kilometer
            pi = Math.PI,
            m = (1 / ((2 * pi / 360) * earth)) / 2000;  //1 meter in degree
            cos = Math.cos

            let distance = 500

            newPosition.latitude1 = latitude + (distance * m);
            newPosition.longitude1 = longitude + (distance * m) / cos(latitude * (pi / 180));

            newPosition.latitude2 = latitude + (distance * m);
            newPosition.longitude2 = longitude - (distance * m) / cos(latitude * (pi / 180));

            newPosition.latitude3 = latitude - (distance * m);
            newPosition.longitude3 = longitude - (distance * m) / cos(latitude * (pi / 180));

            newPosition.latitude4 = latitude - (distance * m);
            newPosition.longitude4 = longitude + (distance * m) / cos(latitude * (pi / 180));


            console.log(latitude,longitude,newPosition)
            return newPosition

        }catch(error){
            console.log('getNewDistance:',error)
        }

    }
}