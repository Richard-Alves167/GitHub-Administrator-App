import { StyleSheet, Text, View, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import InputField from '../components/InputField';
import ButtonComponent from '../components/SubmitButton';
import AlertMessage from '../components/AlertMessage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useAuth } from "../providers/AuthContext";

export default function SignIn({ navigation }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setErrorMensagem] = useState('');

  function handleSignIn() {
    const sucesso = login(email, password)
    if (sucesso) {
      navigation.navigate(Routes.DASHBOARD)
    } else {
      setErrorMensagem("Credenciais incorretas!")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo/LogoGPVTextoVerde.png')} />
        <Text style={styles.title}>Login</Text>
        <InputField
          label="Email"
          placeholder="Digite seu email"
          icon={<MaterialIcons name="email" size={24} color={ColorTypes.TEXT_TITLE} />}
          onChangeText={setEmail}
        />
        <InputField
          label="Senha"
          placeholder="Digite sua senha"
          secure={true}
          icon={<MaterialIcons name="password" size={24} color={ColorTypes.TEXT_TITLE} />}
          onChangeText={setPassword}
        />
      </View>
      <AlertMessage msg={mensagem} />
      <View style={styles.buttonContainer}>
        <ButtonComponent text="Entrar" function={handleSignIn} />
        <Text style={styles.titleSignUp}>Não tem uma conta? <Text style={styles.link} onPress={() => navigation.navigate(Routes.SIGNUP)}>Cadastre-se</Text></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: ColorTypes.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    gap: 10,
  },
  logo: {
    width: 220,
    height: 120,
    contain: 'cover',
    alignSelf: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    color: ColorTypes.TEXT_TITLE,
    textAlign: 'center',
  },
  titleSignUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorTypes.SECONDARY_GREEN,
  },
  link: {
    color: ColorTypes.TEXT_TITLE,
  },
  buttonContainer: {
    gap: 20,
    alignItems: 'center',
  }
});