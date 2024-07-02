import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env';
import ConfirmDeleteModal from '../../components/modal/TrabajadorDeleteModal'; // Asegúrate de que la ruta sea correcta
import Toast from 'react-native-toast-message';

const ClientsScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/clients`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteClient = async (clientId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`${API_URL}/clients/${clientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClients(clients.filter(client => client._id !== clientId));
            setModalVisible(false);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Éxito',
                text2: 'Se ha eliminado correctamente el cliente',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 60, // Ajusta este valor si es necesario para tu diseño
            });
        } catch (error) {
            console.error(`Error deleting client: ${error.message}`);
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: `Failed to delete client: ${error.response?.data?.message || error.message}`,
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 60, // Ajusta este valor si es necesario para tu diseño
            });
        }
    };

    const confirmDeleteClient = (clientId) => {
        setSelectedClientId(clientId);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedClientId(null);
    };

    const handleConfirm = () => {
        handleDeleteClient(selectedClientId);
    };

    const handleClientUpdate = (updatedClient) => {
        setClients(prevClients => 
            prevClients.map(client => 
                client._id === updatedClient._id ? updatedClient : client
            )
        );
    };

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
                            <View style={styles.iconButtonsContainer}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => navigation.navigate('EditClient', { client: item, onClientUpdate: handleClientUpdate })}
                                >
                                    <Icon name="pencil" size={25} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => confirmDeleteClient(item._id)}
                                >
                                    <Icon name="trash" size={25} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewClient')}
            >
                <Text style={styles.addButtonText}>Agregar nuevo cliente</Text>
            </TouchableOpacity>
            <ConfirmDeleteModal
                visible={modalVisible}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
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
    iconButtonsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ClientsScreen;
