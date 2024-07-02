import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env'; // Importa API_URL desde @env

const ClientDetailsScreen = ({ route, navigation }) => {
    const { clientId } = route.params;
    const [client, setClient] = useState({});
    const [penalty, setPenalty] = useState(0);
    const [payment, setPayment] = useState(0);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const { data } = await axios.get(`${API_URL}/clients/${clientId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClient(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClient();
    }, [clientId]);

    const handleAddPenalty = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.post(`${API_URL}/penalties/${clientId}/penalty`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClient(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddPayment = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.post(`${API_URL}/penalties/${clientId}/payment`, { amount: payment }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClient(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{client.name}</Text>
            <Text style={styles.label}>Ocupacion:</Text>
            <Text style={styles.value}>{client.occupation}</Text>
            <Text style={styles.label}>Estatus:</Text>
            <Text style={styles.value}>{client.status}</Text>
            <Text style={styles.label}>Multas:</Text>
            <Text style={styles.value}>{client.penalties}</Text>
            <Text style={styles.label}>Pagos:</Text>
            <Text style={styles.value}>{client.payments}</Text>

            <TextInput
                style={styles.input}
                placeholder="Agregar multa"
                value={penalty.toString()}
                onChangeText={(text) => setPenalty(parseInt(text))}
            />
            <Button title="Agregar multa" onPress={handleAddPenalty} />

            <TextInput
                style={styles.input}
                placeholder="Agregar pago"
                value={payment.toString()}
                onChangeText={(text) => setPayment(parseInt(text))}
            />
            <Button title="Agregar pago" onPress={handleAddPayment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    value: {
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});

export default ClientDetailsScreen;
