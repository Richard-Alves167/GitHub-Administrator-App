import { StyleSheet, Text, Pressable } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ArrowBackPage({ navigation }) {
  return (
    <Pressable 
        style={styles.container}
        onPress={() => navigation.pop(1)}
        >
            <AntDesign name="arrow-left" size={20} color={ColorTypes.TEXT_TITLE} />
            <Text style={styles.text}>Voltar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    backgroundColor: ColorTypes.PRIMARY_BROWN,
    borderWidth: 2.5,
    borderColor: ColorTypes.TEXT_TITLE,
    borderRadius: 30,
    paddingLeft: 10,
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorTypes.TEXT_TITLE,
    textAlign: 'center',
  },
});
