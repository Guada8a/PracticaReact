import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Alert, Button, Switch, StyleSheet, Text, Input, TextInput, View, Image } from 'react-native';
import logo from '../assets/logo.png';
import { Actions } from 'react-native-router-flux';
// Platform es una variable que nos permite saber en que plataforma estamos corriendo la app
import { Platform } from 'react-native';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            textValue: '',
            email: '',
            password: ''
        };
    }
    getLogin = () => {
        console.warn('Hola desde el router');
    }
    onPressLearnMore = () => {
        console.warn('Presionaste el boton');
        //Validar email
        if (this.state.email === '') {
            Alert.alert('Email', 'Debes ingresar un email');
            return;
        }
        //Validar password
        if (this.state.password === '') {
            Alert.alert('Password', 'Debes ingresar una contraseña');
            return;
        }
        //Validar email y password
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(this.state.email) === false) {
            Alert.alert('Email', 'Debes ingresar un email valido');
            return;
        }
        if (this.state.password.length < 8) {
            Alert.alert('Password', 'Debes ingresar una contraseña de al menos 8 caracteres');
            return;
        }
        //Mostrar el valor del input en un alert en caso si esta en movil, y un alert normal si es en web
        if (Platform.OS === 'web') {
            alert(`Wada8a \n Email: ${this.state.textValue}, password: ${this.state.password}`);
        } else {
            Alert.alert("Wada8a",
                "Email: "+this.state.email + " & password: "+this.state.password,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }
    onChange = (value) => {
        console.warn(`El switch cambió a: ${value}`);
        this.setState({ switchValue: value });
    }
    handleEmailChange = email => {
        this.setState({ email: email });
    };
    handlePasswordChange = password => {
        this.setState({ password: password });
    };
    handleLogin = () => {
        // Lógica de login aquí
        console.log('Email:', this.state.email);
        console.log('Password:', this.state.password);
    };
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder='Email'
                    onChangeText={this.handleEmailChange}
                    value={this.state.email}
                    containerStyle={styles.input}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder='Password'
                    onChangeText={this.handlePasswordChange}
                    value={this.state.password}
                    containerStyle={styles.input}
                    secureTextEntry
                />
                <Button
                    title='Iniciar Sesión'
                    buttonStyle={styles.loginButton}
                    onPress={this.onPressLearnMore}
                />
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#841584',
        padding: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#841584',
        borderRadius: 10,
        fontSize: 16
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    label: {
        color: 'black',
        marginBottom: 5,
        alignItems: 'center',
        fontSize: 16
    }
});
