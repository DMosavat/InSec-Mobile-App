import React from 'react';
import { Container,
         Header,
         Left,
         Right,
         Text,
         Label,
         Body,
         Title,
         Button,
         Content,
         Icon,
         Form,
         Item,
         Input } from 'native-base';
import { form, registerForm } from '../assets/styles';
import { Platform } from 'react-native';
//--------------------------------------------------------->

//--------------------------------------------------------->
import RegisterM from '../model/Register'
import TTSpeech  from './../module/TextToSpeech'
import lng from './../module/Language';
//--------------------------------------------------------->

export default class Register extends React.PureComponent {
    constructor(props){
        super(props)
        
        this.state= {
            pNumber:'',
            tNumber:'07',
            uName:'',
            legalAge: 12,
            lockPhone: false,
            language: {
                lngWelcome: '',
                lngMakeAccount: '',
                lngEgPersonN: '',
                lngEgTel: '',
                lngCreatAcc: '',
                lngPNumber: '',
                lngTelNumber: ''
            }
        }

        this.saveNewUserInformation = this.saveNewUserInformation.bind(this)
        
    }

     //-------------------------------------------Start set Language
     async getLanguage () {
        let lngValues= await lng.registerLang()
        this.setState({
            language: {
                lngWelcome: lngValues.lngWelcome,
                lngMakeAccount: lngValues.lngMakeAccount,
                lngEgPersonN: lngValues.lngEgPersonN,
                lngEgTel: lngValues.lngEgTel,
                lngCreatAcc: lngValues.lngCreatAcc,
                lngPNumber: lngValues.lngPNumber,
                lngTelNumber: lngValues.lngTelNumber,
            }
        })
    }
    

    componentWillUnmount(){
        TTSpeech.stopTalk()
        this.setState({
            pNumber:'',
            tNumber:'07',
            uName:'',
            legalAge: 12
        })
    }

    async componentDidMount(){
        try{

            TTSpeech.startTalk(4)

            this.getLanguage()

            this.getPhoneNumber()

            let uName= await RegisterM.getUserIfo()
            this.setState({
                uName
            })
                
            let legalAge = await RegisterM.getLegalAge()
            this.setState({
                legalAge
            })


        }catch(error){
            console.log(error)
        }

    }

    async getPhoneNumber(){
        try{
    
            let tNumber = await this.props.navigation.getParam('userPhoneNum')
            let lockPhone = true
            if (tNumber === undefined){
                lockPhone = false
                tNumber = '07'
            }else{
                tNumber = '00' + tNumber.substring(1)
            }
    
            this.setState ({ tNumber, lockPhone })
            
        }catch(err){
        }
    }
    
    async saveNewUserInformation(){
        
        if( this.state.pNumber.length >= 12 && this.state.tNumber.length>=10 )
        RegisterM.saveNewUserInformation(
            this.state.pNumber, 
            this.state.tNumber,
            this.props.navigation)

    }



    render() {

        return (
            <Container style={ form.formContainer}>
                 <Content>

                    <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                       <Left style={{flex:1}}/>
                        <Body style={{flex:1}}>
                            <Title  style={form.formTitle}>
                                {RegisterM.getAppName()}
                            </Title>
                        </Body>
                        <Right style={{flex:1}}/>
                    </Header>

                    <Form style={form.StyleForm}>
                        <Label style={ registerForm.wellcomeText }>{this.state.language.lngWelcome } {this.state.uName}</Label>
                        <Label style={ registerForm.skapaText }>{this.state.language.lngMakeAccount }</Label>
                        <Text style={ registerForm.egText } >{ this.state.language.lngEgPersonN }</Text>
                        <Item  style={form.item}>
                            <Input
                                autoFocus = {true}
                                keyboardType = 'numeric'
                                placeholder = { this.state.language.lngPNumber }
                                onChangeText = {(text)=> this.onChangePNummer(text)}
                                value = {`${this.state.pNumber}`}
                                style={form.inputNum}
                                maxLength = {12}
                            />
                        {
                            this.state.pNumber.length>=12 ?
                                <Icon name='md-checkmark-circle' style={ form.validateTrue } />
                            :this.state.pNumber !=''?
                                <Icon name='md-close-circle' style={ form.validateFalse }/>
                            :null
                        } 
                        </Item>
                        <Text style={ registerForm.egText }>{ this.state.language.lngEgTel }</Text>
                        <Item  style={form.item}>
                            <Input 
                                disabled= { this.state.lockPhone }
                                keyboardType = 'numeric'
                                onChangeText = {(text)=> this.onChangeTNummer(text)}
                                value = {`${this.state.tNumber}`}
                                style={form.inputNum}
                                maxLength = {10}
                                placeholder= {this.state.language.lngTelNumber}
                            />
                        {
                            this.state.tNumber.length>=10 ?
                                <Icon name='md-checkmark-circle' style={ form.validateTrue } />
                            :this.state.tNumber !=''?
                                <Icon name='md-close-circle' style={ form.validateFalse }/>
                            :null
                        } 
                        </Item>
                        <Button rounded
                             style={registerForm.submitButton}
                             onPress={ this.saveNewUserInformation }>
                            <Text style={registerForm.submitText}>{ this.state.language.lngCreatAcc }</Text>
                        </Button>
                    </Form>
                </Content> 
            </Container>
        )
    }

   

    onChangePNummer(text) {

        if (text === '')
         this.setState({ pNumber : '' });

        let tempT = RegisterM.checkUserPersonNumber(this.state.pNumber , text, this.state.legalAge)
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
    
}