import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorTypes from "../assets/ColorTypes";
import ArrowBackPage from "../components/ArrowBackPage";
import { useNavigation } from '@react-navigation/native';

export default function Repository({ route }) {
    const { repository } = route.params;
    const navigation = useNavigation();

    return (
        <>
            <ArrowBackPage navigation={ navigation }/>
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Text style={styles.name}>{repository.name}</Text>
                    <Text style={styles.descripion}>{repository.description || 'Sem descrição'}</Text>
                    <Text style={styles.repositoryBadge}>
                        {repository.private ? 'Privado' : 'Público'}
                    </Text>

                    <View style={styles.stats}>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{repository.stargazers_count}</Text>
                            <Text style={styles.statText}>estrelas</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{repository.forks_count}</Text>
                            <Text style={styles.statText}>forks</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{repository.open_issues_count}</Text>
                            <Text style={styles.statText}>issues</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Linguagem Principal</Text>
                        <Text style={styles.valor}>{repository.language || 'Não identificada'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Visitantes</Text>
                        <Text style={styles.valor}>{repository.watchers_count}</Text>
                    </View>

                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorTypes.BACKGROUND,
        paddingTop: 70,
    },
    scroll: {
        padding: 30,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 6,
        color: ColorTypes.TEXT_TITLE,
    },
    descripion: {
        fontSize: 14,
        color: ColorTypes.GREEN,
        lineHeight: 20,
        marginBottom: 16,
    },
    repositoryBadge: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 4,
        paddingHorizontal: 12,
        width: 120,
        textAlign: 'center',
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: ColorTypes.PRIMARY_GREEN,
        borderColor: ColorTypes.DARK,
        borderWidth: 2,
        color: ColorTypes.LIMONGREEN,
        fontWeight: '500',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: ColorTypes.BACKGROUND_BUTTON,
    },
    label: {
        fontSize: 14,
        color: ColorTypes.TEXT_TITLE,
        alignSelf: 'center',
    },
    valor: {
        fontSize: 20,
        fontWeight: '500',
        color: ColorTypes.LIMONGREEN,
    },
});