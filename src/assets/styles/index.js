import EStyleSheet from 'react-native-extended-stylesheet';


export const selectLang =  EStyleSheet.create({
    mainView:{
        marginTop: -215,
        height: 200,
        backgroundColor:'#F5FCFF',
        margin:15,
        padding:10,
        borderRadius: 5,
    },
    backButtonView: {
        flex:1, 
        alignContent:'flex-end', 
        alignItems:'flex-end'
    },
    backButtonIcon: {
        marginRight:5, 
        fontSize:24,
        color : '#000'
    },
    langEn: {
        backgroundColor:'#2E9AFE',
        borderRadius:200,
        width:20, 
        height:20
    },
    langSv: {
        backgroundColor:'#FFFF00',
        borderRadius:200,
        width:20, 
        height:20
    },
    langEs: {
        backgroundColor:'#FF8000',
        borderRadius:200,
        width:20, 
        height:20
    },
    langDe: {
        backgroundColor:'#FF0000',
        borderRadius:200,
        width:20, 
        height:20
    },
    langFa: {
        backgroundColor:'#04B45F',
        borderRadius:200,
        width:20, 
        height:20
    },
    langAr: {
        backgroundColor:'#B45F04',
        borderRadius:200,
        width:20, 
        height:20
    },
})

export const pAudio =  EStyleSheet.create({
    fileInfo:{
        color : 'white',
        fontSize : 18
    },
    mainIconView: {
        flex:1,
        justifyContent: 'center' ,
        alignItems: 'center',
        marginTop:-70
    },
    playAudioView: {
        alignSelf:'center',
        marginTop:0
        
    },
    audioIcon: {
        marginTop:20,
        marginBottom: 50,
        fontSize:180 ,
        color : '#848484',
        margin:10
    },
    audioIconRun: {
        marginTop:20,
        marginBottom: 50,
        fontSize:180 ,
        color : '#F7F8E0',
        margin:10
    },
    playIcon: {
        fontSize:55 ,
        color : '$iconColor1',
        margin:10
    },
})

export const LoginByPhone =  EStyleSheet.create({
    topText:{
        flexDirection:'row',
        fontSize:16,
        color:'white',
        marginBottom:5
    },
    mainView: {
        flex:1,
        flexDirection:'row',
        marginBottom:5
    },
    inputStyle: {
       // placeholderTextColor: 'red',
        color:'white',
        fontSize:23
    },
    inputStyleAreaCode: {
        color:'#E6E6E6',
        fontSize:20,
        //marginTop:5
       // marginLeft: -60
    },
    authkeyInput: { 
        width:160 
    },
    areaInput: { 
        flex: 1,
        flexDirection:'row'
      
    },
    numberInput: { 
        marginTop: 9,
        width:175 
    },
    waitText: {
        fontSize:16,
        color:'white',
        marginTop:5,
        marginBottom:40 
    },
    acceptButton: {
        fontSize:42,
        color:'#045FB4',
        marginLeft:10,
        marginTop:15
    },
    showSpinner: {
        marginTop:-19,
        marginLeft:5
    }
})

export const showMapStyle = EStyleSheet.create({

    myPlace: {
        fontSize : 32,
        color: '#2E9AFE',
    },
    alarmPlace: { 
        fontSize : 30,
        color: '#FF8000', //Orange
    },
    alarmPlaceTel: {
        fontSize : 34,
        color: '#DF0101', //Red
    },
    alarmAccept: {
        fontSize : 34,
        color: '#2ECC71', //Green
    },
    helperPlace: {
        fontSize : 32,
        color: '#04B431', //more Green
    },
    headerLeftAlarm: {
        fontSize:30 ,
        color : 'red',
        marginLeft:10
    },
    alarmUserTel:{
        fontSize : 18,
        color: '#58ACFA',
    },
    helperCounter:{
        fontSize : 24,
        marginLeft: 20,
        color: 'green', 
    },
    testAlarmStatus: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
        letterSpacing: 3
    },
    recordIconStop: { 
        color: '$iconColor1', 
        fontSize:36 , 
        marginRight:10
    },
    recordIconStart: { 
        color: '#FF4000', 
        fontSize:36 , 
        marginRight:10
    }

})

export const UserInfo = EStyleSheet.create({
    helpIcon : {
        fontSize: 36,
        marginRight: 10,
        color: '$iconColor1'
    },
    userCode: {
        flex: 1,
        margin:20,
        borderRadius : 10,
        backgroundColor:'#FFFFFF', 
    },
    privateCodeStyle: {
        marginLeft: 10,
    },
    privateCode: {
        marginTop: 5,
        fontSize: 22,
        color: '#8A0808'
    },
    labelCodeStyle: {
        justifyContent: 'center' ,
        alignItems: 'center'
    },
    labelCode: {
        marginTop: 10,
        fontSize: 30
    },
    iconCode: {
        flexDirection:'row' ,
    },
    iconStyle: {
        fontSize:34,
        padding: 5,
        marginLeft: 10,
        marginRight: 10
    },
    iconStyle1: {
        fontSize:34,
        padding: 5,
        marginRight: 10,

    },
    topTitleStyle: {
        fontSize:18,
        color: 'white'
    }
})

