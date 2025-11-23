import { css } from 'lit';

export const adminDashboardStyles = css`
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
        background-color: #f5f7fa;
        color: #1a1a1a;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    :host(.dark) {
        background-color: #0f1419;
        color: #e4e4e4;
    }

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    .dashboard-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
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
        border: 3px solid rgba(59, 130, 246, 0.2);
        border-top-color: #3b82f6;
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
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: #ffffff;
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
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .top-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        backdrop-filter: blur(12px);
        background-color: rgba(255, 255, 255, 0.85);
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
    }

    :host(.dark) .top-bar {
        background-color: rgba(26, 31, 46, 0.85);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .top-bar h1 {
        flex: 1;
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        margin: 0;
    }

    .top-bar-button {
        width: 2.75rem;
        height: 2.75rem;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3b82f6;
        transition: all 0.2s ease;
    }

    .menu-button {
        display: flex;
    }

    :host(.dark) .top-bar-button {
        color: #60a5fa;
    }

    .top-bar-button:hover {
        background-color: rgba(59, 130, 246, 0.1);
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

    .dashboard-container {
        display: flex;
        flex: 1;
        max-width: 1920px;
        margin: 0 auto;
        width: 100%;
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 100%;
        z-index: 200;
        display: flex;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .sidebar-overlay {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    :host(.dark) .sidebar-overlay {
        background-color: rgba(0, 0, 0, 0.7);
    }

    .sidebar-content {
        position: relative;
        width: 280px;
        height: 100%;
        background-color: #ffffff;
        margin-left: auto;
        z-index: 2;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    :host(.dark) .sidebar-content {
        background-color: #1a1f2e;
    }
    .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    :host(.dark) .sidebar-header {
        border-bottom-color: rgba(255, 255, 255, 0.08);
    }

    .sidebar-header h2 {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
    }

    .sidebar-actions {
        padding: 1rem;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    :host(.dark) .sidebar-actions {
        border-top-color: rgba(255, 255, 255, 0.08);
    }

    .sidebar-action-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.875rem 1rem;
        border-radius: 12px;
        border: none;
        background: transparent;
        color: #7a8a7a;
        font-size: 0.9375rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        text-align: right;
    }

    :host(.dark) .sidebar-action-btn {
        color: #8a8a8a;
    }

    .sidebar-action-btn:hover {
        background-color: rgba(59, 130, 246, 0.05);
        color: #3b82f6;
    }

    .sidebar-action-btn.logout-btn:hover {
        background-color: rgba(239, 68, 68, 0.05);
        color: #ef4444;
    }

    .sidebar-action-btn .icon-wrapper {
        width: 20px;
        height: 20px;
    }

    .close-sidebar-btn {
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7a8a7a;
        transition: all 0.2s ease;
    }

    :host(.dark) .close-sidebar-btn {
        color: #8a8a8a;
    }

    .close-sidebar-btn:hover {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .close-sidebar-btn .icon-wrapper {
        width: 20px;
        height: 20px;
    }

    .profile-section {
        padding: 1.5rem;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    :host(.dark) .profile-section {
        border-bottom-color: rgba(255, 255, 255, 0.08);
    }

    .profile-image {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: #e0e7ff;
        margin: 0 auto 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3b82f6;
        font-size: 1.5rem;
        border: 2px solid rgba(59, 130, 246, 0.2);
    }

    :host(.dark) .profile-image {
        background-color: #1e3a8a;
        border-color: rgba(59, 130, 246, 0.3);
    }

    .profile-image img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .profile-name {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
    }

    .profile-username {
        font-size: 0.875rem;
        color: #3b82f6;
        margin: 0;
    }

    :host(.dark) .profile-username {
        color: #60a5fa;
    }

    .sidebar-nav {
        padding: 1rem;
        flex: 1;
    }

    .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.875rem 1rem;
        border-radius: 12px;
        border: none;
        background: transparent;
        color: #7a8a7a;
        font-size: 0.9375rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        text-align: right;
        margin-bottom: 0.5rem;
    }

    :host(.dark) .nav-item {
        color: #8a8a8a;
    }

    .nav-item:hover {
        background-color: rgba(59, 130, 246, 0.05);
        color: #3b82f6;
    }

    .nav-item.active {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
    }

    :host(.dark) .nav-item.active {
        color: #60a5fa;
    }

    .nav-item .icon-wrapper {
        width: 20px;
        height: 20px;
    }

    .sidebar-health {
        padding: 1rem;
        margin: 0 1rem 1rem;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(0, 0, 0, 0.06);
    }

    :host(.dark) .sidebar-health {
        background-color: rgba(255, 255, 255, 0.02);
        border-color: rgba(255, 255, 255, 0.08);
    }

    .sidebar-health-title {
        font-size: 0.875rem;
        font-weight: 600;
        margin: 0 0 1rem 0;
    }

    .health-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        margin-bottom: 0.75rem;
        font-weight: 500;
    }

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-operational {
        background-color: #10b981;
        box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
    }

    .status-degraded {
        background-color: #fbbf24;
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
    }

    .status-down {
        background-color: #ef4444;
        box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
    }

    .health-detail {
        display: flex;
        justify-content: space-between;
        font-size: 0.8125rem;
        color: #7a8a7a;
        margin-bottom: 0.5rem;
    }

    :host(.dark) .health-detail {
        color: #8a8a8a;
    }

    .health-detail:last-child {
        margin-bottom: 0;
    }

    .main-content {
        flex: 1;
        padding: 1.25rem;
        padding-bottom: 7rem;
        overflow-x: hidden;
    }

    .hero-card {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        border-radius: 16px;
        padding: 1.5rem;
        color: white;
        box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    :host(.dark) .hero-card {
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.35);
    }

    .hero-content {
        flex: 1;
    }

    .hero-text {
        margin-bottom: 1.25rem;
    }

    .hero-label {
        font-size: 0.9375rem;
        font-weight: 500;
        opacity: 0.9;
        display: block;
        margin-bottom: 0.75rem;
    }

    .hero-value {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 0.5rem;
    }

    .hero-unit {
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.9;
    }

    .hero-growth {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        opacity: 0.95;
    }

    .hero-growth .icon-wrapper {
        width: 14px;
        height: 14px;
    }

    .growth-positive {
        color: #10b981;
    }

    .hero-actions {
        display: flex;
        gap: 0.75rem;
    }

    .hero-btn {
        flex: 1;
        height: 2.75rem;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.9);
        color: #2563eb;
        border: none;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .hero-btn:hover {
        background-color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .hero-btn .icon-wrapper {
        width: 16px;
        height: 16px;
    }

    .hero-icon {
        width: 4rem;
        height: 4rem;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        display: none;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .hero-icon .icon-wrapper {
        width: 2rem;
        height: 2rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .stat-card {
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 16px;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.2s ease;
    }

    :host(.dark) .stat-card {
        background-color: #1a1f2e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    :host(.dark) .stat-card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .stat-card-wide {
        grid-column: span 2;
    }

    .stat-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .stat-icon .icon-wrapper {
        width: 20px;
        height: 20px;
    }

    .stat-icon-blue {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
    }

    .stat-icon-orange {
        background-color: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
    }

    .stat-icon-red {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .stat-icon-green {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }

    .stat-icon-purple {
        background-color: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
    }

    .stat-icon-teal {
        background-color: rgba(20, 184, 166, 0.1);
        color: #14b8a6;
    }

    .stat-content {
        flex: 1;
    }

    .stat-label {
        font-size: 0.875rem;
        color: #7a8a7a;
        margin: 0 0 0.25rem 0;
    }

    :host(.dark) .stat-label {
        color: #8a8a8a;
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    .charts-section {
        margin-bottom: 1.5rem;
    }

    .chart-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .chart-col-2 {
        min-width: 0;
    }

    .chart-container {
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 16px;
        padding: 1.5rem;
        height: 100%;
    }

    :host(.dark) .chart-container {
        background-color: #1a1f2e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .chart-title {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 1.25rem 0;
        color: #1a1a1a;
    }

    :host(.dark) .chart-title {
        color: #e4e4e4;
    }

    canvas {
        max-height: 250px;
    }

    .content-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .content-card {
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 16px;
        padding: 1.5rem;
    }

    :host(.dark) .content-card {
        background-color: #1a1f2e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .section-header {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
        letter-spacing: -0.01em;
    }

    .section-header-with-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.25rem;
    }

    .view-all-btn {
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 8px;
        color: #3b82f6;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
    }

    .view-all-btn:hover {
        background-color: rgba(59, 130, 246, 0.1);
        border-color: #3b82f6;
    }

    :host(.dark) .view-all-btn {
        color: #60a5fa;
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .transaction-card {
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.2s ease;
    }

    :host(.dark) .transaction-card {
        border-color: rgba(255, 255, 255, 0.05);
    }

    .transaction-card:hover {
        background-color: rgba(0, 0, 0, 0.02);
        transform: translateX(-2px);
    }

    :host(.dark) .transaction-card:hover {
        background-color: rgba(255, 255, 255, 0.02);
    }

    .transaction-icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .transaction-payout {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .transaction-deposit {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }

    .transaction-icon .icon-wrapper {
        width: 16px;
        height: 16px;
    }

    .transaction-info {
        flex: 1;
        min-width: 0;
    }

    .transaction-user {
        font-size: 0.9375rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
    }

    .transaction-date {
        font-size: 0.8125rem;
        color: #7a8a7a;
        margin: 0;
    }

    :host(.dark) .transaction-date {
        color: #8a8a8a;
    }

    .transaction-amount {
        text-align: left;
    }

    .amount-value {
        font-size: 0.9375rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
    }

    .amount-positive {
        color: #10b981;
    }

    .amount-negative {
        color: #ef4444;
    }

    .transaction-status {
        font-size: 0.75rem;
        padding: 0.125rem 0.5rem;
        border-radius: 6px;
    }

    .status-completed {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }

    .status-pending {
        background-color: rgba(251, 191, 36, 0.1);
        color: #f59e0b;
    }

    .status-failed {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .search-bar {
        position: relative;
        margin-bottom: 1rem;
    }

    .search-bar input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 3rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        background-color: rgba(0, 0, 0, 0.02);
        font-size: 0.9375rem;
        font-family: inherit;
        transition: all 0.2s ease;
    }

    :host(.dark) .search-bar input {
        background-color: rgba(255, 255, 255, 0.02);
        border-color: rgba(255, 255, 255, 0.08);
        color: #e4e4e4;
    }

    .search-bar input:focus {
        outline: none;
        border-color: #3b82f6;
        background-color: #ffffff;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    :host(.dark) .search-bar input:focus {
        background-color: #1a1f2e;
    }

    .search-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #7a8a7a;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-icon svg {
        width: 18px;
        height: 18px;
    }

    .filter-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
    }

    .filter-tabs::-webkit-scrollbar {
        height: 4px;
    }

    .filter-tabs::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.06);
        border-radius: 2px;
    }

    :host(.dark) .filter-tabs::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.08);
    }

    .filter-tabs::-webkit-scrollbar-thumb {
        background: #3b82f6;
        border-radius: 2px;
    }

    .filter-tab {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        background-color: transparent;
        color: #7a8a7a;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        white-space: nowrap;
    }

    :host(.dark) .filter-tab {
        border-color: rgba(255, 255, 255, 0.08);
        color: #8a8a8a;
    }

    .filter-tab:hover {
        background-color: rgba(59, 130, 246, 0.05);
        border-color: rgba(59, 130, 246, 0.3);
    }

    .filter-tab.active {
        background-color: #3b82f6;
        color: white;
        border-color: #3b82f6;
    }

    .activities-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .activity-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.2s ease;
        cursor: pointer;
    }

    :host(.dark) .activity-card {
        border-color: rgba(255, 255, 255, 0.05);
    }

    .activity-card:hover {
        background-color: rgba(0, 0, 0, 0.02);
        transform: translateX(-2px);
    }

    :host(.dark) .activity-card:hover {
        background-color: rgba(255, 255, 255, 0.02);
    }

    .activity-icon {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        flex-shrink: 0;
    }

    .activity-icon .icon-wrapper {
        width: 16px;
        height: 16px;
    }

    .bg-blue {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
    }

    .bg-green {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }

    .bg-orange {
        background-color: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
    }

    .bg-red {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .activity-content {
        flex: 1;
        min-width: 0;
    }

    .activity-title {
        font-weight: 600;
        margin: 0 0 0.25rem 0;
        font-size: 0.9375rem;
    }

    .activity-subtitle {
        font-size: 0.8125rem;
        color: #7a8a7a;
        margin: 0;
    }

    :host(.dark) .activity-subtitle {
        color: #8a8a8a;
    }

    .activity-time {
        font-size: 0.75rem;
        color: #7a8a7a;
        flex-shrink: 0;
    }

    :host(.dark) .activity-time {
        color: #8a8a8a;
    }

    .empty-state {
        text-align: center;
        padding: 2rem 1rem;
        color: #7a8a7a;
    }

    :host(.dark) .empty-state {
        color: #8a8a8a;
    }

    @media (min-width: 768px) {
        .main-content {
            padding: 2rem;
            padding-bottom: 2rem;
        }

        .hero-card {
            padding: 2rem;
        }

        .hero-value {
            font-size: 3rem;
        }

        .hero-icon {
            display: flex;
        }

        .stats-grid {
            grid-template-columns: repeat(3, 1fr);
        }

        .stat-card-wide {
            grid-column: span 1;
        }

        .chart-row {
            grid-template-columns: repeat(2, 1fr);
        }

        .content-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .top-bar {
            display: none;
        }

        .menu-button {
            display: none;
        }

        .sidebar {
            position: sticky;
            top: 0;
            width: 280px;
            height: 100vh;
            transform: translateX(0);
            z-index: 10;
        }

        .sidebar-overlay {
            display: none;
        }

        .sidebar-content {
            width: 100%;
            border-left: 1px solid rgba(0, 0, 0, 0.06);
            margin: 0;
        }

        :host(.dark) .sidebar-content {
            border-left-color: rgba(255, 255, 255, 0.08);
        }

        .sidebar-header {
            display: none;
        }

        .close-sidebar-btn {
            display: none;
        }

        .profile-section {
            padding: 2rem 1.5rem;
            margin-top: 0;
        }

        .profile-image {
            width: 5rem;
            height: 5rem;
            font-size: 2rem;
        }

        .profile-name {
            font-size: 1.125rem;
        }

        .main-content {
            padding: 2.5rem 3rem;
        }

        .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
        }

        .stat-card-wide {
            grid-column: span 2;
        }

        canvas {
            max-height: 300px;
        }
    }

    @media (min-width: 1280px) {
        .sidebar {
            width: 320px;
        }

        .main-content {
            padding: 3rem 4rem;
        }

        .hero-card {
            padding: 2.5rem;
        }

        .hero-value {
            font-size: 3.5rem;
        }

        .stats-grid {
            gap: 2rem;
        }

        .stat-card {
            padding: 1.5rem;
        }

        .stat-icon {
            width: 3.5rem;
            height: 3.5rem;
        }

        .stat-value {
            font-size: 1.75rem;
        }

        .chart-container {
            padding: 2rem;
        }

        .content-card {
            padding: 2rem;
        }
    }

    @media (min-width: 1536px) {
        .stats-grid {
            grid-template-columns: repeat(6, 1fr);
        }

        .stat-card-wide {
            grid-column: span 1;
        }
    }

    @media print {
        .top-bar,
        .sidebar,
        .filter-tabs,
        .search-bar,
        .hero-actions,
        .view-all-btn {
            display: none !important;
        }

        .main-content {
            padding: 0;
        }

        .chart-container,
        .stat-card,
        .content-card {
            page-break-inside: avoid;
        }
    }
`;
