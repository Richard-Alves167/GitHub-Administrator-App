import { StyleSheet, Text, View, Pressable } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Routes from '../Routes/index';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CardRepository({ repo }) {
  const icon = repo.private ? "locked" : "unlocked";
  function renderSwipeAction() {
    return (
      <View style={styles.swipeAction}>
        <Text style={styles.swipeTexto}>Ver mais</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderSwipeAction}
        onSwipeableOpen={() => navigation.navigate(Routes.REPO, { repo })}>
        <Pressable onPress={() => navigation.navigate(Routes.REPO, { repo })} style={styles.RepositoryContainer}>
          <View style={styles.RepositoryLeft}>
            <View style={styles.RepositorysitoryHeader}>
              <Text style={styles.RepositoryName}>{repo.name}</Text>
              <Fontisto name={icon} size={24} color={ColorTypes.TEXT_TITLE} />
            </View>
            <Text style={styles.RepositoryDesc} numberOfLines={2}>{repo.description}</Text>
            <View style={styles.RepositoryMeta}>
              <Text style={styles.RepositoryBadge}>
                {repo.private ? 'Privado' : 'Público'}
              </Text>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  RepositoryContainer: {
    backgroundColor: ColorTypes.GRAY,
    borderWidth: 0.5,
    borderColor: ColorTypes.LIMONGREEN,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  RepositoryLeft: {
    flex: 1,
    gap: 4,
  },
  RepositorysitoryHeader: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  RepositoryName: {
    fontSize: 18,
    fontWeight: '500',
    color: ColorTypes.TEXT_TITLE,
  },
  RepositoryDesc: {
    fontSize: 14,
    color: ColorTypes.GREEN,
    marginBottom: 10,
  },
  RepositoryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  RepositoryBadge: {
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
});
