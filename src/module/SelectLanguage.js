
import React, { PureComponent }  from 'react'
import { ScrollView, BackHandler, Image, TouchableOpacity } from 'react-native'
import { View, List, ListItem, Left, Body, Text, Icon } from 'native-base';

import { selectLang } from './../assets/styles'
import lngType from './Language'

export default class SelectLanguage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          lngBack : ''
        }

    }

    //------------------------------------------------------------------
       handleBackButtonClick = () => {
        this.props.setLanguageType()
        return true;
      }
    //------------------------------------------------------------------

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);  

    }

    async componentDidMount(){

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick );

        let appLang = await lngType.shareAppLang()

        this.setState({
          lngBack : appLang.lngBack
        })

      }

    setLanguageType = (lng) => () =>{
        lngType.setLngType(lng)
        this.props.navigation.replace('splash')
    } 

  render() {
    return (
        <View style={ selectLang.mainView }>
  
        <ScrollView>
              <View style={ selectLang.backButtonView }>
                  <TouchableOpacity onPress={ this.props.setLanguageType }>
                      <Icon name='md-arrow-round-up'   style={ selectLang.backButtonIcon }/>
                  </TouchableOpacity>
               </View>

           <List>
            
             <ListItem avatar 
               onPress={ this.setLanguageType('en')}
               >
               <Left>
                 <Image source={ require('./../assets/images/en.jpg')} />
                 {/* <View style={ selectLang.langEn } />                     */}
               </Left>
               <Body>
                 <Text style= {{ marginTop:6 }}>English</Text>
               </Body>
             </ListItem>
             <ListItem avatar
               onPress={ this.setLanguageType('sv')}
               >
               <Left>
                 <Image source={ require('./../assets/images/sv.jpg')} />
                 {/* <View style={ selectLang.langSv } />                                                         */}
               </Left>
               <Body>
                 <Text style= {{ marginTop:6 }}>Swedish</Text>
               </Body>
             </ListItem>
             {/* <ListItem avatar
               onPress={ this.setLanguageType('es')}
               >
               <Left>
                 <Image source={ require('./../assets/images/es.jpg')} />
                                                                         
               </Left>
               <Body>
                 <Text style= {{ marginTop:6 }}>Spanish</Text>
               </Body>
             </ListItem>
             <ListItem avatar
             onPress={ this.setLanguageType('de')}
             >
               <Left>
                 <View style={ selectLang.langDe } />                                     
               </Left>
               <Body>
                 <Text>German</Text>
               </Body>
             </ListItem>
             <ListItem avatar
             onPress={ this.setLanguageType('fa')}
             >
               <Left>
                  <View style={ selectLang.langFa } />                                    
               </Left>
               <Body>
                 <Text>Persian</Text>
               </Body>
             </ListItem>
             <ListItem avatar
             onPress={ this.setLanguageType('ar')}
             >
               <Left>
                  <View style={ selectLang.langAr } />                                     
               </Left>
               <Body>
                 <Text>Arabic</Text>
               </Body>
             </ListItem> */}
           </List>
           </ScrollView>
         </View>
    )
  }
}