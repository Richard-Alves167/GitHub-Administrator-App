import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';

export default function Product({ navigation }) {
  return (
    <View style={styles.container}>
        <ArrowBack navigation={navigation}/>
        <ImageBackground source={require('../assets/images/banner/coffeShopBackground.jpg')} style={styles.banner}>
            <Text style={styles.text}>Produto detalhado</Text>
        </ImageBackground>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        gap: 10,
        backgroundColor: ColorTypes.BACKGROUND,
    },
    banner: {
        width: '100%',
        height: 400,
        contain: 'cover',
        borderTopWidth: 2,
        borderBottomWidth: 10,
        borderColor: ColorTypes.TEXT_TITLE,
        justifyContent: 'center',
        contain: 'cover',
        overflow: 'hidden',
    },
    text: {
        color: ColorTypes.TEXT_TITLE,
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
});