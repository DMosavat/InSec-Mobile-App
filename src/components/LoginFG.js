import React from 'react';
import { Container ,
         View ,
         Header ,
         Left ,
         Right ,
         Text ,
         Body,
         Title ,
         Button ,
         Content ,
         Form ,
         Icon,
         Spinner,
         CheckBox} from 'native-base';
import { Platform, Alert } from 'react-native';

import { form, loginForm } from  '../assets/styles';
import LoginFGM from '../model/LoginFG'
import pbf from './../module/PublicFunction';
import lng from './../module/Language';
import SelectLang from './../module/SelectLanguage'

export default class Login extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            toggleTerms: false,
            showSpinner: false,
            showLangType: false,
            languageType: 'En',
            language: {
                lngFacebookAlarm: '',
                lngFacebook: '',
                lngPhoneNumber: '',
                lngsetTermAndCondition: ''
            }
        };

        this.logInFasebook = this.logInFasebook.bind(this)
        this.setTermAndCondition = this.setTermAndCondition.bind(this)
        this.getTermAndConditionPage = this.getTermAndConditionPage.bind(this)
        this.setLanguageType = this.setLanguageType.bind(this)
        this.logInWithPhoneNumber = this.logInWithPhoneNumber.bind(this)
    }

    componentWillMount(){

        pbf.setAsyncStorageData( 'openAppForFirstTime', '1' )

        this.getLanguage()

    }

    setLanguageType(){
        this.setState({ showLangType: !this.state.showLangType })
    }

    async getLanguage () {
        let loginLng= await lng.loginLang()
        let lngType= await lng.getLngType()
        this.setState({
            languageType: lngType.toUpperCase(), 
            language: {
                lngFacebookAlarm: loginLng.lngFacebookAlarm,
                lngFacebook: loginLng.lngFacebook,
                lngPhoneNumber: loginLng.lngPhoneNumber,
                lngsetTermAndCondition: loginLng.lngsetTermAndCondition,
                lngFaildLogin: loginLng.lngFaildLogin
            }
        })
    }
    //-----------------------------------------------------------------

    //-----------------------------------------------------------------
    getTermAndConditionPage = async () => {
        this.props.navigation.navigate('oWebPage', { webPath: await pbf.openAppWebLink(0) })

    }

    setTermAndCondition = () => {
        this.setState({ toggleTerms: !this.state.toggleTerms })
    }

    logInFasebook = async () => {
        if (this.state.toggleTerms == false)
        return Alert.alert(pbf.appInformation().Name, this.state.language.lngFacebookAlarm )

        this.setState({ showSpinner:true })

        LoginFGM.logInFasebook(this.props.navigation)
        .then(value =>{
            if(!value){
                Alert.alert(pbf.appInformation().Name, this.state.language.lngFaildLogin )
               this.setState({ showSpinner:false })
            }
        })
    }
      
    logInWithPhoneNumber = async () => {
        if (this.state.toggleTerms == false)
        return Alert.alert(pbf.appInformation().Name, this.state.language.lngFacebookAlarm )

        this.props.navigation.replace('authPhone')
    
    }
    
     
    render() {
        return (
            
            <Container style={ form.formContainer}>
                 <Content>

                    <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                        <Left style={{flex:1}}/>
                        <Body style={{flex:1}}>
                            <Title  style={form.formTitle}>
                              {LoginFGM.getAppName()}
                            </Title>
                        </Body>
                        <Right style={{flex:1}}/>
                    </Header>

                

                    <Form style={form.StyleForm}>

                     {
                        this.state.showSpinner ?
                        <Spinner />
                        :null
                    }

                    <View style={!this.state.showSpinner?{ flex : 1, alignContent:'center' }:{ flex : 1, alignContent:'center', marginTop:-80 }}>
                            <Button  rounded  
                                disabled={ this.state.showSpinner }
                                style={loginForm.logginFacebookButton}
                                onPress={ this.logInFasebook }>
                                <Text style={loginForm.logginButtonText}>{ this.state.language.lngFacebook }</Text>
                            </Button>

                             <Button  rounded 
                                disabled={ this.state.showSpinner } 
                                style={loginForm.logginPhoneButton}
                                onPress={ this.logInWithPhoneNumber }>
                                <Text style={loginForm.logginButtonText}>{ this.state.language.lngPhoneNumber }</Text>
                            </Button>

                            {/* <Button  rounded  style={loginForm.logginGoogkeButton}
                                onPress={this.loginGoogle.bind(this)}>
                                <Text style={loginForm.logginButtonText}>   LOGGA IN MED Google   </Text>
                            </Button> */}
                        </View>
                        <View  style={ loginForm.termAndCondition }>
                                <CheckBox color="#E6E6E6"
                                checked={ this.state.toggleTerms } 
                                onPress={ this.setTermAndCondition } 
                                />
                                <Button small transparent iconRight  style={{marginTop : -5,marginLeft: 5}}
                                    onPress={ this.setTermAndCondition }>
                                    <Text style={{fontSize : 12 ,color : 'white'}}>{ this.state.language.lngsetTermAndCondition }</Text>
                                </Button>
                                <Button small rounded  style={{ marginTop : -5 }}
                                    onPress={ this.getTermAndConditionPage }>
                                    <Icon name='md-document'/>
                                </Button>
                        </View>

                    </Form>
                 
                    
                </Content>
             

                {
                    this.state.showLangType?
                    <SelectLang navigation={ this.props.navigation } setLanguageType={this.setLanguageType}/>  
                    :
                    <View style={{ marginBottom:80}}>
                        <View style={ loginForm.languageAlign } >
                            <Button bordered 
                                onPress= { this.setLanguageType }>
                                <Text >{this.state.languageType}</Text>
                            </Button>
                        </View>
                    </View>
                }
                 
            </Container>
            
        )
    }


}

