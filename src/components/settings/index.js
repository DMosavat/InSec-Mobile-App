import React from 'react';
import { Container,
    Header ,
    Left ,
    View ,
    Icon ,
    Label ,
    Right ,
    Text ,
    Body,
    Title ,
    Button ,
    Content ,
    Form ,
    Item  ,
    Input } from 'native-base';
import { Switch } from 'react-native';
import { TouchableOpacity, Platform, BackHandler } from 'react-native';
import CodePush from 'react-native-code-push';
//--------------------------------------------------------->

//--------------------------------------------------------->
import { form, SettingsForm } from '../../assets/styles';
import SettingsM from '../../model/Settings'
import pbf from './../../module/PublicFunction'
import TTSpeech  from './../../module/TextToSpeech'
import lng from './../../module/Language';
import TooltipM from './../../module/Tooltip'
//--------------------------------------------------------->

const helpIconColor = '#FF8000'

export default class Settings extends React.Component {
    constructor(props){
        super(props)
        this.state={
            togglePolis: true,
            toggleAmbu: true,
            toggleSRecord: true,
            toggleAAlarm: true,
            toggleOpen: true,
            toggleplaysound: true,
            toggleVoice: true,     
            toggleAssistant: true, 
            togglePrivateLocation: true, 
            toggleRecordVoice: false,
            toggleAutoMode: false,
            toggleDarkMode: false,
            firstToggleAutoMode: false,
            firstToggleDarkMode: false,
            toggleShakeAlarm: false,
            alarmText:'',
             //-------------------------------tooltip visible
             helpBackground: '',
             tooltipBackClick : false,
             tooltipPrivateLocationClick: false,
             tooltipPublicClick : false,
             tooltipVoiceClick : false,
             tooltipAssistantClick : false,
             tooltipAccountClick : false,
             tooltipSaveClick : false,
             tooltipPrivateDesc: false,
             tooltipAlarmTextDesc: false,
             tooltipNetWorkDesc: false,
             tooltipVoiceRecord: false,
             tooltipAutoMode: false,
             tooltipDarkMode: false,
             tooltipRateApp: false,
             tooltipShakeDevice: false,
             //-------------------------------
            language: {
                lngPrivateName: '',
                lngPublicCode: '',
                lngAlarmText: '',
                lngPublicAlarm: '',
                lngPrivateLocation: '',
                lngVoiceRec: '',
                lngInsecAssis: '',
                lngDeleteAcc: '',
                lngAppInfo: '',
                lngInsecHelp: '',
                lngInsecVillkor: '',
                lngIntPolicy: '',
                lngCopyRight: '',
                lngAboutUs: '',
                lngContactUs: '',
                lngAppRate:''
            }
            
        }

        this.saveUserSetting = this.saveUserSetting.bind(this)
        this.deleteUserAccount = this.deleteUserAccount.bind(this)
        this.openCompanyWebPage = this.openCompanyWebPage.bind(this)
        this.makeAppRate = this.makeAppRate.bind(this)
        this.backToHomePage = this.backToHomePage.bind(this)
        this.updateStateData = this.updateStateData.bind(this)

    }

    //------------------------------------------------------------------
    setToolTipVisible = () =>{
        this.setState({ 
            tooltipBackClick : false,
            tooltipPrivateLocationClick: false,
            tooltipPublicClick : false,
            tooltipVoiceClick : false,
            tooltipAssistantClick : false,
            tooltipAccountClick : false,
            tooltipSaveClick : false,
            tooltipPrivateDesc: false,
            tooltipAlarmTextDesc: false,
            tooltipNetWorkDesc: false,
            tooltipVoiceRecord: false,
            tooltipAutoMode: false,
            tooltipDarkMode: false,
            tooltipRateApp: false,
            tooltipShakeDevice: false,
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

     //-------------------------------------------Start set Language
     async getLanguage () {
        let lngValues= await lng.settingLang()
        this.setState({
            language: {
                lngPrivateName: lngValues.lngPrivateName,
                lngPublicCode: lngValues.lngPublicCode,
                lngAlarmText: lngValues.lngAlarmText,
                lngPublicAlarm: lngValues.lngPublicAlarm,
                lngPrivateLocation: lngValues.lngPrivateLocation,
                lngVoiceRec: lngValues.lngVoiceRec,
                lngInsecAssis: lngValues.lngInsecAssis,
                lngRecordVoice: lngValues.lngRecordVoice,
                lngShakeAlarm: lngValues.lngShakeAlarm,
                lngDarkMode: lngValues.lngDarkMode,
                lngAutoMode: lngValues.lngAutoMode,
                lngDeleteAcc: lngValues.lngDeleteAcc,
                lngAppInfo: lngValues.lngAppInfo,
                lngInsecHelp: lngValues.lngInsecHelp,
                lngInsecVillkor: lngValues.lngInsecVillkor,
                lngIntPolicy: lngValues.lngIntPolicy,
                lngAboutUs: lngValues.lngAboutUs,
                lngContactUs: lngValues.lngContactUs,
                lngCopyRight: lngValues.lngCopyRight,
                lngAppRate: lngValues.lngRateMsg
            }
        })
    }
    
    makeAppRate(){
        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltipRateApp: true })                                             
            return;
        }

        SettingsM.makeAppRate()
    }


