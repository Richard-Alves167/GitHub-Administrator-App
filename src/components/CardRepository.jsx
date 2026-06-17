import { StyleSheet, Text, View, Pressable } from 'react-native';
import ColorTypes from '../assets/ColorTypes';
import Routes from '../Routes/index';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CardRepository({ repository, navigation }) {
  const icon = repository.private ? "locked" : "unlocked";
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
        onSwipeableOpen={() => navigation.navigate(Routes.REPOSITORY, { repository })}>
        <Pressable onPress={() => navigation.navigate(Routes.REPOSITORY, { repository })} style={styles.repositoryContainer}>
          <View style={styles.repositoryLeft}>
            <View style={styles.repositoryHeader}>
              <Text style={styles.repositoryName}>{repository.name}</Text>
              <Fontisto name={icon} size={24} color={ColorTypes.TEXT_TITLE} />
            </View>
            <Text style={styles.repositoryDesc} numberOfLines={2}>{repository.description}</Text>
            <View style={styles.repositoryMeta}>
              <Text style={styles.repositoryBadge}>
                {repository.private ? 'Privado' : 'Público'}
              </Text>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  repositoryContainer: {
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
  repositoryLeft: {
    flex: 1,
    gap: 4,
  },
  repositoryHeader: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: '500',
    color: ColorTypes.TEXT_TITLE,
  },
  repositoryDesc: {
    fontSize: 14,
    color: ColorTypes.GREEN,
    marginBottom: 10,
  },
  repositoryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  repositoryBadge: {
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
