import { css } from 'lit';

export const driverDashboardStyles = css`
    :host {
        display: block;
        box-sizing: border-box;
        direction: rtl;
        font-family:
            'Shabnam FD',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
        background-color: #f1f5f9;
        color: #0f172a;
        min-height: 100vh;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    :host(.dark) {
        background-color: #0f172a;
        color: #f1f5f9;
    }

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
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

    .top-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(16px);
        background-color: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        padding: 1rem 1.25rem;
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
    }

    :host(.dark) .top-bar {
        background-color: rgba(15, 23, 42, 0.9);
        border-bottom-color: rgba(255, 255, 255, 0.08);
    }

    .top-bar h1 {
        font-size: 1.125rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.01em;
    }

    .icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 12px;
        color: #64748b;
        transition: all 0.2s ease;
        width: 2.75rem;
        height: 2.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :host(.dark) .icon-btn {
        color: #94a3b8;
    }

    .icon-btn:hover {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }

    .icon-btn:focus-visible {
        outline: 2px solid #10b981;
        outline-offset: 2px;
    }

    .main-content {
        flex: 1;
        padding: 0 0 7rem;
    }

    .status-header {
        background: #fff;
        padding: 1.5rem 1.25rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        transition: background-color 0.3s ease;
    }

    :host(.dark) .status-header {
        background: #1e293b;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .driver-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.25rem;
    }

    .driver-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        border: 3px solid #10b981;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        flex-shrink: 0;
    }

    :host(.dark) .driver-img {
        border-color: #059669;
        box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.2);
    }

    .driver-info {
        flex: 1;
        min-width: 0;
    }

    .driver-info h2 {
        font-size: 1.125rem;
        font-weight: 700;
        margin: 0 0 0.25rem 0;
        letter-spacing: -0.01em;
    }

    .driver-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
        color: #64748b;
        flex-wrap: wrap;
    }

    :host(.dark) .driver-meta {
        color: #94a3b8;
    }

    .rating-badge {
        background: #fef3c7;
        color: #d97706;
        padding: 0.25rem 0.625rem;
        border-radius: 8px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8125rem;
    }

    :host(.dark) .rating-badge {
        background: rgba(217, 119, 6, 0.2);
        color: #fbbf24;
    }

    .shift-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f8fafc;
        padding: 1rem 1.25rem;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;
    }

    :host(.dark) .shift-toggle {
        background: rgba(15, 23, 42, 0.5);
        border-color: #334155;
    }

    .shift-toggle:hover {
        border-color: #10b981;
        background: rgba(16, 185, 129, 0.02);
    }

    :host(.dark) .shift-toggle:hover {
        background: rgba(16, 185, 129, 0.05);
        border-color: #059669;
    }

    .shift-info {
        flex: 1;
    }

    .shift-label {
        font-weight: 600;
        font-size: 0.9375rem;
        margin-bottom: 0.25rem;
        display: block;
    }

    .shift-sub {
        font-size: 0.8125rem;
        color: #64748b;
        display: block;
    }

    :host(.dark) .shift-sub {
        color: #94a3b8;
    }

    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 52px;
        height: 30px;
        flex-shrink: 0;
    }

    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #cbd5e1;
        transition: 0.3s ease;
        border-radius: 30px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    :host(.dark) .slider {
        background-color: #475569;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 22px;
        width: 22px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.3s ease;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input:checked + .slider {
        background-color: #10b981;
    }

    input:checked + .slider:before {
        transform: translateX(22px);
    }

    input:focus-visible + .slider {
        outline: 2px solid #10b981;
        outline-offset: 2px;
    }

    .tabs-container {
        padding: 0 1.25rem;
        margin-bottom: 1.5rem;
    }

    .tabs-bg {
        background: #e2e8f0;
        padding: 0.25rem;
        border-radius: 14px;
        display: flex;
        position: relative;
    }

    :host(.dark) .tabs-bg {
        background: #334155;
    }

    .tab-btn {
        flex: 1;
        border: none;
        background: transparent;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        font-weight: 600;
        color: #64748b;
        cursor: pointer;
        z-index: 1;
        transition: all 0.2s ease;
        font-size: 0.9375rem;
        font-family: inherit;
        position: relative;
    }

    :host(.dark) .tab-btn {
        color: #94a3b8;
    }

    .tab-btn:hover {
        color: #0f172a;
    }

    :host(.dark) .tab-btn:hover {
        color: #f1f5f9;
    }

    .tab-btn.active {
        color: #0f172a;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    :host(.dark) .tab-btn.active {
        color: #f1f5f9;
        background: #1e293b;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .tab-btn:focus-visible {
        outline: 2px solid #10b981;
        outline-offset: -2px;
    }

    .list-area {
        padding: 0 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .req-card {
        background: #fff;
        border-radius: 16px;
        padding: 1.25rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        position: relative;
        overflow: hidden;
        transition: all 0.2s ease;
    }

    :host(.dark) .req-card {
        background: #1e293b;
        border-color: #334155;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .req-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-color: #10b981;
    }

    :host(.dark) .req-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        border-color: #059669;
    }

    .req-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 0.75rem;
    }

    .req-type-badge {
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.375rem 0.75rem;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 0.025em;
    }

    .type-plastic {
        background: #e0f2fe;
        color: #0284c7;
    }

    :host(.dark) .type-plastic {
        background: rgba(2, 132, 199, 0.2);
        color: #7dd3fc;
    }

    .type-metal {
        background: #f3e8ff;
        color: #7e22ce;
    }

    :host(.dark) .type-metal {
        background: rgba(126, 34, 206, 0.2);
        color: #d8b4fe;
    }

    .type-paper {
        background: #fff7ed;
        color: #c2410c;
    }

    :host(.dark) .type-paper {
        background: rgba(194, 65, 12, 0.2);
        color: #fdba74;
    }

    .type-glass {
        background: #ecfdf5;
        color: #059669;
    }

    :host(.dark) .type-glass {
        background: rgba(5, 150, 105, 0.2);
        color: #6ee7b7;
    }

    .req-dist {
        font-size: 0.8125rem;
        font-weight: 600;
        color: #64748b;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    :host(.dark) .req-dist {
        color: #94a3b8;
    }

    .req-body {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.25rem;
    }

    .req-img {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        object-fit: cover;
        background: #f1f5f9;
        flex-shrink: 0;
    }

    :host(.dark) .req-img {
        background: #0f172a;
    }

    .req-details {
        flex: 1;
        min-width: 0;
    }

    .req-details h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        letter-spacing: -0.01em;
    }

    .req-details p {
        font-size: 0.875rem;
        color: #64748b;
        margin: 0;
        line-height: 1.5;
    }

    :host(.dark) .req-details p {
        color: #94a3b8;
    }

    .req-actions {
        display: flex;
        gap: 0.75rem;
    }

    .btn {
        flex: 1;
        border: none;
        padding: 0.875rem 1rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9375rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
        font-family: inherit;
    }

    .btn:focus-visible {
        outline: 2px solid #10b981;
        outline-offset: 2px;
    }

    .btn-primary {
        background: #10b981;
        color: white;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
    }

    .btn-primary:hover {
        background: #059669;
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
    }

    .btn-primary:active {
        transform: translateY(0);
    }

    .btn-outline {
        background: transparent;
        border: 1px solid #cbd5e1;
        color: #475569;
    }

    :host(.dark) .btn-outline {
        border-color: #475569;
        color: #cbd5e1;
    }

    .btn-outline:hover {
        background: rgba(16, 185, 129, 0.05);
        border-color: #10b981;
        color: #10b981;
    }

    .stats-section {
        padding: 1.5rem 1.25rem;
    }

    .section-title {
        font-size: 1.125rem;
        font-weight: 700;
        margin: 0 0 1.25rem 0;
        letter-spacing: -0.01em;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .stat-box {
        background: #fff;
        padding: 1.25rem;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;
    }

    :host(.dark) .stat-box {
        background: #1e293b;
        border-color: #334155;
    }

    .stat-box:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-color: #10b981;
    }

    :host(.dark) .stat-box:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        border-color: #059669;
    }

    .stat-val {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
        display: block;
        margin-bottom: 0.25rem;
    }

    :host(.dark) .stat-val {
        color: #f1f5f9;
    }

    .stat-lbl {
        font-size: 0.875rem;
        color: #64748b;
    }

    :host(.dark) .stat-lbl {
        color: #94a3b8;
    }

    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(16px);
        border-top: 1px solid #e2e8f0;
        padding: 0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom));
        display: flex;
        justify-content: space-around;
        z-index: 50;
    }

    :host(.dark) .bottom-nav {
        background: rgba(15, 23, 42, 0.95);
        border-top-color: #334155;
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.625rem 1rem;
        color: #94a3b8;
        text-decoration: none;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
        transition: all 0.2s ease;
        cursor: pointer;
        border: none;
        background: transparent;
        font-family: inherit;
    }

    .nav-item:focus-visible {
        outline: 2px solid #10b981;
        outline-offset: -2px;
    }

    .nav-item.active {
        color: #10b981;
        background: rgba(16, 185, 129, 0.1);
    }

    .nav-item .icon-wrapper {
        font-size: 1.25rem;
        width: 24px;
        height: 24px;
    }

    .empty-state {
        text-align: center;
        padding: 3rem 1.5rem;
        color: #64748b;
    }

    :host(.dark) .empty-state {
        color: #94a3b8;
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.3;
    }

    .empty-state p {
        font-size: 0.9375rem;
        margin: 0;
    }

    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        padding: 2rem;
    }

    .loading-spinner {
        width: 3rem;
        height: 3rem;
        border: 3px solid rgba(16, 185, 129, 0.2);
        border-top-color: #10b981;
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
        color: #64748b;
    }

    :host(.dark) .loading-text {
        color: #94a3b8;
    }

    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        padding: 2rem;
        text-align: center;
    }

    .error-message {
        color: #dc2626;
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .retry-button {
        padding: 0.75rem 1.5rem;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;
    }

    .retry-button:hover {
        background: #059669;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    @media (max-width: 374px) {
        .top-bar {
            padding: 0.875rem 1rem;
        }

        .top-bar h1 {
            font-size: 1rem;
        }

        .status-header,
        .list-area,
        .tabs-container,
        .stats-section {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .req-card {
            padding: 1rem;
        }

        .req-body {
            flex-direction: column;
        }

        .req-img {
            width: 100%;
            height: 120px;
        }

        .stats-grid {
            gap: 0.75rem;
        }

        .stat-box {
            padding: 1rem;
        }

        .stat-val {
            font-size: 1.25rem;
        }
    }

    @media (min-width: 640px) {
        .top-bar {
            padding: 1.25rem 1.5rem;
        }

        .status-header,
        .list-area,
        .tabs-container,
        .stats-section {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .stats-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (min-width: 768px) {
        .top-bar {
            padding: 1.25rem 2rem;
        }

        .status-header,
        .list-area,
        .tabs-container,
        .stats-section {
            padding-left: 2rem;
            padding-right: 2rem;
        }

        .req-card {
            padding: 1.5rem;
        }

        .stat-box {
            padding: 1.5rem;
        }

        .stat-val {
            font-size: 1.75rem;
        }
    }

    @media (min-width: 1024px) {
        .container {
            display: flex;
            flex-direction: row;
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
            gap: 2rem;
            align-items: flex-start;
        }

        .top-bar {
            display: none;
        }

        .bottom-nav {
            display: none;
        }

        .sidebar-section {
            position: sticky;
            top: 2rem;
            width: 320px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .status-header {
            border-radius: 20px;
            margin-bottom: 0;
            padding: 2rem;
        }

        .stats-section {
            padding: 0;
            margin-top: 0;
        }

        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .main-content {
            flex: 1;
            padding: 0;
            min-width: 0;
            display: flex;
            flex-direction: column;
        }

        .list-area {
            padding: 0;
        }

        .tabs-container {
            padding: 0;
            margin-bottom: 2rem;
        }
    }

    @media (min-width: 1280px) {
        .container {
            padding: 2.5rem 3rem;
            gap: 2.5rem;
        }

        .sidebar-section {
            width: 360px;
        }

        .status-header {
            padding: 2.5rem;
        }

        .driver-img {
            width: 72px;
            height: 72px;
        }

        .driver-info h2 {
            font-size: 1.25rem;
        }

        .stats-grid {
            gap: 1.25rem;
        }

        .stat-box {
            padding: 1.75rem;
        }

        .stat-val {
            font-size: 2rem;
        }

        .req-card {
            padding: 2rem;
        }

        .req-img {
            width: 100px;
            height: 100px;
        }
    }

    @media (min-width: 1536px) {
        .container {
            max-width: 1600px;
        }

        .sidebar-section {
            width: 400px;
        }

        .sidebar-section .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media print {
        .top-bar,
        .bottom-nav,
        .shift-toggle,
        .tabs-container,
        .req-actions {
            display: none;
        }

        .req-card,
        .stat-box {
            page-break-inside: avoid;
        }
    }
`;
