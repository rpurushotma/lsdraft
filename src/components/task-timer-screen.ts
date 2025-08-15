import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';
import { TimerParams } from '../types';

@customElement('task-timer-screen')
export class TaskTimerScreen extends LitElement {
  @property({ type: Object }) params: TimerParams | null = null;
  @state() timeLeft = 0;
  @state() isRunning = false;
  @state() hasStarted = false;
  @state() progress = 0;

  private timerInterval: number | null = null;

  static styles = [sharedStyles, css`
    :host {
      --bg-start: #87CEEB;
      --bg-end: #FFB6C1;
    }

    .timer-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
    }

    .circle-container {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .circle-background {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      border: 10px solid #FFFFFF;
    }

    .circle-progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 10px solid transparent;
      border-top-color: #FF1493;
      border-right-color: #FF1493;
      transform-origin: center;
      transition: transform 1s linear;
    }

    .time-display {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .time-text {
      font-size: 42px;
      font-weight: 700;
      color: #FF4500;
      text-shadow: 2px 2px 4px #FFFFFF;
    }

    .task-emoji {
      font-size: 72px;
      margin-bottom: 40px;
      text-align: center;
      animation: bounce 3s infinite;
    }

    .timer-instructions {
      font-size: 20px;
      font-weight: 600;
      color: #9370DB;
      text-align: center;
      margin-bottom: 50px;
      padding: 0 30px;
      text-shadow: 2px 2px 4px #FFFFFF;
    }

    .action-button {
      --btn-start: #FFD700;
      --btn-end: #FFA500;
      padding: 20px 50px;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 700;
      border: 4px solid #FFFFFF;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .action-button.beat-timer {
      --btn-start: #FF1493;
      --btn-end: #FF69B4;
    }

    .action-button.countdown {
      --btn-start: #32CD32;
      --btn-end: #98FB98;
    }
  `];

  connectedCallback() {
    super.connectedCallback();
    if (this.params) {
      this.timeLeft = this.params.duration * 60;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  private startTimer() {
    this.isRunning = true;
    this.hasStarted = true;
    
    this.timerInterval = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.progress = 1 - (this.timeLeft / (this.params!.duration * 60));
      } else {
        this.completeTimer();
      }
    }, 1000);
  }

  private completeTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.isRunning = false;
    
    // Timer completed successfully
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: {
        screen: 'success',
        params: {
          taskTitle: this.params!.taskTitle,
          taskEmoji: this.params!.taskEmoji
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleCompletion() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.isRunning = false;

    if (this.params!.mode === 'beat-timer') {
      // Beat the timer mode - success if completed before time runs out
      if (this.timeLeft > 0) {
        this.dispatchEvent(new CustomEvent('navigate', {
          detail: {
            screen: 'success',
            params: {
              taskTitle: this.params!.taskTitle,
              taskEmoji: this.params!.taskEmoji
            }
          },
          bubbles: true,
          composed: true
        }));
      }
    } else {
      // Countdown mode - failure if stopped before time runs out
      if (this.timeLeft > 0) {
        this.dispatchEvent(new CustomEvent('navigate', {
          detail: {
            screen: 'failure',
            params: {
              taskTitle: this.params!.taskTitle,
              taskEmoji: this.params!.taskEmoji,
              reason: 'stopped-early'
            }
          },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private getButtonText(): string {
    if (!this.hasStarted) return 'Start!';
    if (this.params!.mode === 'beat-timer') return 'I Did It!';
    return 'I Stopped';
  }

  private getButtonClass(): string {
    if (!this.hasStarted) return 'action-button';
    return `action-button ${this.params!.mode}`;
  }

  private getInstructions(): string {
    return this.params!.mode === 'beat-timer' 
      ? 'Complete your task before time runs out!'
      : 'Keep going until the timer ends!';
  }

  render() {
    if (!this.params) return html`<div>Loading...</div>`;

    return html`
      <div class="container">
        <div class="header">
          <button class="back-button" @click=${this.goBack}>
            <span style="font-size: 24px; color: #333;">←</span>
          </button>
          <div class="header-title">${this.params.taskTitle}</div>
        </div>

        <div class="content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 120px);">
          <div class="task-emoji">${this.params.taskEmoji}</div>

          <div class="timer-container">
            <div class="circle-container">
              <div class="circle-background"></div>
              <div class="circle-progress" style="transform: rotate(${this.progress * 360}deg)"></div>
              <div class="time-display">
                <div class="time-text">${this.formatTime(this.timeLeft)}</div>
              </div>
            </div>
          </div>

          <div class="timer-instructions">
            ${this.getInstructions()}
          </div>

          <button 
            class="button ${this.getButtonClass()}" 
            @click=${this.hasStarted ? this.handleCompletion : this.startTimer}
          >
            ${this.hasStarted && this.params.mode === 'beat-timer' ? '✅' : ''}
            ${this.hasStarted && this.params.mode === 'countdown' ? '⭕' : ''}
            ${this.getButtonText()}
          </button>
        </div>
      </div>
    `;
  }
}