import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginView from './src/LoginView';
import HomeView from './src/HomeView';
import ArtistDetailView from './src/ArtistDetailView';

class App extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        // Lógica para manejar el botón de retroceso
        // Por ejemplo, puedes navegar hacia atrás si estás en una escena diferente a "login"
        if (Actions.currentScene !== 'login') {
            Actions.pop();
            return true;
        }
        return false;
    }

    render() {
        const scenes = Actions.create(
            <Scene key="root">
                <Scene key="login" component={LoginView} title="Login" hideNavBar />
                <Scene key="home" component={HomeView} title="Top Artistas" back />
                <Scene key="artistDetail" component={ArtistDetailView} title="Info" back />
            </Scene>
        );

        return <Router scenes={scenes} />;
    }
}

export default App;
