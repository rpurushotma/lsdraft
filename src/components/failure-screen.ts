import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';
import { ResultParams } from '../types';

@customElement('failure-screen')
export class FailureScreen extends LitElement {
  @property({ type: Object }) params: ResultParams | null = null;
  @state() showDuck = false;
  @state() showMessage = false;

  static styles = [sharedStyles, css`
    :host {
      --bg-start: #FFB6C1;
      --bg-end: #FFC0CB;
    }

    .container {
      background: linear-gradient(135deg, #FFB6C1, #FFC0CB, #FFE4E1, #FFF0F5);
    }

    .duck-stage {
      height: 120px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
    }

    .duck {
      font-size: 64px;
      position: absolute;
      animation: waddle 5s ease-in-out;
    }

    .message-container {
      text-align: center;
      margin-bottom: 40px;
      opacity: 0;
      animation: fadeIn 0.5s ease-out 5s forwards;
    }

    .task-emoji {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .failure-title {
      font-size: 32px;
      font-weight: 700;
      color: #FF1493;
      text-align: center;
      margin-bottom: 16px;
      text-shadow: 2px 2px 4px #FFFFFF;
    }

    .task-name {
      font-size: 24px;
      font-weight: 600;
      color: #FF4500;
      text-align: center;
      margin-bottom: 20px;
      text-shadow: 1px 1px 2px #FFFFFF;
    }

    .message {
      font-size: 18px;
      color: #9370DB;
      text-align: center;
      line-height: 26px;
      margin-bottom: 16px;
      text-shadow: 1px 1px 2px #FFFFFF;
    }

    .encouragement {
      font-size: 18px;
      font-weight: 600;
      color: #32CD32;
      text-align: center;
      text-shadow: 1px 1px 2px #FFFFFF;
    }

    .button-container {
      display: flex;
      gap: 16px;
      justify-content: center;
      opacity: 0;
      animation: fadeIn 0.5s ease-out 5s forwards;
    }

    .home-btn {
      --btn-start: #FF1493;
      --btn-end: #FF69B4;
    }

    .try-again-btn {
      --btn-start: #32CD32;
      --btn-end: #98FB98;
    }

    @keyframes waddle {
      0% { transform: translateX(-200px); }
      30% { transform: translateX(0px) scale(1); }
      40% { transform: translateX(0px) scale(1.2); }
      50% { transform: translateX(0px) scale(0.9); }
      60% { transform: translateX(0px) scale(1.1); }
      70% { transform: translateX(0px) scale(1); }
      100% { transform: translateX(200px); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `];

  private getMessage(): string {
    if (this.params?.reason === 'stopped-early') {
      return "Oops! You stopped too early. Try to keep going next time!";
    }
    return "Time's up! Don't worry, you'll get it next time!";
  }

  private navigateHome() {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { screen: 'home' },
      bubbles: true,
      composed: true
    }));
  }

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.params) return html`<div>Loading...</div>`;

    return html`
      <div class="container">
        <div class="content" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; padding: 20px;">
          <div class="duck-stage">
            <div class="duck">🦆</div>
          </div>

          <div class="message-container">
            <div class="task-emoji">${this.params.taskEmoji}</div>
            <div class="failure-title">Not quite there!</div>
            <div class="task-name">${this.params.taskTitle}</div>
            <div class="message">${this.getMessage()}</div>
            <div class="encouragement">Keep practicing - you've got this! 💪</div>
          </div>

          <div class="button-container">
            <button class="button home-btn" @click=${this.navigateHome}>
              <span>🏠</span>
              <span>Home</span>
            </button>

            <button class="button try-again-btn" @click=${this.goBack}>
              <span>🔄</span>
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}