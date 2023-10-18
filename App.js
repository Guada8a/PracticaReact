import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Alert, Button, Switch, StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            textValue: ''
        };
    }
    onPressLearnMore = () => {
        console.warn('Presionaste el boton');
        //Mostrar el valor del input en un alert
        Alert.alert(`${this.state.textValue}`,`\n Esto es lo que escribiste`);
    }
    onChange = (value) => {
        console.warn(`El switch cambió a: ${value}`);
        this.setState({ switchValue: value });
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textValue: text})}
                    value={this.state.textValue}
                />
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={this.state.switchValue ? '#f5dd4b' : '#f4f3f4'}
                    padding={20}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.onChange(this.state.switchValue ? false : true)}
                    value={this.state.switchValue}
                />
                <Button
                    onPress={this.onPressLearnMore}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Text>Changes update!!!</Text>
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
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: '80%',
        marginBottom: 20,
        fontSize: 16, // Agregar un tamaño de fuente adecuado
    },
});
