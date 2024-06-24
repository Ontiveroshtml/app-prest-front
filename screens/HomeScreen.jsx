import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

const WorkerHomeScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const { data } = await axios.get(`${API_URL}/clients`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClients(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClients();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={clients}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ClientDetails', { clientId: item._id })}
                    >
                        <Text>{item.name}</Text>
                        <Text>{item.occupation}</Text>
                        <Text>{item.status}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewClient')}
            >
                <Text style={styles.addButtonText}>Agregar nuevo cliente</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    card: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default WorkerHomeScreen;
