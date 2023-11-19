import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class ArtistBox extends Component<Props> {
    render() {
        const { image, name } = this.props.artist;
        return (
            <View style={styles.artistBox}>
                <Image style={styles.image} source={{ uri: image }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    artistBox: {
        margin: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 2,
        borderRadius: 30,
        opacity: 0.9
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        marginLeft: 10
    },
    name: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'sans-serif-medium',
    }
});