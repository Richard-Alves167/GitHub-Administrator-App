import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '.';
import DrawerNavigator from './DrawerNavigator';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import UserScreen from '../screens/User';
import HomeScreen from '../screens/Home';
import Dashboard from './DashboardNavigator';

const Stack = createNativeStackNavigator()

export default function StackNavigation() {

    return (
        <Stack.Navigator
            initialRouteName={Routes.SIGNIN}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name={Routes.SIGNIN}
                component={SignInScreen}
                options={{
                    headerTitle: 'Autenticação'
                }}
            />
            <Stack.Screen
                name={Routes.SIGNUP}
                component={SignUpScreen}
                options={{
                    headerTitle: 'Cadastro'
                }}
            />
            <Stack.Screen
                name={Routes.DRAWER}
                component={DrawerNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.USER}
                component={UserScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.DASHBOARD}
                component={Dashboard}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}