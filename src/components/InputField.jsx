import { StyleSheet, Text, View, TextInput } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function InputField(props) {

  if (props.information) {
    return (
      <View style={styles.inputView}>
        <Text style={styles.text}>{props.label}</Text>
        <View style={styles.inputContainerInfo}>
          {props.icon}
          <TextInput style={styles.inputText} value={props?.value} disabled></TextInput>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inputView}>
      <Text style={styles.text}>{props.label}</Text>
      <View style={styles.inputContainer}>
        {props.icon}
        {props.secure ? (
          <TextInput style={styles.inputText} value={props?.value} placeholder={props.placeholder} secureTextEntry={true} onChangeText={props.onChangeText}></TextInput>
        ) : (
          <TextInput style={styles.inputText} value={props?.value} placeholder={props.placeholder} onChangeText={props.onChangeText}></TextInput>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorTypes.PRIMARY_GREEN,
    borderWidth: 2.5,
    borderColor: ColorTypes.TEXT_TITLE,
    borderRadius: 8,
    paddingLeft: 10,
  },
  inputView: {
    borderRadius: 5,
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: 10,
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
    backgroundColor: ColorTypes.PRIMARY_GREEN,
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
