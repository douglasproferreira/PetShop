import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconPlus from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

export default class Delete extends Component {
    static navigationOptions = {
        title: 'Meu Perfil',
    };

    state = {
        user: "",
    };

    componentDidMount() {
        this.loadUser();
    };

    loadUser = async () => {
        const user = await AsyncStorage.getItem('user')

        this.setState({ user: user })
    };

    handleLogOut = async () => {
        await AsyncStorage.clear();

        this.props.navigation.navigate("Login")
    }

    handleNew = () => {
        this.props.navigation.navigate("Create")
    }

    handleHome = () => {
        this.props.navigation.navigate("Home")
    }

    handleUser = () => {
        this.props.navigation.navigate("User")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.user}>
                    <IconF name="user-circle-o" size={120} color="rgba(82, 113, 255, 0.8)" />
                    <Text style={styles.text}>{this.state.user}</Text>
                    <TouchableOpacity style={styles.sair} onPress={this.handleLogOut}>
                        <IconPlus name="log-out" size={40} color="rgba(82, 113, 255, 0.8)"/>
                        <Text style={styles.sairText}>Sair</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.barra}>
                    <TouchableOpacity onPress={this.handleNew}>
                        <IconPlus name="plus" size={35} color="rgba(82, 113, 255, 0.8)" />
                        <Text>Novo</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.handleHome}>
                        <Icon name="home" size={35} color="rgba(82, 113, 255, 0.8)" />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleUser}>
                        <IconPlus name="user" size={35} color="rgba(82, 113, 255, 0.8)" />
                        <Text> User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    column: {
        flexDirection: 'column'
    },

    card: {
        marginHorizontal: 30,
        marginVertical: 15,
        paddingTop: 10,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: "rgba(82, 113, 255, 0.8)",
        height: 180,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 0
    },

    button: {
        width: 180,
        height: 35,
        margin: 0,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#4BB0EE",
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    barra: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'flex-end'
    },

    service: {
        color: '#696969',
        textAlign: 'center',
        fontSize: 14,
        margin: 0,
        padding: 2.5
    },

    user: {
        marginTop: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        marginTop: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    }, 
    sair: {
        marginTop: 90,
        marginBottom: 85
    },

    sairText: {
        fontSize: 16,
        margin: 5,
        color: 'black'
    }

});