import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getArtist } from "./api-client";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";

export default class ArtistDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: null
        };
    }

    componentDidMount() {
        //Obtner con el nombre del artista
        getArtist(this.props.artist.name)
            .then(data => this.setState({ artist: data }))
            .catch(err => {
                console.warn("Error al recuperar los datos", err);
                this.showToast("Error al recuperar los datos", ToastAndroid.SHORT);
            });
    }

    render() {
        const artist = this.state.artist;
        if (!artist) return null;
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: artist.image[0]["#text"] }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{artist.name}</Text>
                    {/* Stats */}
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Icon name="md-heart" size={30} color="gray" />
                            <Text style={styles.count}>{artist.stats.listeners} seguidores</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon name="md-star" size={30} color="gray" />
                            <Text style={styles.count}>{artist.stats.playcount} reproducciones</Text>
                        </View>
                    </View>
                    {/* Bio */}
                    <Text style={styles.bio}>Biografía</Text>
                    <View style={styles.row}>
                        {/* Formatear para habilitir enlaces */}
                        <Text style={styles.count}>{artist.bio.summary}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => Actions.pop()}>
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Toma todo el espacio disponible
        backgroundColor: "lightgray",
        paddingTop: 70
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 20
    },
    name: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    bio: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    info: {
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 40,
        marginBottom: 15
    },
    iconContainer: {
        flex: 1,
        alignItems: "center"
    },
    count: {
        color: "gray",
        textAlign: "center"
    },
    button: {
        backgroundColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "white"
    },
    label: {
        textAlign: "center",
        marginBottom: 5
    }
});