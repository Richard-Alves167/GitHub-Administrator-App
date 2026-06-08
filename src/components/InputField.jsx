import { StyleSheet, Text, View, TextInput } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function InputField(props) {

  return (
    <View style={styles.inputView}>
        <Text style={styles.text}>{props.label}</Text>
        <View style={styles.inputContainer}>
        {props.icon}
          {props.secure ? (
              <TextInput style={styles.inputText} placeholder={props.placeholder} secureTextEntry={true} onChangeText={props.onChangeText}></TextInput>
          ) : (
              <TextInput style={styles.inputText} placeholder={props.placeholder} onChangeText={props.onChangeText}></TextInput>
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: ColorTypes.TEXT_TITLE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorTypes.PRIMARY_BROWN,
    borderBottomWidth: 5,
    borderColor: ColorTypes.TEXT_TITLE,
    borderRadius: 8,
    paddingLeft: 10,
  },
  inputText: {
    minWidth: 250,
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    outlineStyle: 'none',
    color: ColorTypes.TEXT_TITLE,
    fontWeight: 'bold',
  },
});
