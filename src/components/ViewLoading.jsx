import { StyleSheet, Text, View, Image } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function ViewLoading(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/videos/LoadingCatWhitouBackground.gif')} />
            <Text style={styles.emptyText}>Carregando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorTypes.BACKGROUND,
        zIndex: 1,
        opacity: 0.5,
    },
    emptyContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 28,
        fontWeight: '500',
        color: ColorTypes.TEXT_TITLE,
    },

});
