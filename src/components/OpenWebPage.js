import React from 'react';
import { Container,
         Header,
         Left,
         Right,
         Body,
         Title,
         Icon,} from 'native-base';
import {  TouchableOpacity ,Platform } from 'react-native';
import { WebView } from 'react-native-webview';

import { form } from './../assets/styles'
import pbf from './../module/PublicFunction'

export default class UserInfo extends React.PureComponent {
    constructor(props){
        super(props)
        
    }

    backToHomePage = () => {
        this.props.navigation.goBack()

    }

    render() {
        const webPath = this.props.navigation.getParam('webPath' ,'https://solutionvalleyab.se/');
        console.log('webPath',webPath)
        return (
            <Container style={ form.formContainer}>
                <Header style={ Platform.OS==='ios'?form.formHeaderIOS:form.formHeaderAndroid }>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={ this.backToHomePage }>
                            <Icon name='md-arrow-round-back' style={ form.headerLeftIcon}/>
                        </TouchableOpacity>
                    </Left>                        
                    <Body style={{flex:1}}>
                        <Title  style={form.formTitle}>
                            { pbf.appInformation().Name }
                        </Title>
                    </Body>
                    <Right style={{flex:1}} />
                </Header>

                <WebView
                        useWebKit={false}
                        scalesPageToFit={false}
                        source={{uri: webPath }}
                        style={{marginTop: 20 }}
                />
             
            </Container>
        )
    }

}