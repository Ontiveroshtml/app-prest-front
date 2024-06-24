import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env'; // Importa API_URL desde @env

const NewWorkerScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleAddWorker = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.post(
                `${API_URL}/workers`, // Reemplaza la URL estática con API_URL
                { name, email, password, role },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigation.navigate('AdminTrabajadores');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles.label}>Role:</Text>
            <TextInput style={styles.input} value={role} onChangeText={setRole} />
            <Button title="Add Worker" onPress={handleAddWorker} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default NewWorkerScreen;
