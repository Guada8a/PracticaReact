import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Button, Switch, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
        };
    }
    onPressLearnMore() {
        console.warn('Presionaste el boton');
    }
    onChange = (value) => {
        console.warn(`El switch cambió a: ${value}`);
        this.setState({ switchValue: value });
    }
    render() {
        return (
            <View style={styles.container}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={this.state.switchValue ? '#f5dd4b' : '#f4f3f4'}
                    padding={20}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.onChange(!this.state.switchValue)}
                    value={this.state.switchValue}
                />
                <Button
                    onPress={this.onPressLearnMore}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Text>Changes update!!!j</Text>
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
});
