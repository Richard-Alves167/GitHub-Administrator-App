import { StyleSheet, View, Text, ImageBackground, Image, FlatList, Pressable } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import ViewNoGitHubToken from '../components/ViewNoGitHubToken';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useGit } from "../providers/GitContext";
import { useRef, useState } from "react";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Repositorios({navigation}) {
    const { repositorios, buscarRepositoriosGithub, usuarioGithub } = useGit();
    const loadingRef = useRef(false);
    const pageRef = useRef(1);
    const [refreshing, setRefreshing] = useState(false);
    const total = usuarioGithub?.public_repos || 0;
    const carregados = repositorios.length;
    const porcentagem = total > 0 ? Math.min(Math.round((carregados / total) * 100), 100) : 0;
    const [ordenacao, setOrdenacao] = useState('asc');
    const [filtro, setFiltro] = useState('todos');

    async function carregarMais() {
        if (loadingRef.current) return;
        loadingRef.current = true;
        pageRef.current += 1;
        await buscarRepositoriosGithub(pageRef.current);
        loadingRef.current = false;
    }

    async function onRefresh() {
        setRefreshing(true);
        pageRef.current = 1;
        await buscarRepositoriosGithub(1);
        setRefreshing(false);
    }

    function renderSwipeAction() {
        return (
            <View style={styles.swipeAction}>
                <Text style={styles.swipeTexto}>Ver detalhes</Text>
            </View>
        );
    }

    const sorted = [...repositorios].filter(repo => {
        if (filtro === 'publico') return !repo.private;
        if (filtro === 'privado') return repo.private;
        return true;
    })
        .sort((a, b) => ordenacao === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    if (usuarioGithub === null) {
        return (
            <ViewNoGitHubToken></ViewNoGitHubToken>
        );
    }


    return (
        <GestureHandlerRootView style={{backgroundColor: ColorTypes.BACKGROUND, flex: 1 }}>
            <View style={{ flex: 1 }}>

                <View style={styles.ProgressContainer}>
                    <View style={styles.ProgressLinha}>
                        <Text style={styles.ProgressTitulo}>Repositórios</Text>
                        <Text style={styles.ProgressPercentagem}>{porcentagem}%</Text>
                    </View>
                    <Progress.Bar progress={porcentagem / 100} width={null} color={ColorTypes.LIMONGREEN} unfilledColor={ColorTypes.WHITE} animated={true} borderWidth={0} height={3} />
                </View>

                <View style={styles.filtros}>
                    <View style={styles.filtroGrupo}>
                        {['todos', 'publico', 'privado'].map(opcao => (
                            <Pressable key={opcao} onPress={() => setFiltro(opcao)} style={[styles.filtroBotao, filtro === opcao && styles.filtroBotaoAtivo]}>
                                <Text style={[styles.filtroTexto, filtro === opcao && styles.filtroTextoAtivo]}>
                                    {opcao}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.filtroGrupo}>
                        {['asc', 'desc'].map(opcao => (
                            <Pressable key={opcao} onPress={() => setOrdenacao(opcao)} style={[styles.filtroBotao, ordenacao === opcao && styles.filtroBotaoAtivo]}>
                                <Text style={[styles.filtroTexto, ordenacao === opcao && styles.filtroTextoAtivo]}>
                                    {opcao === 'asc' ? 'Asc' : 'Desc'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <FlatList
                    data={sorted}
                    keyExtractor={(repo) => String(repo.id)}
                    onEndReached={carregarMais}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item: repo }) => (
                        <Swipeable
                            renderRightActions={renderSwipeAction}
                            onSwipeableOpen={() => navigation.navigate(Routes.REPO, { repo })}>
                            <Pressable onPress={() => navigation.navigate(Routes.REPO, { repo })} style={styles.RepoContainer}>
                                <View style={styles.RepoLeft}>
                                    <Text style={styles.RepoName}>{repo.name}</Text>
                                    <Text style={styles.RepoDesc} numberOfLines={1}>{repo.description}</Text>
                                    <View style={styles.RepoMeta}>
                                        <Text style={repo.private ? styles.RepoPrivateBadge : styles.RepoPublicBadge}>
                                            {repo.private ? 'Privado' : 'Público'}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        </Swipeable>
                    )}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    RepoContainer: {
        backgroundColor: ColorTypes.BACKGROUND,
        borderWidth: 0.5,
        borderColor: ColorTypes.BORDER,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    RepoLeft: {
        flex: 1,
        gap: 4,
    },
    RepoName: {
        fontSize: 15,
        fontWeight: '500',
        color: ColorTypes.TEXT_TITLE,
    },
    RepoDesc: {
        fontSize: 13,
        color: ColorTypes.TEXT_TITLE,
    },
    RepoMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
    },
    RepoPrivateBadge: {
        fontSize: 11,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color: '#666',
        fontWeight: '500',
    },
    RepoPublicBadge: {
        fontSize: 11,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        color: ColorTypes.GREEN,
        fontWeight: '500',
    },
    Arrow: {
        fontSize: 18,
        color: ColorTypes.TEXT_TITLE,
        marginTop: 2,
    },
    NoRepos: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 40,
        color: '#888',
    },
    ProgressContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    ProgressLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    ProgressTitulo: {
        fontSize: 24,
        color: ColorTypes.LIMONGREEN,
    },
    ProgressPercentagem: {
        fontSize: 13,
        fontWeight: '500',
        color: ColorTypes.LIMONGREEN,
    },
    swipeAction: {
        backgroundColor: ColorTypes.DARK,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    swipeTexto: {
        color: ColorTypes.WHITE,
        fontSize: 13,
        fontWeight: '500',
    },
    filtros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 8,
    },
    filtroGrupo: {
        flexDirection: 'row',
        gap: 6,
    },
    filtroBotao: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
    },
    filtroBotaoAtivo: {
        backgroundColor: ColorTypes.SECONDARY_GREEN,
        borderColor: ColorTypes.GREEN,
    },
    filtroTexto: {
        fontSize: 12,
        color: ColorTypes.BACKGROUND_BUTTON,
    },
    filtroTextoAtivo: {
        color: ColorTypes.WHITE,
    },
});