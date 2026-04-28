import React from 'react';
import { Container , Text , View } from 'native-base';

import styles from  '../assets/styles';
import SplashM from '../model/Splash';
import pbf from './../module/PublicFunction'

export default class Splash extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            loginTie:'',
            logoOpacity: 0.0,
            logoTimer: ''
        }
    }

    componentWillMount(){
    
        try{
            
            pbf.setAsyncStorageData('showTestAlarm','true')

            this.setLogoOpacity()

            //this.props.navigation.replace('welComePage')
            SplashM.checkUserLogin(this.props.navigation)
            
            let loginTie = setInterval( () => {
                SplashM.checkUserLogin(this.props.navigation)

            },5000)

            this.setState({ loginTie })

        }catch(error){
            console.log('componentWillMount:',error)
        }  

    }

    componentWillUnmount(){
        clearInterval(this.state.loginTie )
        clearInterval(this.state.logoTimer )

    }

    setLogoOpacity(){
        let logoTimer = setInterval(()=>{
            this.setState({ logoOpacity: this.state.logoOpacity + 0.1 })
            
            if ( this.state.setLogoOpacity >= 1 ){
                SplashM.checkUserLogin(this.props.navigation)
                clearInterval(this.state.logoTimer )
            }

        },100)

        this.setState({ logoTimer })
    }

    render() {

        const style = styles.index;
        return (

            <Container style={style.splashContainer}>
                <View style={ style.appFirstLogo }>
                  
                    <View opacity={ this.state.logoOpacity }>
                        <Text  style={ style.appTextLogo }>
                            { SplashM.getAppInfo().Name }
                        </Text>

                    </View>
                    
                </View>
                <View style = {{marginBottom:40}}>
                    <Text style={style.companyText}>{SplashM.getAppInfo().SplashName}</Text>
                    <Text style={style.companyText}>{SplashM.getAppInfo().license}</Text>
                </View>

            </Container>
        )

    }



}