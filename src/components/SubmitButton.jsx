import { StyleSheet, Pressable, Text } from "react-native";
import ColorTypes from '../assets/ColorTypes';

export default function SubmitButton(props) {
    if (props.logout) {
        return (<Pressable
            style={[styles.button, {backgroundColor: 'red', marginTop: 30 }]}
            onPress={() => {
                props.function()
                props.navigation.pop(1)
            }}
        >
            <Text style={[styles.text, { color: 'white' }]}>Sair</Text>
        </Pressable>
        )
    }
    return (
        <Pressable
            style={styles.button}
            onPress={() => props.function()}
        >
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: ColorTypes.TEXT_TITLE,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: ColorTypes.DARK
    },
    button: {
        alignSelf: 'center',
        width: 200,
        padding: 10,
        borderRadius: 7,
        backgroundColor: ColorTypes.BACKGROUND_BUTTON,
        borderWidth: 2,
        borderColor: ColorTypes.PRIMARY_GREEN,
    }
});