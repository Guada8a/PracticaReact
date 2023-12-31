import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, Pressable, TextInput, ToastAndroid, View, Image } from 'react-native';
import logo from '../assets/logo.png';
import { Actions } from 'react-native-router-flux';

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
        const { email, password } = this.state;
        let emailValid = true;
        let passwordValid = true;

        if (email === '' && password === '') {
            this.showToast('Los datos NO son válidos. Intentálo de nuevo', ToastAndroid.SHORT);
            emailValid = false;
            passwordValid = false;
        } else {
            if (email === '') {
                this.showToast('Debes ingresar un email', ToastAndroid.LONG);
                emailValid = false;
            } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email))) {
                this.showToast('El email no es válido', ToastAndroid.LONG);
                emailValid = false;
            }

            if (password === '' && email !== '') {
                this.showToast('Debes ingresar una contraseña', ToastAndroid.SHORT);
                passwordValid = false;
            } else {
                if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password))) {
                    this.showToast('La contraseña debe tener al menos una mayúscula, minúscula y un carácter especial', ToastAndroid.SHORT);
                    passwordValid = false;
                }
                if (password.length <= 8) {
                    this.showToast('La contraseña debe tener al menos 8 caracteres', ToastAndroid.LONG);
                    passwordValid = false;
                }
            }
        }

        this.setState({ emailValid, passwordValid });

        if (emailValid && passwordValid) {
            this.showToast('Los datos son válidos', ToastAndroid.LONG);
            this.handleLogin();
            Actions.home();
            
        }
    }

    showToast(message, duration) {
        ToastAndroid.showWithGravityAndOffset(message, duration, ToastAndroid.TOP, 25, 50);
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
        console.info('Login successful');
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>Iniciar Sesión</Text>
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
                {/* <Button
                    title='Iniciar Sesión'
                    onPress={this.onPressLearnMore}
                    style={styles.loginButton}
                /> */}
                <Pressable
                    onPress={this.onPressLearnMore}
                    style={styles.loginButton}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    h1: {
        marginTop: 50,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        marginLeft: 30,
        alignSelf: 'flex-start',
    },
    input: {
        width: '80%',
        marginBottom: 20,
        borderRadius: 10,
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
        backgroundColor: 'black',
        borderRadius: 10,
        fontSize: 16,
        paddingVertical: 20,
        paddingHorizontal: 50,
    },
    logo: {
        width: 150,
        height: 150,
    },
    label: {
        color: 'black',
        marginBottom: 5,
        alignItems: 'center',
        fontSize: 16
    }
});
