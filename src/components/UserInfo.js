import React from 'react';
import { Container,
         Header,
         Left,
         Right,
         Label,
         Body,
         Title,
         Content,
         View,
         Form,
         Icon,
         Spinner,
         Item,
         Input } from 'native-base';
import {  TouchableOpacity ,Platform, Alert, Clipboard, BackHandler } from 'react-native';
import firebase from 'react-native-firebase'
//--------------------------------------------------------->

//--------------------------------------------------------->
import { form, UserInfo as UI } from '../assets/styles';
import UserInfoM from '../model/UserInfo';
import RegisterM from '../model/Register';
import pbf from './../module/PublicFunction';
import TTSpeech  from './../module/TextToSpeech'
import lng from './../module/Language';
import ShareApp from './../module/ShareApp';
import TooltipM from './../module/Tooltip'
//--------------------------------------------------------->

const helpIconColor = '#FF8000'

export default class UserInfo extends React.PureComponent {
    constructor(props){
        super(props)
        this.state= {
            pNumber:'',
            uName:'',
            tNumber:'0',
            saveDateTemp:'',
            eMail:'',
            eMailValid : false,
            clValue : '',
            privateKey: '',
            showSpinner: false,
            lockPhoneNum: false,
            lockEmail: false,
            fillValue: false,
            openShare: false,
            //-------------------------------tooltip visible
            helpBackground: '',
            tooltiplngBackClick :false,
            tooltiplngAcceptClick :false,
            tooltiplngKeyClick :false,
            tooltiplngShareKey: false,
            tooltiplngCopyClick :false,
            tooltiplngPrivateCode: false,
            //--------------------------------
            language: {
                lngChangePrCode: '',
                lngFillInfo: '',
                lngUserProfile: '',
                lngPerNum: '',
                lngUserName: '',
                lngUserTel: '',
                lngUserEmail: '',
                lngPriCode: ''
            }
        }

        this.saveUserInfo = this.saveUserInfo.bind(this)
        this.backToHomePage = this.backToHomePage.bind(this)
        this.setInClipboard = this.setInClipboard.bind(this)
        this.makeRandNum = this.makeRandNum.bind(this)
        this.openShareApp = this.openShareApp.bind(this)

    }
     //------------------------------------------------------------------
     setToolTipVisible = () =>{
        this.setState({ 
            tooltiplngBackClick :false,
            tooltiplngAcceptClick :false,
            tooltiplngKeyClick :false,
            tooltiplngShareKey: false,
            tooltiplngCopyClick :false,
            tooltiplngPrivateCode: false,
        })
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    setHelpButtonBackColor = () =>{
        this.state.helpBackground !== helpIconColor?
        this.setState({ helpBackground: helpIconColor, asissToolTipVisible:true })
        :this.setState({ helpBackground: '' })
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
      openShareApp(){
        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltiplngShareKey: true })                                             
            return;
        }

