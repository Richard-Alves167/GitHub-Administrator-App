import { StyleSheet, View, Pressable, Text } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export default function AlertMessage({msg}) {
    function handleAppear() {
        if (msg == '' || msg == null) {
            return 'none';
        }
        return 'flex';
    }
    return (
        <View style={styles.container}>
            <Feather name="alert-circle" size={20} color="red" style={{ display: handleAppear() }} />
            <Text style={[styles.mensagem, { display: handleAppear() }]}>{msg}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mensagem: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
        margin: 15
    }
})