import 'react-native-gesture-handler';
import React, { Component } from 'react';
import LoginView from './src/LoginView';
import { Actions, Scene, Router } from 'react-native-router-flux';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="login" component={LoginView} title="Login" initial={true} hideNavBar/>
    </Scene>
);

export default class App extends Component {true
    render() {
        return <Router scenes={scenes} />;
    }
}