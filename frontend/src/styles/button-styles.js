import { css } from 'lit';

export const buttonStyles = css`
    button {
        cursor: pointer;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: inherit;
    }

    .btn-primary {
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        box-shadow: var(--shadow);
    }

    .btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
    }

    .btn-primary:disabled {
        background: var(--secondary-color);
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        opacity: 0.7;
    }

    .btn-primary:disabled .fa-spinner {
        animation: spin 1s linear infinite;
    }

    .google-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--border);
        background: #ffffff;
        color: #3c4043;
        box-shadow: var(--shadow);
        text-decoration: none;
        justify-content: center;
    }

    .google-btn .g-icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        flex: 0 0 20px;
    }

    .google-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(60, 64, 67, 0.15);
        background: #f7f8f8;
    }

    .google-btn:active {
        transform: translateY(0);
        box-shadow: 0 4px 10px rgba(60, 64, 67, 0.12);
    }

    .google-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    @media (prefers-color-scheme: dark) {
        .google-btn {
            background: var(--surface-alt);
            color: var(--text-primary);
            border: 1px solid var(--border);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
        }
        .google-btn:hover:not(:disabled) {
            background: var(--surface);
        }
    }
`;
