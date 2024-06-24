// LoginScreen.js
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env'; 

const LoginScreen = () => {
    const [hidePass, setHidePass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email) {
            Alert.alert('Error', 'El campo de correo electrónico es requerido.');
            return;
        }
        if (!password) {
            Alert.alert('Error', 'El campo de contraseña es requerido.');
            return;
        }

        try {
            const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('role', data.role); // Guarda el rol del usuario
            if (data.role === 'admin') {
                navigation.navigate('AdminTabs');
            } else {
                navigation.navigate('WorkerTabs');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            let errorMessage = 'Hubo un problema al intentar iniciar sesión. Por favor, intenta de nuevo.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>¡Préstamos Diarios!</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico:"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholderTextColor="#666"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña:"
                        secureTextEntry={hidePass}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setHidePass(!hidePass)}
                    >
                        <Ionicons name={hidePass ? "eye-off" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.forgotpwdContainer}>
                    <Text style={styles.forgotpwdText}>¿Olvidaste tu contraseña?</Text>
                </View>
                <View style={styles.registerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerText}>Registro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: '#2e5c74',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    formContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: 100,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#2e5c74',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 60,
        paddingLeft: 8,
        color: '#000',
    },
    icon: {
        padding: 10,
    },
    buttonContainer: {
        marginTop: 40,
        width: '80%',
    },
    loginButton: {
        backgroundColor: '#2e5c74',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    forgotpwdContainer: {
        marginTop: 50,
    },
    forgotpwdText: {
        color: '#2e5c74',
    },
    registerContainer: {
        marginTop: 20,
    },
    registerText: {
        color: '#2e5c74',
    },
});

export default LoginScreen;
