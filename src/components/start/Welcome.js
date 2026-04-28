import React from 'react';
import { Container,
         View,
         Text,
} from 'native-base';
import {  StyleSheet,Image, Animated , Easing} from 'react-native';
import lng from './../../module/Language';



export default class page1 extends React.PureComponent {

    constructor () {
        super()
        this.animatedValue = new Animated.Value(0)

        this.state = {
            language: {
                lngWelcome: '',
                lngWait: ''
            }
        }

      }

      
      componentDidMount () {
          try{

            this.getLanguage()

            this.animate()
    
            setTimeout(()=>{
                this.props.navigation.navigate('start')  
            },3000)
    

          }catch(err){
              console.log('componentDidMountWelcome:',err)
          }

      }
      animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
          }
        ).start(() => this.animate())
      }

    //---------------------------------------Start set Language
    async getLanguage () {
        let lngValues= await lng.helpWelcomePage()

        this.setState({
            language: {
                lngWelcome: lngValues.lngWelcome,
                lngWait: lngValues.lngWait
            }
        })
    }
    //---

    render() {

        const rotateX = this.animatedValue.interpolate({
            inputRange: [0, 1, 1],
            outputRange: ['0deg', '180deg', '0deg']
            })
        
        return (
            
            <Container style={{backgroundColor: 'black' }} >
            <View style={styles.container}>

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center' ,
                        height: '100%' ,
                        width: '100%',
                        backgroundColor: '#FFFFFF' }} 
                    >
                    <Text style={{ textAlign: "center",fontSize:30}}>{ this.state.language.lngWelcome }</Text>
                    
                    <Animated.View
                        style={{
                        transform: [{rotateX}]}}>
                        <Image style={{ margin:30}} source={  require('./../../assets/images/insec.jpg') } />
                    </Animated.View>

                   <Text style={{ marginTop:10, textAlign: "center",fontSize:16}}>{ this.state.language.lngWait }</Text>

                </View>
            

            </View>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })