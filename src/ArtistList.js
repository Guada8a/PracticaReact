import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
import ListView from 'deprecated-react-native-listview';
import ArtistBox from "./ArtistBox";
import ArtistDetailView from "./ArtistDetailView";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";

export default class ArtistList extends Component<Props> {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const artists = props.artists;
        this.state = {
            dataSource: ds.cloneWithRows(artists)
        };
    }

    updateDataSource = (data) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }

    componentDidMount() {
        this.updateDataSource(this.props.artists);
    }

    componentWillUnmount() {
        // FIX: Cannot read property 'artists' of undefined (evaluating 'this.props.artists')
        if (this.props) {
            const artists = this.props.artists;
            if (artists) {
                this.updateDataSource(artists);
            }
        }
    }
    
    handlePress(artist) {
        Actions.artistDetail({ artist });
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(artist) => {
                        return (
                            <TouchableOpacity onPress={() => this.handlePress(artist)}>
                            {/* <TouchableOpacity > */}
                                <ArtistBox artist={artist} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
    },
    h1:{
        fontSize: 30,
        textAlign: "center",
        color: "#333",
        fontWeight: "bold",
        paddingVertical: 10
    },
    input: {
        height: 50,
        backgroundColor: "#fff",
        margin: 10,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: "skyblue",
        padding: 10,
        margin: 10,
        textAlign: "center",
        color: "#fff",
        fontSize: 18
    }
});