import { StyleSheet, Text, View, Image } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function ViewWithoutItens(props) {
    return (
        <View style={styles.emptyContainer}>
            <Image style={styles.logo} source={require('../assets/videos/WhitoutItensCatWhitoutBackground.gif')} />
            <Text style={styles.emptyText}>Nenhum item encontrado.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '500',
        color: ColorTypes.TEXT_TITLE,
    },

});
