import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env'; // Importa API_URL desde @env

const StatisticsScreen = () => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const { data } = await axios.get(`${API_URL}/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStatistics(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Total Clients:</Text>
            <Text style={styles.value}>{statistics.totalClients}</Text>
            <Text style={styles.label}>Total Penalties:</Text>
            <Text style={styles.value}>{statistics.totalPenalties}</Text>
            <Text style={styles.label}>Total Payments:</Text>
            <Text style={styles.value}>{statistics.totalPayments}</Text>
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
    }
});

export default StatisticsScreen;
