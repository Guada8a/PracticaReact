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
            password: '',
            emailValid: true,
            passwordValid: true
        };
    }
    getLogin = () => {
        console.warn('Hola desde el router');
    }
    onPressLearnMore = () => {
        //Validar email
        let emailValid = this.state.email !== '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(this.state.email);
        //Validar password
        let passwordValid =
            this.state.password !== '' &&
            this.state.password.length >= 8 &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(this.state.password);
        
        this.setState({ emailValid: emailValid, passwordValid: passwordValid });
        
        if (emailValid === false || passwordValid === false) {
            Alert.alert('Error', 'Revisa los campos');
            return;
        }
        //Mostrar el valor del input en un alert en caso si esta en movil, y un alert normal si es en web
        if (Platform.OS === 'web') {
            alert(`Wada8a \n Email: ${this.state.email}, password: ${this.state.password}`);
        } else {
            Alert.alert("Wada8a",
                "Email: "+this.state.email + " & password: "+this.state.password,[
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],{ cancelable: false }
            );
        }
    }
    onChange = (value) => {
        console.warn(`El switch cambió a: ${value}`);
        this.setState({ switchValue: value });
    }
    handleEmailChange = email => {
        this.setState({ email: email, emailValid: true });
    };
    handlePasswordChange = password => {
        this.setState({ password: password, passwordValid: true });
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
                    style={[styles.input, !this.state.emailValid && styles.inputError]}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder='Password'
                    onChangeText={this.handlePasswordChange}
                    value={this.state.password}
                    style={[styles.input, !this.state.passwordValid && styles.inputError]}
                    secureTextEntry
                />
                <Button
                    title='Iniciar Sesión'
                    onPress={this.onPressLearnMore}
                    style={styles.loginButton}
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
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#7E7E7E',
        padding: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 2
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#841584',
        borderRadius: 30,
        fontSize: 16,
        padding: 10,
        alignContent: 'right',
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
