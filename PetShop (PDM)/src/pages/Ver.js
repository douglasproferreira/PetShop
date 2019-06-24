import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconFe from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome'

export default class Ver extends Component {

    static navigationOptions = {
        title: 'Serviço - Detalhes',
    };

    state = {
        docs: {},
        user: ""
    };

    componentDidMount() {
        this.loadService();
    };

    loadService = async () => {

        const response = await api.get(`/service/${this.props.navigation.state.params.service._id}`);

        const details = response.data;

        this.setState({
            docs: details,
        });

    }

    handleDelete = () => {
        Alert.alert(
            'Deletar Serviço',
            'Tem certeza que deseja deletar este serviço?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        api.delete(`/service/${this.state.docs._id}`)

                        this.handleDeletedService()
                    }
                },
            ],
            { cancelable: false },
        );
    }

    handleDeletedService = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.espaco}>
                        <View style={styles.row}>
                            <Icon style={styles.icon} name="list" size={35} color="rgba(82, 113, 255, 0.8)" />
                            <Text style={styles.text}>Detalhamento do Serviço </Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <IconMaterial name="account-circle-outline" size={30} color="rgba(82, 113, 255, 0.8)" />
                            <Text style={styles.response}>{this.state.docs.responsavel}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.data}>Data: {this.state.docs.data}</Text>
                            <Icon name="calendar" size={20} color="rgba(82, 113, 255, 0.8)" />
                        </View>
                        <View style={styles.row}>
                            <IconM style={styles.top} name="pets" size={24} color="rgba(82, 113, 255, 0.8)" />
                            <Text style={styles.name}>Nome: {this.state.docs.name}</Text>
                            <IconM style={styles.top} name="pets" size={24} color="rgba(82, 113, 255, 0.8)" />
                        </View>
                        <View style={styles.comlumn}>
                            <IconF style={styles.i} name="list-alt" size={24} color="rgba(82, 113, 255, 0.8)" />
                            <Text style={styles.description}>Descrição: {this.state.docs.description}</Text>
                        </View>
                        <View style={styles.start}>
                            <View style={styles.row}>
                                <IconF style={styles.margin} name="money" size={24} color="rgba(82, 113, 255, 0.8)" />
                                <Text style={styles.valor}>Valor do Serviço: {this.state.docs.valor}</Text>
                            </View>
                            <View style={styles.row}>
                                <IconFe name="check-circle" size={24} color="rgba(82, 113, 255, 0.8)" />
                                <Text style={styles.status}>Status do Serviço: {this.state.docs.status}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity style={styles.button} onPress={this.handleDelete}>
                        <Text style={styles.buttonText}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: "rgba(82, 113, 255, 0.8)",
        height: 400,
        width: 330,
        shadowColor: "rgba(82, 113, 255, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4
    },

    container: {
        padding: 10,
        alignItems: 'center',
    },

    start: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 10
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    comlumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    data: {
        fontSize: 13,
        color: "#000",
        padding: 5,
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 15
    },

    name: {
        marginTop: 20,
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',

    },

    description: {
        padding: 8,
        fontSize: 15,
        color: '#000',
        textAlign: 'center'
    },

    button: {
        width: 180,
        height: 35,
        margin: 0,
        marginTop: 25,
        marginBottom: 5,
        backgroundColor: "#4BB0EE",
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    padding: {
        paddingRight: 3
    },

    text: {
        fontSize: 18,
        color: '#000'
    },

    response: {
        padding: 8,
        marginRight: 20,
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },

    valor: {
        marginTop: 80,
        padding: 5,
        fontSize: 15,
        color: "#000"
        
    },

    status: {
        padding: 5,
        fontSize: 15,
        color: "#000"
    },

    icon: {
        marginLeft: 20
    },

    margin: {
        marginTop: 80
    },

    top: {
        marginTop: 20
    },

    i: {
        marginTop: 25,
    },

    espaco: {
        padding: 10
    }
});

