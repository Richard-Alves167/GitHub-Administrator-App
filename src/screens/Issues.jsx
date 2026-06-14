import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import ColorTypes from '../assets/ColorTypes';
import ViewNoGitHubToken from '../components/ViewNoGitHubToken';
import CardIssue from '../components/CardIssue';
import { useGit } from "../providers/GitContext";
import { useState } from "react";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Issues() {
    const { issues, atualizarStatusIssue, usuarioGithub } = useGit();
    const [filtro, setFiltro] = useState('todos');
    const [ordenacao, setOrdenacao] = useState('asc');

    const filtered = [...issues].filter(issue => {
        if (filtro === 'aberta') return issue.state === 'open';
        if (filtro === 'fechada') return issue.state === 'closed';
        return true;
    }).sort((a, b) => ordenacao === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

    

    if (usuarioGithub === null) {
        return (
            <ViewNoGitHubToken></ViewNoGitHubToken>
        );
    }

    return (
        <GestureHandlerRootView style={{ backgroundColor: ColorTypes.BACKGROUND, flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={styles.ProgressContainer}>
                    <View style={styles.ProgressLinha}>
                        <Text style={styles.ProgressTitulo}>Issues</Text>
                    </View>
                </View>
                <View style={styles.filtros}>
                    <View style={styles.filtroGrupo}>
                        {['todos', 'aberta', 'fechada'].map(op => (
                            <Pressable
                                key={op}
                                onPress={() => setFiltro(op)}
                                style={[styles.filtroBotao, filtro === op && styles.filtroBotaoAtivo]}
                            >
                                <Text style={[styles.filtroTexto, filtro === op && styles.filtroTextoAtivo]}>
                                    {op}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.filtroGrupo}>
                        {['asc', 'desc'].map(op => (
                            <Pressable
                                key={op}
                                onPress={() => setOrdenacao(op)}
                                style={[styles.filtroBotao, ordenacao === op && styles.filtroBotaoAtivo]}
                            >
                                <Text style={[styles.filtroTexto, ordenacao === op && styles.filtroTextoAtivo]}>
                                    {op === 'asc' ? 'A-Z' : 'Z-A'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(issue) => String(issue.id)}
                    ListEmptyComponent={<Text style={styles.vazio}>Nenhuma issue encontrada.</Text>}
                    renderItem={({ item: issue }) => (
                        <CardIssue issue={issue} atualizarStatusIssue={atualizarStatusIssue} />
                    )}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
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
    filtros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    filtroGrupo: {
        flexDirection: 'row',
        gap: 6
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
        borderColor: ColorTypes.GREEN
    },
    filtroTexto: {
        fontSize: 12,
        color: ColorTypes.BACKGROUND_BUTTON
    },
    filtroTextoAtivo: {
        color: ColorTypes.WHITE
    },
    card: {
        backgroundColor: ColorTypes.BACKGROUND,
        borderWidth: 0.5,
        borderColor: ColorTypes.BORDER,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    titulo: {
        fontSize: 14,
        fontWeight: '500',
        color: ColorTypes.TEXT_TITLE,
        marginBottom: 3
    },
    repo: {
        fontSize: 12,
        color: ColorTypes.TEXT_TITLE
    },
    aberta: {
        fontSize: 11, fontWeight: '500',
        paddingVertical: 3, paddingHorizontal: 8,
        borderRadius: 20, overflow: 'hidden',
        backgroundColor: '#e6f4ea', color: '#2d7a3a',
    },
    fechada: {
        fontSize: 11,
        fontWeight: '500',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color: '#666',
    },
    swipe: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    swipeTexto: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500'
    },
    vazio: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 40,
        color: '#888'
    },
});