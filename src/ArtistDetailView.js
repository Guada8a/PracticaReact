import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { getArtist } from "./api-client";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";

export default class ArtistDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: null,
            deezerImage: null
        };
    }

    componentDidMount() {
        const { name } = this.props.artist;
        getArtist(name)
            .then((data) => this.setState({ artist: data }))
            .catch((err) => {
                console.warn("Error al recuperar los datos", err);
                this.showToast("Error al recuperar los datos", ToastAndroid.SHORT);
            });
        
        // Obtener imagen de Deezer
        const deezerAPI = 'https://api.deezer.com/artist/';
        const nameRefactor = name.replace(/ /g, '-');
        fetch(`${deezerAPI}${nameRefactor}`)
            .then(response => response.json())
            .then(deezerData => this.setState({ deezerImage: deezerData.picture_big }))
            .catch(() => { });
    }

    formatNumber = (number) => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    render() {
        const { artist, deezerImage } = this.state;
        if (!artist) return null;

        return (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Image style={styles.image} source={{ uri: deezerImage || artist.image[5]['#text'] }} />
                        <Column>
                            <Text style={styles.name}>{artist.name}</Text>
                            <Text style={styles.id}>ID: {artist.mbid}</Text>
                        </Column>
                        <Row>
                            <IconContainer>
                                <Icon name="md-heart" size={30} color="red" />
                                <Text style={styles.count}>{this.formatNumber(artist.stats.listeners)} oyentes</Text>
                            </IconContainer>
                            <IconContainer>
                                <Icon name="md-play-circle" size={30} color="white" />
                                {/* CONDICIONAR STREAMABLE */
                                    artist.streamable === "0" ? <Text style={styles.count}>No Streamable</Text> : <Text style={styles.count}>{artist.streamable} Streamable</Text>
                                }
                            </IconContainer>
                            <IconContainer>
                                <Icon name="md-play" size={30} color="white" />
                                <Text style={styles.count}>{this.formatNumber(artist.stats.playcount)} reproducciones</Text>
                            </IconContainer>
                        </Row>
                    </View>
                    <Text style={styles.bio}>Biografía</Text>
                    <Row>
                        <Text style={styles.count1}>{artist.bio.summary}</Text>
                    </Row>
                    <Pressable style={styles.button} onPress={() => Actions.pop()}>
                        <Text style={styles.buttonText}>
                            <Icon name="md-arrow-back" size={30} color="white" />
                            Regresar
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        );
    }
}

const Column = ({ children }) => <View style={styles.column}>{children}</View>;

const Row = ({ children }) => (
    <View style={styles.row}>
        {children}
    </View>
);

const IconContainer = ({ children }) => (
    <View style={styles.iconContainer}>{children}</View>
);

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        
    },
    c1: {
        marginBottom: 0
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.3, 
        resizeMode: 'cover', 
        borderRadius: 10,
    },
    id: {
        fontSize: 10,
        textAlign: "center",
        marginBottom: 6,
        color: "white"
    },
    name: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    bio: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 10,
        fontWeight: "bold",
        textAlign: "start",
    },
    info: {
        marginBottom: 20,
        // Dar efecto mica
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: "rgba(25, 25, 26, 0.96)",
        borderRadius: 10,
        marginHorizontal: 3,
        paddingHorizontal: 10,
        paddingVertical: 40
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 40,
        marginBottom: 15,
    },
    iconContainer: {
        flex: 1,
        alignItems: "center",
        marginLeft: 2,
        marginRight: 2,
    },
    count: {
        color: "white",
        textAlign: "center",
    },
    count1: {
        color: "black",
        textAlign: "justify",
        marginHorizontal: 2,
    },
    button: {
        backgroundColor: "black",
        borderRadius: 10,
        fontSize: 12,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignSelf: "center",
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
    },
});
