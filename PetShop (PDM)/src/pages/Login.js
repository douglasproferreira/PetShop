import React, { Component } from 'react';

import { View, StyleSheet, TextInput, Image, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';


export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        username: ""
    }

    handleLogin = async () => {
        const { username } = this.state;

        if (!username.length) return;

        this.setUser(username);
    }

    setUser = async (username) =>{
        try {
            await AsyncStorage.setItem('user', `${username}`)
        } catch (e){
            console.log(e)
        }

        this.navigateToHome();
    }

    navigateToHome = () => {
        const resetAction = StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName: "Home"})
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        console.log(this.props)
        return (
            <KeyboardAvoidingView style={styles.container} behavior='position'>
                <View style={styles.pagina}>
                    <View style={styles.img}>
                        <Image style={styles.imagem}
                            source={require('./img/Petshop.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome de Usuário"
                            value={this.state.username}
                            onChangeText={text => this.setState({ username: text })}
                        />
                        </View>
                        <View style={styles.center}>
                        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "rgba(82, 113, 255, 0.8)",
        borderRadius: 20,
        width: 300,
        height: 44,
        paddingHorizontal: 15,
        marginTop: 30,
    },

    button: {
        width: 200,
        height: 44,
        marginTop: 30,
        backgroundColor: "#4BB0EE",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    imagem: {
        width: 300,
        height: 300
    },

    img: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
