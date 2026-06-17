import { StyleSheet, View, Pressable, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AlertMessage({msg, alertRed=true}) {
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
            <AntDesign name={icon} size={20} color={color} style={{ display: handleAppear() }}/>
            <Text style={[styles.mensagem, { color, display: handleAppear() }]}>{msg}</Text>
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
        margin: 15
    }
})