export const AlarmForm = EStyleSheet.create({
    contentPosition: {
        flex : 1 ,
        justifyContent: 'center' ,
        alignItems: 'center'
    },
    AlarmCard: {
        width: '100%',
        padding:20,
        borderRadius : 10,
        marginTop: 2,
        marginLeft:7,
        marginRight:7,
        backgroundColor: '$bgColor', 
    },
    items: {
        flexDirection:'row' ,
        padding: 2
    },
    iconSize:{
        color: '$bgColor2',
        fontSize: 38
    },
    itemText:{
        padding: 5,
        marginLeft:15
    },
    topTextLabel:{
        fontSize : 19,
        color: '$textColor1',
    },
    textLabel:{
        fontSize : 19,
        color: '#FFF',
    },
    bottomStyle: {
        width: 200,
        backgroundColor: '$bgColor2', 
        elevation : 3,// Android
        shadowOffset : { width : -7 , height: 7},// IOS
        shadowOpacity : .2,// IOS
    },
    bottomText:{
        flex:1,
        margin:6,
        alignItems: 'center',
        justifyContent: 'center' ,
    },
    bottomTextS:{
        fontSize : 18,
        color: '$iconColor1',
        textAlign: "center"
    },
    bottomCounter:{
        fontSize : 24,
        color: '$iconColor1',
        textAlign: "center"
    },
    stopAlarm:{
        alignItems: 'center',
        backgroundColor: '$iconColor1',
        padding: 10
    },
})


export const SettingsForm = EStyleSheet.create({
    rowSetting: {
        flexDirection : 'row',
        flex : 1
    },
    rowIconSetting: {
        fontSize: 40,
        marginRight: 10,
        color: '$iconColor1'
    },
    rowTextSetting: {
        fontSize : 20,
        color: 'white',
        alignItems: 'flex-start',
        margin: 10,
    },
    helpIcon : {
        fontSize: 36,
        marginRight: 10,
        color: '$iconColor1'
    },
    helpIcon2 : {
        fontSize: 36,
        marginTop: 10,
        color: 'white'
    },
    formSetting : {
        paddingLeft:30,
        paddingRight: 30
    },
    codeName : {
        fontSize : 16,
        color: '#B40404',
        marginTop:15,
        marginBottom: -10

     },
    alarmLable : {
        fontSize : 16,
        color: 'white',
        margin: 5

     },
     appInfo : {
        fontSize : 14,
        color: '#F2F2F2',
        padding:1
     },
     termsInfo : {
        fontSize : 17,
        color: '#5858FA',
        marginTop:8
     },
    formLable : {
        fontSize : 20,
        color: 'white',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 0
     },
     telNummerInput: {
        fontSize:22,
        color: 'white'
    },
    settingBorder: {
        marginTop: 20,
        marginBottom: 10,
        borderBottomColor: '#2E2E2E',
        borderBottomWidth: 1
    }

})

export const HomeForm = EStyleSheet.create({
    helpIcon : {
        fontSize: 36,
        marginLeft: 10,
        color: '$iconColor1'
    },
    voiceRecord: {
        color: '$iconColor1', 
        fontSize:34, 
        marginLeft:10
    },
    buttonLable : {
        fontSize : 14,
        color: '$textColor1',
        alignSelf: 'center'
     },
     buttonItems : {
        marginTop: 15,
        marginBottom: 15
     },
     myPlaceButton : {
        width:150,
        height:35,
        marginBottom: 15,
        backgroundColor: '#585858',
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent:'center'
        
    },
    myPlaceButtonText: {
        fontSize : 15,
        color: 'white',
        letterSpacing: 2,
        alignSelf: 'center'

    },
    alarmButton: {
        marginTop: 50,
        flex : 1 ,
        justifyContent: 'center' ,
        alignItems: 'center'
    },
    alarmText: {
        fontSize : 16
    },
    headerAlarmIcon: {
        fontSize:34 ,
        color : 'red',
        marginLeft:10,
    },
    langTestAlarm: {
        margin: 10,
        flexDirection: 'row',
        //marginBottom:30
    },
    changeLang: {
        marginLeft:5,
        flexDirection: 'row',
        flex : 1,
    },
    changeLangText: {
        fontSize:16 ,
        color : '$textColor1',
        alignSelf:'flex-start'
       // marginLeft: 10
    },
    testAlarm: {
        flexDirection: 'row',
        flex: 1,
        marginRight:10,
        marginBottom:5,
    },
    testAlarmText: {
       //marginBottom:2,
        marginRight: 5,
        fontSize:14 ,
        color : '$textColor1'
    }
})

