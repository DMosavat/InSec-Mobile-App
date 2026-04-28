import React from 'react';
import { Container ,
         View ,
         Input,
         Item,
         Icon,
         Header ,
         Left ,
         Right ,
         Text ,
         Body,
         Title ,
         Spinner,
         Button ,
         Content ,
         Form } from 'native-base';
import { Platform, Alert, TouchableOpacity } from 'react-native';
import  firebase from 'react-native-firebase'
import CountryPicker from 'react-native-country-picker-modal';

import { form, LoginByPhone as lbPhone } from '../assets/styles';
import pbf from './../module/PublicFunction';
import lng from './../module/Language';
import LoginFG from './../model/LoginFG';


export default class LoginByPhone extends React.PureComponent {
    constructor(props){
        super(props)

        this.state = {
            language: {
                lngInsertValidMSG: '',
                lngSendAfter20MSG: '',
                lngPhoneNumber: '',
                lngWaitForActiv: '',
                lngActicekey: '',
                lngLoginButton: '',
                lngActiveKeyErro: '',
                lngVerificationError: ''
            },
            confirmResult:'',
            mobilNum : '',
            areaCode: '+46',
            authkey : '',
            showSpinner: false,
            countryCode: 'SE',

        };
  
        this.sendVerfiCode = this.sendVerfiCode.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
            
    }
    //----------------------------------------------------------
  
