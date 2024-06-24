import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';

const EditClient = ({ route, navigation }) => {
    const { client, onClientUpdate } = route.params;
    const [name, setName] = useState(client.name);
    const [occupation, setOccupation] = useState(client.occupation);
    const [status, setStatus] = useState(client.status);

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const updatedClient = {
                ...client,
                name,
                occupation,
                status
            };
            await axios.put(`${API_URL}/clients/${client._id}`, updatedClient, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onClientUpdate(updatedClient);
            navigation.navigate('AdminClientes');  // Navegar de regreso a la lista de clientes
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Cliente</Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nombre"
            />
            <Text style={styles.label}>Ocupación:</Text>
            <TextInput
                style={styles.input}
                value={occupation}
                onChangeText={setOccupation}
                placeholder="Ocupación"
            />
            <Text style={styles.label}>Estatus:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={status}
                    style={styles.picker}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                >
                    <Picker.Item label="Pendiente" value="Pendiente" />
                    <Picker.Item label="Pagado" value="Pagado" />
                    <Picker.Item label="Atrasado" value="Atrasado" />
                </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Actualizar cliente</Text>
            </TouchableOpacity>
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
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    picker: {
        height: 40,
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EditClient;
