import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';

const EditWorkerScreen = ({ route, navigation }) => {
    const { worker, onWorkerUpdate } = route.params;
    const [name, setName] = useState(worker.name);
    const [email, setEmail] = useState(worker.email);
    const [password, setPassword] = useState(worker.password);
    const [role, setRole] = useState(worker.role);
    const [showPassword, setShowPassword] = useState(false);

    const handleEditWorker = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const updatedWorker = await axios.put(
                `${API_URL}/workers/${worker._id}`,
                { name, email, password, role },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onWorkerUpdate(updatedWorker.data);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Correo:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Contraseña:</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
                    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Rol:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={role}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRole(itemValue)}
                >
                    <Picker.Item label="Trabajador" value="trabajador" />
                    <Picker.Item label="Admin" value="administrador" />
                </Picker>
            </View>
            <Button title="Editar trabajador" onPress={handleEditWorker} />
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
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 0, 
    },
    passwordInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    iconContainer: {
        padding: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default EditWorkerScreen;
