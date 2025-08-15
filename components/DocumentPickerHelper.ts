import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

export class DocumentPickerHelper {
  static async pickAudioFile(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        // Web doesn't support native file picker the same way
        console.warn('Custom song selection not available on web');
        return null;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.warn('Error picking audio file:', error);
      return null;
    }
  }
}