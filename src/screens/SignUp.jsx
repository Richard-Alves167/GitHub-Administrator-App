import { StyleSheet, Text, View, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import InputField from '../components/InputField';
import ButtonComponent from '../components/SubmitButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SignUp({ navigation }) {
  return (
  <View style={styles.container}>
    <ArrowBack navigation={navigation}/>
    <View style={styles.inputContainer}>
      <Image style={styles.logo} source={require('../assets/images/logo/LogoGPVTextoVerde.png')}/>
      <Text style={styles.title}>Cadastrar-se</Text>
      <InputField label="Nome" placeholder="Digite seu nome" secure={false} icon={<MaterialIcons name="account-circle" size={24} color={ColorTypes.TEXT_TITLE} />} />
      <InputField label="Email" placeholder="Digite seu email" secure={false} icon={<MaterialIcons name="email" size={24} color={ColorTypes.TEXT_TITLE} />} />
      <InputField label="Senha" placeholder="Digite sua senha" secure={true} icon={<MaterialIcons name="password" size={24} color={ColorTypes.TEXT_TITLE} />} />
      <InputField label="Confirmar Senha" placeholder="Confirme sua senha" secure={true} icon={<MaterialIcons name="password" size={24} color={ColorTypes.TEXT_TITLE} />} />
    </View>
    <View style={styles.buttonContainer}>
      <ButtonComponent text="Cadastrar" function={() => navigation.navigate(Routes.SIGNIN)}/>
      <Text style={styles.titleSignUp}>Já tem uma conta? <Text style={styles.link} onPress={() => navigation.navigate(Routes.SIGNIN)}>Faça Login</Text></Text>
      <ButtonComponent text="Login" function={() => navigation.navigate(Routes.SIGNIN)}/>
    </View>
  </View>
  )}

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
      marginTop: 40,
      gap: 20,
      alignItems: 'center',
    }
});