        this.setState({ openShare: true })
    }
    //------------------------------------------------------------------

     //-------------------------------------------Start set Language
     async getLanguage () {
        let lngValues= await lng.userInfoLang()
        this.setState({
            language: {
                lngChangePrCode: lngValues.lngChangePrCode,
                lngFillInfo: lngValues.lngFillInfo,
                lngUserProfile: lngValues.lngUserProfile,
                lngPerNum: lngValues.lngPerNum,
                lngUserName: lngValues.lngUserName,
                lngUserTel: lngValues.lngUserTel,
                lngUserEmail: lngValues.lngUserEmail,
                lngPriCode: lngValues.lngPriCode
            }
        })
    }
    //-------------------------------------------End Language


    async makeRandNum(){

        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltiplngKeyClick: true })                                             
            return;
        }

        if ( this.state.privateKey ){
            Alert.alert(
                pbf.appInformation().Name, this.state.language.lngChangePrCode ,
                [
                  {text: 'Cancel', onPress: () => { return }  , style: 'cancel'},
                  {text: 'OK', onPress: () => { 
                    this.setState({ showSpinner: true })
                    UserInfoM.makeRandomNumber()
                   .then((privateKey)=>{
                      this.setState({ privateKey, showSpinner: false })
                   })
        
                  }, style: 'ok'}
                ],
                { cancelable: false }
            )

        }else{
            this.setState({ showSpinner: true })
            UserInfoM.makeRandomNumber()
           .then((privateKey)=>{
              this.setState({ privateKey, showSpinner: false })
              UserInfoM.savePrivateNumber(privateKey)
           })
        }

    }

    setInClipboard(){
        try{
            if( this.state.helpBackground === helpIconColor){
                this.setState({ tooltiplngCopyClick: true })                                             
                return;
            }

            let pKey = this.state.privateKey
            Clipboard.setString( pKey.toString() );
    
        }catch(err){
            console.log('setInClipboard:',err)
        }
    }

    //------------------------------------------------------------------
    handleBackButtonClick = () => {
        this.backToHomePage()
        return true;
    }
    //------------------------------------------------------------------
    
    componentWillUnmount(){
        TTSpeech.stopTalk()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  
    }
    
    async componentWillMount(){
        
        TTSpeech.startTalk(2)

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );

        this.getLanguage()

        await this.getUserInfo();
    }


    async getUserInfo(){

        try{
            await UserInfoM.getUserInfo()
            .then((data)=>{

                this.setState({
                    pNumber : data.pNumber,
                    saveDateTemp: data.saveDate,
                    uName : data.uName,
                    tNumber : data.tNumber,
                    eMail : data.eMail,
                    privateKey: data.privateKey
                });
    
                if ( !this.state.privateKey ||  this.state.privateKey==='' )
                this.makeRandNum();
    
    
                let eMailValid = pbf.validateEmail(data.eMail)
                this.setState( { eMailValid } )
    
    
                let { email, phoneNumber } = firebase.auth().currentUser
    
                if (email)
                this.setState({ lockEmail: true, eMail: email });
    
                if (phoneNumber)
                this.setState({ lockPhoneNum: true, tNumber: phoneNumber });
    
            })
        }catch(err){
            console.log('getUserInfo:', err)
        }
          
    }

    getPrivateCodeHelp = () => {
        if( this.state.helpBackground === helpIconColor)
            this.setState({tooltiplngPrivateCode:true})                                          
    }

    async saveUserInfo(){
        try{
            if( this.state.helpBackground === helpIconColor){
                this.setState({ tooltiplngAcceptClick: true })                                             
                return;
            }

            let udata = this.state

            if(  this.state.tNumber.length>=10 && this.state.uName.length>=3 )
            {
                await UserInfoM.saveUserInfo(
                    udata.pNumber,
                    udata.uName,
                    udata.tNumber,
                    udata.eMail,
                    udata.privateKey)
               
                    pbf.setAsyncStorageData('sendLarmStatus','false')
                    this.props.navigation.replace('home')
            }else{
              this.setState({ fillValue: true })
              Alert.alert(pbf.appInformation().Name, this.state.language.lngFillInfo )
            }
        }catch(err){
            console.log('saveUserInfo',err)
        }
       
    }

   async  backToHomePage(){
       try{
            if( this.state.helpBackground === helpIconColor){
                this.setState({ tooltiplngBackClick: true })                                             
                return;
            }
            
            if( this.state.tNumber.length>=10 && this.state.uName.length>=3 )
            {
            this.props.navigation.replace('home')
            }else{
    
                await UserInfoM.getUserInfo()
                .then((data)=>{
                    if( data.uName && data.tNumber){
                        this.props.navigation.replace('home')
    
                    }else{
                        this.setState({ fillValue: true })
                        Alert.alert(pbf.appInformation().Name, this.state.language.lngFillInfo )
    
                    }
                })
            }
       }catch(err){
            console.log('backToHomePage:',err)
       }    
       
    }

    render() {

        if(!this.state.saveDateTemp)
            return (<Container style={ form.formContainer}><Label style={{ marginTop:50, marginLeft:20, color:'white'}}>Loading...</Label></Container>)

        return (
            <Container style={ form.formContainer}>
                    <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                        <Left style={{flex:1}}>
                            <TooltipM toolTipVisible={this.state.tooltiplngBackClick } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngBackClick'}>
                                <TouchableOpacity onPress={ this.backToHomePage }>
                                  <Icon name='md-arrow-round-back' style={ form.headerLeftIcon}/>
                                </TouchableOpacity>
                            </TooltipM>
                        </Left>                        
                        <Body style={{flex:1}}>
                            <Title  style={form.formTitle}>
                                { UserInfoM.getAppName() }
                            </Title>
                        </Body>
                        <Right style={{flex:1}}>
                            <TouchableOpacity 
                                onPressOut={ this.setHelpButtonBackColor }
                                >
                                <Icon name='md-help-circle' 
                                    style={this.state.helpBackground === helpIconColor?
                                     { fontSize:36 ,color : this.state.helpBackground, marginRight:10 }
                                    : UI.helpIcon}  
                                />
                            </TouchableOpacity>
                            
                            <TooltipM toolTipVisible={this.state.tooltiplngAcceptClick } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngAcceptClick'}>
                                <TouchableOpacity 
                                    onPress={ this.saveUserInfo }>
                                <Icon name='md-checkmark' style={ form.headerRightIcon}/>
                                </TouchableOpacity>
                            </TooltipM>
                        </Right>  
                    </Header>

                 <Content>

                    <Form style={form.StyleForm}>
                        <Label style={UI.topTitleStyle}>{ this.state.language.lngUserProfile }</Label>

                        {/* <Item style={form.item}>
                            <Input 
                                keyboardType = 'numeric'
                                placeholder = { this.state.language.lngPerNum }
                                onChangeText = {(text)=> this.onChangePNummer(text)}
                                value = {`${this.state.pNumber}`}
                                 autoFocus = {true}
                                style={form.inputNum}
                                maxLength = {12}
                            />
                        </Item> */}
                        <Item style={form.item}  >
                            <Input
                                maxLength = {50}
                                placeholder={ this.state.language.lngUserName }
                                style={ this.state.fillValue && !this.state.uName? form.inputEmpty: form.input }
                                onChangeText = {(text)=> this.onChangeUName(text)}
                                value = {this.state.uName}
                            />
                        {
                            this.state.uName.length>=3 ?
                                <Icon name='md-checkmark-circle' style={ form.validateTrue } />
                            :
                                <Icon name='md-close-circle' style={ form.validateFalse }/>
                        } 
                        </Item>
                        <Item  style={form.item}>
                            <Input 
                                disabled= { this.state.lockPhoneNum }
                                keyboardType = 'numeric'
                                onChangeText = {(text)=> this.onChangeTNummer(text)}
                                value = {`${this.state.tNumber}`}
                                style={this.state.fillValue && !this.state.tNumber ? form.inputEmpty: form.input }
                                maxLength = {13}
                                placeholder= { this.state.language.lngUserTel }
                            />
                        {
                            this.state.tNumber.length>=10 ?
                                <Icon name='md-checkmark-circle' style={ form.validateTrue } />
                            :
                                <Icon name='md-close-circle' style={ form.validateFalse }/>
                        }
                        </Item>
                        <Item style={form.item}  >
                            <Input
                                disabled= { this.state.lockEmail }
                                maxLength = {60}
                                placeholder={ this.state.language.lngUserEmail }
                                style={form.input}
                                onChangeText = {(text)=> this.onChangeEmail(text)}
                                value = {this.state.eMail}
                            />
                        {
                            this.state.eMailValid ?
                                <Icon name='md-checkmark-circle' style={ form.validateTrue } />
                            :this.state.eMail !=''?
                                <Icon name='md-close-circle' style={ form.validateFalse }/>
                            :null
                        } 
                        </Item>
                       
                    </Form> 

                        <View style={ UI.userCode } >
                            <View style={ UI.privateCodeStyle }> 
                                <View style= {{ flexDirection: 'row'}} >
                                   <Label style={ UI.privateCode }>{ this.state.language.lngPriCode }</Label>
                                    {
                                        this.state.helpBackground === helpIconColor?
                                        <TooltipM toolTipVisible={this.state.tooltiplngPrivateCode } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngPrivateCode'}>
                                            <Icon name='md-help-circle' 
                                            onPress={ this.getPrivateCodeHelp }
                                            style={ UI.helpIcone}/>
                                        </TooltipM>
                                        :null
                                    }
                                </View>
                            </View>
                            
                            <View style={ UI.labelCodeStyle }>
                            {
                                this.state.showSpinner ?
                                <Spinner color='red'/>
                                :
                                <Label style={ UI.labelCode } >{this.state.privateKey}</Label>

                            }
                            </View>
                            <View style={ UI.iconCode }>
                                <Left style={{flex:1}}> 
                                    <TooltipM toolTipVisible={this.state.tooltiplngKeyClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngKeyClick'}>
                                        <TouchableOpacity 
                                            onPress={ this.makeRandNum }>
                                            <Icon name='md-refresh-circle'  style={ UI.iconStyle }/>
                                        </TouchableOpacity>
                                    </TooltipM>
                                </Left>
                                
                                <Item  style={{ margin:10,  borderColor: 'transparent'}}>
                                    <View style={{ flexDirection:'row' }}>

                                        <TooltipM toolTipVisible={this.state.tooltiplngShareKey } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngShareKey'}>
                                            <TouchableOpacity //disabled={ this.state.touchDisable } touchDisable: true })}>
                                                onPress={ this.openShareApp }>
                                                <Icon name='md-share' style={ UI.iconStyle1 } />
                                            </TouchableOpacity> 
                                        </TooltipM>
            
                                        <TooltipM toolTipVisible={this.state.tooltiplngCopyClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngCopyClick'}>
                                            <TouchableOpacity 
                                                onPress={ this.setInClipboard }>
                                                <Icon name='md-copy'  style={ UI.iconStyle1 }/>
                                            </TouchableOpacity>
                                        </TooltipM>

                                    </View>
                                </Item>
                            </View>
                        </View> 

                        
                        <Label style={{ marginTop:300}} />
                       

                </Content>

                {
                    this.state.openShare?
                    <ShareApp privateKey={ this.state.privateKey } 
                              shareVisible={ this.state.openShare } 
                              visibleFalse={()=>this.setState({ openShare: false })}/> //touchDisable: false })}/>
                    :null
                }
            </Container>
        )
    }

    onChangePNummer(text) {
        if (text === '')
        this.setState({ pNumber : '' });

       let tempT = RegisterM.checkUserPersonNumber(this.state.pNumber , text)
       if ( tempT != '' ){
           text = tempT
           this.setState({
               pNumber : text.replace(/[^0-9]/g, '')
           });
       }
    }

    onChangeTNummer(text) {
        // if (text.length <= 2)
        // if ( text.substring(0,2) != '07' ) text = '07'

        this.setState({
            tNumber : text.replace(/[^0-9]/g, '')
        });
    }
    
    onChangeUName(text) {
        this.setState({
            uName : text
        });
    }
    
    onChangeEmail(text) {
        let eMailValid = pbf.validateEmail(text)
        this.setState( { eMailValid } )

        this.setState({
            eMail: text
         });
    }
}