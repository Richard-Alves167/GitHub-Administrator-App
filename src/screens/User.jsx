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
    const { data, logout } = useAuth();
    const { usuarioGithub } = useGit();

    const imagem = usuarioGithub?.avatar_url || "https://img.icons8.com/ios_filled/512/40C057/github.png";
    const nome = usuarioGithub?.name || usuarioGithub?.login || data?.user?.nome || "";
    const biografy = usuarioGithub?.bio || "Sem Biografia";
    const followers = usuarioGithub?.followers ?? 0;
    const following = usuarioGithub?.following ?? 0;
    const location = usuarioGithub?.location || "Não informado";
    const email = usuarioGithub?.email || data?.user?.email || "Não informado";
    const telefone = data?.user?.telefone || "Não informado";
    const company = usuarioGithub?.company || "Não informado";
    const border = data?.user?.border || 1;

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
                            <Image style={styles.logoBorder} source={borderStyle(border)} />
                            <Image style={styles.logo} source={{ uri: imagem }} />
                        </View>
                        <Text style={styles.userName}>{nome}</Text>
                        <Text style={styles.userBiografy}>{biografy}</Text>
                        <View style={styles.stats}>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>{following}</Text>
                                <Text style={styles.statText}>Seguindo</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>{followers}</Text>
                                <Text style={styles.statText}>Seguidores</Text>
                            </View>
                        </View>
                        <InputField
                            information={true}
                            label="Localidade"
                            icon={<MaterialCommunityIcons name="city" size={24} color={ColorTypes.TEXT_TITLE} />}
                            value={location}
                        />
                        <ButtonComponent logout={true} function={logout} navigation={navigation} />
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
        maxWidth: 350,
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
        fontSize: 16,
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
        maxWidth: 350,
        backgroundColor: ColorTypes.DARK,
        padding: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: ColorTypes.LIMONGREEN,
        marginBottom: 80,
    },
    moreInformations: {
        gap: 10,
    },
});