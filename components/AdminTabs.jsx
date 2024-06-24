import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ClientsScreen from '../screens/clientes/ClientScreen';
import WorkersScreen from '../screens/trabajadores/WorkersScreen';

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="AdminHome"
                component={AdminHomeScreen}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AdminClientes"
                component={ClientsScreen}
                options={{
                    title: 'Clientes',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="users" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AdminTrabajadores"
                component={WorkersScreen}
                options={{
                    title: 'Trabajadores',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    title: 'Estadísticas',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bar-chart" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AdminTabs;
