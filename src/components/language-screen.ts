import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared';

interface Language {
  language: string;
  flag: string;
}

@customElement('language-screen')
export class LanguageScreen extends LitElement {
  @state() selectedLanguage = 'English';

  static styles = [sharedStyles, css`
    :host {
      --bg-start: #F59E0B;
      --bg-end: #FBBF24;
    }

    .container {
      background: linear-gradient(135deg, #F59E0B, #FBBF24, #FCD34D, #FDE68A);
    }

    .instructions {
      font-size: 18px;
      font-weight: 600;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 30px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .language-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 30px;
    }

    .language-option {
      display: flex;
      align-items: center;
      padding: 20px;
      border-radius: 20px;
      border: 2px solid #FFFFFF;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    }

    .language-option:not(.selected) {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    }

    .language-option.selected {
      background: linear-gradient(135deg, #FFD700, #FFA500);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
    }

    .language-option:hover {
      transform: translateY(-2px);
    }

    .flag {
      font-size: 28px;
      margin-right: 20px;
    }

    .language-text {
      flex: 1;
      font-size: 20px;
      font-weight: 600;
      color: #FFFFFF;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .check-container {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 4px;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .language-option.selected .check-container {
      opacity: 1;
    }

    .note-container {
      background: rgba(255, 255, 255, 0.2);
      padding: 16px;
      border-radius: 16px;
    }

    .note-text {
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
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

  private languages: Language[] = [
    { language: 'English', flag: '🇺🇸' },
    { language: 'Español', flag: '🇪🇸' },
    { language: 'Français', flag: '🇫🇷' },
    { language: 'Deutsch', flag: '🇩🇪' },
    { language: '中文', flag: '🇨🇳' },
    { language: '日本語', flag: '🇯🇵' },
    { language: 'Português', flag: '🇧🇷' },
    { language: 'Italiano', flag: '🇮🇹' },
  ];

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  private selectLanguage(language: string) {
    this.selectedLanguage = language;
    // In a real app, this would save the language preference
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <button class="back-button" @click=${this.goBack}>
            <span style="font-size: 24px; color: white;">←</span>
          </button>
          <div class="header-title">Choose Language</div>
        </div>

        <div class="content">
          <div class="scrollable-content">
            <div class="instructions">Select your preferred language 🌍</div>

            <div class="language-grid">
              ${this.languages.map(lang => html`
                <div 
                  class="language-option ${this.selectedLanguage === lang.language ? 'selected' : ''}"
                  @click=${() => this.selectLanguage(lang.language)}
                >
                  <div class="flag">${lang.flag}</div>
                  <div class="language-text">${lang.language}</div>
                  <div class="check-container">
                    <span style="color: white; font-size: 20px;">✓</span>
                  </div>
                </div>
              `)}
            </div>

            <div class="note-container">
              <div class="note-text">
                Language changes will apply to all task names and instructions throughout the app.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}