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
//--------------------------------------------------------->

//--------------------------------------------------------->
import { form, SettingsForm } from '../../assets/styles';
import pbf from './../../module/PublicFunction';
import lng from './../../module/Language';
import TooltipM from './../../module/Tooltip'
import SettingsM from '../../model/Settings'
//--------------------------------------------------------->

const helpIconColor = '#FF8000'

export default class FindNetwork extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            //-------------------------------tooltip visible
            helpBackground: '',
            tooltiplngBackClick :false,
            tooltiplngAcceptClick :false,
            //--------------------------------
            networkName1: '',
            networkName2: '',
            networkName3: '',
            networkName4: '',
            networkName5: '',
            networkName6: '',
            networkName7: '',
            networkName8: '',
            networkName9: '',
            networkName10: '', 
            networkCode1: '',
            networkCode2: '',
            networkCode3: '',
            networkCode4: '',
            networkCode5: '',
            networkCode6: '',
            networkCode7: '',
            networkCode8: '',
            networkCode9: '',
            networkCode10: '',
            language: {
                lngPublicName: '',
                lngPublicCode: '',
            }
        
        }

        this.saveInformation = this.saveInformation.bind(this)
        this.backToHomePage = this.backToHomePage.bind(this)
        this.updateStateData = this.updateStateData.bind(this)

    }
   
    //-------------------------------------------Start set Language
    async getLanguage () {
        let lngValues= await lng.settingLang()
        this.setState({
            language: {
                lngPublicName: lngValues.lngPublicName,
                lngPublicCode: lngValues.lngPublicCode,
            }
        })
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    setToolTipVisible = () =>{
        this.setState({ 
            tooltiplngBackClick :false,
            tooltiplngAcceptClick :false,
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
    handleBackButtonClick = () => {
        this.backToHomePage()
        return true;
    }
    //------------------------------------------------------------------
    
    //------------------------------------------------------------------
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------    
    async componentWillMount(){
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );

        this.getLanguage()
        this.getUserNetwork();

    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    async getUserNetwork(){
        
        try{
            await SettingsM.getUserNetwork()
            .then((data)=>{
                if(!data.error)
                this.setState({
                    networkCode1 : data.networkCode1  ,
                    networkCode2 : data.networkCode2  ,
                    networkCode3 : data.networkCode3  ,
                    networkCode4 : data.networkCode4  ,
                    networkCode5 : data.networkCode5  ,
                    networkCode6 : data.networkCode6  ,
                    networkCode7 : data.networkCode7  ,
                    networkCode8 : data.networkCode8  ,
                    networkCode9 : data.networkCode9  ,
                    networkCode10 : data.networkCode10,
                    networkName1 : data.networkName1  ,
                    networkName2 : data.networkName2  ,
                    networkName3 : data.networkName3  ,
                    networkName4 : data.networkName4  ,
                    networkName5 : data.networkName5  ,
                    networkName6 : data.networkName6  ,
                    networkName7 : data.networkName7  ,
                    networkName8 : data.networkName8  ,
                    networkName9 : data.networkName9  ,
                    networkName10 : data.networkName10    
                });

            })
        }catch(err){
            console.log('getUserSetting:',err)
        }
    }
    //------------------------------------------------------------------


    //------------------------------------------------------------------
    async saveInformation(){
        try{
            if( this.state.helpBackground === helpIconColor){
                this.setState({ tooltiplngAcceptClick: true })                                             
                return;
            }
           
            let uData = this.state
            await SettingsM.saveUserNetwork(uData)
            this.props.navigation.goBack()

        }catch(err){
            console.log('saveInformation',err)
        }
       
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
   async  backToHomePage(){
       try{
            if( this.state.helpBackground === helpIconColor){
                this.setState({ tooltiplngBackClick: true })                                             
                return;
            }

            this.props.navigation.goBack()

        }catch(err){
            console.log('backToHomePage:',err)
       }    
       
    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    updateStateData = async ( key, value ) => {

        let fields = this.state;
        fields[key] = value
        this.setState({fields });

    }
    //------------------------------------------------------------------


    render() {

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
                                { pbf.appInformation().Name }
                            </Title>
                        </Body>
                        <Right style={{flex:1}}>
                            <TouchableOpacity 
                                onPressOut={ this.setHelpButtonBackColor }
                                >
                                <Icon name='md-help-circle' 
                                    style={this.state.helpBackground === helpIconColor?
                                     { fontSize:36 ,color : this.state.helpBackground, marginRight:10 }
                                    : SettingsForm.helpIcon}  
                                />
                            </TouchableOpacity>
                            
                            <TooltipM toolTipVisible={this.state.tooltiplngAcceptClick } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'profile'} objectName= {'lngAcceptClick'}>
                                <TouchableOpacity 
                                    onPress={ this.saveInformation }>
                                <Icon name='md-checkmark' style={ form.headerRightIcon}/>
                                </TouchableOpacity>
                            </TooltipM>
                        </Right>  
                    </Header>

                <Content>

                    <View style={SettingsForm.formSetting}>

                   
                        <Form  style={{paddingRight:40}}>
                            <View style={{   flexDirection:'row', marginBottom: 10 }}>
                            <Label style={SettingsForm.formLable}>{ this.state.language.lngPublicName }</Label>
                            {
                                this.state.helpBackground === 'red'?
                                <TooltipM toolTipVisible={this.state.tooltipPrivateDesc } placement={'bottom'} setToolTipVisible={ this.setToolTipVisible } pageType= {'setting'} objectName= {'lngPrivateDesc'}>
                                    <Icon name='md-help-circle-outline' 
                                    onPress= { this.setHelpState(0) }
                                    style={ SettingsForm.helpIcone}/>
                                </TooltipM>
                                :null
                            }
                            </View>

                            {
                                this.state.networkName1?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName1 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 1' }
                                    keyboardType = 'numeric'
                                    onChangeText = { val =>  this.updateStateData('networkCode1', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.networkCode1}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.networkName2?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName2 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 2'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode2', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.networkCode2}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.networkName3?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName3 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 3'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode3',  val.replace(/\D/g, '')) }
                                    value = {`${this.state.networkCode3}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.networkName4?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName4 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 4'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode4', val.replace(/\D/g, '')) }
                                    value = {`${this.state.networkCode4}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.networkName5?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName5 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 5'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode5', val.replace(/\D/g, '')) }
                                    value = {`${this.state.networkCode5}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.networkName6?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName6 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 6' }
                                    keyboardType = 'numeric'
                                    onChangeText = { val =>  this.updateStateData('networkCode6', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.networkCode6}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.networkName7?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName7 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 7'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode7', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.networkCode7}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.networkName8?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName8 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 8'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode8',  val.replace(/\D/g, '')) }
                                    value = {`${this.state.networkCode8}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.networkName9?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName9 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 9'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode9', val.replace(/\D/g, '')) }
                                    value = {`${this.state.networkCode9}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.networkName10?
                                <Label style={SettingsForm.codeName}>{ this.state.networkName10 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPublicCode + ' 10'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('networkCode10', val.replace(/\D/g, '')) }
                                    value = {`${this.state.networkCode10}`}
                                    maxLength = {10}                                        
                                />
                            </Item>
                        </Form>
                    </View>
                </Content>

            </Container>
        )
    }

   
}