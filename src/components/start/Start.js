import React from 'react';
import { Container,
         Header,
         Footer,
         Left,
         Right,
         Body,
         Title,
         Text,
         View,
         Icon,
         Content,
   } from 'native-base';
import {  Platform, TouchableOpacity, Alert} from 'react-native';

import { form } from '../../assets/styles';
import pbf from './../../module/PublicFunction'
import lng from './../../module/Language';

export default class page2 extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            language: {
                lngStart1: '',
                lngStart2: '',
                lngStart3: '',
                lngExitPage: ''
            }
        }

        this.ExitFristAppOpen = this.ExitFristAppOpen.bind(this)
    }

    componentWillMount(){
        this.getLanguage()
    }

    //---------------------------------------Start set Language
    async getLanguage () {
        let lngValues= await lng.helpStartPage()

        this.setState({
            language: {
                lngStart1: lngValues.lngStart1,
                lngStart2: lngValues.lngStart2,
                lngStart3: lngValues.lngStart3,
                lngExitPage: lngValues.lngExitPage
            }
        })
    }
    //---

    ExitFristAppOpen(){
        Alert.alert(
            pbf.appInformation().Name, this.state.language.lngExitPage,
            [
              {text: 'OK', onPress: () => { 
                
                  this.props.navigation.replace('home')

    
              }, style: 'ok'}
            ],
            { cancelable: false }
        )
    }

    render() {

        return (
            <Container style={form.formContainer} >
                    <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                        <Left style={{flex:1}}/>                       
                        <Body style={{flex:1}}>
                            <Title  style={form.formTitle}>
                                { pbf.appInformation().Name }
                            </Title>
                        </Body>
                        <Right style={{flex:1}}/>
                    </Header>

                 <Content>
                     <View style={{ margin:15 }}>
                        <View style={{ marginTop:15, marginBottom:15}}>
                            <Text style={ form.inputNum }>
                                { this.state.language.lngStart1 }
                            </Text>
                        </View>

                        <Text style={ form.input2 }>
                            { this.state.language.lngStart2 }
                        </Text>
                        <View style={{ marginTop:15}}>
                            <Text style={ form.input2 }>
                                { this.state.language.lngStart3 }
                            </Text>
                        </View>
                    </View>
                </Content>

                <Footer style={{ backgroundColor:'#FFBF00'}}>
                    <Left style={{ marginLeft:10}}>
                        <Text style={form.input} >{pbf.appInformation().Manual}</Text>
                    </Left>
                    <Right style={{flex:1}}>
                        <TouchableOpacity onPress={ this.ExitFristAppOpen  }>
                            <Icon name='md-arrow-dropright-circle' style={ form.headerRightIcon}/>
                        </TouchableOpacity>
                    </Right>
                </Footer>
                
            </Container>
        )
    }

}