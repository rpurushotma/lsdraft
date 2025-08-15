import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';

@customElement('guide-screen')
export class GuideScreen extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      --bg-start: #10B981;
      --bg-end: #34D399;
    }

    .container {
      background: linear-gradient(135deg, #10B981, #34D399, #6EE7B7, #A7F3D0);
    }

    .welcome-text {
      font-size: 28px;
      font-weight: 700;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 12px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .subtitle {
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 30px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .guides-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 30px;
    }

    .guide-card {
      background: linear-gradient(135deg, var(--card-start), var(--card-end));
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .guide-card.beat-timer {
      --card-start: #FF1493;
      --card-end: #FF69B4;
    }

    .guide-card.countdown {
      --card-start: #32CD32;
      --card-end: #98FB98;
    }

    .guide-card.music {
      --card-start: #9370DB;
      --card-end: #BA55D3;
    }

    .guide-card.rewards {
      --card-start: #FF4500;
      --card-end: #FFA500;
    }

    .card-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
    }

    .card-description {
      font-size: 14px;
      color: #FFFFFF;
      line-height: 20px;
    }

    .tip-container {
      background: rgba(255, 255, 255, 0.2);
      padding: 20px;
      border-radius: 16px;
      text-align: center;
    }

    .tip-title {
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 12px;
    }

    .tip-text {
      font-size: 14px;
      color: #FFFFFF;
      line-height: 20px;
    }

    .scrollable-content {
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      padding-right: 10px;
    }

    .scrollable-content::-webkit-scrollbar {
      width: 6px;
    }

    .scrollable-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    .scrollable-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }
  `];

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <button class="back-button" @click=${this.goBack}>
            <span style="font-size: 24px; color: white;">←</span>
          </button>
          <div class="header-title">How to Play</div>
        </div>

        <div class="content">
          <div class="scrollable-content">
            <div class="welcome-text">Welcome to Lickety Split! 🎮</div>
            <div class="subtitle">Here's how to have fun while getting things done:</div>

            <div class="guides-container">
              <div class="guide-card beat-timer">
                <div class="card-icon">⚡</div>
                <div class="card-title">Beat the Timer</div>
                <div class="card-description">
                  Choose a task and try to finish it before the music ends! Tap "I Did It!" when you complete your task.
                </div>
              </div>

              <div class="guide-card countdown">
                <div class="card-icon">⏳</div>
                <div class="card-title">Countdown Mode</div>
                <div class="card-description">
                  Keep doing your task for the entire duration! Don't stop until the timer reaches zero.
                </div>
              </div>

              <div class="guide-card music">
                <div class="card-icon">🎵</div>
                <div class="card-title">Custom Songs</div>
                <div class="card-description">
                  You can choose your own favorite songs from your music library to make tasks even more fun!
                </div>
              </div>

              <div class="guide-card rewards">
                <div class="card-icon">⭐</div>
                <div class="card-title">Rewards</div>
                <div class="card-description">
                  Complete tasks successfully to see amazing celebration animations and earn stars!
                </div>
              </div>
            </div>

            <div class="tip-container">
              <div class="tip-title">🦆 Meet the Duck!</div>
              <div class="tip-text">
                If you don't complete your task in time, a special duck friend will visit you. 
                Don't worry - the duck just wants to remind you to try again!
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}