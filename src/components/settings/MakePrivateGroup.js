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

export default class MakePrivateGroup extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            //-------------------------------tooltip visible
            helpBackground: '',
            tooltiplngBackClick :false,
            tooltiplngAcceptClick :false,
            //--------------------------------
            pName1: '',
            pName2: '',
            pName3: '',
            pName4: '',
            pName5: '',
            pName6: '',
            pName7: '',
            pName8: '',
            pName9: '',
            pName10: '', 
            pNum1: '',
            pNum2: '',
            pNum3: '',
            pNum4: '',
            pNum5: '',
            pNum6: '',
            pNum7: '',
            pNum8: '',
            pNum9: '',
            pNum10: '',
            language: {
                lngPrivateName: '',
                lngPrivateCode: ''
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
                lngPrivateName: lngValues.lngPrivateName,
                lngPrivateCode: lngValues.lngPrivateCode,
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
        this.getUserPrivateNum();

    }
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    async getUserPrivateNum(){
        
        try{
            await SettingsM.getUserPrivateNum()
            .then((data)=>{
               if(!data.error)
                this.setState({
                    pNum1 : data.pNum1  ,
                    pNum2 : data.pNum2  ,
                    pNum3 : data.pNum3  ,
                    pNum4 : data.pNum4  ,
                    pNum5 : data.pNum5  ,
                    pNum6 : data.pNum6  ,
                    pNum7 : data.pNum7  ,
                    pNum8 : data.pNum8  ,
                    pNum9 : data.pNum9  ,
                    pNum10 : data.pNum10,
                    pName1 : data.pName1  ,
                    pName2 : data.pName2  ,
                    pName3 : data.pName3  ,
                    pName4 : data.pName4  ,
                    pName5 : data.pName5  ,
                    pName6 : data.pName6  ,
                    pName7 : data.pName7  ,
                    pName8 : data.pName8  ,
                    pName9 : data.pName9  ,
                    pName10 : data.pName10    
                });

            })
        }catch(err){
            console.log('getUserPrivateNum:',err)
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
            await SettingsM.saveUserPrivateNUm(uData)
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
                            <Label style={SettingsForm.formLable}>{ this.state.language.lngPrivateName }</Label>
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
                                this.state.pName1?
                                <Label style={SettingsForm.codeName}>{ this.state.pName1 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 1' }
                                    keyboardType = 'numeric'
                                    onChangeText = { val =>  this.updateStateData('pNum1', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.pNum1}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.pName2?
                                <Label style={SettingsForm.codeName}>{ this.state.pName2 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 2'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum2', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.pNum2}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.pName3?
                                <Label style={SettingsForm.codeName}>{ this.state.pName3 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 3'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum3',  val.replace(/\D/g, '')) }
                                    value = {`${this.state.pNum3}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.pName4?
                                <Label style={SettingsForm.codeName}>{ this.state.pName4 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 4'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum4', val.replace(/\D/g, '')) }
                                    value = {`${this.state.pNum4}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.pName5?
                                <Label style={SettingsForm.codeName}>{ this.state.pName5 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 5'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum5', val.replace(/\D/g, '')) }
                                    value = {`${this.state.pNum5}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.pName6?
                                <Label style={SettingsForm.codeName}>{ this.state.pName6 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 6' }
                                    keyboardType = 'numeric'
                                    onChangeText = { val =>  this.updateStateData('pNum6', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.pNum6}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.pName7?
                                <Label style={SettingsForm.codeName}>{ this.state.pName7 }</Label>
                                :null
                            }
                            <Item  >
                                <Input style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 7'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum7', val.replace(/\D/g, '') ) }
                                    value = {`${this.state.pNum7}`}
                                    maxLength = {10}
                                />
                            </Item>

                            {
                                this.state.pName8?
                                <Label style={SettingsForm.codeName}>{ this.state.pName8 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 8'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum8',  val.replace(/\D/g, '')) }
                                    value = {`${this.state.pNum8}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.pName9?
                                <Label style={SettingsForm.codeName}>{ this.state.pName9 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 9'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum9', val.replace(/\D/g, '')) }
                                    value = {`${this.state.pNum9}`}
                                    maxLength = {10}                                        
                                />
                            </Item>

                            {
                                this.state.pName10?
                                <Label style={SettingsForm.codeName}>{ this.state.pName10 }</Label>
                                :null
                            }
                            <Item  >
                                <Input  style={SettingsForm.telNummerInput}
                                    placeholder={ this.state.language.lngPrivateCode + ' 10'  }
                                    keyboardType = 'numeric'
                                    onChangeText = { val => this.updateStateData('pNum10', val.replace(/\D/g, '')) }
                                    value = {`${this.state.pNum10}`}
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