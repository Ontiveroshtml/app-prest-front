import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const AdminHomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Inicio</Text>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Clients')}
                >
                    <Text style={styles.cardTitle}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Workers')}
                >
                    <Text style={styles.cardTitle}>Trabajadores</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2e5c74',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    cardContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewMoreButton: {
        backgroundColor: '#2e5c74',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    viewMoreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AdminHomeScreen;
