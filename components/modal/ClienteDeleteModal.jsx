import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ConfirmDeleteModal = ({ visible, onCancel, onConfirm }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, scaleValue]);

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="none"
        >
            <View style={styles.modalContainer}>    
                <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                    <Text style={styles.modalTitle}>Confirmación de eliminación</Text>
                    <Text style={styles.modalMessage}>¿Seguro que quieres eliminar este cliente?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'blue',
    },
    confirmButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ConfirmDeleteModal;
