import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import ArtistList from './ArtistList';
import { getMusicData } from './api-client';

export default class HomeView extends Component<Props>{
    state = {
        artists : null
    }
    componentDidMount() {
        getMusicData()
        .then(data => this.setState({ artists: data }))
        .catch(err => {
            console.warn('Error al recuperar los datos', err);
            this.showToast('Error al recuperar los datos', ToastAndroid.SHORT);
        });
    }
    render() {
        const artists = this.state.artists;
        return (
            <View style={styles.container}>
                {artists && <ArtistList artists={artists} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        paddingTop: 10
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        margin: 10,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        margin: 10,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18
    }
});