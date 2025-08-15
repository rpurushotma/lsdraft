import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';
import { Task, MusicMode } from '../types';

@customElement('beat-timer-screen')
export class BeatTimerScreen extends LitElement {
  @state() selectedMode: MusicMode = 'default';

  static styles = [sharedStyles, css`
    :host {
      --bg-start: #EAB308;
      --bg-end: #FACC15;
    }

    .mode-selector {
      margin-bottom: 30px;
    }

    .mode-title {
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 12px;
      text-align: center;
    }

    .mode-buttons {
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    .mode-button {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      padding: 8px 12px;
      border-radius: 20px;
      gap: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .mode-button.active {
      background: #FFFFFF;
      color: #EF4444;
    }

    .mode-button:not(.active) {
      color: #FFFFFF;
    }

    .mode-button-text {
      font-size: 12px;
      font-weight: 600;
    }

    .tasks-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .task-button {
      --btn-start: #FF6B35;
      --btn-end: #FF8E53;
      height: 160px;
    }

    .task-emoji {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .task-title {
      font-size: 16px;
    }
  `];

  private tasks: Task[] = [
    { title: 'Ready to Go', emoji: '🚀', duration: 5 },
    { title: 'Make Bed', emoji: '🛏️', duration: 3 },
    { title: 'Mealtime', emoji: '🍽️', duration: 15 },
    { title: 'Put on PJs', emoji: '👘', duration: 3 },
    { title: 'Brush Teeth', emoji: '🦷', duration: 2 },
    { title: 'Get Dressed', emoji: '👕', duration: 4 },
  ];

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  private selectTask(task: Task) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: {
        screen: 'task-timer',
        params: {
          taskTitle: task.title,
          taskEmoji: task.emoji,
          duration: task.duration,
          mode: 'beat-timer',
          musicMode: this.selectedMode,
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <button class="back-button" @click=${this.goBack}>
            <span style="font-size: 24px; color: white;">←</span>
          </button>
          <div class="header-title">⚡ Beat the Timer!</div>
        </div>

        <div class="content">
          <div class="instructions">
            Race against time to finish before the timer runs out! ⏰⚡
          </div>

          <div class="mode-selector">
            <div class="mode-title">Music Mode:</div>
            <div class="mode-buttons">
              <button 
                class="mode-button ${this.selectedMode === 'default' ? 'active' : ''}"
                @click=${() => this.selectedMode = 'default'}
              >
                <span>🎵</span>
                <span class="mode-button-text">Default Song</span>
              </button>
              
              <button 
                class="mode-button ${this.selectedMode === 'custom-time' ? 'active' : ''}"
                @click=${() => this.selectedMode = 'custom-time'}
              >
                <span>⏰</span>
                <span class="mode-button-text">Custom Time</span>
              </button>
              
              <button 
                class="mode-button ${this.selectedMode === 'custom-song' ? 'active' : ''}"
                @click=${() => this.selectedMode = 'custom-song'}
              >
                <span>🔀</span>
                <span class="mode-button-text">My Song</span>
              </button>
            </div>
          </div>

          <div class="tasks-grid">
            ${this.tasks.map(task => html`
              <button class="button task-button" @click=${() => this.selectTask(task)}>
                <div class="task-emoji">${task.emoji}</div>
                <div class="task-title">${task.title}</div>
                <div class="duration-container">
                  <span>⚡</span>
                  <span class="duration-text">${task.duration}min</span>
                </div>
              </button>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}