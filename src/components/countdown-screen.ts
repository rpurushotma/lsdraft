import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';
import { Task } from '../types';

@customElement('countdown-screen')
export class CountdownScreen extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      --bg-start: #16A34A;
      --bg-end: #22C55E;
    }

    .tasks-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 30px;
    }

    .task-button {
      --btn-start: #32CD32;
      --btn-end: #98FB98;
    }

    .task-description {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .tip-container {
      background: rgba(255, 255, 255, 0.2);
      padding: 16px;
      border-radius: 16px;
      text-align: center;
    }

    .tip-title {
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 8px;
    }

    .tip-text {
      font-size: 14px;
      color: #FFFFFF;
      line-height: 20px;
    }
  `];

  private tasks: Task[] = [
    { title: 'Take Turns', emoji: '🤝', duration: 5 },
    { title: 'Take Turns', emoji: '🤝', duration: 5 },
    { title: 'Brush Teeth', emoji: '🦷', duration: 2 },
    { title: 'Practice Piano', emoji: '🎹', duration: 15 },
    { title: 'Read Book', emoji: '📚', duration: 10 },
    { title: 'Meditation', emoji: '🧘‍♀️', duration: 5 },
    { title: 'Exercise', emoji: '🏃‍♂️', duration: 20 },
    { title: 'Homework', emoji: '📝', duration: 30 },
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
          mode: 'countdown',
          musicMode: 'default',
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
          <div class="header-title">3️⃣2️⃣1️⃣ Countdown!</div>
        </div>

        <div class="content">
          <div class="instructions">
            Keep going steadily until your timer reaches zero! 3️⃣2️⃣1️⃣
          </div>

          <div class="tasks-grid">
            ${this.tasks.map(task => html`
              <button class="button task-button" @click=${() => this.selectTask(task)}>
                <div class="task-emoji">${task.emoji}</div>
                <div class="task-title">${task.title}</div>
                <div class="duration-container">
                  <span>⏳</span>
                  <span class="duration-text">${task.duration}min</span>
                </div>
                <div class="task-description">Keep going until time's up!</div>
              </button>
            `)}
          </div>

          <div class="tip-container">
            <div class="tip-title">💡 Pro Tip:</div>
            <div class="tip-text">
              If you stop before the timer ends, you'll meet our friend the duck! 🦆
            </div>
          </div>
        </div>
      </div>
    `;
  }
}