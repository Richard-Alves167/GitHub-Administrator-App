import { StyleSheet, Text, View,ScrollView, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import InputField from '../components/InputField';
import ButtonComponent from '../components/SubmitButton';
import AlertMessage from '../components/AlertMessage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { useAuth } from "../providers/AuthContext";

export default function SignUp({ navigation }) {
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [mensagem, setErrorMensagem] = useState('');

  function handleRegister() {
    if (password == passwordConfirmation) {
      if (nome.trim() && email.trim() && password.trim()) {
        register(nome, email, password)
        navigation.navigate(Routes.SIGNIN)
      } else {
        setErrorMensagem("Preencha todos os campos para o cadastro!")
      }
    } else {
      setErrorMensagem("As senhas não coincidem!")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo/LogoGPVTextoVerde.png')} />
        <Text style={styles.title}>Cadastrar-se</Text>
        <InputField
          label="Nome"
          placeholder="Digite seu nome"
          icon={<MaterialIcons name="account-circle" size={24} color={ColorTypes.TEXT_TITLE} />}
          onChangeText={setNome} 
        />
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
        <InputField
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          secure={true}
          icon={<MaterialIcons name="password" size={24} color={ColorTypes.TEXT_TITLE} />}
          onChangeText={setPasswordConfirmation}
        />
      </View>
      <AlertMessage msg={mensagem} />
      <View style={styles.buttonContainer}>
        <ButtonComponent text="Cadastrar" function={handleRegister} />
        <Text style={styles.titleSignUp}>Já tem uma conta? <Text style={styles.link} onPress={() => navigation.navigate(Routes.SIGNIN)}>Faça Login</Text></Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    gap: 10,
    backgroundColor: ColorTypes.BACKGROUND,
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
    marginTop: 10,
    gap: 20,
    alignItems: 'center',
    marginBottom: 60,
  }
});