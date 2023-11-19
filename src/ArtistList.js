import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import ListView from 'deprecated-react-native-listview';
import ArtistBox from "./ArtistBox";
import ArtistDetailView from "./ArtistDetailView";
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

    componentWillUnmount(newProps) {
        if (newProps.artists !== this.props.artists) {
            this.updateDataSource(newProps.artists);
        }
    }
    
    handlePress(artist) {
        Actions.artistDetail({ artist });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={ styles.h1 }>Top Artistas</Text>
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
        backgroundColor: "#eee",
        paddingTop: 10
    },
    h1:{
        fontSize: 30,
        textAlign: "center",
        color: "#333",
        fontWeight: "bold"
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