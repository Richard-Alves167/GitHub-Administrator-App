import { StyleSheet, View, ScrollView, Text, ImageBackground, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import InputField from '../components/InputField';
import AlertMessage from '../components/AlertMessage';
import ButtonComponent from '../components/SubmitButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useGit } from "../providers/GitContext";
import { useState } from "react";
import { useWindowDimensions } from 'react-native';

export default function TokenGitHub({ navigation }) {
    const { carregarDadosGithub, usuarioGithub } = useGit();
    const [token, setToken] = useState("");
    const [mensagem, setErrorMensagem] = useState('');
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height ? true : false;

    async function save() {
        if (!token) {
            setErrorMensagem("Preencha o campo de token!")
            return;
        }
        setErrorMensagem("")
        await carregarDadosGithub(token);
    }

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={{
                flexDirection: isLandscape ? 'row' : 'column',
                gap: 40,
                alignSelf: 'center',
            }}>
            <View>
                <Image style={styles.logo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg' }} />
                <Text style={styles.title}>Token do GitHub</Text>
                <View style={styles.form}>
                    <InputField
                        label="Token do GitHub"
                        placeholder="XXXXXXXXXXXXXXXXXXXXXXX"
                        icon={<MaterialIcons name="vpn-key" size={24} color={ColorTypes.TEXT_TITLE} />}
                        onChangeText={setToken}
                        value={token}
                    />
                    {usuarioGithub ? <AlertMessage msg={"Token verificado"} alertRed={false} /> : <AlertMessage msg={mensagem} />}
                    <View style={styles.buttonContainer}>
                        <ButtonComponent text="Salvar" function={save} />
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.textListTitle}>Para obter um token do GitHub</Text>
                <View style={styles.intructions}>
                    <Text style={styles.textList}>1. Acesse sua conta do GitHub e vá para as configurações.</Text>
                    <Text style={styles.textList}>2. No menu lateral, clique em "Developer settings" (Configurações de desenvolvedor).</Text>
                    <Text style={styles.textList}>3. Em seguida, clique em "Personal access tokens" (Tokens de acesso pessoal).</Text>
                    <Text style={styles.textList}>4. Clique em "Generate new token" (Gerar novo token).</Text>
                    <Text style={styles.textList}>5. Dê um nome para o token e selecione as permissões necessárias (recomenda-se selecionar "repo" para acesso aos repositórios).</Text>
                    <Text style={styles.textList}>6. Clique em "Generate token" (Gerar token) e copie o token gerado.</Text>
                    <Text style={styles.textList}>7. Cole o token no campo acima e clique em "Salvar".</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        backgroundColor: ColorTypes.BACKGROUND,
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        contain: 'cover',
        alignSelf: 'center',
        marginTop: 80,
        marginBottom: 30,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorTypes.GRAY,
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: ColorTypes.LIMONGREEN,
        marginTop: 30,
        marginBottom: 60,
    },
    title: {
        fontSize: 32,
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
        marginTop: 10,
        gap: 20,
        alignItems: 'center',
    },
    intructions: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: ColorTypes.BACKGROUND_BUTTON,
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: ColorTypes.LIMONGREEN,
        marginTop: 20,
        marginBottom: 60,
        alignSelf: 'self-end',
    },
    textListTitle: {
        color: ColorTypes.TEXT_TITLE,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    textList: {
        color: ColorTypes.PRIMARY_GREEN,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify',
        marginBottom: 10,
    },
});