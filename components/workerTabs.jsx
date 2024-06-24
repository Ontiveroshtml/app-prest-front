import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkerHomeScreen from '../screens/trabajadores/WorkerHomeScreen';
import NewClientScren from '../screens/clientes/NewClientScreen';
import ClienDetailsScreen from '../screens/clientes/ClientDetailsScreen';

const Tab = createBottomTabNavigator();

const WorkerTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={WorkerHomeScreen} options={{ title: 'Inicio' }} />
            <Tab.Screen name="Newclient" component={NewClientScren} options={{ title: 'Nuevo cliente' }} />
            <Tab.Screen name="ClientDetails" component={ClienDetailsScreen} options={{ title: 'Detalles cliente' }} />
        </Tab.Navigator>
    );
};

export default WorkerTabs;
