import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Container, FooterTab, Button, Icon, Footer, Header,Title } from 'native-base';
import { form }  from '../../assets/styles/index'

export default class ChatRoom extends React.Component {

  constructor(){
    super()
    this.state = {
        footerAvtive :0,
        messages: []
    }

    this.setActiveFooter = this.setActiveFooter.bind(this)
  }

    setActiveFooter = (footerAvtive) => () =>{
        this.setState({ footerAvtive })
    }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
 
  render() {
    return (
        <Container>
            <Header style={ form.formContainer }>
                <Title style={ form.formTitle2 }>In-Chat</Title>
            </Header>

            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }
            }
            />

             <Footer >
                <FooterTab style={ form.formContainer }>
                    <Button vertical 
                        style={ form.formContainer }
                        active = { this.state.footerAvtive === 0 }
                        onPress ={ this.setActiveFooter(0)  }
                    >
                        <Icon name= 'md-images' />
                    </Button>
                    <Button vertical
                        style={ form.formContainer }
                        active = { this.state.footerAvtive === 1 }
                        onPress ={ this.setActiveFooter(1) }
                    >
                        <Icon name= 'md-film' />
                    </Button>
                    <Button vertical
                        style={ form.formContainer }
                        active = { this.state.footerAvtive === 2 }
                        onPress ={ this.setActiveFooter(2) }
                    >
                        <Icon name= 'md-map' />
                    </Button>
                    <Button vertical
                        style={ form.formContainer }
                        active = { this.state.footerAvtive === 3 }
                        onPress ={ this.setActiveFooter(3) }
                    >
                        <Icon name= 'md-volume-high' />
                    </Button>
                </FooterTab>
            </Footer>
        </Container>

    )
  }
}
