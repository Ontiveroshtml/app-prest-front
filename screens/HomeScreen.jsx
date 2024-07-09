import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

const WorkerHomeScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    throw new Error('No se encontró token');
                }
                console.log(`Token: ${token}`);
                const { data } = await axios.get(`${API_URL}/clients`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(`Datos recibidos: ${JSON.stringify(data)}`);
                setClients(data);
            } catch (err) {
                console.error('no se encuentarn clientes', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clientes</Text>
            <FlatList
                data={clients}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.fieldName}>Nombre: <Text style={styles.fieldValue}>{item.name}</Text></Text>
                        <Text style={styles.fieldName}>Pagos: <Text style={styles.fieldValue}>{item.payments}</Text></Text>
                        <Text style={styles.fieldName}>Multas: <Text style={styles.fieldValue}>{item.penalties}</Text></Text>
                        <Text style={styles.fieldName}>Estatus: <Text style={styles.fieldValue}>{item.status}</Text></Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => navigation.navigate('ClientDetails', { clientId: item._id })}
                            >
                                <Text style={styles.detailsButtonText}>Detalles</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    card: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    fieldName: {
        fontWeight: 'bold',
    },
    fieldValue: {
        fontWeight: 'normal',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    detailsButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    detailsButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default WorkerHomeScreen;
