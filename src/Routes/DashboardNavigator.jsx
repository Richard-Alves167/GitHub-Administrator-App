import { View, Text } from "react-native";
import Routes from ".";
import ColorTypes from "../assets/ColorTypes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreen from "../screens/Home";
import ProductScreen from "../screens/Product";
import UserScreen from "../screens/User";

const Tabs = createBottomTabNavigator()

export default function DashboardNavigator() {
    return (
        <Tabs.Navigator screenOptions={{
        headerShown: false,

        tabBarStyle: {
            backgroundColor: ColorTypes.PRIMARY_BROWN,
            height: 70,
            borderTopWidth: 0,
            elevation: 0,
            paddingBottom: 10,
            paddingTop: 10,
        },

        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
        },

        tabBarActiveTintColor: ColorTypes.BACKGROUND_BUTTON,
        tabBarInactiveTintColor: ColorTypes.SECONDARY_BROWN,
    }}>
            <Tabs.Screen 
            name="Home" component={HomeScreen}
            options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    )
                }}/>
            <Tabs.Screen 
            name="Produtos" component={ProductScreen}
            options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="product" size={24} color={color} />
                    )
                }}/>
            <Tabs.Screen 
            name="Carrinho" component={ProductScreen}
            options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="shopping-cart" size={24} color={color} />
                    )
                }}/>
            <Tabs.Screen 
            name="Conta" component={UserScreen}
            options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="account-circle" size={24} color={color} />
                    )
                }}/>
        </Tabs.Navigator>
    )
}