import { StyleSheet, Text, View, Pressable } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Routes from '../Routes/index';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef } from 'react';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CardRepository({ issue, atualizarStatusIssue }) {
    const icon = issue.state === 'open' ? "folder-open" : "folder";
    const swipeableRef = useRef(null);

    function renderSwipeLeft() {
        return (
            <Pressable style={[styles.swipeAction, { backgroundColor: ColorTypes.PRIMARY_GREEN }]}>
                <Text style={styles.swipeTexto}>Abrir</Text>
                <AntDesign name="folder-open" size={24} color={ColorTypes.TEXT_TITLE} />
            </Pressable>
        );
    }

    function renderSwipeRight() {
        return (
            <Pressable style={[styles.swipeAction, { backgroundColor: ColorTypes.DARK }]}>
                <Text style={styles.swipeTexto}>Fechar</Text>
                <AntDesign name="folder" size={24} color={ColorTypes.TEXT_TITLE} />
            </Pressable>
        );
    }

    async function handleSwipe(direction) {
        try {
            if (direction === 'left') {
                await atualizarStatusIssue(issue, 'open');
            } else {
                await atualizarStatusIssue(issue, 'closed');
            }
        } finally {
            swipeableRef.current?.close();
        }
    }

    return (
        <GestureHandlerRootView>
            <Swipeable ref={swipeableRef} renderLeftActions={() => renderSwipeLeft()} renderRightActions={() => renderSwipeRight()} onSwipeableOpen={handleSwipe}>
                <View style={styles.card}>
                    <View style={styles.issueLeft}>
                        <View style={styles.issueHeader}>
                            <Text style={styles.issueName}>{issue.title}</Text>
                            <AntDesign name={icon} size={24} color={ColorTypes.TEXT_TITLE} />
                        </View>
                        <Text style={styles.issueDesc}>{issue.repository?.full_name}</Text>
                    </View>
                    <Text style={styles.issueBadge}>
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

    },
    issueLeft: {
        gap: 4,
    },
    issueHeader: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    issueName: {
        fontSize: 18,
        fontWeight: '500',
        color: ColorTypes.TEXT_TITLE,
    },
    issueDesc: {
        fontSize: 14,
        color: ColorTypes.GREEN,
        marginBottom: 10,
    },
    issueMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
    },
    issueBadge: {
        width: 60,
        textAlign: 'center',
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