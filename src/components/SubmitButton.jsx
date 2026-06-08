import { StyleSheet, Pressable, Text } from "react-native";
import ColorTypes from '../assets/ColorTypes';

export default function SubmitButton(props) {
  return (
    <Pressable 
    style={styles.button}
    onPress={() => props.function()}
    >
        <Text style={styles.text}>{props.text}</Text>
    </Pressable>
)}

const styles = StyleSheet.create({
    text: {
        color: ColorTypes.TEXT_TITLE,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: ColorTypes.DARK
    },
    button: {
        width: 200,
        padding: 10,
        borderRadius: 7,
        backgroundColor: ColorTypes.BACKGROUND_BUTTON,
        borderWidth: 2,
        borderColor: ColorTypes.PRIMARY_BROWN,
    }
});