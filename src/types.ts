export interface Task {
  title: string;
  emoji: string;
  duration: number;
}

export type TimerMode = 'beat-timer' | 'countdown';
export type MusicMode = 'default' | 'custom-time' | 'custom-song';
export type Screen = 'home' | 'beat-timer' | 'countdown' | 'task-timer' | 'success' | 'failure' | 'guide' | 'language';

export interface TimerParams {
  taskTitle: string;
  taskEmoji: string;
  duration: number;
  mode: TimerMode;
  musicMode: MusicMode;
}

export interface ResultParams {
  taskTitle: string;
  taskEmoji: string;
  reason?: string;
}