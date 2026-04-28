import { PermissionsAndroid, Platform } from 'react-native'

 
export default {

    startLocationPermission(){

        return new Promise(async (resolve) => {
            if (Platform.OS === 'ios') {
                resolve(true);
                return;
            }

            try{
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{})
                if (granted != PermissionsAndroid.RESULTS.GRANTED) 
                    resolve(false)
                else    
                    resolve(true)

            }catch(err){
                console.log('startLocationPermission:',err)
            }
        })
        
    },

    startRAudioPermission(){

        return new Promise((resolve) => {
            if (Platform.OS === 'ios') {
                resolve(true);
                return;
            }

            try{
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                ).then((result) => {
                    if (result == PermissionsAndroid.RESULTS.GRANTED || result == true)
                        resolve(true);
                    else
                        resolve(false)
                })
            }catch(err){
                console.log('startLocationPermission:',err)
            }
        });
    },

    startReadWritePermission(){

        return new Promise((resolve) => {
            
            if (Platform.OS === 'ios') {
                resolve(true);
                return;
            }

            try{
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                ).then((result) => {
                    if (result == PermissionsAndroid.RESULTS.GRANTED || result == true)
                        resolve(true);
                    else
                        resolve(false)
                })
            }catch(err){
                console.log('startLocationPermission:',err)
            }

            try{
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                ).then((result) => {
                    if (result == PermissionsAndroid.RESULTS.GRANTED || result == true)
                        resolve(true);
                    else
                        resolve(false)
                })
            }catch(err){
                console.log('startLocationPermission:',err)
            }
        });
    }
}