export const loginForm = EStyleSheet.create({
    personNummer : {
        marginTop: 110,
        paddingLeft: 38,
        paddingRight: 38
    },
    pesonNummerInput: {
        fontSize:28,
        color: 'white'
    },
    logginButton: {
        marginTop: 50,
        backgroundColor: '#2E2E2E',
        alignSelf: 'center',
    },
    logginFacebookButton: {
        marginTop: 150,
        backgroundColor: '#2E64FE',
        alignSelf: 'center',
    },
    logginPhoneButton: {
        marginTop: 20,
        backgroundColor: '#04B486',
        alignSelf: 'center',
    },
    logginGoogkeButton: {
        marginTop: 20,
        backgroundColor: '#FF4000',
        alignSelf: 'center',
    },
    logginButtonText: {
        fontSize : 14
    },
    termAndCondition: {
        flexDirection : 'row',
        marginTop : 30,
        marginLeft: 20
    },
    languageBot: {
        backgroundColor  : 'black'
    },
    languageAlign: {
        flex : 1,
        alignContent:'center',
        alignItems:'center',
    },
    languageImage: {
        margin: 10,
        alignSelf: 'center',
        width: 35,
        height: 35
    }

})

export const registerForm = EStyleSheet.create({
    formSetting : {
        paddingLeft:20,
        paddingRight: 30
    },
    submitButton : {
        marginTop: 30,
        backgroundColor: '#6E6E6E',
        alignSelf: 'center',
    },
    egText: {
        color:'#BDBDBD',
        marginTop:5,
        marginLeft:20
    },
    submitText : {
        fontSize : 16
     },
    skapaText : {
        fontSize:16,
        color: 'white',
        marginTop: 10,
        marginBottom: 10
    },
    wellcomeText : {
        fontSize:18,
        color: 'white',
    },
})

export const form = EStyleSheet.create({
    formContainer : {
        backgroundColor : '$bgColor2'
        
    },
    formHeaderAndroid:{
        backgroundColor : '$bgColor2',
       // marginTop:10,
        borderBottomWidth:0,
        elevation: 0,
    },
    formHeaderIOS:{
        backgroundColor : '$bgColor2',
       // marginTop:10,
        borderBottomWidth:0,
        elevation: 0,
    },
    pageSecoundView: {
        // marginLeft: 10,
        // marginRight: 10,
        backgroundColor : '$bgColor',
        flex : 1 ,
        justifyContent: 'center' ,
        alignItems: 'center',
        //borderRadius: 10
    },
    formTitle : {
        letterSpacing: 4,
        alignSelf: 'center',
        fontSize: 24,
        color: 'white'// '$textColor1'
    },
    formTitle2 : {
        letterSpacing: 4,
        alignSelf: 'center',
        fontSize: 20,
        color: 'white'// '$textColor1'
    },
    formTitleH : {
        alignSelf: 'center',
        fontSize: 16,
        color: '$textColor1'
    },
   StyleForm : {
       padding: 20
   },
    item : {
        borderRadius : 5,
        marginBottom:10,
        paddingRight:10,
        paddingLeft: 10
    },
    input : {
        fontSize:18,
        color: '#FFF'
    },
    inputEmpty : {
        fontSize:18,
        color: 'black',
        borderColor: 'red',
        borderBottomWidth:1
    },
    input2 : {
        fontSize:19,
        color: '$textColor1'
    },
    input3 : {
        fontSize:19,
        color: '$textColor1',
        fontWeight: 'bold'
    },
    inputNum : {
        fontSize:22,
        color: '$textColor1'
    },
    error : {
        fontSize:12 ,
        color : '#ed2f2f',
        marginBottom: 10
    },
    headerRightIcon: {
        fontSize:36 ,
        color : '$iconColor1',
        marginRight:10
    },
    headerRightIcon2: {
        fontSize:36 ,
        color : '$iconColor1',
        marginRight:20
    },
    headerRightIcon3: {
        fontSize:36 ,
        color : '$iconColor1',
        marginRight:12
    },
    headerLeftIcon: {
        fontSize:34 ,
        color : '$iconColor1',
        marginLeft:10
    },
    validateTrue: {
        color : 'green',
    },
    validateFalse: {
        color : 'red',
    }
});

export const index = EStyleSheet.create({
    splashContainer : {
        backgroundColor : '$bgColor2'
    },
    companyText : {
        alignSelf: 'center',
        color : 'white',
        fontSize : 15
    },
    appFirstLogo: {
        flex : 1 ,
        justifyContent: 'center' ,
        alignItems: 'center'
    },
    appTextLogo: {
        letterSpacing: 3, 
        fontSize:36, 
        color:'white'
    }
});


export default styles = {
    index
};