
export default {

  alarmRecognize(value, alarmText){

    return new Promise(async resolve => {
      try{

          value.map((result) => {
            
            if (result){
              result = result.toLowerCase()
           
              let search = ''
              if(alarmText){
                search = result.search(alarmText)
                if ( search >= 0 ) { resolve(true); return}
              }
              if(alarmText){
                search = result.search(alarmText.toLowerCase())
                if ( search >= 0 ) { resolve(true); return}
              }

              search = result.search('sos')
              if ( search >= 0 ) { resolve(true); return}

              search = result.search('s o s')
              if ( search >= 0 ) { resolve(true); return}

              search = result.search('s os')
              if ( search >= 0 ) { resolve(true); return}

              search = result.search('so s')
              if ( search >= 0 ) { resolve(true); return}


              // search = result.search('alarm')
              // if ( search >= 0 ) resolve(true)

              // search = result.search('larm')
              // if ( search >= 0 ) resolve(true)

              // search = result.search('alar')
              // if ( search >= 0 ) resolve(true)

              // search = result.search('help')
              // if ( search >= 0 ) resolve(true)

              // search = result.search('elp')
              // if ( search >= 0 ) resolve(true)

              // search = result.search('yelp')
              // if ( search >= 0 ) resolve(true)
            }
              
          })
          resolve(false)

      }catch(error){
          console.log('alarmRecognize:',error)
      }
    })
  },

  alarmTypeRecognize(value){

    return new Promise(async resolve => {
      value.map((result) => {
        if (result === 'one') resolve(1)
        if (result === 'two') resolve(2)
        if (result === 'three') resolve(3)
        if (result === 'four') resolve(4)        
      })
      resolve(0)
    })
  },

  alarmVoiceSync(value){

    return new Promise(async resolve => {
      try{

          value.map((result) => {
              result = result.toLowerCase()
              
              let search = result.search('alarm')
              if ( search >= 0 ) resolve(true)

          })
          resolve(false)

       }catch(error){
          console.log('alarmVoiceSync:',error)
          resolve(false)
       }  
    })
  },

  helpVoiceSync(value){

    return new Promise(async resolve => {
        try{
            value.map((result) => {
                result = result.toLowerCase()
                
                let search = result.search('help')
                if ( search >= 0 ) resolve(true)

            })
            resolve(false)

        }catch(error){
          console.log('alarmVoiceSync:',error)
          resolve(false)
        }  
    })
  },

}

