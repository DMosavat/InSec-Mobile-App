import React from 'react';
import { 
         Text,
         View,
         Icon,
         Spinner,
         Input } from 'native-base';
import {  TouchableOpacity ,FlatList, Dimensions, Platform , Keyboard } from 'react-native';
import firebase from 'react-native-firebase'
import CryptoJS from 'crypto-js'
import Voice from 'react-native-voice';
import VolumeControl from  "react-native-volume-control";

//--------------------------------------------------------->

//--------------------------------------------------------->
import pbf from './PublicFunction';
import edData from './../module/EncryptDecryptData';
import lng from './../module/Language'
//--------------------------------------------------------->

let pWidth = Dimensions.get('window').width
let pHight = Dimensions.get('window').height

if (Platform.OS==='android'){
    pHight += 10
}

let enKey = 'jhdahjkafdfjdk 3432432423 ^&^&^&^&* fdsfs 2323@ewrew 43254$%$#%#$%#$  fgfdgdfg #$#$#$ #@() df'

export default class MakeChat extends React.PureComponent {
    constructor(props){
        super(props)
        this.state= {
            chatData:[],
            chatPath:'',
            userID :'',
            userName: '',
            message: '',
            pageHight: 0,
            results: [],
            lngType :''
        }
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        // Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        // Voice.onSpeechEnd = this.onSpeechEnd;
    }

    //------------------------------------------------ Start Voice package
    // onSpeechStart = e => {
    //     // eslint-disable-next-line
    //     console.log('onSpeechStart: ', e);

    //   };
    
      onSpeechRecognized = e => {
        // eslint-disable-next-line
        let tempM = this.state.results.join()
        this.setState( { message: tempM })
        console.log('onSpeechRecognized: ', e, tempM);
      };
    
    //   onSpeechEnd = e => {
    //     // eslint-disable-next-line
    //     console.log('onSpeechEnd: ', e);
    //   };

      onSpeechError = async e => {
        console.log('onSpeechError:',e)

        await Voice.destroy().then(Voice.removeAllListeners);  
        this._startRecognizing();

      };
    
      onSpeechResults = e => {
        // eslint-disable-next-line
        this.setState({
          results: e.value,
        });
        console.log('rv',e.value)
        if (Platform.OS==='android'){
            let tempM = this.state.results[0]
            this.setState( { message: tempM })
        }
      };
    

      _startRecognizing = async () => {
        this.setState({
          results: []
        });

        if (Platform.OS ==='android') 
        {    
            VolumeControl.change(0);
        }

        try {
            if( this.state.lngType === 'en'){
                await Voice.start('en-US');
           }else if( this.state.lngType === 'sv'){
                await Voice.start('sv-SE');
            }else if( this.state.lngType === 'es'){
                await Voice.start('es_ES');
            }

        } catch (e) {
          //eslint-disable-next-line
          console.error('_startRecognizing:',e);
        }
      };

      _stopRecognizing = async () => {
        try {
          await Voice.stop();
          console.log('stop')
        } catch (e) {
          //eslint-disable-next-line
          console.error('_stopRecognizing:',e);
        }
      };
    //---------------------------------------- End Voice Package 


    async componentWillMount () {

        let lngType = await lng.getLngType()
        this.setState({ lngType })

        this.setState({ pageHight: pHight })
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

        await MakePermissionsAndroid.startRAudioPermission();

    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
        Voice.destroy().then(Voice.removeAllListeners);
    }

    keyboardDidShow (e) {
       this.setState({ pageHight: pHight - e.endCoordinates.height, message:' '  })
    }
    
    keyboardDidHide (e) {
        this.setState({ pageHight: pHight })
    }  
    
    componentDidMount(){
        this.startChat()
    }

    startChat(){
        try{

            let ref =  firebase.database().ref()
            
            ref.child('usersInfo/' + this.props.userAlarmID + '/alarm')
            .once('value', data => {
                if (data.hasChild('userLogPath')){
                    
                    this.setState({
                        chatPath: data.val().userLogPath + '/chat',
                        userID: firebase.auth().currentUser.uid
                    })

                    this.getUserName(this.state.userID)
                    
                    let cuDate = ''
                    let duName = ''
                    let uName = ''
                    let dmessage = ''
                    let message = ''
                    let getIndex= 0

                    ref.child(data.val().userLogPath + '/chat').orderByKey().limitToLast(500)
                    .on('value', (chatData)=>{
                       
                        chatData.forEach((item)=>{

                            getIndex =  this.state.chatData.findIndex((ite) =>{
                                return (ite.key === item.key)
                            })

                            if (getIndex === -1 ){
                                cuDate = new Date(item.val().msgDate)

                                duName = CryptoJS.AES.decrypt(item.val().uName ,enKey)
                                uName = duName.toString(CryptoJS.enc.Utf8);
                                
                                dmessage = CryptoJS.AES.decrypt(item.val().message ,enKey)
                                message = dmessage.toString(CryptoJS.enc.Utf8);

                                this.setState({
                                    chatData: [
                                        ...this.state.chatData,
                                        {
                                            key: item.key,
                                            uid: item.val().userID,
                                            uName ,
                                            message,
                                            msgDate: cuDate.toLocaleDateString() + '-' + cuDate.toLocaleTimeString()
                                        }
                                    ]
                                })

                            }
                          
                        })
                       
                    })

                }else{
                    this.props.navigation.goBack()
                }

            })
            .catch((err) => {
                console.log('startChat1:',err)
            })

        }catch(err){
            console.log('startChat:',err)
        }
    }

