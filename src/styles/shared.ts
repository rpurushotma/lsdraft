import { css } from 'lit';

export const sharedStyles = css`
  :host {
    display: block;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  .container {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
    position: relative;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    padding: 50px 20px 20px;
  }

  .back-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .back-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .header-title {
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
    margin-left: 16px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .content {
    padding: 0 20px 40px;
  }

  .button {
    background: linear-gradient(135deg, var(--btn-start), var(--btn-end));
    border: none;
    border-radius: 20px;
    padding: 12px 24px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  .button:active {
    transform: translateY(0);
  }

  .main-button {
    width: 140px;
    height: 140px;
    border-radius: 70px;
    flex-direction: column;
    justify-content: center;
    border: 4px solid #FFFFFF;
    font-size: 16px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  }

  .main-emoji {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .small-button {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    flex-direction: column;
    justify-content: center;
    border: 3px solid #FFFFFF;
    font-size: 11px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .task-button {
    width: 100%;
    padding: 24px;
    border-radius: 25px;
    flex-direction: column;
    justify-content: center;
    border: 3px solid #FFFFFF;
    margin-bottom: 16px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  }

  .task-emoji {
    font-size: 44px;
    margin-bottom: 12px;
  }

  .task-title {
    font-size: 20px;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 10px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .duration-container {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
    margin-bottom: 4px;
  }

  .duration-text {
    font-size: 16px;
    color: #FFFFFF;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .instructions {
    font-size: 18px;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }

  .animate-fade-in {
    animation: fadeInUp 0.6s ease-out;
  }
`;