import { StyleSheet, View, ScrollView, Text, ImageBackground, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import InputField from '../components/InputField';
import ButtonComponent from '../components/SubmitButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from "../providers/AuthContext";
import { useGit } from "../providers/GitContext";
import { useState } from "react";

export default function User({ navigation }) {
    const { user, updateUser } = useAuth();
    const { carregarDadosGithub } = useGit();
    const [nome, setNome] = useState(user?.nome || "");
    const [email, setEmail] = useState(user?.email || "");
    const [telefone, setTelefone] = useState(user?.telefone || "");
    const [token, setToken] = useState("");

    async function save() {
        if (!nome.trim() || !telefone.trim() || !email.trim()) {
            alert("Preencha todos os campos para salvar as alterações!")
            return;
        }
        updateUser(nome, telefone, email);
        await carregarDadosGithub(token);
        alert("Alterações salvas com sucesso!")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Text style={styles.subTitle}>Consulte ou altere suas informações</Text>
            <View style={styles.Form}>
                <InputField
                    label="Nome"
                    placeholder="Digite seu nome"
                    icon={<MaterialIcons name="person" size={24} color={ColorTypes.TEXT_TITLE} />}
                    onChangeText={setNome}
                    value={nome}
                />
                <InputField
                    label="Email"
                    placeholder="Digite seu email"
                    icon={<MaterialIcons name="email" size={24} color={ColorTypes.TEXT_TITLE} />}
                    onChangeText={setEmail}
                    value={email}
                />
                <InputField
                    label="Telefone"
                    placeholder="Digite seu telefone"
                    icon={<MaterialIcons name="phone" size={24} color={ColorTypes.TEXT_TITLE} />}
                    onChangeText={setTelefone}
                    value={telefone}
                />
                <InputField
                    label="Token do GitHub"
                    placeholder="Digite seu token"
                    icon={<MaterialIcons name="vpn-key" size={24} color={ColorTypes.TEXT_TITLE} />}
                    onChangeText={setToken}
                    value={token}
                />
                <View style={styles.buttonContainer}>
                    <ButtonComponent text="Salvar" function={save} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        backgroundColor: ColorTypes.BACKGROUND,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        color: ColorTypes.TEXT_TITLE,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ColorTypes.SECONDARY_GREEN,
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        color: ColorTypes.TEXT_TITLE,
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    buttonContainer: {
        marginTop: 30,
        gap: 20,
        alignItems: 'center',
    },
});