import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconPlus from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage';


export default class Create extends Component {

    static navigationOptions = {
        title: 'Novo Serviço',
        headerTitleStyle: {
            textAlign: 'center',
        }
    };

    state = {
        responsavel: "",
        name: "",
        description: "",
        status: "Pendente",
        data: "",
        valor: ""
    }

    handleSubmit = async () => {
        if (!this.state.name.length
            || !this.state.description.length
            || !this.state.status.length
            || !this.state.data.length
            || !this.state.valor.length) {
            Alert.alert(
                'Campos em Branco',
                'Preencha todos os campos para efetuar o cadastro!',
                [
                    {
                        text: 'OK', onPress: () => {
                            return;
                        }
                    },
                ],
                { cancelable: false },
            );
        } else {
            const response = await api.post('service', {
                responsavel: await AsyncStorage.getItem("user"),
                name: this.state.name,
                description: this.state.description,
                status: this.state.status,
                data: this.state.data,
                valor: this.state.valor
            })

            this.handleAlert();
        }


    }

    handleNew = () => {
        this.props.navigation.navigate("Create")
    }

    handleHome = () => {
        this.props.navigation.navigate("Home")
    }

    handleAlert = () => {
        Alert.alert(
            'Cadastrar Serviço',
            'Cadastro Realizado com Sucesso!',
            [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate("Home")
                    }
                },
            ],
            { cancelable: false },
        );
    }

    handleUser = () => {
        this.props.navigation.navigate("User")
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.column}>
                    <KeyboardAvoidingView style={styles.container} behavior='position'>
                        <View style={styles.icon}>
                            <Icon name="add-to-list" size={50} color="rgba(82, 113, 255, 0.8)" />
                        </View>
                        <View style={styles.center}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do Pet"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                value={this.state.name}
                                onChangeText={this.setState({ name: e.target.value })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Descrição do serviço"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                value={this.state.description}
                                onChangeText={text => this.setState({ description: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Data do Atendimento: dd/mm/aaaa"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                value={this.state.data}
                                onChangeText={text => this.setState({ data: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Valor do serviço: R$"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                value={this.state.valor}
                                onChangeText={text => this.setState({ valor: text })}
                            />
                            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                                <Text style={styles.buttonText}>
                                    Salvar
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    column: {
        flexDirection: 'column',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    row: {
        flexDirection: 'row'
    },

    button: {
        width: 200,
        height: 44,
        marginTop: 50,
        backgroundColor: "#4BB0EE",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20
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

    padding: {
        paddingRight: 3
    },

    input: {
        borderWidth: 1,
        borderColor: "rgba(82, 113, 255, 0.8)",
        width: 300,
        height: 44,
        paddingHorizontal: 15,
        marginTop: 35,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#FFF'
    },

    icon: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});