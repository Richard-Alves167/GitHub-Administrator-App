import { StyleSheet, View, Pressable, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AlertMessage({ msg, alertRed = true }) {
    const icon = alertRed ? 'exclamation-circle' : 'check-circle'
    const color = alertRed ? "red" : "green"

    function handleAppear() {
        if (msg == '' || msg == null) {
            return 'none';
        }
        return 'flex';
    }
    return (
        <View style={styles.container}>
            <View style={{ display: handleAppear(), flexDirection: 'row' }}>
                <AntDesign name={icon} size={20} color={color} />
                <Text style={[styles.mensagem, { color }]}>{msg}</Text>
            </View>
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
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 10,
    }
})