    openCompanyWebPage = (flag) => async () => {
        switch (flag) {
            case 0:
                this.props.navigation.navigate('oWebPage', { webPath: await pbf.openAppWebLink(0) })
                break;
            case 1:
                this.props.navigation.navigate('oWebPage', { webPath: await pbf.openAppWebLink(1) })
                break;
            case 2:
                this.props.navigation.navigate('oWebPage', { webPath: await pbf.openAppWebLink(2) })
                break;
            case 3:
                this.props.navigation.navigate('oWebPage', { webPath: await pbf.openAppWebLink(3) })
                break;
            case 4:
                this.props.navigation.navigate('oWebPage', { webPath: await pbf.openAppWebLink(4) })
                break;

            default:
                break;
        }
    }

    //------------------------------------------------------------------
    handleBackButtonClick = () => {
        this.backToHomePage()
        return true;
    }
    //------------------------------------------------------------------
    
    async componentWillUnmount(){

        TTSpeech.stopTalk()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  

    }

   componentWillMount(){

       TTSpeech.startTalk(3)

       BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );

       this.getLanguage()

       this.getUserSetting();


    }

    backToHomePage() {
        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltipBackClick: true })                                             
            return;
        }
        
        this.props.navigation.replace('home')
    }


    deleteUserAccount(){
        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltipAccountClick: true })                                             
            return;
        }

        SettingsM.deleteUserAccount(this.props.navigation)

    }

    async getUserSetting(){
        
        try{
            await SettingsM.getUserSetting()
            .then((data)=>{
                if(!data.error)
                this.setState({
                    togglePolis : data.togglePolis,
                    toggleAmbu : data.toggleAmbu,
                    toggleSRecord : data.toggleSRecord,
                    toggleAAlarm : data.toggleAAlarm,
                    toggleOpen : data.toggleOpen,
                    toggleplaysound : data.toggleplaysound,
                    toggleVoice: data.toggleVoice,
                    toggleAssistant: data.toggleAssistant,
                    toggleRecordVoice : data.toggleRecordVoice,
                    toggleAutoMode : data.toggleAutoMode,
                    toggleDarkMode : data.toggleDarkMode,
                    firstToggleAutoMode : data.toggleAutoMode,
                    firstToggleDarkMode : data.toggleDarkMode,
                    toggleShakeAlarm: data.toggleShakeAlarm,
                    alarmText : data.alarmText,
                    togglePrivateLocation: data.togglePrivateLocation
                });

            })
        }catch(err){
            console.log('getUserSetting:',err)
        }
      

    }


    async saveUserSetting(){
        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltipSaveClick: true })                                             
            return;
        }

        let uData = this.state
        SettingsM.saveUserSetting(uData)
        .then((value)=>{
            if(value){
                if ( ( this.state.firstToggleAutoMode !== this.state.toggleAutoMode )||
                ( this.state.firstToggleDarkMode !== this.state.toggleDarkMode )) {
                    CodePush.restartApp();
                }else{
                    this.props.navigation.replace('home')
                }
            }
        })

    }


    updateStateData = async ( key, value ) => {

        if( this.state.helpBackground === helpIconColor){

            switch (key) {
                case 'toggleAAlarm': this.setState({ tooltipPublicClick: true }); break;
                case 'togglePrivateLocation': this.setState({ tooltipPrivateLocationClick: true }); break;
                case 'toggleVoice': this.setState({ tooltipVoiceClick: true }); break;
                case 'toggleAssistant': this.setState({ tooltipAssistantClick: true }); break;
                case 'toggleRecordVoice': this.setState({ tooltipVoiceRecord: true }); break;
                case 'toggleAutoMode': this.setState({ tooltipAutoMode: true }); break;
                case 'toggleDarkMode': this.setState({ tooltipDarkMode: true }); break;
                case 'toggleShakeAlarm': this.setState({ tooltipShakeDevice: true }); break;
            
            default:
                break;
            }
            return;
        }

        let fields = this.state;
        fields[key] = value
        this.setState({fields });

    }

    setHelpState = (flag) => () => {
        if ( flag === 0 ){
            this.setState({ tooltipPrivateDesc: true })
        }
        if ( flag === 1 ){
            this.setState({ tooltipNetWorkDesc: true })
        }
        if ( flag === 2 ){
            this.setState({ tooltipAlarmTextDesc: true })
        }
    }

    openPrivateGroup = () => {

        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltipPrivateDesc: true })                                             
            return;
        }

        this.props.navigation.navigate('makePGroup')
    }

    openFindNetwork = () => {

        if( this.state.helpBackground === helpIconColor){
            this.setState({ tooltipNetWorkDesc: true })                                             
            return;
        }

        this.props.navigation.navigate('findNet')
    }

    render() {
        return (
            <Container style={ form.formContainer}>
                    
                <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                    <Left style={{flex:1}}>
                        <TooltipM toolTipVisible={this.state.tooltipBackClick } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngBackClick'}>
                            <TouchableOpacity 
                                onPress={ this.backToHomePage }>
                                <Icon name='md-arrow-round-back' style={ form.headerLeftIcon}/>
                            </TouchableOpacity>
                        </TooltipM>

                    </Left>                        
                    <Body style={{flex:1}}>
                        <Title  style={form.formTitle}>
                            { SettingsM.getAppName() }
                        </Title>
                    </Body>
                    <Right style={{flex:1}}>
                        {/* Help tooltip button */}
                        <TouchableOpacity 
                            onPressOut={ this.setHelpButtonBackColor }
                            >
    
                            <Icon name='md-help-circle' 
                                style={this.state.helpBackground === helpIconColor?
                                    { fontSize:36 ,color : this.state.helpBackground, marginRight:10 }
                                : SettingsForm.helpIcon}  
                            />
                        </TouchableOpacity>

                        <TooltipM toolTipVisible={this.state.tooltipSaveClick } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngSaveClick'}>
                            <TouchableOpacity 
                                onPress={ this.saveUserSetting }>
                                <Icon name='md-checkmark' style={ form.headerRightIcon}/>
                            </TouchableOpacity>
                        </TooltipM>
                    </Right>  
                </Header>


                 <Content>

                    <View style={SettingsForm.formSetting}>

                        <View>
                            <Form  style={{paddingRight:80}}>


                                <TooltipM toolTipVisible={this.state.tooltipPrivateDesc } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngPrivateDesc'}>
                                    <TouchableOpacity 
                                        onPress = { this.openPrivateGroup } 
                                        style= {{ marginTop:20}}>
                                    <View style={ SettingsForm.rowSetting }>
                                        <Icon name='md-help-buoy' style={ SettingsForm.rowIconSetting }/>
                                        <Label style={SettingsForm.rowTextSetting}>{ this.state.language.lngPrivateName }</Label>
                                    </View>
                                    </TouchableOpacity>
                                </TooltipM>
                                
                                <TooltipM toolTipVisible={this.state.tooltipNetWorkDesc } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngPrivateDesc'}>
                                    <TouchableOpacity 
                                        onPress = { this.openFindNetwork } 
                                        style= {{ marginTop:10}}>
                                    <View style={ SettingsForm.rowSetting }>
                                        <Icon name='md-wifi' style={ SettingsForm.rowIconSetting }/>
                                        <Label style={SettingsForm.rowTextSetting}>{ this.state.language.lngPublicCode }</Label>
                                    </View>
                                    </TouchableOpacity>
                                </TooltipM>
                                

                                <View style= {{ flexDirection: 'row'}} >
                                    <Label style={SettingsForm.formLable}>{ this.state.language.lngAlarmText }</Label>
                                    {
                                        this.state.helpBackground === helpIconColor?
                                        <TooltipM toolTipVisible={this.state.tooltipAlarmTextDesc } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngAlarmTextDesc'}>
                                            <Icon name='md-help-circle' 
                                            onPress= { this.setHelpState(2) }
                                            style={ SettingsForm.helpIcon2}/>
                                        </TooltipM>
                                        :null
                                    }
                                </View>
                                <Item  >
                                    <Input  style={SettingsForm.telNummerInput}
                                        placeholder={ this.state.language.lngAlarmText }
                                        onChangeText = { val => this.updateStateData('alarmText', val) }
                                        value = {this.state.alarmText}
                                        maxLength = {10}                                        
                                    />
                                </Item>
                            
                            </Form>
                        </View>

                        {/* <View style={{ marginTop : 20}}>
                            <Label style={SettingsForm.formLable}>Vem Ska Kontaktas?</Label>
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>Polisen</Label>
                                </Left>
                                <Right>
                                   <Switch 
                                    onValueChange={ (value)=> this.setState({ togglePolis: value })} 
                                    value={ this.state.togglePolis } 
                                    />                              
                                 </Right>
                            </View>
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>Ambulans</Label>
                                </Left>
                                <Right>
                                   <Switch 
                                    onValueChange={ (value)=> this.setState({ toggleAmbu: value })} 
                                    value={ this.state.toggleAmbu } 
                                    /> 
                                </Right>
                            </View>
                        </View> */}

                        <View style={{ marginTop: 25}}>
                             
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngPublicAlarm }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipPublicClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngPublicClick'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange = { val => this.updateStateData('toggleAAlarm', val) }
                                            value={ this.state.toggleAAlarm } 
                                        />      
                                    </TooltipM>
                                 </Right>
                            </View>
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngPrivateLocation }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipPrivateLocationClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngPrivateLocationClick'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange = { val => this.updateStateData('togglePrivateLocation', val) }
                                            value={ this.state.togglePrivateLocation } 
                                        />  
                                    </TooltipM>
                                </Right>
                            </View>
                            {/* <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>Öppna app</Label>
                                </Left>
                                <Right>
                                   <Switch 
                                    onValueChange={ (value)=> this.setState({ toggleOpen: value })} 
                                    value={ this.state.toggleOpen } 
                                    />                                 
                                </Right>
                            </View> */}
                            {/* <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>Ljud På/Av</Label>
                                </Left>
                                <Right>
                                   <Switch 
                                    onValueChange={ (value)=> this.setState({ toggleplaysound: value })} 
                                    value={ this.state.toggleplaysound } 
                                    />                                 
                                </Right>
                            </View> */}
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngVoiceRec  }</Label>
                                </Left>
                                <Right>
                                     <TooltipM toolTipVisible={this.state.tooltipVoiceClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngVoiceClick'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange = { val => this.updateStateData('toggleVoice', val) }
                                            value={ this.state.toggleVoice } 
                                        />    
                                    </TooltipM>
                                </Right>
                            </View>
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngInsecAssis }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipAssistantClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngAssistantClick'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange = { val => this.updateStateData('toggleAssistant', val) }
                                            value={ this.state.toggleAssistant } 
                                        />     
                                    </TooltipM>                                
                                </Right>
                            </View>
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngRecordVoice }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipVoiceRecord } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngVoiceRecord'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange={ val => this.updateStateData('toggleRecordVoice', val) } 
                                            value={ this.state.toggleRecordVoice } 
                                        />    
                                    </TooltipM>
                                </Right>
                            </View>
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngShakeAlarm }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipShakeDevice } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngShakeDevice'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange={ val => this.updateStateData('toggleShakeAlarm', val) } 
                                            value={ this.state.toggleShakeAlarm } 
                                        />    
                                    </TooltipM>                                 
                                </Right>
                            </View>
                            {/* <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>Testlarm</Label>
                                </Left>
                                <Right>
                                   <Switch 
                                    onValueChange={ (value)=> this.setState({ toggleTestAlarm: value })} 
                                    value={ this.state.toggleTestAlarm } 
                                    />                                 
                                </Right>
                            </View> */}
                            {/* <View style={ SettingsForm.rowSetting }>
                                <Right>
                                    <Icon name='md-mic' 
                                    onPress = {() => this.props.navigation.navigate('vSync')}
                                    style={{color:'white', fontSize:34, marginRight:5}}/>                               
                                </Right>
                            </View> */}
                        </View>
                       
                       <View>
                            {/* Make Line  */}
                            <View style={ SettingsForm.settingBorder }  />
                            
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngAutoMode }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipAutoMode } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngAutoMode'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            onValueChange={ val => this.updateStateData('toggleAutoMode', val) } 
                                            value={ this.state.toggleAutoMode } 
                                        />    
                                    </TooltipM>
                                </Right>
                            </View>
                            <View style={ SettingsForm.rowSetting } >
                                <Left >    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngDarkMode }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipDarkMode } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngDarkMode'}>
                                        <Switch 
                                            style = { { margin: 1}}
                                            disabled= { this.state.toggleAutoMode }
                                            onValueChange={ val => this.updateStateData('toggleDarkMode', val) } 
                                            value={ this.state.toggleAutoMode?false:this.state.toggleDarkMode } 
                                        />    
                                    </TooltipM>                                 
                                </Right>
                            </View>

                        </View>

                        <View>
                         
                            {/* Make Line  */}
                            <View style={ SettingsForm.settingBorder }  />
                            
                            <View style={ SettingsForm.rowSetting }>
                                <Left>    
                                    <Label style={SettingsForm.alarmLable}>{ this.state.language.lngAppRate }</Label>
                                </Left>
                                <Right>
                                    <TooltipM toolTipVisible={this.state.tooltipRateApp } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngRateApp'}>
                                        <Button success transparent style={{ height:40}}
                                            onPress={ this.makeAppRate }>                                    
                                            <Text style={{ color:'#FFFFFF'}}>Rate</Text>
                                        </Button>         
                                    </TooltipM>
                                </Right>
                            </View>
                          
                        </View>


                        <View>
                            {/* Make Line  */}
                            <View style={ SettingsForm.settingBorder }  />
                            
                                <TooltipM toolTipVisible={this.state.tooltipAccountClick } placement={'top'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngAccountClick'}>
                                    <Button bordered warning iconRight  style={{marginTop : 20, alignSelf:'center'}}
                                        onPress={ this.deleteUserAccount }>                                    
                                        <Text style={{fontSize : 16 ,color : 'white'}}>{ this.state.language.lngDeleteAcc }</Text>
                                        <Icon name='md-close' />
                                    </Button>
                                </TooltipM>
                            
                            {/* Make Line  */}
                            <View style={ SettingsForm.settingBorder }  />

                        </View>


                        <View style = {{  marginBottom:30 }}>
                                <Label style={SettingsForm.formLable}>{ this.state.language.lngAppInfo }</Label>

                                <TouchableOpacity 
                                    onPress={this.openCompanyWebPage(4) }>
                                    <Text style={SettingsForm.termsInfo}>> { this.state.language.lngInsecHelp }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={this.openCompanyWebPage(0) }>
                                    <Text style={SettingsForm.termsInfo}>> { this.state.language.lngInsecVillkor }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={this.openCompanyWebPage(1) }>
                                    <Text style={SettingsForm.termsInfo}>> { this.state.language.lngIntPolicy }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={ this.openCompanyWebPage(3) }>
                                    <Text style={SettingsForm.termsInfo}>> { this.state.language.lngContactUs }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={this.openCompanyWebPage(2) }>
                                    <Text style={SettingsForm.termsInfo}>> { this.state.language.lngAboutUs }</Text>
                                </TouchableOpacity>


                                <View style={{ alignItems:'center', marginTop: 10}}>
                                    <Text style={SettingsForm.appInfo}>{SettingsM.getAppSplashName()}</Text>
                                    <Text style={SettingsForm.appInfo}>Version {SettingsM.getAppVersion()}</Text>
                                    <Text style={SettingsForm.appInfo}>{SettingsM.getApplicense()}</Text>
                                    <Text style={SettingsForm.appInfo}>{ this.state.language.lngCopyRight }</Text>
                                </View>

                        </View>
                    </View>
                </Content> 
            </Container>

        )
    }


}