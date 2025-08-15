import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export class AudioManager {
  private static sound: Audio.Sound | null = null;

  static async initializeAudio() {
    try {
      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }
    } catch (error) {
      console.warn('Error initializing audio:', error);
    }
  }

  static async playDefaultSong(duration: number) {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // In a real app, you would have different songs for different durations
      // For now, we'll simulate with a placeholder
      console.log(`Playing default song for ${duration} minutes`);
      
      // This would be replaced with actual audio file loading
      // const { sound } = await Audio.Sound.createAsync(
      //   require('../assets/songs/default-song.mp3')
      // );
      // this.sound = sound;
      // await sound.playAsync();
    } catch (error) {
      console.warn('Error playing default song:', error);
    }
  }

  static async playCustomSong(uri: string) {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri });
      this.sound = sound;
      await sound.playAsync();
    } catch (error) {
      console.warn('Error playing custom song:', error);
    }
  }

  static async stopAudio() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.warn('Error stopping audio:', error);
    }
  }

  static async pauseAudio() {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
      }
    } catch (error) {
      console.warn('Error pausing audio:', error);
    }
  }

  static async resumeAudio() {
    try {
      if (this.sound) {
        await this.sound.playAsync();
      }
    } catch (error) {
      console.warn('Error resuming audio:', error);
    }
  }
}