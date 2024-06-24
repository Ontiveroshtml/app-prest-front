import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env';
import TrabajadorDeleteModal from '../../components/modal/TrabajadorDeleteModal'; // Asegúrate de que la ruta sea correcta
import Toast from 'react-native-toast-message';

const WorkersScreen = ({ navigation }) => {
    const [workers, setWorkers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/workers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWorkers(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteWorker = async (workerId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`${API_URL}/workers/${workerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWorkers(workers.filter(worker => worker._id !== workerId));
            setModalVisible(false);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Éxito',
                text2: 'Se ha eliminado correctamente el trabajador',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 60, // Ajusta este valor si es necesario para tu diseño
            });
        } catch (error) {
            console.error(`Error deleting worker: ${error.message}`);
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: `Failed to delete worker: ${error.response?.data?.message || error.message}`,
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 60, // Ajusta este valor si es necesario para tu diseño
            });
        }
    };

    const confirmDeleteWorker = (workerId) => {
        setSelectedWorkerId(workerId);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedWorkerId(null);
    };

    const handleConfirm = () => {
        handleDeleteWorker(selectedWorkerId);
    };

    const handleWorkerUpdate = (updatedWorker) => {
        setWorkers(prevWorkers => 
            prevWorkers.map(worker => 
                worker._id === updatedWorker._id ? updatedWorker : worker
            )
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trabajadores</Text>
            <FlatList
                data={workers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.fieldName}>Nombre: <Text style={styles.fieldValue}>{item.name}</Text></Text>
                        <Text style={styles.fieldName}>Email: <Text style={styles.fieldValue}>{item.email}</Text></Text>
                        <Text style={styles.fieldName}>Rol: <Text style={styles.fieldValue}>{item.role}</Text></Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('EditWorker', { worker: item, onWorkerUpdate: handleWorkerUpdate })}
                            >
                                <Icon name="pencil" size={20} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => confirmDeleteWorker(item._id)}
                            >
                                <Icon name="trash" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewWorker')}
            >
                <Text style={styles.addButtonText}>Agregar nuevo trabajador</Text>
            </TouchableOpacity>
            <TrabajadorDeleteModal
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
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    button: {
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

export default WorkersScreen;
