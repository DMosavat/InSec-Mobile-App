import pbf from './PublicFunction';

export default {

    setLngType(lngType){
        pbf.setAsyncStorageData('lngType' ,lngType)
    },

    async getLngType(){

        try {
            let lngType= await pbf.getAsyncStorageData('lngType')
            return lngType.toString()
        } catch (error) {
            return 'en'         
        }
    },
 
    async showMapAlarmLang(labelName){
  
        let lngType = await this.getLngType()
  
        switch (labelName) {
            case 'userSendPublicAlarm':
                if( lngType === 'en' )
                //<--- English texts
                    return 'The public sending of alarms is currently disabled for all users. Only private alarms can be sent to the people in your private contact list.'
                //--- End English texts --->
              
                else if( lngType === 'sv' )
                //<--- Swedish texts
                   return 'Den Publika larmfunktionen är för närvarande inaktiverad. Just nu kan endast larm skickas till ditt privata nätverk av stödpersoner.'
                //--- End Swedish texts --->
              
                else if( lngType === 'es' )
                //<--- Spanish texts
                   return 'La opción envío de alarma pública se encuentra en estos momentos desactivada. Únicamente se podrán mandar alarmas privadas a las personas que se encuentren en tu lista de contactos.'
  
                //--- End Spanish texts --->
  
                else if( lngType === 'de' )
                //<--- German texts
                   return ''
                //--- End German texts --->
  
                else if( lngType === 'fa' )
                //<--- Persian texts
                   return `ارسال آلارم به صورت عمومی در حال حاضر برای تمامی کاربران مسدود شده است. شما می توانید فقط به گروه خصوصی خود آلارم ارسال کنید.`
                //--- End Persian texts --->
  
                else if( lngType === 'ar' )
                //<--- Arabic texts
                   return ''
                //--- End Arabic texts --->
  
            default:
               return ''
       }
   },
  
   async ttSpeechLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngAlarmSend: 'Alarm sent by InSec!.',
               lngSelectOne: 'Select one of these Alarms.',
               lngEditProfile: 'Edit your profile.',
               lngEditSetting: 'Edit your InSec settings.',
               lngWelcome: 'Welcome to InSec!.',
               lngSentAlarm: `Your alarm has been sent for requesting help. If you do not need help!!!. Please delete this alarm.`
           }
            //--- End Swedish texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngAlarmSend: 'Alarm har skickats av InSec!.',
               lngSelectOne: 'Välj ett av dessa larm.',
               lngEditProfile: 'Redigera din profil.',
               lngEditSetting: 'Redigera dina InSec inställningar.',
               lngWelcome: 'Välkommen till InSec!.',   
               lngSentAlarm: `Ditt larm har skickats för att få hjälp. Om du inte behöver hjälp!!!. Ta bort det här larmet.`      
            }
            //--- End Swedish texts --->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngAlarmSend: 'Alarma enviada por InSec!',
                lngSelectOne: 'Selecciona una de estas alarmas',
                lngEditProfile: 'Edita tu perfil',
                lngEditSetting: 'Edita tus ajustes para InSec',
                lngWelcome: 'Bienvenido a InSec',    
                lngSentAlarm: `Su alarma ha sido enviada para solicitar ayuda. Si no necesitas ayuda !!!. Por favor, elimine esta alarma.`    
             }
            //--- End Spanish texts --->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngAlarmSend: '',
                lngSelectOne: '',
                lngEditProfile: '',
                lngEditSetting: '',
                lngWelcome: '',   
                lngSentAlarm: ``    
             }
            //--- End German texts --->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngAlarmSend: 'آلارم از طرف برنامه ارسال شد.',
                lngSelectOne: 'یکی از انواع آلارم را انتخاب نمایید.',
                lngEditProfile: 'اطلاعات شخصی خود را ویرایش نمایید.',
                lngEditSetting: 'اطلاعات مربرط به تنظیمات برنامه را ویرایش نمایید.',
                lngWelcome: 'به برنامه اینسک خوش آمدید.', 
                lngSentAlarm: ``    
             }
            //--- End Persian texts --->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngAlarmSend: '',
                lngSelectOne: '',
                lngEditProfile: '',
                lngEditSetting: '',
                lngWelcome: '',        
                lngSentAlarm: ``    
             }
            //--- End Arabic texts --->
       }
   },
   async positionLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngFindLocation: 'Access to your location is not available. Please check your location service.',
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngFindLocation: 'Ingen tillgång till din plats. Vänligen granska din plats service.',
           }
           //--- End Swedish texts --->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngFindLocation: 'Sin acceso a tu ubicación. Por favor, revisa tus ajustes de localización.',
            }
            //--- End Spanish texts --->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngFindLocation: '',
            }
            //--- End German texts --->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngFindLocation: 'به موقعیت مکانی شما دسترسی وجود ندارد. لطفا تنظیمات آنرا برای برنامه فعال نمایید.',
            }
            //--- End Persian texts --->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngFindLocation: '',
            }
            //--- End Arabic texts --->
       }
   },
   async loginLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngFacebookAlarm: 'Have you read and agree to the Terms?',
               lngFacebook: '     LOG IN WITH FACEBOOK     ',
               lngsetTermAndCondition: 'Read and accepted the Terms.',
               lngPhoneNumber: 'LOG IN WITH PHONE NUMBER',
               lngFaildLogin: 'Login failed. Please try again'
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngFacebookAlarm: 'Har du läst och godkänt Villkoren?',
               lngFacebook: '      LOGGA IN MED FACEBOOK       ',
               lngsetTermAndCondition: 'Läst och accepterar Villkoren.',
               lngPhoneNumber: 'LOGGA IN MED TELEFONNUMMER',
               lngFaildLogin: 'Inloggningen misslyckades. Vänligen försök igen'
           }
           //--- End Swedish texts --->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngFacebookAlarm: 'Has leído y aceptado los términos y condiciones de uso?',
                lngFacebook: 'Inicia sesión con Facebook',
                lngsetTermAndCondition: 'He leído y aceptado los términos y condiciones de uso',
                lngPhoneNumber: 'Con tu número de teléfono',
                lngFaildLogin: 'Error en el inicio de sesión, inténtalo otra vez por favor'
            }
            //--- End Spanish texts --->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngFacebookAlarm: '',
                lngFacebook: '',
                lngsetTermAndCondition: '',
                lngPhoneNumber: '',
                lngFaildLogin: ''
            }
            //--- End German texts --->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngFacebookAlarm: 'آیا شرایط و قوانین استفاده از برنامه را مطالعه و تایید می کنید؟',
                lngFacebook: '        ورود با فیسبوک       ',
                lngsetTermAndCondition: 'شرایط و قوانین را مطالعه و تایید نمایید',
                lngPhoneNumber: '    ورود به شماره تلفن    ',
                lngFaildLogin: 'ورود به برنامه دجار مشکل شد، لطفا مجددا سعی نمایید.'
            }
            //--- End Persian texts --->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngFacebookAlarm: '',
                lngFacebook: '',
                lngsetTermAndCondition: '',
                lngPhoneNumber: '',
                lngFaildLogin: ''
            }
            //--- End Arabic texts --->
       }
   },
   async loginByPhone(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngInsertValidMSG: 'Insert valid mobile number.',
               lngSendAfter20MSG: 'The activation code has been sent. If you have not received the code within 60 seconds, please try again.',
               lngPhoneNumber: 'Phone Number:',
               lngWaitForActiv: 'Please wait for the activation code for at least 60 seconds before you try again.',
               lngActicekey: 'Code',
               lngLoginButton: 'Log In',
               lngActiveKeyErro: 'The SMS verification code used to login is invalid. Please resend the verification code again and be sure to enter the correct code.',
               lngVerificationError: 'Verification error with your phone number. Please try again later.'
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
        //<--- Swedish texts
           return {
               lngInsertValidMSG: 'Ange ett giltigt mobilnummer.',
               lngSendAfter20MSG: 'Aktiveringskoden har skickats. Om du inte får koden inom 60 sekunder, var vänlig försök igen.',
               lngPhoneNumber: 'Telefonnummer:',
               lngWaitForActiv: 'Vänligen vänta på aktiveringskoden i minst 60 sekunder innan du försöker igen.',
               lngActicekey: 'Kod',
               lngLoginButton: 'Logga in',
               lngActiveKeyErro: 'SMS-verifieringskoden som använts för inloggning är ogiltig. Vänligen skicka verifieringskoden via SMS igen och var noga med att mata in uppgifterna korrekt.',
               lngVerificationError: 'Det gick inte att verifiera ditt telefonnummer. Var vänlig och försök igen senare.'
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngInsertValidMSG: 'Introduce un número de teléfono válido',
                lngSendAfter20MSG: 'El código de activación ha sido enviado, si no has recibido el código en 60 segundos inténtalo otra vez por vez por favor',
                lngPhoneNumber: 'Número de teléfono',
                lngWaitForActiv: 'Por favor, espera el código de activación al menos 60 segundos antes de intentarlo de nuevo.',
                lngActicekey: 'Código',
                lngLoginButton: 'Inicia sesión',
                lngActiveKeyErro: 'El SMS con el código de verificación que has usado para inciar sesión es inválido. Por favor, envía de nuevo el código de verificación y asegúrate de introducir la información correctamente.',
                lngVerificationError: 'Se ha producido un error con el código de verificación. Por favor, inténtalo de nuevo más tarde.'
            }
            //--- End Spanish texts --->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngInsertValidMSG: '',
                lngSendAfter20MSG: '',
                lngPhoneNumber: '',
                lngWaitForActiv: '',
                lngActicekey: '',
                lngLoginButton: '',
                lngActiveKeyErro: '',
                lngVerificationError: ''
            }
            //--- End German texts --->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngInsertValidMSG: 'لطفا شماره تلفن معتبر وارد نمایید',
                lngSendAfter20MSG: 'کد فعال سازی برای شما ارسال شد، اگر تا یک دقیقه آنرا دریافت نکردید، لطفا مجددا سعی نمایید.',
                lngPhoneNumber: 'شماره تلفن:',
                lngWaitForActiv: 'لطفا یک دقیقه تا دریافت کد فعال سازی صبر و سپس مجدد سعی نمایید.',
                lngActicekey: 'کد',
                lngLoginButton: 'ورود',
                lngActiveKeyErro: 'کد فعال سازی استفاده شده اشتباه است، لطفا آنرا بررسی و در صورت نیاز مجدد کد را دریافت نمایید.',
                lngVerificationError: 'خطا در تایید شما کد شما، لطفا مجدد سعی نمایید.'
            }
            //--- End Persian texts --->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngInsertValidMSG: '',
                lngSendAfter20MSG: '',
                lngPhoneNumber: '',
                lngWaitForActiv: '',
                lngActicekey: '',
                lngLoginButton: '',
                lngActiveKeyErro: '',
                lngVerificationError: ''
            }
            //--- End Arabic texts --->
       }
   },
   async shareAppLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngShareSub: 'Help to increase safety and security for everyone by inviting your friends and family.',
               lngSharePri: `Share your private code with your friends and create a network for yourself.`,
               lngBack: 'Back',
               lngMessage:'InSec has been developed to increase safety and security for everyone in society.',
               lngSubject: 'Safety and security for everyone in society.',
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngShareSub: 'Hjälp till att öka säkerheten för alla! Bjud in dina vänner och din familj.',
               lngSharePri: `Dela din privata kod med dina vänner och skapa ett nätverk för dig själv.`,
               lngBack: 'Tillbaka',
               lngMessage: 'InSec tillverkades och utvecklades för att öka säkerheten och tryggheten för alla i samhället.',
               lngSubject: 'Trygghet och säkerhet för alla i samhället.',
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngShareSub: 'Ayuda a incrementar la seguridad para todos! Invita a tu familia y amigos',
                lngSharePri: `Comparte tu código privado con tus amigos y crea una red para ti.`,
                lngBack: 'Atrás',
                lngMessage: 'InSec fue creado y desarrollado para incrementar la seguridad de todos los integrantes de nuestra sociedad.',
                lngSubject: 'Una sociedad más segura para todos',
            }
            //--- End Spanish texts --->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngShareSub: '',
                lngSharePri: ``,
                lngBack: '',
                lngMessage: '',
                lngSubject: '',
            }
            //--- End German texts --->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngShareSub: 'به همدیگر کمک کنیم تا محیطی امن برای همگی بسازیم، دوستان و خانواده خود را برای استفاده از برنامه دعوت کنید.',
                lngSharePri: `کد خصوصی خود را با دوستان خود به اشتراک بگذارید و برای خود یک شبکه ایجاد کنید.`,                
                lngBack: 'برگشت',
                lngMessage: 'برنامه اینسک برای ایجاد یک جامعه امن برای همگی طراحی شده است.',
                lngSubject: 'امنیت برای همه در اجتماع',
            }
            //--- End Persian texts --->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngShareSub: '',
                lngSharePri: ``,
                lngBack: '',
                lngMessage: '',
                lngSubject: '',
            }
            //--- End Arabic texts --->
       }
   },
   
   async homeLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngToastMsg: 'Thank you, my problem has been solved.',
               lngMyPlace: 'MY LOCATION',
               lngNeedHelp: 'DO YOU NEED HELP?',
               lngUseAlarm: 'USE ONLY IN AN EMERGENCY SITUATION!',
               lngTestAlarm: 'TEST ALARM',
               lngTestAlarmToastF: 'NOTE! The actual alarm has been activated! If the alarm is sent publicly, everyone nearby with an InSec account can activated, and it will be your responsibility.',
               lngTestAlarmToastT: 'TEST MODE ACTIVATED! You can now send test alarms to get to know the applications functionality better.',
            }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngToastMsg: 'Tack, mitt problem har lösts.',
               lngMyPlace: 'MIN PLATS',
               lngNeedHelp: 'BEHÖVER DU HJÄLP?',
               lngUseAlarm: 'ANVÄND BARA I EN NÖDSITUATION!',
               lngTestAlarm: 'TESTA LARM',
               lngTestAlarmToastF: 'OBS! Det verkliga larmet har aktiverats! Om larmet skickas offentligt, kommer alla i närheten som har den här applikationen att få larmet. Om du skickar larm i onödan kommer det att vara på eget ansvar.',
               lngTestAlarmToastT: 'TESTLÄGE AKTIVERAT! Du kan nu skicka testlarm för att lära känna applikationens funktionalitet bättre.',
            }
             //<--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngToastMsg: 'Gracias, mi problema ha sido resuelto',
                lngMyPlace: 'MI UBICACIÓN',
                lngNeedHelp: '¿NECESITAS AYUDA?',
                lngUseAlarm: 'UTILIZAR SOLO EN CASO DE EMERGENCIA',
                lngTestAlarm: 'PROBAR ALARMA',
                lngTestAlarmToastF: '¡IMPORTANTE! La alarma está activada! Si la alarma se envía de forma pública, todas las personas que se encuentren cerca de ti y tengan esta aplicación la recibirán',
                lngTestAlarmToastT: '¡MODO DE PRUEBA ACTIVADO! Ahora podrás enviar la alarma de prueba y familiarizarte con todas las funciones de la aplicación.',
             }
            //<--- End Spanish texts --->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngToastMsg: '',
                lngMyPlace: '',
                lngNeedHelp: '',
                lngUseAlarm: '',
                lngTestAlarm: '',
                lngTestAlarmToastF: '',
                lngTestAlarmToastT: '',
             }
            //<--- End German texts --->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngToastMsg: 'ممنون از شما، مشکل من برطرف شد.',
                lngMyPlace: ' موقعیت من ',
                lngNeedHelp: 'آیا شما به کمک نیاز دارید؟',
                lngUseAlarm: 'فقط در موارد اضطراری استفاده نمایید.',
                lngTestAlarm: 'آلارم آزمایشی',
                lngTestAlarmToastF: 'توجه! ارسال آلارم فعال شد! هر آلارمی که شما ارسال کنید توسط دیگران دریافت خواهد شد و مسئولیت آن با شما خواهد بود.',
                lngTestAlarmToastT: 'ارسال آزمایشی آلارم فعال شد. در این حالت آلارمهای ارسالی توسط کسی دریافت نخواهد شد.',
             }
            //<--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngToastMsg: '',
                lngMyPlace: '',
                lngNeedHelp: '',
                lngUseAlarm: '',
                lngTestAlarm: '',
                lngTestAlarmToastF: '',
                lngTestAlarmToastT: '',
             }
            //<--- End Arabic texts ->
       }
   },
   async alarmLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngClickOn: 'Click on the alarm that you need.',
               lngPublic: 'Public',
               lngNetworkCode: 'Network',
               lngPrivate: 'Private',
               lngHeart: 'HEART PROBLEM',
               lngFire: 'FIRE HAZARD',
               lngFAid: 'FIRST AID',
               lngCompany: 'COMPANY',
               lngAfterTen: 'After ten seconds, a standard alarm request will be sent.',
               lngStopN: '    STOP NOTIFICATION    ',
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngClickOn: 'Klicka på det alarm du behöver.',
               lngPublic: 'Publik',
               lngNetworkCode: 'Nätverk',
               lngPrivate: 'Privat',
               lngHeart: 'HJÄRTSTARTARE',
               lngFire: 'BRANDFARA',
               lngFAid: 'FÖRSTA HJÄLPEN',
               lngCompany: 'SÄLLSKAP',
               lngAfterTen: 'Efter tio sekunder kommer ett standard alarm att skickas.',
               lngStopN: '    STOPPA ANMÄLAN    ',
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngClickOn: 'Pulsa sobre el tipo de alarma que necesites',
                lngPublic: 'Público',
                lngNetworkCode: '  Red  ',
                lngPrivate: 'Privado',
                lngHeart: 'Problema cardíaco',
                lngFire: 'Peligro por incendio',
                lngFAid: 'Primeros auxilios',
                lngCompany: 'Compañía',
                lngAfterTen: 'Pasados diez segundos, una alarma estándar será enviada ',
                lngStopN: 'Detener la notificación',
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //-- German texts
            return {
                lngClickOn: '',
                lngPublic: '',
                lngNetworkCode: '',
                lngPrivate: '',
                lngHeart: '',
                lngFire: '',
                lngFAid: '',
                lngCompany: '',
                lngAfterTen: '',
                lngStopN: '',
            }
            //-- End German texts ->
  
        }else if( lngType === 'fa' ){
            //-- Persian texts
            return {
                lngClickOn: 'بر روی آلارمی که نیاز دارید کلیک نمایید.',
                lngPublic: 'عمومی',
                lngNetworkCode: 'شبکه',
                lngPrivate: 'خصوصی',
                lngHeart: 'مشکل قلبی',
                lngFire: 'آتش سوزی',
                lngFAid: 'کمک های اولیه',
                lngCompany: 'نیاز به همراهی',
                lngAfterTen: 'بعد از ده ثانیه آلارم عمومی به صورت اتوماتیک ارسال خواهد شد.',
                lngStopN: '      توقف ارسال آلارم       ',
            }
            //-- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //-- Arabic texts
            return {
                lngClickOn: '',
                lngPublic: '',
                lngNetworkCode: '',
                lngPrivate: '',
                lngHeart: '',
                lngFire: '',
                lngFAid: '',
                lngCompany: '',
                lngAfterTen: '',
                lngStopN: '',
            }
            //-- End Arabic texts ->
       }
   },
   async registerLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngWelcome: 'Welcome',
               lngMakeAccount: 'CREATE AN ACCOUNT:',
               lngCreatAcc: 'CREATE ACCOUNT',
               lngPNumber: 'PERSONAL IDENTIFICATION NUMBER',
               lngTelNumber: 'PHONE NUMBER'
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //-- Swedish texts
           return {
               lngWelcome: 'Välkommen',
               lngMakeAccount: 'SKAPA ETT KONTO:',
               lngCreatAcc: 'SKAPA KONTO',
               lngPNumber: 'PERSONNUMMER',
               lngTelNumber: 'TELEFONNUMMER'
           }
            //-- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //-- Spanish texts
            return {
                lngWelcome: 'Bienvenido/a',
                lngMakeAccount: 'Crear una cuenta',
                lngCreatAcc: 'Crear cuenta',
                lngPNumber: 'Número de identificación personal',
                lngTelNumber: 'Número de telefono'
            }
            //-- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //-- German texts
            return {
                lngWelcome: '',
                lngMakeAccount: '',
                lngCreatAcc: '',
                lngPNumber: '',
                lngTelNumber: ''
            }
            //-- End German texts ->
  
        }else if( lngType === 'fa' ){
            //-- Persian texts
            return {
                lngWelcome: 'خوش آمدید',
                lngMakeAccount: 'ایجاد حساب کاربری شما',
                lngCreatAcc: 'ایجاد حساب کاربری',
                lngPNumber: 'شماره شناسایی شخصی',
                lngTelNumber: 'شماره تلفن'
            }
            //-- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //-- Arabic texts
            return {
                lngWelcome: '',
                lngMakeAccount: '',
                lngCreatAcc: '',
                lngPNumber: '',
                lngTelNumber: ''
            }
            //-- End Arabic texts ->
       }
   },
  
   async playAudioLang(){
        let lngType = await this.getLngType()
        if ( lngType === 'en' ){
            //<--- English texts
            return {
                lngDeleteFile: 'Are you sure you want to delete this file?',
            }
           //--- End English texts --->
  
        }else if ( lngType === 'sv' ){
            //-- Swedish texts
            return {
                lngDeleteFile: 'Är du säker på att du vill radera den här filen?',
            }
             //-- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //-- Spanish texts
            return {
                lngDeleteFile: '¿Estás seguro de que quieres eliminar este archivo?',
            }
            //-- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //-- German texts
            return {
                lngDeleteFile: '',
            }
            //-- End German texts ->
  
        }else if( lngType === 'fa' ){
            //-- Persian texts
            return {
                lngDeleteFile: 'آیا شما مطمئن هستید که قصد پاک نمودن این فایل را دارید؟',
            }
            //-- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //-- Arabic texts
            return {
                lngDeleteFile: '',
            }
            //-- End Arabic texts ->
        }
   },
  
   async settingLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngPrivateName: 'Make private network',
               lngPrivateCode: 'Private Code',
               lngPublicName: 'Find Network',
               lngPublicCode: 'Network',
               lngAlarmText: 'Alarm Text',
               lngPublicAlarm: 'Get Public Alarms',
               lngPrivateLocation: 'Private Location',
               lngVoiceRec: 'Voice Recognition',
               lngInsecAssis: 'InSec Assistant',
               lngDeleteAcc: 'I want to delete my account',
               lngRecordVoice: 'Voice Recording',
               lngShakeAlarm: 'Shake Alarm',
               lngAppInfo: 'App Info',
               lngInsecHelp: 'InSec Help',
               lngInsecVillkor: 'InSec Terms',
               lngIntPolicy: 'InSec Privacy Policy',
               lngAboutUs: 'About us',
               lngContactUs: 'Contact us',
               lngCopyRight: 'All rights reserved',
               lngDeleteAccount: 'Are you sure you want to delete your account?',
               lngRateMsg: 'If you like InSec, please take a moment to rate it.',
               lngAutoMode: 'Auto Theme',
               lngDarkMode: 'Dark Mode'
          
            }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //-- Swedish texts
           return {
               lngPrivateName: 'Skapa privat nätverk',
               lngPrivateCode: 'privat Kod',
               lngPublicName: 'Hita Nätverk',
               lngPublicCode: 'Nätverk',
               lngAlarmText: 'Larmtext',
               lngPublicAlarm: 'Få Publika Alarm',
               lngPrivateLocation: 'Privat plats',
               lngVoiceRec: 'Röstigenkänning',
               lngInsecAssis: 'InSec Assistent',
               lngRecordVoice: 'Röstinspelning',
               lngShakeAlarm: 'Shake alarm',
               lngDeleteAcc: 'Jag vill radera mitt konto',
               lngAppInfo: 'App Info',
               lngInsecHelp: 'InSec hjälp',
               lngInsecVillkor: 'InSec Villkor',
               lngIntPolicy: 'InSec Integritetspolicy',
               lngAboutUs: 'Om oss',
               lngContactUs: 'Kontakta oss',
               lngCopyRight: 'Alla rättigheter förbehållna',
               lngDeleteAccount: 'Är du säker på att du vill radera ditt konto?',
               lngRateMsg: 'Om du gillar InSec, var snäll att ta det ta en stund att betygsätta det.', 
               lngAutoMode: 'Auto tema',
               lngDarkMode: 'Mörkt läge'                    
           
            }
             //-- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //-- Spanish texts
            return {
                lngPrivateName: 'Hacer red privada',
                lngPrivateCode: 'Código',
                lngPublicName: 'Encontrar Red',
                lngPublicCode: 'Red',
                lngAlarmText: 'Texto de la alarma',
                lngPublicAlarm: 'Recibir alertas públicas',
                lngPrivateLocation: 'Localización privada',
                lngVoiceRec: 'Reconocimiento por voz',
                lngInsecAssis: 'Asistente InSec',
                lngRecordVoice: 'Grabación de voz',
                lngShakeAlarm: 'Shake alarm',
                lngDeleteAcc: 'Quiero eliminar mi cuenta',
                lngAppInfo: 'Información de la aplicación',
                lngInsecHelp: 'InSec Ayuda',
                lngInsecVillkor: 'Términos de InSec',
                lngIntPolicy: 'Política de integridad InSec',
                lngAboutUs: 'Quienes somos',
                lngContactUs: 'Contáctanos',
                lngCopyRight: 'Todos los derechos reservados',
                lngDeleteAccount: '¿Estás seguro de que deseas eliminar tu cuenta?',
                lngRateMsg: 'Si InSec te gusta, por favor, tómate un segundo para escribir una reseña',      
                lngAutoMode: 'Tema automático',
                lngDarkMode: 'Modo oscuro'                 
            
             }
            //-- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //-- German texts
            return {
                lngPrivateName: '',
                lngPrivateCode: '',
                lngPublicName: '',
                lngPublicCode: '',
                lngAlarmText: '',
                lngPublicAlarm: '',
                lngPrivateLocation: '',
                lngVoiceRec: '',
                lngInsecAssis: '',
                lngRecordVoice: '',
                lngShakeAlarm: '',
                lngDeleteAcc: '',
                lngAppInfo: '',
                lngInsecHelp: '',
                lngInsecVillkor: '',
                lngIntPolicy: '',
                lngAboutUs: '',
                lngContactUs: '',
                lngCopyRight: '',
                lngDeleteAccount: '',
                lngRateMsg: '',                     
            
             }
            //-- End German texts ->
             
        }else if( lngType === 'fa' ){
            //-- Persian texts
            return {
                lngPrivateName: 'ساختن شبکه خصوصی',
                lngPrivateCode: 'کد خصوصی',
                lngPublicName: 'جستجوی شبکه',                
                lngPublicCode: 'شبکه',
                lngAlarmText: 'کلمه آلارم',
                lngPublicAlarm: 'دریافت آلارم عمومی',
                lngPrivateLocation: 'اشتراک موقعیت',
                lngVoiceRec: 'تشخیص صدا',
                lngInsecAssis: 'دستیار برنامه',
                lngRecordVoice: 'ضبط صدا',
                lngShakeAlarm: 'آلارم با لرزش',
                lngDeleteAcc: 'من می خواهم حساب کاربری خود را پاک کنم',
                lngAppInfo: 'اطلاعات برنامه',
                lngInsecHelp: 'راهنمای برنامه',
                lngInsecVillkor: 'قوانین و مقررات ',
                lngIntPolicy: 'حریم خصوصی ',
                lngAboutUs: 'درباره برنامه',
                lngContactUs: 'تماس با ما',
                lngCopyRight: 'تمام حقوق این برنامه محفوظ است',
                lngDeleteAccount: 'آیا در مورد حذف حساب خود اطمینان دارید؟',
                lngRateMsg: 'اگر این برنامه را دوست دارید، لطفا با کمی وقت به برنامه رای بدهید.',     
                lngAutoMode: 'تم اتوماتیک',
                lngDarkMode: 'تم شب'                   
            
             }
            //-- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //-- Arabic texts
            return {
                lngPrivateName: '',
                lngPrivateCode: '',
                lngPublicName: '',
                lngPublicCode: '',
                lngAlarmText: '',
                lngPublicAlarm: '',
                lngPrivateLocation: '',
                lngVoiceRec: '',
                lngInsecAssis: '',
                lngRecordVoice: '',
                lngShakeAlarm: '',
                lngDeleteAcc: '',
                lngAppInfo: '',
                lngInsecHelp: '',
                lngInsecVillkor: '',
                lngIntPolicy: '',
                lngAboutUs: '',
                lngContactUs: '',
                lngCopyRight: '',
                lngDeleteAccount: '',
                lngRateMsg: '',                     
            
             }
            //-- End Arabic texts ->
       }
   },
   async showMapLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngCheckAlarmMSG: 'Please check this alarm status before returning to Main Page.',
               lngDelAllAlarm: 'Are you sure you want to remove all alarms?',
               lngDelOneAlarm: 'Are you sure you want to remove this alarm?',
               lngCancelAlarm: 'Are you sure you want to cancel your current alarm?',
               lngTestAlarm: 'Test Alarm!',
               lngCallMSG: `You can't call this user!`,
               lngAcceptMSG: 'You accepted this user’s Alarm!',
               lngNoPrivateHelper: `You don't have any private code to send alarm in private mode.`
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //-- Swedish texts
           return {
               lngCheckAlarmMSG: 'Vänligen kontrollera denna larmstatus innan du återgår till huvudsidan,.',
               lngDelAllAlarm: 'Är du säker på att du vill radera alla alarm?',
               lngDelOneAlarm: 'Är du säker på att du vill radera det här larmet?',
               lngCancelAlarm: 'Är du säker på att du vill avbryta ditt nuvarande alarm?',
               lngTestAlarm: 'TESTA LARM!',
               lngCallMSG: `Det går inte att ringa till den här användaren!`,
               lngAcceptMSG: 'Du accepterade den här användarens alarm!',
               lngNoPrivateHelper: `Du har ingen privat kod för att skicka larm i privat läge.`
           }
            //-- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //-- Spanish texts
            return {
                lngCheckAlarmMSG: 'Por favor, comprueba el estado de esta alarma antes de regresar al menú principal',
                lngDelAllAlarm: '¿Estás seguro de que deseas eliminar todas las alarmas?',
                lngDelOneAlarm: '¿Estás seguro de que deseas eliminar esta alarma?',
                lngCancelAlarm: '¿Estás seguro de que quieres cancelar esta alarma?',
                lngTestAlarm: '¡Prueba la alarma!',
                lngCallMSG: 'No puedes llamar a este usuario!',
                lngAcceptMSG: 'Has aceptado la alarma de este usuario!',
                lngNoPrivateHelper:'No tienes ningún código privado para mandar la alarma en modo privado'
            }
            //-- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //-- German texts
            return {
                lngCheckAlarmMSG: '',
                lngDelAllAlarm: '',
                lngDelOneAlarm: '',
                lngCancelAlarm: '',
                lngTestAlarm: '',
                lngCallMSG: ``,
                lngAcceptMSG: '',
                lngNoPrivateHelper: ``
            }
            //-- End German texts ->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngCheckAlarmMSG: 'لطفا وضعیت این آلارم را قبل از بازگشت بررسی نمایید.',
                lngDelAllAlarm: 'آیا در مورد حذف تمام آلارمهااطمینان دارید؟',
                lngDelOneAlarm: 'آیا در مورد حذف این آلارم اطمینان دارید؟',
                lngCancelAlarm: 'آیا در مورد انصراف از آلارم خود اطمینان دارید؟',
                lngTestAlarm: 'آلارم آزمایشی',
                lngCallMSG: `شما نمی توانید با این کاربر تماس بگیرید`,
                lngAcceptMSG: 'شما درخواست کمک این کاربر را تایید نمودید.',
                lngNoPrivateHelper: `شما هیج کد خصوصی در تنظمیات برنامه برای ارسال آلارم خصوصی ایجاد نکرده اید.`
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngCheckAlarmMSG: '',
                lngDelAllAlarm: '',
                lngDelOneAlarm: '',
                lngCancelAlarm: '',
                lngTestAlarm: '',
                lngCallMSG: ``,
                lngAcceptMSG: '',
                lngNoPrivateHelper: ``
            }
            //--- End Arabic texts ->
       }
   },
   async userInfoLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngChangePrCode: 'By changing your code, anyone who has your code will lose the ability to send private alarms to you. Are you sure?',
               lngFillInfo: 'You cannot send an alarm before first filling in your personal information.',
               lngUserProfile: 'USER PROFILE:',
               lngPerNum: 'PERSONAL NUMBER',
               lngUserName: 'NAME',
               lngUserTel: 'PHONE NUMBER',
               lngUserEmail: 'EMAIL ADDRESS',
               lngPriCode: 'Private Code:'
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngChangePrCode: 'Genom att ändra din kod kommer alla som har din kod att förlora möjligheten att skicka privata larm till dig. Är du säker?',
               lngFillInfo: 'Du kan inte skicka larm förrän du fyllt i din personliga information.',
               lngUserProfile: 'ANVÄNDARPROFIL:',
               lngPerNum: 'PERSONNUMMER',
               lngUserName: 'NAMN',
               lngUserTel: 'TELEFONNUMMER',
               lngUserEmail: 'E-POST',
               lngPriCode: 'Privat Kod:'
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngChangePrCode: 'Al cambiar tu código, todas las personas que tengan tu código perderán la capacidad de poder enviarte alarmas privadas. ¿Estás seguro? ',
                lngFillInfo: 'No puedes enviar una alarma antes de rellenar tu información personal',
                lngUserProfile: 'Perfil de usuario',
                lngPerNum: 'Documento Nacional de Identidad ',
                lngUserName: 'Nombre de usuario',
                lngUserTel: 'Número de teléfono',
                lngUserEmail: 'Dirección de correo electrónico',
                lngPriCode: 'Código privado:'
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngChangePrCode: '',
                lngFillInfo: '',
                lngUserProfile: '',
                lngPerNum: '',
                lngUserName: '',
                lngUserTel: '',
                lngUserEmail: '',
                lngPriCode: ''
            }
            //--- End German texts ->
    
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngChangePrCode: 'با تغییر کد خصوصی کسی قادر به ارسال آلارم به شما با کد قدیمی شما نخواهد بود.',
                lngFillInfo: 'قبل از کامل نمودن اطلاعات شخصی امکان ارسال آلارم برای شما وجود نخواهد داشت.',
                lngUserProfile: 'مشخصات کاربر',
                lngPerNum: 'کد شناسایی',
                lngUserName: 'نام',
                lngUserTel: 'شماره تلقن',
                lngUserEmail: 'ایمیل',
                lngPriCode: 'کد شخصی'
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngChangePrCode: '',
                lngFillInfo: '',
                lngUserProfile: '',
                lngPerNum: '',
                lngUserName: '',
                lngUserTel: '',
                lngUserEmail: '',
                lngPriCode: ''
            }
            //--- End Arabic texts ->
       }
   },
   async modelHomeLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngFillInfo: 'You cannot send an alarm before first entering your personal information.',
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngFillInfo: 'Du kan inte skicka ett larm förrän du fyllt i dina personliga uppgifter.',
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngFillInfo: 'No puedes enviar una alarma antes de haber introducido tus datos personal',
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngFillInfo: '',
            }
            //--- End German texts ->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngFillInfo: 'قبل از تکمیل اطلاعات شخصی قادر به ارسال آلارم نخواهید بود.',
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngFillInfo: '',
            }
            //--- End Arabic texts ->
       }
   },
   async modelSplashLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngInternetConect: 'Check your internet connection and restart the application.',
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngInternetConect: 'Kontrollera din internetanslutning och starta om applikationen.',
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngInternetConect: 'Revisa tu conexión a internet y reinicia la aplicación',
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngInternetConect: ''
            }
            //--- End German texts ->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngInternetConect: 'لطفا ارتباط خود با اینترنت را بررسی نمایید و سپس برنامه را مجدد راه اندازی نمایید.'
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngInternetConect: ''
            }
            //--- End Arabic texts ->
  
       }
   },
   async modelShowAlarmLang(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
           //<--- English texts
           return {
               lngBlockUser: 'You cannot send alarms because you are blocked. Please contact the support team for more information.',
               lngBlockMore: 'You are blocked because you have exceeded the amount of alarms that are allowed for one day',
               lngInterConn: 'You have problems with internet connection or location permission. Ensure that they function correctly in order to enable sending alarms'
           }
           //--- End English texts --->
    
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngBlockUser: 'Du kan inte skicka larm eftersom du är blockerad. Vänligen kontakta support för mer information.',
               lngBlockMore: 'Du är blockerad för att du har uppnått gränsen för antal skickade larm per dag.',
               lngInterConn: 'Du har problem med internetuppkoppling eller platstjänst. Var vänlig och säkerställ att dessa fungerar korrekt så att du kan skicka alarm'
           }
            //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngBlockUser: 'No puedes enviar alarmas ya que has sido bloqueado. Por favor, contacta a nuestro equipo técnico para saber más',
                lngBlockMore: 'Has sido bloqueado porque has excedido el número de alarmas que puedes mandar en un día',
                lngInterConn: 'Tienes problemas de conexión a internet o permiso de localización. Asegúrate de que estos funcionan correctamente para poder enviar alarmas'
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngBlockUser: '',
                lngBlockMore: '',
                lngInterConn: ''
            }
            //--- End German texts ->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngBlockUser: 'شما نمی توانید آلارم ارسال کنید زیرا حساب شما مسدود شده است. لطفا برای اطلاعات بیشتر با تیم پشتیبانی تماس بگیرید.',
                lngBlockMore: 'شما مسدود شده اید زیرا بیش از میزان آلارم مجاز برای یک روز آلارم ارسال کرده اید.',
                lngInterConn: 'ارتباط شما با اینترنت و یا فعال بودن موقعیت مکانی شما دارای مشکل می باشد. به منظور فعال کردن ارسال آلارم، از عملکرد صحیح آنها اطمینان حاصل کنید'
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngBlockUser: '',
                lngBlockMore: '',
                lngInterConn: ''
            }
            //--- End Arabic texts ->
       }
   },
  
    async helpStartPage(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
      //<--- English texts
           return {
               lngStart1 :`Intelligent Security`,
               lngStart2 :`This application should be used for sending requests for help in various situations such as medical, fire, accidents, and more. There are various options for sending alarms in the application.`,
               lngStart3 :`NOTE! This application is intended to send alarms when you are experiencing some kind of an emergency. All users' alarms will be stored by the application. In the event of a false alarm, the responsibility rests on the sender of the alarm (or the person who owns the phone or the tablet that sent the alarm). Each case will be assessed individually to see if the alarm is considered an actual alarm or a false alarm. For more information, please read the "InSec Terms" and "InSec Privacy Policy" settings section of the application.`,
                lngExitPage:`If this is your first time using the app, please read the App help in the App settings section for how to use it.`
           }
      //--- End English texts --->
  
       }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngStart1: 'Intelligent Security',
               lngStart2 :`Denna applikation är till för att skicka förfrågningar om hjälp i olika situationer som medicinsk, säkerhet, brand, olyckor, mm. Det finns olika alternativ för att skicka larm i applikationen.`,
               lngStart3 :`OBS! Denna applikation är avsedd för att skicka larm när du är i fara, och alla användares larminformation kommer att lagras av applikationen. Vid eventuella fel alarm kommer ansvaret och följden att bäras av larmets avsändare (eller den som äger telefonen eller surfplattan som skickade larmet). Varje fall kommer enskilt att bedömas för att se om larmet anses vara ett onödigt eller ett falskt alarm. För mer information kan du läsa "InSec Villkoren" och "InSec Integritetspolicy" i inställningar i applikationen.`,
                lngExitPage:`Om det här är första gången du använder appen, läs App-hjälp i avsnittet App-inställningar för hur du använder den.`
           }
   //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngStart1: 'Intelligent Security',
                lngStart2: `La finalidad de esta aplicación es la de poder solicitar ayuda en caso de necesitarla. Ya se trate de una urgencia médica, un incendio, un accidente, o cualquier otro tipo de incidencia similar, InSec ofrece diferentes tipos de alarmas para poder hacer frente a cualquier emergencia`,
                lngStart3: `IMPORTANTE! Esta aplicación está diseñada para enviar alarmas en caso de tener que hacer frente a una emergencia. Todas las alarmas enviadas por los usuarios serán almacenadas por la aplicación. En caso de falsa alarma, la responsabilidad será de la persona que envió la alarma (o la persona que posee el teléfono o la tableta que envió la alarma). Cada caso será estudiado individualmente para así poder ver si la alarma puede ser considerada una alarma real o falsa. Para más información, por favor, lee “Términos de InSec” y “Política de privacidad InSec” en el menú de la aplicación`, 
                lngExitPage:`Si es la primera vez que usa la aplicación, lea la ayuda de la aplicación en la sección Configuración de la aplicación para saber cómo usarla.`
           
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngStart1: '',
                lngStart2: '',
                lngStart3: '',
                lngExitPage:``

            }
            //--- End German texts ->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngStart1: 'امنیت هوشمند',
                lngStart2: 'این برنامه باید برای ارسال درخواست های کمک در موقعیت های مختلف از جمله پزشکی ، آتش سوزی ، تصادفات و موارد دیگر استفاده شود. گزینه های مختلفی برای ارسال آلارم در برنامه وجود دارد.',
                lngStart3: 'توجه داشته باشید! این برنامه برای ارسال آلارم در هنگام تجربه نوعی مشکل در نظر گرفته شده است. هشدارهای همه کاربران توسط برنامه ذخیره می شوند. در صورت هشدار نادرست ، مسئولیت بر عهده فرستنده آلارم (یا شخصی که تلفن یا تبلتی را دارد که آلارم خطر را ارسال کرده است) است. هر آلارم به صورت جداگانه ارزیابی می شود تا مشخص شود که این آلارم واقعی یا تقلبی محسوب شود. برای اطلاعات بیشتر، لطفاً در بخش تنظیمات برنامه "قوانین و مقررات" و "سیاست حریم خصوصی" برنامه را مطالعه نمایید.',
                lngExitPage:`اگر اولین بار است که از این برنامه استفاده می نمایید، لطفا راهنمای برنامه را در قسمت تنظیمات برنامه مطالعه نمایید.`
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngStart1: '',
                lngStart2: '',
                lngStart3: '',
                lngExitPage:``
            }
            //--- End Arabic texts ->
       }
   },
  
   async helpAssistant(){
    
    let lngType = await this.getLngType()
    if ( lngType === 'en' ){
    //<--- English texts
        return {
            lngAssistant :`This is InSec assistant.
Please click on any button you need to see help.
Clicking on this button will return you to the App again.
If you have questions about the app, please send your question with your private code to this email.
support@insecapp.se`
        }
      //--- End English texts --->

     }else if ( lngType === 'sv' ){
        //<--- Swedish texts
        return {
            lngAssistant: `Det här är InSec-assistent.
Klicka på vilken knapp du behöver för att se hjälp.
Om du klickar på den här knappen kommer du tillbaka till programmet igen.
Om du har frågor om appen, skicka din fråga med din privata kod till den här e-postmeddelanden.
support@insecapp.se`,
        }
//--- End Swedish texts -->

     }else if( lngType === 'es' ){
         //<--- Spanish texts
         return {
            lngAssistant: `Este es el asistente de InSec.
Haga clic en cualquier botón que necesite para ver ayuda.
Al hacer clic en este botón, volverá al programa nuevamente.
Si tiene preguntas sobre la aplicación, envíe su pregunta con su código privado a este correo electrónico.
support@insecapp.se`
         }
         //--- End Spanish texts ->

     }else if( lngType === 'de' ){
         //<--- German texts
         return {
            lngAssistant: '',
         }
         //--- End German texts ->

     }else if( lngType === 'fa' ){
         //<--- Persian texts
         return {
            lngAssistant: `این دستیار InSec است.
لطفاً برای دیدن راهنمایی روی هر دکمه ای که نیاز دارید کلیک کنید.
با کلیک بر روی این دکمه ، شما مجدد به برنامه باز می گردید.
اگر در مورد برنامه سؤالی دارید ، لطفاً سؤال خود را با کد خصوصی خود به این ایمیل ارسال کنید.
support@insecapp.se`,
         }
         //--- End Persian texts ->

     }else if( lngType === 'ar' ){
         //<--- Arabic texts
         return {
             lngAssistant: '',
         }
         //--- End Arabic texts ->
    }

   },

   async helpWelcomePage(){
    
       let lngType = await this.getLngType()
       if ( lngType === 'en' ){
       //<--- English texts
           return {
               lngWelcome :`Welcome to InSec`,
               lngWait :`Please wait to create profile.`
           }
         //--- End English texts --->
  
        }else if ( lngType === 'sv' ){
           //<--- Swedish texts
           return {
               lngWelcome: 'Välkommen till InSec',
               lngWait :`Vänligen vänta med att skapa en profil.`
           }
   //--- End Swedish texts -->
  
        }else if( lngType === 'es' ){
            //<--- Spanish texts
            return {
                lngWelcome: 'Bienvenido a InSec',
                lngWait: 'Por favor, espera para poder crear un perfil',
            }
            //--- End Spanish texts ->
  
        }else if( lngType === 'de' ){
            //<--- German texts
            return {
                lngWelcome: '',
                lngWait: '',
            }
            //--- End German texts ->
  
        }else if( lngType === 'fa' ){
            //<--- Persian texts
            return {
                lngWelcome: 'به برنامه اینسک خوش آمدید',
                lngWait: 'لطفا تا زمان ایجاد حساب کاربری چند لحظه منتظر بمانید',
            }
            //--- End Persian texts ->
  
        }else if( lngType === 'ar' ){
            //<--- Arabic texts
            return {
                lngWelcome: '',
                lngWait: '',
            }
            //--- End Arabic texts ->
   }
  
 },
 async helpHomePage(){
    
    let lngType = await this.getLngType()
    if ( lngType !== 'sv' ){
    //<--- English texts
        return {
            lngMicClick :`The microphone icon at the top of the screen indicates that the user can send an alarm using Voice Commando. To activate the microphone, you must adjust this option in the settings section of the application. 
If you want to use this option, it is recommended to activate TEST ALARM on the Main Page to try it out.`,
            lngProfileClick :`View and change your user information in this section. The user private code is here.
The responsibility for providing false information lies with the user, and a consequence could be that your account gets deleted. 
For more information about the Terms, please read the InSec Terms and the InSec Privacy Policy in the program settings.`,  
            lngSettingClick :`All settings of the program are adjusted in this section. Make sure you carefully view and apply the settings before sending alarms.`,
            lngAlarmClick :`Send alarms by clicking on this section, and by clicking this option you can select the type of alarm in the next section. 
If you want to send a test alarm, activate TEST ALARM on the Main Page.`,
            lngPositionClick :`By clicking on this option, each user can view their location on the map via GPS.`,
            lngChangeLangSweEn :'Change the language of the application.',
            lngTestAlarm :`By activating this option, the user can send a test alarm. This alarm is not sent to anyone and is only intended for the user to familiarize themselves with the alarm functionality.`,
            lngPlayVoice: 'If you record audio when sending alarms, this section will be activated and you can listen to the recorded audio.',
            lngShareApp: 'InSec is developed in order to provide increased security in society and is free of charge. Share this app with friends and family with the help of this button.'
        }
      //--- End English texts --->

     }else if ( lngType === 'sv' ){
        //<--- Swedish texts
        return {
            lngMicClick :`Mikrofon-ikonen längst upp på skärmen indikerar att användaren kan skicka larm via Röstkommando. För att aktivera mikrofonenen måste du gå in i Inställningar och aktivera det alternativet. 
Om du vill använda Röstkommando, rekommenderas det att du först aktiverar TESTA LARM på Huvudsidan för att prova det.`,
            lngProfileClick :`Visa och ändra användarinformationen i den här sektionen. Användarens privata kod är här.
Ansvaret för uppgivandet av falsk information ligger hos användaren, och det är möjligt att ditt konto blir raderat. 
För mer information kan du läsa InSec Villkoren och InSec Integritetspolicy i inställningar.`,  
            lngSettingClick :`Alla inställningar för appen finns att hitta i denna sektionen. 
Se till att du noggrant justerar och tillämpar inställningarna innan du skickar ett larm.`,
            lngAlarmClick :`Skicka larm genom att klicka på den här knappen, och efter att du har klickat på knappen kan du välja typen av larm baserat på ditt behov av hjälp. 
Om du vill skicka ett test larm, tryck på TESTA LARM på Huvudsidan.`,
            lngPositionClick :`Genom att klicka på det här alternativet kan varje användare se sin position på kartan via GPS.`,
            lngChangeLangSweEn :'Ändra språk',
            lngTestAlarm :`Genom att aktivera den här knappen kan användaren skicka ett testlarm. Det här larmet skickas inte till någon.` ,
            lngPlayVoice: 'Om du spelar in ljud när du skickar larm aktiveras detta avsnitt och du kan lyssna på det inspelade ljudet.',
            lngShareApp: `Programmet är utformat för att utöka tryggheten och säkerheten i samhället och är gratis att ladda ner och använda. Du kan dela InSec med dina vänner och familj med hjälp av den här knappen.`
        }
        //--- End Swedish texts -->

    }

  },

  async helpUserInfo(){
    
    let lngType = await this.getLngType()
    if ( lngType !== 'sv' ){
    //<--- English texts
        return {
            lngBackClick :`Return to the main page of the Application.`,
            lngAcceptClick :`The information is saved by clicking on this option.`,
            lngKeyClick :`A new private code will be generated by clicking on this option.`,
            lngShareKey: 'Share your private code with friends and family.',
            lngCopyClick :`If you want to send your private code to someone else using other channels such as SMS, click on this option to copy the code.`,
            lngPrivateCode: `Anyone who has your private code can send you private alarms.`
        }
    //--- End English texts --->

     }else if ( lngType === 'sv' ){
        //<--- Swedish texts
        return {
            lngBackClick :`Tar dig tillbaka till huvudskärmen i appen`,
            lngAcceptClick :`Informationen sparas genom att klicka på den här knappen`,
            lngKeyClick :`En ny privat kod genereras när du klickar på den här knappen.`,
            lngCopyClick :`Om du vill skicka din privata kod till någon annan genom andra kanaler så som SMS, klickar du på den här knappen för att kopiera koden.`,
            lngShareKey: 'Dela din privata kod med vänner och familj.',
            lngPrivateCode: `Detta är din privata kod och alla som har den här koden kan ta emot dina privata larm.`
        }
        //--- End Swedish texts -->

    }

  },

  async helpSetting(){
    
    let lngType = await this.getLngType()
    if ( lngType !== 'sv' ){
    //<--- English texts
        return {
            lngBackClick :`Return to the Main Page of the Application.`,
            lngPrivateLocationClick: `By adjusting this section you can choose to hide or show your location service from the users who has your private code. If this option is turned off, your private contacts can only see your position when you accept their private alarm.`,
            lngPublicClick :`By activating this section, the user will receive all alarms that are sent publicly if you are in the near vicinity of the sender. If this option is disabled, the user only receives private alarms.`,
            lngVoiceClick :`By activating this option, the user turns on the Voice Activation mode for sending alarms. With the activation of this section, the microphone icon is visible in the upper left part of the Main Page.`,
            lngAssistantClick :`By activating this option, the user can use audio guidance in different parts in the application.`,
            lngAccountClick :`If the user wants to delete their InSec account, they can do so in this section. The user's alarm record(s) will be kept for one month, and then all information will be completely erased. Read the InSec Terms and the InSec Privacy Policy section for more information.`,
            lngSaveClick :`The information is saved by clicking on this option.`,
            lngPrivateDesc: `Each user can send alarms to up to five other users simultaneously. As soon as the alarm is sent, the sender can see the GPS position of those five users on the map which appears in the app once they have clicked on the notification. For this purpose, you must have received the uniquely generated private code from each of these users and enter them here.`,
            lngAlarmTextDesc: `With this application you can send your alarm using Voice Commando. For this purpose, you can enter your own word which must be spoken in order to activate the alarm. The word should be easy to identify by the application, such as ‘Help’. The default word is “SOS” and will work for all users. After selecting the word, activate the Voice Recognition option at the bottom of the settings page. This reveals the microphone icon in the upper-left part of the Main Page, and the alarm is sent by saying the word you’ve selected. To test this feature, you can enable the TEST ALARM option on the Main Page`,
            lngNetWorkDesc: 'With this network code, everyone within an organization who has inserted the same network code will receive all alarms from other users with the same network code. After entering the network code, by clicking the button next to it, the network name will be display at the top of the network code, if the code be correct.',
            lngVoiceRecord: 'If this option is enabled, InSec will automatically begin a sound-recording whenever an alarm is sent.',
            lngRateApp: 'This application is designed to provide community security and is free of charge. Please support us by rating InSec.',
            lngShakeDevice: `If you want to send an alarm by shaking your mobile device you must enable this option.`,
            lngAutoMode: `Automatically create a black theme from 21 to 6.`,
            lngDarkMode: `Selecting this option activates the black theme for the app.`
        } 
    //--- End English texts --->

     }else if ( lngType === 'sv' ){
        //<--- Swedish texts
        return {
            lngPrivateLocationClick: `Genom att justera det här alternativet kan du välja att visa eller dölja din plats service från användarna som har din privata kod. Om det här alternativet är inaktiverat, kan dina privata kontakter endast se din position ifall du accepterar deras privata larm.`,
            lngPublicClick :`Genom att aktivera den här inställningen kommer användaren att kunna ta emot larm som har skickats offentligt till alla användare inom en viss radie. Om det här alternativet är inaktiverat tar användaren endast emot privata larm.`,
            lngVoiceClick :`Genom att aktivera detta alternativ kan användaren skicka larm genom Röstkommando i applikationen. Vid aktivering så är mikrofonikonen synlig högst upp till vänster i applikationens Huvudmeny.`,
            lngAssistantClick :`Genom att aktivera den här inställningen så kan användaren använda Röstassistent i applikationens olika sektioner.`,
            lngAccountClick :`Om du vill radera ditt konto så väljer du det här alternativet. Innan ditt konto raderas så lagras dina uppgifter och eventuell larmhistorik under en månads tid. Därefter kommer all information att raderas fullständigt. Var vänlig och läs InSec’s Villkor och Integritetspolicy för mer information.`,
            lngSaveClick :`Informationen sparas genom att klicka på det här alternativet`,
            lngBackClick :`Tillbaka till huvudskärmen i programmet`,
            lngPrivateDesc: 'Varje användare kan skicka privata larm till upp till fem andra användare samtidigt. När larmet skickas kan avsändaren se positionen av dessa fem personer på kartan, samt att dessa personer kan se avsändarens position. För detta ändamål måste du ha fått den unika privata koden från alla dessa personer och sedan fört in varje privat kod här.',
            lngAlarmTextDesc: `Med den här applikationen kan du skicka ditt larm via Röstkommando. För detta ändamål kan du definiera ditt egna ord i den här sektionen. Ordet ska vara enkelt för applikation att identifiera, till exempel ordet “Help”. OBS! För närvarande är Röstkommando endast aktiverat för engelska ord. Standard ordet för att skicka larm är SOS och fungerar för alla användare. Efter att du har valt ordet, aktivera alternativet Röstigenkänning längre ner på inställningssidan. Detta aktiverar mikrofonikonen i programmets övre del på huvudsidan, och larmet skickas genom att säga det ord du har valt. För att testa den här funktionaliteten kan du aktivera TESTA LARM på Huvudskärmen.`,
            lngNetWorkDesc: 'Med den här koden inlagd får alla som är medlemmar i en organisation alla larm när en medlem skickar larm. När du har angett nätverkskoden, genom att klicka på knappen bredvid, visas nätverksnamnet högst upp i nätverkskoden, om koden är korrekt.',
            lngVoiceRecord: 'Om detta alternativ är aktiverat kommer InSec automatiskt att utföra röstinspelning när larmet skickas.',
            lngRateApp: 'Programmet är utformat för att utöka tryggheten och säkerheten i samhället och är gratis. Stötta gärna oss genom att betygsätta InSec.',
            lngShakeDevice: `Om du vill skicka larm via skakning av din mobila enhet måste du aktivera det här alternativet.`,
            lngAutoMode: `Skapa automatiskt ett svart tema från 21:00 till 06:00.`,
            lngDarkMode: `Om du väljer detta alternativ aktiveras det svarta temat för appen.`
        }   
        //--- End Swedish texts -->

    }

  }


 
}