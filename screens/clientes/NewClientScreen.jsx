import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from '@env';

const NewClientScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [occupation, setOccupation] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleAddClient = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { data } = await axios.post(`${API_URL}/clients`, {
                name,
                startDate,
                endDate,
                occupation
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigation.navigate('AdminClientes');
        } catch (error) {
            console.error(error);
        }
    };

    const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Fecha de inicio:</Text>
            <TextInput
                style={styles.input}
                value={startDate.toDateString()}
                onFocus={() => setShowStartDatePicker(true)}
            />
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}
            <Text style={styles.label}>Fecha final:</Text>
            <TextInput
                style={styles.input}
                value={endDate.toDateString()}
                onFocus={() => setShowEndDatePicker(true)}
            />
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )}
            <Text style={styles.label}>Ocupacion:</Text>
            <TextInput
                style={styles.input}
                value={occupation}
                onChangeText={setOccupation}
            />
            <Button title="Agregar nuevo cliente" onPress={handleAddClient} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});

export default NewClientScreen;
