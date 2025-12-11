import { css } from 'lit';

export const loginStyles = css`
    :host {
        display: block;
        min-height: 100vh;
        direction: rtl;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    .auth-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        background-color: #f5f7f5;
        transition: background-color 0.3s ease;
        padding: 2rem 0;
    }

    :host(.dark) .auth-page {
        background-color: #121212;
    }

    .auth-container {
        width: 100%;
        max-width: 400px;
        background-color: transparent;
        padding: 1rem;
        position: relative;
        z-index: 1;
    }

    .auth-title {
        font-size: 28px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 0.5rem;
        color: #1a1a1a;
        letter-spacing: -0.01em;
        transition: color 0.3s ease;
    }

    :host(.dark) .auth-title {
        color: #e4e4e4;
    }

    .auth-subtitle {
        text-align: center;
        color: #64748b;
        font-size: 16px;
        margin-bottom: 1.5rem;
        transition: color 0.3s ease;
    }

    :host(.dark) .auth-subtitle {
        color: #8a8a8a;
    }

    .dark-mode-toggle {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.75rem;
        height: 2.75rem;
        color: #3a7f3a;
        transition:
            background-color 0.2s ease,
            color 0.2s ease;
        z-index: 10;
    }

    :host(.dark) .dark-mode-toggle {
        color: #b8b8b8;
    }

    .dark-mode-toggle:hover {
        background-color: rgba(19, 236, 19, 0.1);
    }
    :host(.dark) .dark-mode-toggle:hover {
        background-color: rgba(19, 236, 19, 0.15);
    }

    .toggle-container {
        display: flex;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 14px;
        height: 48px;
        padding: 4px;
        margin-bottom: 1rem;
        transition: background-color 0.3s ease;
    }

    :host(.dark) .toggle-container {
        background-color: rgba(255, 255, 255, 0.08);
    }

    .toggle-option {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        cursor: pointer;
        font-size: 14px;
        color: #6b7280;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    :host(.dark) .toggle-option {
        color: #8a8a8a;
    }

    .toggle-option input {
        display: none;
    }

    .toggle-option input:checked + span {
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        color: #0f172a;
        padding: 0.25rem 1rem;
        border-radius: 12px;
        width: 100%;
        display: block;
    }

    :host(.dark) .toggle-option input:checked + span {
        background-color: #1e1e1e;
        color: #e4e4e4;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        font-size: 14px;
        color: #334155;
        font-weight: 500;
        margin-bottom: 0.5rem;
        display: block;
        transition: color 0.3s ease;
    }

    :host(.dark) .form-group label {
        color: #b8b8b8;
    }

    .input-wrapper {
        position: relative;
    }

    .input-wrapper input {
        width: 100%;
        height: 56px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 14px;
        padding: 0 3rem 0 1rem;
        font-size: 16px;
        color: #1a1a1a;
        background-color: #fff;
        outline: none;
        transition: all 0.2s ease;
    }

    :host(.dark) .input-wrapper input {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.1);
        color: #e4e4e4;
    }

    .input-wrapper input::placeholder {
        color: #7a8a7a;
    }
    :host(.dark) .input-wrapper input::placeholder {
        color: #8a8a8a;
    }

    .input-wrapper input:focus {
        border-color: #13ec13;
        box-shadow: 0 0 0 3px rgba(19, 236, 19, 0.1);
    }

    .input-wrapper span {
        position: absolute;
        right: 1rem;
        color: #9ca3af;
        top: 50%;
        transform: translateY(-50%);
        transition: color 0.3s ease;
    }

    :host(.dark) .input-wrapper span {
        color: #6a6a6a;
    }

    .forgot-password {
        text-align: left;
        margin-top: -0.5rem;
    }

    .forgot-password a {
        font-size: 14px;
        color: #16a34a;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .forgot-password a:hover {
        text-decoration: underline;
        color: #13ec13;
    }

    .primary-btn {
        width: 100%;
        height: 56px;
        background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
        color: #0a1a0a;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 14px;
        box-shadow: 0 4px 16px rgba(19, 236, 19, 0.3);
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 1rem;
    }

    .primary-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(19, 236, 19, 0.4);
    }

    .primary-btn:active {
        transform: translateY(0);
    }

    .divider {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1.5rem 0;
    }

    .divider hr {
        flex-grow: 1;
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        transition: border-color 0.3s ease;
    }

    :host(.dark) .divider hr {
        border-top-color: rgba(255, 255, 255, 0.1);
    }

    .divider p {
        font-size: 14px;
        color: #6b7280;
        transition: color 0.3s ease;
    }

    :host(.dark) .divider p {
        color: #8a8a8a;
    }

    .google-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        width: 100%;
        height: 56px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 14px;
        background-color: #fff;
        color: #1a1a1a;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    :host(.dark) .google-btn {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.1);
        color: #e4e4e4;
    }

    .google-btn:hover {
        background-color: #f0f7f0;
        transform: translateY(-1px);
    }

    :host(.dark) .google-btn:hover {
        background-color: #2a2a2a;
    }

    .google-btn img {
        width: 24px;
        height: 24px;
    }

    .footer-text {
        font-size: 12px;
        color: #9ca3af;
        text-align: center;
        margin-top: 2rem;
        transition: color 0.3s ease;
    }

    :host(.dark) .footer-text {
        color: #6a6a6a;
    }

    .footer-text a {
        color: #16a34a;
        font-weight: 500;
        text-decoration: none;
        transition: color 0.2s ease;
        cursor: pointer;
    }

    .footer-text a:hover {
        text-decoration: underline;
        color: #13ec13;
    }

    .icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
    }
    .icon-wrapper svg {
        width: 100%;
        height: 100%;
    }

    .message-box {
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-radius: 12px;
        font-size: 14px;
        text-align: center;
    }
    .error-msg {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .success-msg {
        background-color: rgba(19, 236, 19, 0.1);
        color: #16a34a;
        border: 1px solid rgba(19, 236, 19, 0.2);
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(3px);
        animation: fadeIn 0.2s ease-out;
    }

    .modal-container {
        background-color: #fff;
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.2s ease-out;
        overflow: hidden;
    }

    :host(.dark) .modal-container {
        background-color: #1e1e1e;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-header {
        padding: 1.25rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    :host(.dark) .modal-header {
        border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .modal-title {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
    }

    :host(.dark) .modal-title {
        color: #e4e4e4;
    }

    .close-icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        font-size: 1.2rem;
        padding: 4px;
        display: flex;
        transition: color 0.2s;
    }

    :host(.dark) .close-icon-btn {
        color: #8a8a8a;
    }
    .close-icon-btn:hover {
        color: #ef4444;
    }

    .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
        font-size: 14px;
        line-height: 1.7;
        color: #334155;
        text-align: justify;
    }

    :host(.dark) .modal-body {
        color: #b8b8b8;
    }

    .modal-footer {
        padding: 1rem 1.5rem;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    :host(.dark) .modal-footer {
        border-top-color: rgba(255, 255, 255, 0.1);
    }

    .modal-footer .primary-btn {
        margin-top: 0;
        height: 48px;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
