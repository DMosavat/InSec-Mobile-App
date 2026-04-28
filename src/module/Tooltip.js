import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Text } from 'react-native'
import lng from './../module/Language';

export default class TooltipM extends React.PureComponent {

    constructor(props){
        super(props)
        this.state={
            toolTipVisible: false,
            helpText: ''
        }
    }

    componentDidMount(){

        this.setState({
            toolTipVisible: this.props.toolTipVisible,
        })

    }

    async componentDidUpdate(prevProps){
        
        if (this.props.toolTipVisible !== prevProps.toolTipVisible) {
            
            let helpText = ''

            if (this.props.objectName === 'lngAssistant'){
                let lngVal = await lng.helpAssistant()
                helpText =  lngVal.lngAssistant

            }else{

                switch (this.props.pageType) {
                    case 'home': helpText = await this.getHomePageHelp(); break;
                    case 'profile': helpText = await this.getProfilePageHelp(); break;
                    case 'setting': helpText = await this.getSettingPageHelp(); break;
                
                    default: helpText = ''
                }
            }

    
           this.setState({
                toolTipVisible: this.props.toolTipVisible,
                helpText
            })
        }
    }

    getHomePageHelp(){

        return  new Promise(async (resolve ) =>{
           
            let lngType = ''
            lngType = await lng.helpHomePage()

            switch (this.props.objectName) {
               
                case 'lngMicClick': resolve(lngType.lngMicClick)
                case 'lngProfileClick': resolve(lngType.lngProfileClick)
                case 'lngSettingClick': resolve(lngType.lngSettingClick)
                case 'lngPositionClick': resolve(lngType.lngPositionClick)
                case 'lngChangeLangSweEn': resolve(lngType.lngChangeLangSweEn)
                case 'lngTestAlarm': resolve(lngType.lngTestAlarm)
                case 'lngPlayVoice': resolve(lngType.lngPlayVoice)
                case 'lngShareApp': resolve(lngType.lngShareApp)
                case 'lngAlarmClick': resolve(lngType.lngAlarmClick)
                default:
                    resolve()
            }


        })
    }

    getProfilePageHelp(){

        return  new Promise(async (resolve ) =>{
           
            let lngType = ''
            lngType = await lng.helpUserInfo()

            switch (this.props.objectName) {
               
                case 'lngBackClick': resolve(lngType.lngBackClick)
                case 'lngAcceptClick': resolve(lngType.lngAcceptClick)
                case 'lngKeyClick': resolve(lngType.lngKeyClick)
                case 'lngShareKey': resolve(lngType.lngShareKey)
                case 'lngCopyClick': resolve(lngType.lngCopyClick)
                case 'lngPrivateCode': resolve(lngType.lngPrivateCode)
                default:
                    resolve()
            }


        })
    }

    getSettingPageHelp(){

        return  new Promise(async (resolve ) =>{
           
            let lngType = ''
            lngType = await lng.helpSetting()

            switch (this.props.objectName) {
               
                case 'lngBackClick': resolve(lngType.lngBackClick)
                case 'lngPrivateLocationClick': resolve(lngType.lngPrivateLocationClick)
                case 'lngPublicClick': resolve(lngType.lngPublicClick)
                case 'lngVoiceClick': resolve(lngType.lngVoiceClick)
                case 'lngAssistantClick': resolve(lngType.lngAssistantClick)
                case 'lngAccountClick': resolve(lngType.lngAccountClick)
                case 'lngSaveClick': resolve(lngType.lngSaveClick)
                case 'lngPrivateDesc': resolve(lngType.lngPrivateDesc)
                case 'lngAlarmTextDesc': resolve(lngType.lngAlarmTextDesc)
                case 'lngNetWorkDesc': resolve(lngType.lngNetWorkDesc)
                case 'lngVoiceRecord': resolve(lngType.lngVoiceRecord)
                case 'lngRateApp': resolve(lngType.lngRateApp)
                case 'lngShakeDevice': resolve(lngType.lngShakeDevice)
                case 'lngAutoMode': resolve(lngType.lngAutoMode)
                case 'lngDarkMode': resolve(lngType.lngDarkMode)
                default:
                    resolve()
            }


        })
    }

    closeTooltip= () =>{
        this.setState({ toolTipVisible: false })
        this.props.setToolTipVisible()
    }

    render(){

        return(
            <Tooltip
            isVisible={ this.state.toolTipVisible }
            content={<Text style={{ fontSize:16 }}>{ this.state.helpText }</Text>}
            placement= {this.props.placement}
            onClose={this.closeTooltip }
            >
            {this.props.children}
            </Tooltip>
        )
    }

}