    getUserName(uid){
        try{
            let ref =  firebase.database().ref()
            ref.child('usersInfo/' + uid + '/userRegister')
            .once('value',async  data => {
                if (data.hasChild('uName')){
                    let userName = await edData.decryptData(data.val().uName)
                    this.setState({ userName })

                }
            }).catch((err) => {
                console.log('getUserName1:',err)
            })

        }catch(err){
            console.log('getUserName:',err)
        }
      
    }

    insertChatDate = async () => {
        try{

            if (!this.state.message || !this.state.userID)
            return;

            let ref =  firebase.database().ref(this.state.chatPath)
            let key = ref.push().key
            ref.child(key).update({
                userID: this.state.userID,
                uName: CryptoJS.AES.encrypt(this.state.userName ,enKey).toString(),
                message: CryptoJS.AES.encrypt(this.state.message,enKey).toString(),
                msgDate: pbf.getCorrectDateForChat(),

            }).then(()=>{
                this.setState({
                    message : ''
                });
            })
            .catch((err)=>{
                console.log('insertChatDate1:',err)
            })
            

        }catch(err){
            console.log('insertChatDate:',err)
        }
    }

    renderItem = ({item}) => {

        try{
            let startLeft = true
            let uColor= '#FE4343'
            if(this.props.userAlarmID !== item.uid ){
                startLeft= false
                uColor= '#64F293'
            }
    
            return (
                <View style={startLeft?{ alignContent:'flex-end' }:null}>
                    <View style={startLeft?{  alignSelf:'flex-end'}:null}>
                      {
                        startLeft?
                        <View style={{ flexDirection:'row' }}>
                            <Text style={{ color: uColor, fontSize:12, marginRight:5, marginTop:10 }}>{item.msgDate }</Text>
                            <Text style={{ color: uColor, fontSize:16, marginRight:5, marginTop:5 }}>{item.uName }</Text>
                            <Icon name='md-contact' style={{ color: uColor}} /> 
                        </View>:
                        <View style={{ flexDirection:'row' }}>
                            <Icon name='md-contact' style={{ color: uColor}} /> 
                            <Text style={{ color: uColor, fontSize:16, marginLeft:5, marginTop:5 }}>{item.uName }</Text>
                            <Text style={{ color: uColor, fontSize:12, marginLeft:5, marginTop:10 }}>{item.msgDate }</Text>
                        </View>
                      }
                    </View>
                    <View style={startLeft?{ alignSelf:'flex-end'}:null}>
                      {
                        startLeft?
                        <Text style={{ color:'white', fontSize:20, marginLeft:50, marginBottom:15, marginTop:-3 }}>{item.message}</Text>
                        :
                        <Text style={{ color:'white', fontSize:20, marginRight:50, marginBottom:15, marginTop:-3 }}>{item.message}</Text>
                      }
                    </View>
                </View>
            )
        }catch(err){
            console.log('renderItem: ',err)
        }
        
    }


    onChangeMSG = (text) => {
        this.setState({
            message : text
        });
    }

    render() {

        return (
            <View >
                <View style={{  width:'100%', height: this.state.pageHight - 120 , marginTop: 120- this.state.pageHight , backgroundColor:'rgba(52,52,52,.6)'}}>

                        <FlatList
                            style={{ margin:20 }}
                            data={this.state.chatData}
                            renderItem={this.renderItem}
                            horizontal={false}
                            keyExtractor={(item) => item.key}
                            ListEmptyComponent={() => <Spinner color='#B40404' /> }
                            ref = "flatList"
                            onContentSizeChange={()=> this.refs.flatList.scrollToEnd(true)}
                            numColumns= {1}
                        />

                </View>
                <View style= {{ flexDirection:'row', backgroundColor:'white', marginBottom: pHight - this.state.pageHight}}>
                    <View >
                        <Input 
                            onChangeText = {(text)=> this.onChangeMSG(text)}
                            value = {this.state.message}
                            autoFocus = {true}
                            style={{ width : pWidth-80 }}
                        />
                    </View>
                    <View style={{ margin:1}}>
                        <TouchableOpacity 
                            onPressIn={ this._startRecognizing }
                            onPressOut={ this._stopRecognizing }>
                            <Icon name='md-mic'  style={ { color:'#EA1757', fontSize:34, padding: 4} }/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity 
                            onPress={ this.insertChatDate }>
                            <Icon name='md-send'  style={ { fontSize:34, padding: 4} }/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


}