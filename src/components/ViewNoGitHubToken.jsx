import { StyleSheet, Text, View, Image } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function InputField(props) {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/videos/CatEyesSearching_transparent.gif')} />
                <Text style={styles.title}>Coloque seu Token de GitHub para continuar</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: ColorTypes.BACKGROUND,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: ColorTypes.TEXT_TITLE,
        textAlign: 'center',
    },
});
