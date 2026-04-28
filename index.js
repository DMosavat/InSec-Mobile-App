/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import codePush from "react-native-code-push";

// import { Client } from 'bugsnag-react-native';
//const bugsnag = new Client("678fc4867134b78bcf4f8877bf0419b3");
//const ReachApp = codePush({ installMode: codePush.InstallMode.IMMEDIATE })(App);

AppRegistry.registerComponent(appName, () => App);