    onSelect = (country) =>{
        console.log(country)

        let areaCode =JSON.stringify(country.callingCode[0], null, 2)
        if ( areaCode ) {
            areaCode = areaCode.replace(/"/g, "")
            areaCode = "+" + areaCode
        }

        this.setState({
            areaCode,
            countryCode: country.cca2
        })

    }
    

    //----------------------------------------------------------
    componentWillMount(){
        this.getLanguage()
        
        firebase.auth().onAuthStateChanged((user) =>{
            try{
                if(user)
                    LoginFG.loginToApp( this.props.navigation, user)
                else
                    this.setState({ showSpinner: false })
                
            }catch(err){
                this.setState({ showSpinner: false })
                console.log(err)
            }
            
        })
  
    }
    //----------------------------------------------------------
  
    //----------------------------------------------------------
    setLanguageType = (lngType) => () =>{
        lng.setLngType(lngType)
        this.props.navigation.replace('splash')
    }
  
    async getLanguage () {
        let lngValues= await lng.loginByPhone()
        this.setState({
            language: {
                lngInsertValidMSG: lngValues.lngInsertValidMSG,
                lngSendAfter20MSG: lngValues.lngSendAfter20MSG,
                lngPhoneNumber: lngValues.lngPhoneNumber,
                lngWaitForActiv: lngValues.lngWaitForActiv,
                lngActicekey: lngValues.lngActicekey,
                lngLoginButton: lngValues.lngLoginButton,
                lngActiveKeyErro: lngValues.lngActiveKeyErro,
                lngVerificationError: lngValues.lngVerificationError
            }
        })
    }
    //----------------------------------------------------------
  
    async sendVerfiCode() {
        try{
  
            // this.setState({ showSpinner: !this.state.showSpinner })
            // return 

          let  {mobilNum, areaCode }  =  this.state;

          if (mobilNum.length < 9 ||  areaCode.length <2 ) {
                Alert.alert(pbf.appInformation().Name, this.state.language.lngInsertValidMSG )
                return 
          } else {
            mobilNum = areaCode.toString() + mobilNum.toString()
    

            firebase
              .auth()
              .signInWithPhoneNumber(mobilNum)
              .then(confirmResult =>{
                this.setState({  showSpinner: true })                    
  
                setTimeout( () =>{
                    this.setState({  showSpinner: false})                    
                },60000)
  

                // Alert.alert(pbf.appInformation().Name, this.state.language.lngSendAfter20MSG )
                 this.setState({ confirmResult })
              })
              .catch(err =>{
                console.log(err.message)
  
                Alert.alert(pbf.appInformation().Name, this.state.language.lngVerificationError)
  
              }
                //Alert.alert(pbf.appInformation().Name)
              );
          }
        }catch(err){
            console.log('sendVerfiCode:',err)
        }
      
  
    }
      
    handleValidation(e) {
        try{
            e.preventDefault();
            
            const { confirmResult, authkey } = this.state;

            confirmResult.confirm(authkey)
            .then(()=>{

                let user = firebase.auth().currentUser 
                let  {mobilNum, areaCode }  =  this.state;
                mobilNum = areaCode.toString() + mobilNum.toString()
                
                LoginFG.loginToApp(this.props.navigation , user )

            })
            .catch(error =>
                Alert.alert(pbf.appInformation().Name, this.state.language.lngActiveKeyErro)
            )
          
        }catch(err){
            console.log('handleValidation:',err)

        }
      

    }
    
    handlePNumChange(mobilNum){
        this.setState({ mobilNum: mobilNum.replace(/[^0-9]/g, '') });
    }
    handleKeyChange(authkey){
        this.setState({ authkey: authkey.replace(/[^0-9]/g, '') });
    }
    handleAreaCode(areaCode){
        this.setState({ areaCode });
    }

    render() {
        return (
            
            <Container  style={ form.formContainer} >
                <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                     <Left style={{flex:1}}>
                        <TouchableOpacity 
                            disabled= { this.state.showSpinner }
                            onPress={ ()=> this.props.navigation.replace('auth') }>
                            <Icon name='md-arrow-round-back' style={ form.headerLeftIcon}/>
                        </TouchableOpacity>
                    </Left>      
                    <Body style={{flex:1}}>
                        <Title  style={form.formTitle}>
                            { pbf.appInformation().Name }
                        </Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                    
                <Content>

                    <Form style={form.StyleForm}>


                        <Text style={ lbPhone.topText }>{ this.state.language.lngPhoneNumber}</Text>
                        <View style={ lbPhone.mainView } >

                                <View style={ lbPhone.areaInput }>
                                    <Item>
                                        <View style={{ marginTop:10,flexDirection:'row'}}>
                                        <CountryPicker
                                            countryCode={ this.state.countryCode }
                                            withFilter = { true }
                                            withFlag = { true }
                                           // withCountryNameButton = { true }
                                            withAlphaFilter = { true }
                                            withCallingCode = { true }
                                            withEmoji = { true }
                                            visible ={ false }
                                            onSelect = { this.onSelect }
                                        />
                                        <Text style={ lbPhone.inputStyleAreaCode }
                                        >({this.state.areaCode})</Text>
                                        </View>
                                    </Item>
                                {/* </View>
                                    
                                <View style={ lbPhone.numberInput }> */}
                                     <Text>-</Text>

                                    <Item style={ lbPhone.numberInput }>
                                    <Input style={ lbPhone.inputStyle }
                                        placeholderTextColor = '#F2F2F2'
                                        placeholder="-- -- ---"
                                        keyboardType = 'numeric'
                                        onChangeText = {this.handlePNumChange.bind(this)}
                                        name="mobilNum"
                                        value = {`${this.state.mobilNum}`}
                                        maxLength = {11}
                                    />
                                    </Item>
                                </View>

                                {
                                    this.state.showSpinner ?
                                    <Spinner style={ lbPhone.showSpinner }/>
                                    :
                                    <TouchableOpacity 
                                        onPress={ this.sendVerfiCode }>
                                        <Icon style={ lbPhone.acceptButton}  name='md-checkmark' /> 
                                     </TouchableOpacity>
                                }
                        </View>


                        <Text style={ lbPhone.waitText }>{ this.state.language.lngWaitForActiv }</Text>

                        {
                            this.state.showSpinner?

                            <View style={lbPhone.mainView} >
                                <View style={ lbPhone.authkeyInput} >
                                    <Item>
                                    <Input style={ lbPhone.inputStyle }
                                        disabled={!this.state.confirmResult}
                                        placeholder={ this.state.language.lngActicekey }
                                        keyboardType = 'numeric'
                                        name="authkey"
                                        onChangeText = {this.handleKeyChange.bind(this)}
                                        value = {`${this.state.authkey}`}
                                        maxLength = {12}
                                    />
                                    </Item>
                                </View>
                                <Button  transparent  
                                        style={{ marginTop: 20}}
                                        disabled={!this.state.confirmResult}
                                        onPress={ this.handleValidation }>
                                        <Text style={{ fontSize:18, color:'#045FB4' }} >{ this.state.language.lngLoginButton }</Text>
                                </Button>
                            </View>
                            :null
                        }
                    </Form>
                 
                    
                </Content> 

            </Container>
            
        )
    }


}

