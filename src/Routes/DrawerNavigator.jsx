import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ColorTypes from '../assets/ColorTypes';
import Routes from '.';
import HomeScreen from '../screens/Home';
import UserScreen from '../screens/User';
import IssuesScreen from '../screens/Issues';
import RepositoriesScreen from '../screens/Repositories';
import Dashboard from './DashboardNavigator';
import { useAuth } from "../providers/AuthContext";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: ColorTypes.PRIMARY_GREEN,
        },
        headerTintColor: ColorTypes.TEXT_TITLE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: ColorTypes.BACKGROUND,
          width: 300,
        },
        drawerActiveBackgroundColor: ColorTypes.PRIMARY_GREEN,
        drawerActiveTintColor: ColorTypes.TEXT_TITLE,
        drawerInactiveTintColor: ColorTypes.WHITE,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name={Routes.USER}
        component={UserScreen}
      />
      <Drawer.Screen
        name={Routes.HOME}
        component={HomeScreen}
      />
            <Drawer.Screen
        name={Routes.REPOSITORIES}
        component={RepositoriesScreen}
      />
            <Drawer.Screen
        name={Routes.ISSUES}
        component={IssuesScreen}
      />
    </Drawer.Navigator>
  )
}

function CustomDrawerContent(props) {
  const { user, updateUser } = useAuth();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => props.navigation.closeDrawer()}
        >
          <MaterialIcons
            name="close"
            size={40}
            color={ColorTypes.TEXT_TITLE}
          />
        </Pressable>
        <Text style={styles.title}>
          GitHub PV.
        </Text>
      </View>
      <View style={styles.divider} />
      <Pressable style={styles.accountInfo}
        onPress={() => props.navigation.navigate(Routes.USER)}
      >
        <MaterialIcons name="account-circle" size={40} color={ColorTypes.TEXT_TITLE} /><Text style={styles.title}> {user?.nome || 'Usuário'}</Text>
      </Pressable>
      <View style={styles.divider2} />
      <DrawerItemList style={styles.listPages} {...props} />
      <View style={styles.divider3} />
      <View style={styles.footer}>
        <View style={styles.autorFooter}>
          <Image style={styles.logo} source={require('../assets/images/logo/LogoGPVVerde.png')} />
          <View style={styles.descriptionFooter}>
            <Text style={styles.descriptionFooter}>Copyright © 2026 GitHubPV.</Text>
            <Text style={styles.descriptionFooter}>Todos os direitos reservados.</Text>
            <Text style={styles.descriptionFooter}>Termos de Uso</Text>
            <Text style={styles.descriptionFooter}>Política de Privacidade</Text>
            <Text style={styles.descriptionFooter}>Contato</Text>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTypes.BACKGROUND,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorTypes.TEXT_TITLE,
  },

  divider: {
    height: 2,
    backgroundColor: ColorTypes.TEXT_TITLE,
    marginHorizontal: 10,
    opacity: 0.3,
  },
  divider2: {
    height: 2,
    backgroundColor: ColorTypes.TEXT_TITLE,
    marginHorizontal: 10,
    marginBottom: 20,
    opacity: 0.3,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: ColorTypes.PRIMARY_GREEN,
    borderWidth: 2,
    borderColor: ColorTypes.TEXT_TITLE,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  divider3: {
    height: 2,
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: ColorTypes.TEXT_TITLE,
    marginHorizontal: 10,
    opacity: 0.3,
  },
  footer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  autorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  descriptionFooter: {
    fontSize: 12,
    color: ColorTypes.TEXT_TITLE,
    fontWeight: 'bold',
  }
});