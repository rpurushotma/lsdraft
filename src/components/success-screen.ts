import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';
import { ResultParams } from '../types';

@customElement('success-screen')
export class SuccessScreen extends LitElement {
  @property({ type: Object }) params: ResultParams | null = null;

  static styles = [sharedStyles, css`
    :host {
      --bg-start: #FFD700;
      --bg-end: #FFA500;
    }

    .container {
      background: linear-gradient(135deg, #FFD700, #FFA500, #FF69B4, #32CD32);
    }

    .confetti-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1;
    }

    .confetti {
      position: absolute;
      font-size: 24px;
      animation: bounce 2s infinite;
    }

    .confetti:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
    .confetti:nth-child(2) { top: 15%; right: 20%; font-size: 20px; animation-delay: 0.5s; }
    .confetti:nth-child(3) { top: 25%; left: 15%; font-size: 28px; animation-delay: 1s; }
    .confetti:nth-child(4) { top: 40%; right: 10%; font-size: 22px; animation-delay: 1.5s; }
    .confetti:nth-child(5) { top: 60%; left: 25%; font-size: 26px; animation-delay: 2s; }

    .content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }

    .star-emoji {
      font-size: 48px;
      margin-bottom: 20px;
      animation: spin 3s linear infinite;
    }

    .task-emoji {
      font-size: 96px;
      margin-bottom: 30px;
      animation: bounce 2s infinite;
    }

    .success-title {
      font-size: 36px;
      font-weight: 700;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 16px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .task-completed {
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin-bottom: 16px;
    }

    .celebration-text {
      font-size: 18px;
      color: #333333;
      text-align: center;
      margin-bottom: 40px;
    }

    .button-container {
      display: flex;
      gap: 16px;
    }

    .home-btn {
      --btn-start: #FF1493;
      --btn-end: #FF69B4;
    }

    .try-again-btn {
      --btn-start: #32CD32;
      --btn-end: #98FB98;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `];

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
        <div class="confetti-container">
          <div class="confetti">🎉</div>
          <div class="confetti">✨</div>
          <div class="confetti">🌟</div>
          <div class="confetti">🎊</div>
          <div class="confetti">⭐</div>
        </div>

        <div class="content">
          <div class="star-emoji">⭐</div>
          <div class="task-emoji">${this.params.taskEmoji}</div>
          
          <div class="success-title">Amazing Work!</div>
          <div class="task-completed">You completed: ${this.params.taskTitle}</div>
          <div class="celebration-text">You're absolutely fantastic! 🌈</div>

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