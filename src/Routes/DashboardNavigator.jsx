import { View, Text } from "react-native";
import Routes from ".";
import ColorTypes from "../assets/ColorTypes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from "../screens/Home";
import RepositoriesScreen from "../screens/Repositories";
import TokenGitHubScreen from "../screens/TokenGitHub";
import IssuesScreen from "../screens/Issues";
import UserScreen from "../screens/User";

const Tabs = createBottomTabNavigator()

export default function DashboardNavigator() {
    return (
        <Tabs.Navigator
            initialRouteName={Routes.TOKEN}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: ColorTypes.PRIMARY_GREEN,
                    height: 80,
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
                name={Routes.TOKEN} component={TokenGitHubScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="token" size={24} color={color} />
                    )
                }} />
            <Tabs.Screen
                name={Routes.REPOSITORIES} component={RepositoriesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="git-branch-outline" size={24} color={color} />
                    )
                }} />
            <Tabs.Screen
                name={Routes.ISSUES} component={IssuesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Octicons name="issue-draft" size={24} color={color} />
                    )
                }} />
            <Tabs.Screen
                name={Routes.USER} component={UserScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="account-circle" size={24} color={color} />
                    )
                }} />
        </Tabs.Navigator>
    )
}