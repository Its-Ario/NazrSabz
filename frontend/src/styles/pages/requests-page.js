import { css } from 'lit';

export const requestsStyles = css`
    main {
        flex: 1;
        padding: 1rem 1.25rem 2rem;
    }

    :host {
        display: block;
        min-height: 100vh;
        direction: rtl;
        font-family:
            'Shabnam FD',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
        background-color: #f5f7f5;
        color: #1a1a1a;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    :host(.dark) {
        background-color: #121212;
        color: #e4e4e4;
    }

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
    }

    .top-bar {
        position: sticky;
        top: 0;
        z-index: 10;
        backdrop-filter: blur(12px);
        background-color: rgba(255, 255, 255, 0.85);
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
    }

    :host(.dark) .top-bar {
        background-color: rgba(30, 30, 30, 0.85);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .top-bar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
    }

    .top-bar-button {
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 12px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3a7f3a;
        transition: all 0.2s ease;
    }

    :host(.dark) .top-bar-button {
        color: #b8b8b8;
    }

    .top-bar-button:hover {
        background-color: rgba(19, 236, 19, 0.1);
    }

    :host(.dark) .top-bar-button:hover {
        background-color: rgba(19, 236, 19, 0.15);
    }

    .top-bar h1 {
        flex: 1;
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    .icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
    }

    .icon-wrapper svg {
        width: 100%;
        height: 100%;
    }

    .filter-tabs {
        padding: 0.75rem 1.25rem 1rem;
    }

    .tabs-container {
        display: flex;
        gap: 0.5rem;
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 12px;
        padding: 0.25rem;
    }

    :host(.dark) .tabs-container {
        background-color: rgba(255, 255, 255, 0.06);
    }

    .tab-button {
        flex: 1;
        padding: 0.625rem 1rem;
        border-radius: 10px;
        border: none;
        background-color: transparent;
        color: #5a6a5a;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
    }

    :host(.dark) .tab-button {
        color: #8a9a8a;
    }

    .tab-button:hover {
        background-color: rgba(19, 236, 19, 0.1);
    }

    .tab-button.active {
        background-color: #13ec13;
        color: #0a1a0a;
        box-shadow: 0 2px 8px rgba(19, 236, 19, 0.25);
    }

    .loading-container,
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        padding: 2rem;
        text-align: center;
    }

    .loading-spinner {
        width: 3rem;
        height: 3rem;
        border: 3px solid rgba(19, 236, 19, 0.2);
        border-top-color: #13ec13;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loading-text {
        margin-top: 1rem;
        font-size: 1rem;
        color: #7a8a7a;
    }

    :host(.dark) .loading-text {
        color: #8a8a8a;
    }

    .error-message {
        color: #dc2626;
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .retry-button {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
        color: #0a1a0a;
        border: none;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;
    }

    .retry-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(19, 236, 19, 0.3);
    }

    .requests-list {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
    }

    .request-card {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 16px;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.2s ease;
        cursor: pointer;
    }

    :host(.dark) .request-card {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .request-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    :host(.dark) .request-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .request-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 3px solid;
    }

    .request-icon.pending {
        background-color: rgba(251, 191, 36, 0.1);
        border-color: rgba(251, 191, 36, 0.3);
        color: #f59e0b;
    }

    :host(.dark) .request-icon.pending {
        background-color: rgba(251, 191, 36, 0.15);
        border-color: rgba(251, 191, 36, 0.4);
    }

    .request-icon.completed {
        background-color: rgba(19, 236, 19, 0.1);
        border-color: rgba(19, 236, 19, 0.3);
        color: #13ec13;
    }

    :host(.dark) .request-icon.completed {
        background-color: rgba(19, 236, 19, 0.15);
        border-color: rgba(19, 236, 19, 0.4);
    }

    .request-icon.canceled {
        background-color: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }

    :host(.dark) .request-icon.canceled {
        background-color: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.4);
    }

    .request-icon .icon-wrapper {
        width: 1.5rem;
        height: 1.5rem;
    }

    .request-content {
        flex: 1;
        min-width: 0;
    }

    .request-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
    }

    .request-date {
        font-size: 0.9375rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
    }

    :host(.dark) .request-date {
        color: #e4e4e4;
    }

    .request-id {
        font-family: monospace;
        font-size: 0.75rem;
        color: #7a8a7a;
        padding: 0.25rem 0.5rem;
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 6px;
    }

    :host(.dark) .request-id {
        color: #8a8a8a;
        background-color: rgba(255, 255, 255, 0.06);
    }

    .request-status {
        font-size: 0.875rem;
        margin: 0 0 0.375rem 0;
    }

    .status-label {
        color: #7a8a7a;
    }

    :host(.dark) .status-label {
        color: #8a8a8a;
    }

    .status-value {
        font-weight: 600;
    }

    .status-value.pending {
        color: #f59e0b;
    }

    .status-value.completed {
        color: #13ec13;
    }

    .status-value.canceled {
        color: #ef4444;
    }

    .request-items {
        font-size: 0.8125rem;
        color: #7a8a7a;
        margin: 0;
    }

    :host(.dark) .request-items {
        color: #8a8a8a;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
    }

    .empty-icon {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }

    :host(.dark) .empty-icon {
        background-color: rgba(255, 255, 255, 0.06);
    }

    .empty-icon .icon-wrapper {
        width: 4rem;
        height: 4rem;
        color: #7a8a7a;
    }

    :host(.dark) .empty-icon .icon-wrapper {
        color: #8a8a8a;
    }

    .empty-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
    }

    .empty-description {
        font-size: 0.9375rem;
        color: #7a8a7a;
        margin: 0 0 1.5rem 0;
        max-width: 24rem;
    }

    :host(.dark) .empty-description {
        color: #8a8a8a;
    }

    .empty-action {
        padding: 0.875rem 1.5rem;
        background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
        color: #0a1a0a;
        border: none;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;
        box-shadow: 0 4px 16px rgba(19, 236, 19, 0.3);
    }

    .empty-action:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(19, 236, 19, 0.4);
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 2rem 0 1rem;
    }

    .pagination-button {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(0, 0, 0, 0.06);
        background-color: #ffffff;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        color: #1a1a1a;
    }

    :host(.dark) .pagination-button {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.08);
        color: #e4e4e4;
    }

    .pagination-button:hover:not(:disabled) {
        background-color: rgba(19, 236, 19, 0.1);
        border-color: #13ec13;
    }

    .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .pagination-info {
        font-size: 0.875rem;
        color: #7a8a7a;
        padding: 0 1rem;
    }

    :host(.dark) .pagination-info {
        color: #8a8a8a;
    }

    @media (max-width: 374px) {
        main {
            padding: 0.75rem 1rem 2rem;
        }

        .top-bar-header {
            padding: 0.875rem 1rem;
        }

        .top-bar h1 {
            font-size: 1rem;
        }

        .filter-tabs {
            padding: 0.625rem 1rem 0.875rem;
        }
    }

    @media (min-width: 640px) {
        main {
            padding: 1.25rem 1.5rem 2rem;
        }

        .top-bar-header {
            padding: 1.125rem 1.5rem;
        }

        .top-bar h1 {
            font-size: 1.25rem;
        }

        .filter-tabs {
            padding: 0.875rem 1.5rem 1.125rem;
        }

        .request-card {
            padding: 1.25rem;
        }
    }

    @media (min-width: 768px) {
        main {
            padding: 1.5rem 2rem 2rem;
        }

        .top-bar-header {
            padding: 1.25rem 2rem;
        }

        .top-bar h1 {
            font-size: 1.375rem;
        }

        .filter-tabs {
            padding: 1rem 2rem 1.25rem;
        }

        .request-card {
            padding: 1.5rem;
        }

        .request-icon {
            width: 3.5rem;
            height: 3.5rem;
        }
    }

    @media (min-width: 1024px) {
        main {
            padding: 1.5rem 3rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
        }

        .top-bar-header {
            padding: 1.5rem 3rem;
        }

        .top-bar h1 {
            font-size: 1.5rem;
        }

        .filter-tabs {
            padding: 1.125rem 3rem 1.5rem;
        }
    }

    @media (min-width: 1280px) {
        .top-bar-header {
            padding: 1.75rem 4rem;
        }

        .filter-tabs {
            padding: 1.25rem 4rem 1.75rem;
        }

        main {
            padding: 2rem 4rem 2rem;
        }
    }
`;
