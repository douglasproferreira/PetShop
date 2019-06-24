import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconPlus from 'react-native-vector-icons/Feather';
import IconPet from 'react-native-vector-icons/MaterialIcons';


export default class Home extends Component {

    static navigationOptions = {
        title: 'Serviços',
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1
        }
    };

    state = {
        docs: []
    };

    async componentDidMount() {
        this.subscribeToEvents();

        this.loadServices();
    }

    loadServices = async () => {
        const response = await api.get('/service');

        this.setState({ docs: response.data });
    }

    subscribeToEvents = () => {
        const io = socket("http://172.23.151.49:3000");

        io.on("service", data => {
            this.setState({ docs: [data, ...this.state.docs] });
        });

        io.on("delete", async () => {
            this.loadServices();
        })
    };

    handleNew = () => {
        this.props.navigation.navigate("Create")
    }

    handleHome = () => {
        this.props.navigation.navigate("Home")
    }

    handleUser = () => {
        this.props.navigation.navigate("User")
    }



    renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <IconPet style={styles.icon} name="pets" size={24} color="rgba(82, 113, 255, 0.8)" />
                <Text style={styles.name}>{item.name}</Text>
                <IconPet style={styles.icon} name="pets" size={24} color="rgba(82, 113, 255, 0.8)" />
            </View>
            <Text style={styles.service}>Info</Text>
            <Text style={styles.data}>Data: {item.data}</Text>
            <View style={styles.row}>
                <Text style={styles.description}>Status: {item.status}</Text>
            </View>
            <View style={styles.center}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.navigation.navigate("Ver", { service: item });
                }}>
                    <Text style={styles.buttonText}>Ver</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                />
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
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        marginVertical: 15,
        paddingTop: 10,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: "rgba(82, 113, 255, 0.8)",
        height: 180,
        shadowColor: "rgba(82, 113, 255, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    data: {
        textAlign: 'center',
        fontSize: 12
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 0
    },

    name: {
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',

    },

    description: {
        padding: 2.5,
        fontSize: 12,
        paddingRight: 15,
        paddingLeft: 15,
        color: '#000',
        textAlign: 'center'
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
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'flex-end',
        shadowColor: "black",
    },

    //icon : {
    //paddingRight: 15,
    //paddingLeft: 15
    //}

    service: {
        color: '#696969',
        textAlign: 'center',
        fontSize: 14,
        margin: 0,
        padding: 2.5
    },

});