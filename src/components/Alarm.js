import React from 'react';
import { Container,
         Header,
         Left,
         Right,
         Text,
         Body,
         Card,
         Icon,
         Content,
         Form,
         View,
         Button,
         Segment,
         Title } from 'native-base';
import { TouchableOpacity , Platform, BackHandler } from 'react-native';
//--------------------------------------------------------->

//--------------------------------------------------------->
import { form, AlarmForm } from '../assets/styles';
import ShowMapAlarm from './../model/ShowMapAlarm';
import TTSpeech  from './../module/TextToSpeech'
import lng from './../module/Language';
import pbf from './../module/PublicFunction'
//--------------------------------------------------------->


export default class Alarm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            counter : 0,
            timer: '',
            sendType: 0,
            activeNetworkCode: false,
            DisablePublic: false,
            language: {
                lngClickOn: '',
                lngPublic: '',
                lngPrivate: '',
                lngNetworkCode: '',
                lngHeart: '',
                lngFire: '',
                lngFAid: '',
                lngCompany: '',
                lngAfterTen: '',
                lngStopN: '',
            }

        }

        this.openShowMapPage =  this.openShowMapPage.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }

   //-------------------------------------------Start set Language
    async getLanguage () {
        let lngValues= await lng.alarmLang()
        this.setState({
            language: {
                lngClickOn: lngValues.lngClickOn,
                lngPublic: lngValues.lngPublic,
                lngPrivate: lngValues.lngPrivate,
                lngNetworkCode: lngValues.lngNetworkCode,
                lngHeart: lngValues.lngHeart,
                lngFire: lngValues.lngFire,
                lngFAid: lngValues.lngFAid,
                lngCompany: lngValues.lngCompany,
                lngAfterTen: lngValues.lngAfterTen,
                lngStopN: lngValues.lngStopN,
            }
        })
    }
    //-------------------------------------------End Language

    async componentWillMount() {

        try{

            this.setAlarmType()

            TTSpeech.startTalk(1)
    
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );
            
            this.getLanguage()

            let timer = setInterval(this.tick.bind(this), 1000);
            this.setState({timer});
            

        }catch(err){
            console.log('componentWillMount:',err)
        }        
     }

     async componentWillUnmount() {
        try{
            TTSpeech.stopTalk()
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  

            clearInterval(this.state.timer);
        }catch(err){
            console.log('componentWillUnmount:',err)
        } 
      }

    setAlarmType = async () =>{

        let networkCode = await pbf.getAsyncStorageData('networkCode1')
        if(networkCode !== '' && networkCode !== null ){
            this.setState({ activeNetworkCode: true, sendType: 3 })
        }else{
            this.setState({ sendType: 2 })
        }
        

        ShowMapAlarm.getUserAlarmBlockPublicStatus()
        .then((value)=>{
            if(value){
                this.setState({ DisablePublic: true, sendType: this.state.sendType })
            }
        })

    }

    //------------------------------------------------------------------
    handleBackButtonClick = () => {
        this.backToHome()
        return true;
    }
    //------------------------------------------------------------------
    

    async backToHome(){
        try{
            clearInterval(this.state.timer);

            if(this.state.counter<10 )
            this.props.navigation.replace('home')    
        }catch(err){
            console.log('backToHome:',err)
        }         
    }

      openShowMapPage = (alarmType) => async () => {
        try{
            // alarmType :
            // 1 = Heart 
            // 2 = Fire 
            // 3 = First Aid 
            // 4 = Company 
            // 5 = Volume key
            // 6 = Shake device
            // 8 = General
            // 9 = Voice Recognize 
            let sendAlarm = await ShowMapAlarm.setAlarmForUser(alarmType ,this.state.sendType)
            clearInterval(this.state.timer);

            if( sendAlarm )
            this.props.navigation.replace('map', { alarmType: alarmType, sendType: this.state.sendType }) ;
            
        }catch(err){
            console.log('openShowMapPage:',err)
        }     
      }

      tick() {
        this.setState({
            counter: this.state.counter +1
        });
        if (this.state.counter >=10) 
        {
            //this.openShowMapPage(8)()
        }
    }

    render() {
        if( this.state.sendType === 0 )
        return <Container style={ form.formContainer }></Container>;

        return (
            <Container style={ form.formContainer}>
                 <Header key={Header.key} style={Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                        <Left style={{flex:1}}/>
                        <Body style={{flex:1}}>
                            <Title   style={form.formTitle}>
                                {ShowMapAlarm.getAppName()}
                            </Title>
                        </Body>
                        <Right style={{flex:1}}/>
                        
                    </Header>
                   
                    <Content>

                    <Form style={form.StyleForm}>
                        <View style={ AlarmForm.contentPosition}>
                            <Card style={ AlarmForm.AlarmCard}>
                            
                            <View style={{ marginBottom:10 }}>
                               <Text style={ AlarmForm.topTextLabel }>{ this.state.language.lngClickOn }</Text>
                            </View>
                            
                                <View style={{flex : 1, marginBottom:10 }}>
                                    <Segment style={{ backgroundColor: 'transparent' }}>
                                        <Button light disabled={ this.state.DisablePublic } 
                                            style={this.state.sendType === 1?{ backgroundColor:'#FE9A2E'}:null}
                                            first active={this.state.sendType === 1}  
                                            onPress={() => this.setState({ sendType: 1 })}>
                                            <Text style={this.state.activeNetworkCode?{fontSize:15}:{fontSize:18}}>{ this.state.language.lngPublic }</Text>
                                        </Button>
                                        {
                                            this.state.activeNetworkCode?
                                            <Button light last active={this.state.sendType === 3} 
                                                style={this.state.sendType === 3?{ backgroundColor:'#FE9A2E'}:null}
                                                onPress={() => this.setState({ sendType: 3 })}>
                                                <Text style={{fontSize:15}}>{ this.state.language.lngNetworkCode }</Text>
                                            </Button>
                                            :null
                                        }

                                        <Button light last active={this.state.sendType === 2}  
                                            style={this.state.sendType === 2?{ backgroundColor:'#FE9A2E'}:null}
                                            onPress={() => this.setState({ sendType: 2 })}>
                                            <Text style={this.state.activeNetworkCode?{fontSize:15}:{fontSize:18}}>{ this.state.language.lngPrivate }</Text>
                                        </Button>
                                    </Segment>
                                </View>

                                
                                <View style={AlarmForm.items}>
                                    <View >
                                          <Icon name='md-heart' style={ AlarmForm.iconSize}/>
                                    </View>
                                    <View style={ AlarmForm.itemText }>
                                         <TouchableOpacity   style={AlarmForm.bottomStyle}
                                             onPress={ this.openShowMapPage(1) } >
                                             <Text style={ AlarmForm.textLabel }>{ this.state.language.lngHeart }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={AlarmForm.items}>
                                    <View style={{ marginLeft:7 }}>
                                          <Icon name='md-flame' style={ AlarmForm.iconSize}/>
                                    </View>
                                    <View style={ AlarmForm.itemText }> 
                                        <TouchableOpacity style={AlarmForm.bottomStyle} 
                                            onPress={ this.openShowMapPage(2) } >
                                            <Text style={ AlarmForm.textLabel }>{ this.state.language.lngFire }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={AlarmForm.items}>
                                    <View >
                                        <Icon name='md-medkit' style={ AlarmForm.iconSize}/>
                                    </View>
                                    <View style={ AlarmForm.itemText }>
                                        <TouchableOpacity  style={AlarmForm.bottomStyle}
                                             onPress={ this.openShowMapPage(3) } >
                                             <Text style={ AlarmForm.textLabel }>{ this.state.language.lngFAid }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={AlarmForm.items}>
                                    <View style={{ marginLeft:10 }} >
                                          <Icon name='md-walk' style={ AlarmForm.iconSize}/>
                                    </View>
                                    <View style={ AlarmForm.itemText }>
                                        <TouchableOpacity  style={AlarmForm.bottomStyle}
                                             onPress={ this.openShowMapPage(4) } >
                                             <Text style={ AlarmForm.textLabel }>{ this.state.language.lngCompany }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                   
                                <View style={ AlarmForm.bottomText }>
                                    <Text style={ AlarmForm.bottomTextS }> { this.state.language.lngAfterTen } </Text>
                                </View>
                              

                                <View style={ AlarmForm.bottomText }>
                                    <Text style={ AlarmForm.bottomCounter }>{ this.state.counter }</Text>
                                </View>

                                 <View style={ AlarmForm.bottomText }>
                                         <TouchableOpacity 
                                            onPress= {this.backToHome} 
                                            style={ AlarmForm.stopAlarm }
                                        >
                                             <Text style={ AlarmForm.textLabel }>{ this.state.language.lngStopN }</Text>
                                        </TouchableOpacity>
                                </View>
                            </Card>
                        </View>   
                    </Form> 
                </Content>
            </Container>
        )
    }

}
