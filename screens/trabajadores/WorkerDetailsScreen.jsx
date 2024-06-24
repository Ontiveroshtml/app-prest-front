import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env'; // Importa API_URL desde @env

const WorkerDetailsScreen = ({ route, navigation }) => {
    const { workerId } = route.params;
    const [worker, setWorker] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const { data } = await axios.get(`${API_URL}/workers/${workerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWorker(data);
                setName(data.name);
                setEmail(data.email);
                setRole(data.role);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWorker();
    }, [workerId]);

    const handleUpdateWorker = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.put(
                `${API_URL}/workers/${workerId}`,
                { name, email, role },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setWorker(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteWorker = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`${API_URL}/workers/${workerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Role:</Text>
            <TextInput style={styles.input} value={role} onChangeText={setRole} />
            <Button title="Update Worker" onPress={handleUpdateWorker} />
            <Button title="Delete Worker" onPress={handleDeleteWorker} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
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

export default WorkerDetailsScreen;
