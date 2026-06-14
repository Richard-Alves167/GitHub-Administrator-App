import { StyleSheet, View, Text, ImageBackground, Image, FlatList, Pressable } from 'react-native';
import Routes from '../Routes/index';
import ColorTypes from '../assets/ColorTypes';
import ArrowBack from '../components/ArrowBackPage';
import ViewNoGitHubToken from '../components/ViewNoGitHubToken';
import CardRepository from '../components/CardRepository';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useGit } from "../providers/GitContext";
import { useRef, useState } from "react";

export default function Repositorios({ navigation }) {
    const { repositorios, carregarRepositorios, usuarioGithub, token } = useGit();
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
        await carregarRepositorios(token, pageRef.current);
        loadingRef.current = false;
    }

    async function onRefresh() {
        setRefreshing(true);
        pageRef.current = 1;
        await carregarRepositorios(token, 1);
        setRefreshing(false);
    }

    const sorted = [...repositorios].filter(repo => {
        if (filtro === 'publico') return !repo.private;
        if (filtro === 'privado') return repo.private;
        return true;
    }).sort((a, b) => ordenacao === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    if (usuarioGithub === null) {
        return <ViewNoGitHubToken></ViewNoGitHubToken>
    }
    return (
        <View style={{ backgroundColor: ColorTypes.BACKGROUND, flex: 1 }}>

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
                onEndReachedThreshold={0.1}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item: repo }) => (
                    <CardRepository repo={repo} navigation={navigation}></CardRepository>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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