import { StyleSheet, Text, View, Pressable } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Routes from '../Routes/index';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CardRepository({ issue, atualizarStatusIssue }) {
    const icon = issue.state === 'open' ? "folder-open" : "folder";

    function renderSwipeEsquerda(issue) {
        return (
            <Pressable
                style={[styles.swipe, { backgroundColor: ColorTypes.PRIMARY_GREEN }]}
                onPress={() => atualizarStatusIssue(issue, 'open')}
            >
                <Text style={styles.swipeTexto}>Abrir</Text>
            </Pressable>
        );
    }

    function renderSwipeDireita(issue) {
        return (
            <Pressable
                style={[styles.swipe, { backgroundColor: ColorTypes.DARK }]}
                onPress={() => atualizarStatusIssue(issue, 'closed')}
            >
                <Text style={styles.swipeTexto}>Fechar</Text>
            </Pressable>
        );
    }

    return (
        <GestureHandlerRootView>
            <Swipeable renderLeftActions={() => renderSwipeEsquerda(issue)} renderRightActions={() => renderSwipeDireita(issue)}>
                <View style={styles.card}>
                    <View style={styles.IssueLeft}>
                        <View style={styles.IssueHeader}>
                            <Text style={styles.IssueName}>{issue.title}</Text>
                            <AntDesign name="folder-open" size={24} color={ColorTypes.TEXT_TITLE} />
                        </View>
                        <Text style={styles.IssueDesc}>{issue.repository?.full_name}</Text>
                    </View>
                    <Text style={styles.IssueBadge}>
                        {issue.state === 'open' ? 'Aberta' : 'Fechada'}
                    </Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: ColorTypes.GRAY,
        borderWidth: 0.5,
        borderColor: ColorTypes.LIMONGREEN,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    IssueLeft: {
        flex: 1,
        gap: 4,
    },
    IssueHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    IssueName: {
        fontSize: 18,
        fontWeight: '500',
        color: ColorTypes.TEXT_TITLE,
    },
    IssueDesc: {
        fontSize: 14,
        color: ColorTypes.GREEN,
        marginBottom: 10,
    },
    IssueMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
    },
    IssueBadge: {
        fontSize: 11,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: ColorTypes.BACKGROUND,
        color: ColorTypes.LIMONGREEN,
        fontWeight: '500',
    },
    swipeAction: {
        backgroundColor: ColorTypes.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    swipeTexto: {
        color: ColorTypes.WHITE,
        fontSize: 16,
        fontWeight: '500',
    },
    swipeAction: {
        backgroundColor: ColorTypes.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    swipeTexto: {
        color: ColorTypes.WHITE,
        fontSize: 16,
        fontWeight: '500',
    },
});