import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AdminTabs from '../components/AdminTabs';
import WorkerTabs from '../components/workerTabs';
import EditWorkerScreen from '../screens/trabajadores/EditWorkerScreen';
import NewWorkerScreen from '../screens/trabajadores/NewWorkerScreen';
import NewClientScreen from '../screens/clientes/NewClientScreen';
import EditClient from '../screens/clientes/EditClient';
import ClientsScreen from '../screens/clientes/ClientScreen';
import WorkersScreen from '../screens/trabajadores/WorkersScreen';
import ClientDetailsScreen from '../screens/clientes/ClientDetailsScreen';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
                <Stack.Screen name="WorkerTabs" component={WorkerTabs} options={{ headerShown: false }} />
                <Stack.Screen name="EditWorker" component={EditWorkerScreen} options={{ title: 'Editar Trabajador' }} />
                <Stack.Screen name="NewWorker" component={NewWorkerScreen} options={{ title: 'Nuevo Trabajador' }} />
                <Stack.Screen name="NewClient" component={NewClientScreen} options={{ title: 'Nuevo Cliente' }} />
                <Stack.Screen name="EditClient" component={EditClient} options={{ title: 'Nuevo Cliente' }} />
                <Stack.Screen name="Clients" component={ClientsScreen} options={{ title: 'Clientes' }} />
                <Stack.Screen name="ClientDetails" component={ClientDetailsScreen} options={{ title: 'Detalles del cliente' }} />
                <Stack.Screen name="Workers" component={WorkersScreen} options={{ title: 'Trabajadores' }} />
            </Stack.Navigator>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
    );
};

export default AppNavigator;
