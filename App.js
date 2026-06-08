import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Routes/StackNavigator';
import ColorTypes from './src/assets/ColorTypes';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { VideoView, useVideoPlayer } from 'expo-video';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [showSplashVideo, setShowSplashVideo] = useState(true);
  const player = useVideoPlayer(
    require('./src/assets/videos/KwaiCafeLogovideoIntroductionWithoutBackground.webm')
  );
  useEffect(() => {
    player.loop = false;
    player.muted = true;
    const startVideo = setTimeout(() => {
      player.play();
    }, 0);
    const endVideo = setTimeout(async () => {
      setShowSplashVideo(false);
      await SplashScreen.hideAsync();
    }, 5000);
    return () => {
      clearTimeout(startVideo);
      clearTimeout(endVideo);
      player.pause();
    };
  }, [player]);

  if (!showSplashVideo) {
    return (
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    );
  }

  return (
    <View style={styles.splashContainer}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTypes.PRIMARY_BROWN,
  },
  video: {
    width: 250,
    height: 250,
  },
});