import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';

@customElement('home-screen')
export class HomeScreen extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      --bg-start: #10B981;
      --bg-end: #34D399;
    }

    .title-container {
      text-align: center;
      margin-bottom: 60px;
      animation: fadeInUp 0.8s ease-out;
    }

    .title {
      font-size: 42px;
      font-weight: 700;
      color: #F59E0B;
      text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
      margin-bottom: 8px;
      transform: rotate(-3deg);
    }

    .subtitle {
      font-size: 22px;
      font-weight: 600;
      color: #FEF9C3;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .main-buttons {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 40px;
    }

    .small-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .footer {
      font-size: 18px;
      font-weight: 600;
      color: #FEF9C3;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .beat-timer-btn {
      --btn-start: #D97706;
      --btn-end: #F59E0B;
      animation: fadeInUp 0.6s ease-out 0.3s both;
    }

    .countdown-btn {
      --btn-start: #166534;
      --btn-end: #16A34A;
      animation: fadeInUp 0.6s ease-out 0.6s both;
    }

    .guide-btn {
      --btn-start: #14532D;
      --btn-end: #166534;
      animation: fadeInUp 0.6s ease-out 0.9s both;
    }

    .language-btn {
      --btn-start: #A16207;
      --btn-end: #D97706;
      animation: fadeInUp 0.6s ease-out 1.2s both;
    }

    .decorations {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    .decoration {
      position: absolute;
      font-size: 24px;
      animation: bounce 3s infinite;
    }

    .decoration:nth-child(1) { top: 45%; right: 10%; animation-delay: 0s; }
  `];

  private navigate(screen: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { screen },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="container">
        <div class="decorations">
          <div class="decoration">✨</div>
        </div>
        
        <div class="content" style="padding-top: 60px; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: calc(100vh - 120px);">
          <div class="title-container">
            <div class="title">⚡ Lickety Split! ⚡</div>
            <div class="subtitle">Pick your timer game!</div>
          </div>

          <div class="main-buttons">
            <button class="button main-button beat-timer-btn" @click=${() => this.navigate('beat-timer')}>
              <div class="main-emoji">⏰</div>
              <div>Beat the Timer</div>
            </button>
            
            <button class="button main-button countdown-btn" @click=${() => this.navigate('countdown')}>
              <div class="main-emoji">3️⃣2️⃣1️⃣</div>
              <div>Countdown</div>
            </button>
          </div>

          <div class="small-buttons">
            <button class="button small-button guide-btn" @click=${() => this.navigate('guide')}>
              <div style="margin-bottom: 4px;">📖</div>
              <div>Guide</div>
            </button>
            
            <button class="button small-button language-btn" @click=${() => this.navigate('language')}>
              <div style="margin-bottom: 4px;">🌍</div>
              <div>Language</div>
            </button>
          </div>

          <div class="footer">Ready, set, go! 🏃‍♀️💨</div>
        </div>
      </div>
    `;
  }
}