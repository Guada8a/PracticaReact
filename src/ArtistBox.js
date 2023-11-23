import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class ArtistBox extends Component {
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
        flexDirection: 'row',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
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