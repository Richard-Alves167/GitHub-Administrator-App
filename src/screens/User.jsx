import { StyleSheet, View, ScrollView, Text, ImageBackground, Image } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import InputField from '../components/InputField';
import ButtonComponent from '../components/SubmitButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useAuth } from "../providers/AuthContext";
import { useGit } from "../providers/GitContext";
import { useState } from "react";
import { useWindowDimensions } from 'react-native';

export default function User({ navigation }) {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height ? true : false;
    const { data, updateUser } = useAuth();
    const { carregarDadosGithub } = useGit();
    const [imagem, setImagem] = data?.user?.telefone || "";
    const [nome, setNome] = data?.user?.nome || "";
    const [biografy, setBiografy] = data?.user?.telefone || "";
    const [followers, setFollowers] = data?.user?.telefone || "";
    const [following, setFollowing] = data?.user?.telefone || "";
    const [location, setLocation] = data?.user?.telefone || "";
    const [email, setEmail] = data?.user?.email || "";
    const [telefone, setTelefone] = data?.user?.telefone || "";
    const [company, setCompany] = data?.user?.telefone || "";

    function borderStyle(chooseStyle) {
        let imageLink = ''
        switch (chooseStyle) {
            case 1:
                imageLink = require('../assets/videos/AroundBorderGif.gif')
                break;
            case 2:
                imageLink = require('../assets/videos/AroundBorderGifSecond.gif')
                break;
            case 3:
                imageLink = require('../assets/videos/AroundBorderGifThird.gif')
                break;
        }
        return imageLink;
    }

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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <View style={{
                flexDirection: isLandscape ? 'row' : 'column',
                gap: 40,
                alignSelf: 'center',
            }}>
                <View>
                    <View style={styles.userInformation}>
                        <View style={styles.userImage}>
                            <Image style={styles.logoBorder} source={borderStyle(1)} />
                            <Image style={styles.logo} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMFrNpgzBaXy8MRx5eD-CmQiqlzxg0uMfwcJtln9xqDFvUp1LY7bzYgsWa&s=10' }} />
                        </View>
                        <Text style={styles.userName}>{nome}</Text>
                        <Text style={styles.userBiografy}>{biografy}</Text>
                        <View style={styles.stats}>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>{followers}</Text>
                                <Text style={styles.statText}>Seguindo</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>{following}</Text>
                                <Text style={styles.statText}>Seguidores</Text>
                            </View>
                        </View>
                        <InputField
                            information={true}
                            label="Localidade"
                            icon={<MaterialCommunityIcons name="city" size={24} color={ColorTypes.TEXT_TITLE} />}
                            value={location}
                        />
                    </View>
                </View>
                <View style={styles.moreInformationsUser}>
                    <Text style={styles.subTitle}>Informações Pessoais</Text>
                    <View style={styles.moreInformations}>
                        <InputField
                            information={true}
                            label="Email"
                            icon={<MaterialIcons name="email" size={24} color={ColorTypes.TEXT_TITLE} />}
                            value={email}
                        />
                        <InputField
                            information={true}
                            label="Telefone"
                            icon={<MaterialIcons name="phone" size={24} color={ColorTypes.TEXT_TITLE} />}
                            value={telefone}
                        />
                        <InputField
                            information={true}
                            label="Empresa"
                            icon={<FontAwesome5 name="house-user" size={24} color={ColorTypes.TEXT_TITLE} />}
                            value={company}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 70,
        flex: 1,
        gap: 10,
        backgroundColor: ColorTypes.BACKGROUND,
        padding: 20,
    },
    userInformation: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: ColorTypes.DARK,
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: ColorTypes.LIMONGREEN,
        marginTop: 20,
        marginBottom: 60,
    },
    userImage: {
        width: 160,
        height: 160,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 100,
        justfyContent: 'center',
    },
    logoBorder: {
        position: 'absolute',
        zIndex: 1,
        width: 160,
        height: 160,
        alignSelf: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 5,
        alignSelf: 'center',
    },
    userName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: ColorTypes.TEXT_TITLE,
        textAlign: 'center',
        marginBottom: 10,
    },
    userBiografy: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ColorTypes.TEXT_TITLE,
        textAlign: 'center',
        marginBottom: 10,
        padding: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        color: ColorTypes.TEXT_TITLE,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 24,
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
    stats: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderWidth: 0.5,
        borderColor: ColorTypes.LIMONGREEN,
        backgroundColor: ColorTypes.GRAY,
        borderRadius: 10,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: '600',
        color: ColorTypes.LIMONGREEN,
    },
    statText: {
        fontSize: 16,
        color: ColorTypes.GREEN,
        marginTop: 2,
    },
    moreInformationsUser: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: ColorTypes.DARK,
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: ColorTypes.LIMONGREEN,
        marginTop: 20,
        marginBottom: 60,
    },
    moreInformations: {
        gap: 10,
    },
});