import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Screen, TimerParams, ResultParams } from '../types';

@customElement('lickety-split-app')
export class AppRoot extends LitElement {
  @state() currentScreen: Screen = 'home';
  @state() timerParams: TimerParams | null = null;
  @state() resultParams: ResultParams | null = null;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `;

  navigateTo(screen: Screen, params?: TimerParams | ResultParams) {
    this.currentScreen = screen;
    if (screen === 'task-timer') {
      this.timerParams = params as TimerParams;
    } else if (screen === 'success' || screen === 'failure') {
      this.resultParams = params as ResultParams;
    }
  }

  goBack() {
    if (this.currentScreen === 'task-timer') {
      this.currentScreen = this.timerParams?.mode === 'beat-timer' ? 'beat-timer' : 'countdown';
    } else {
      this.currentScreen = 'home';
    }
  }

  render() {
    switch (this.currentScreen) {
      case 'home':
        return html`<home-screen @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen)}></home-screen>`;
      case 'beat-timer':
        return html`<beat-timer-screen @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen, e.detail.params)} @back=${() => this.goBack()}></beat-timer-screen>`;
      case 'countdown':
        return html`<countdown-screen @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen, e.detail.params)} @back=${() => this.goBack()}></countdown-screen>`;
      case 'task-timer':
        return html`<task-timer-screen .params=${this.timerParams} @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen, e.detail.params)} @back=${() => this.goBack()}></task-timer-screen>`;
      case 'success':
        return html`<success-screen .params=${this.resultParams} @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen)} @back=${() => this.goBack()}></success-screen>`;
      case 'failure':
        return html`<failure-screen .params=${this.resultParams} @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen)} @back=${() => this.goBack()}></failure-screen>`;
      case 'guide':
        return html`<guide-screen @back=${() => this.goBack()}></guide-screen>`;
      case 'language':
        return html`<language-screen @back=${() => this.goBack()}></language-screen>`;
      default:
        return html`<home-screen @navigate=${(e: CustomEvent) => this.navigateTo(e.detail.screen)}></home-screen>`;
    }
  }
}