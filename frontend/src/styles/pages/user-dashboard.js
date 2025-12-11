import { css } from 'lit';

export const dashboardStyles = css`
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

    .top-bar {
        position: sticky;
        top: 0;
        z-index: 10;
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
        background-color: rgba(30, 30, 30, 0.85);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

    main {
        flex: 1;
        padding-bottom: 7rem;
    }

    .profile-header {
        padding: 1rem 1.25rem;
    }

    .profile-content {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .profile-image {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        flex-shrink: 0;
        border: 2px solid rgba(19, 236, 19, 0.2);
    }

    :host(.dark) .profile-image {
        border-color: rgba(19, 236, 19, 0.3);
    }

    .profile-info h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
        letter-spacing: -0.01em;
    }

    .profile-info p {
        font-size: 0.9375rem;
        font-weight: 500;
        margin: 0;
        color: #15803d;
    }

    :host(.dark) .profile-info p {
        color: #13ec13;
    }

    .wallet-section {
        padding: 1rem 1.25rem;
    }

    .wallet-card {
        background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
        border-radius: 16px;
        padding: 1.5rem;
        color: #0a1a0a;
        box-shadow: 0 4px 16px rgba(19, 236, 19, 0.25);
    }

    :host(.dark) .wallet-card {
        box-shadow: 0 4px 20px rgba(19, 236, 19, 0.35);
    }

    .wallet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .wallet-label {
        font-size: 0.9375rem;
        font-weight: 500;
        opacity: 0.9;
    }

    .wallet-icon {
        width: 2rem;
        height: 2rem;
        background-color: rgba(10, 26, 10, 0.15);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wallet-icon .icon-wrapper {
        width: 18px;
        height: 18px;
    }

    .wallet-balance {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .wallet-currency {
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.9;
    }

    .wallet-actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 1.25rem;
    }

    .wallet-btn {
        flex: 1;
        height: 2.75rem;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.9);
        color: #15803d;
        border: none;
        font-size: 0.9375rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .wallet-btn:hover {
        background-color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .wallet-btn:active {
        transform: translateY(0);
    }

    .wallet-btn .icon-wrapper {
        width: 16px;
        height: 16px;
    }

    @media (max-width: 374px) {
        .wallet-section {
            padding: 0.875rem 1rem;
        }

        .wallet-card {
            padding: 1.25rem;
        }

        .wallet-balance {
            font-size: 1.75rem;
        }

        .wallet-btn {
            font-size: 0.875rem;
            height: 2.5rem;
        }
    }

    @media (min-width: 640px) {
        .wallet-section {
            padding: 1rem 1.5rem;
        }

        .wallet-card {
            padding: 1.75rem;
        }

        .wallet-balance {
            font-size: 2.25rem;
        }
    }

    @media (min-width: 768px) {
        .wallet-section {
            padding: 1.5rem 2rem;
        }

        .wallet-card {
            padding: 2rem;
        }

        .wallet-balance {
            font-size: 2.5rem;
        }

        .wallet-actions {
            gap: 1rem;
        }

        .wallet-btn {
            height: 3rem;
            font-size: 1rem;
        }
    }

    @media (min-width: 1024px) {
        .wallet-section {
            padding: 1.5rem 3rem;
        }

        .wallet-card {
            padding: 2.25rem;
        }

        .wallet-balance {
            font-size: 2.75rem;
        }
    }

    @media (min-width: 1280px) {
        .wallet-section {
            padding: 1.5rem 4rem;
        }

        .wallet-card {
            max-width: 600px;
            margin: 0 auto;
        }
    }

    .stats-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.875rem;
        padding: 1rem 1.25rem;
    }

    .stat-card {
        flex: 1;
        min-width: calc(50% - 0.4375rem);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        border-radius: 16px;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            transform 0.2s ease;
    }

    :host(.dark) .stat-card {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .stat-card:hover {
        transform: translateY(-2px);
    }

    .stat-card.full-width {
        min-width: 100%;
    }

    .stat-label {
        font-size: 0.9375rem;
        font-weight: 500;
        color: #7a8a7a;
    }

    :host(.dark) .stat-label {
        color: #8a8a8a;
    }

    .stat-value {
        font-size: 1.375rem;
        font-weight: 600;
    }

    .stat-breakdown {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-top: 0.5rem;
    }

    .stat-breakdown span {
        font-size: 0.875rem;
        color: #7a8a7a;
    }

    :host(.dark) .stat-breakdown span {
        color: #8a8a8a;
    }

    .section-header {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
        padding: 1.25rem 1.25rem 0.75rem;
        letter-spacing: -0.01em;
    }

    .filter-tabs {
        padding: 0 1.25rem 1rem;
    }

    .tabs-container {
        display: flex;
        gap: 0.5rem;
    }

    .tab-button {
        flex: 1;
        padding: 0.625rem 1rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        background-color: #ffffff;
        color: #2d4a2d;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
    }

    :host(.dark) .tab-button {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.08);
        color: #b8b8b8;
    }

    .tab-button:hover {
        background-color: #f0f7f0;
    }

    :host(.dark) .tab-button:hover {
        background-color: #2a2a2a;
    }

    .tab-button.active {
        background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
        color: #0a1a0a;
        font-weight: 600;
        border-color: #13ec13;
        box-shadow: 0 2px 8px rgba(19, 236, 19, 0.25);
    }

    :host(.dark) .tab-button.active {
        box-shadow: 0 2px 12px rgba(19, 236, 19, 0.35);
    }

    .rewards-list {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
        padding: 0 1.25rem 1.5rem;
    }

    .reward-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 16px;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.2s ease;
        cursor: pointer;
    }

    :host(.dark) .reward-card {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .reward-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    :host(.dark) .reward-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .reward-icon {
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background-color: #f0f7f0;
        flex-shrink: 0;
    }

    :host(.dark) .reward-icon {
        background-color: #2a2a2a;
    }

    .reward-icon img {
        width: 2.25rem;
        height: 2.25rem;
        object-fit: contain;
    }

    .reward-info {
        flex: 1;
        min-width: 0;
    }

    .reward-title {
        font-weight: 600;
        margin: 0 0 0.25rem 0;
        font-size: 0.9375rem;
    }

    .reward-subtitle {
        font-size: 0.8125rem;
        color: #7a8a7a;
        margin: 0;
    }

    :host(.dark) .reward-subtitle {
        color: #8a8a8a;
    }

    .reward-points {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        flex-shrink: 0;
    }

    .reward-points-value {
        font-weight: 600;
        color: #fbbf24;
        font-size: 0.9375rem;
    }

    .reward-points .icon-wrapper {
        width: 1rem;
        height: 1rem;
        color: #fbbf24;
    }

    .fab-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.25rem;
        background: linear-gradient(
            to top,
            rgba(245, 247, 245, 1) 0%,
            rgba(245, 247, 245, 0.8) 50%,
            rgba(245, 247, 245, 0) 100%
        );
        pointer-events: none;
        display: flex;
        justify-content: center;
        z-index: 9;
    }

    :host(.dark) .fab-container {
        background: linear-gradient(
            to top,
            rgba(18, 18, 18, 1) 0%,
            rgba(18, 18, 18, 0.8) 50%,
            rgba(18, 18, 18, 0) 100%
        );
    }

    .fab {
        max-width: 480px;
        width: 100%;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.625rem;
        border-radius: 16px;
        background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
        color: #0a1a0a;
        font-size: 1rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(19, 236, 19, 0.3);
        transition: all 0.2s ease;
        pointer-events: auto;
        font-family: inherit;
    }

    .fab:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(19, 236, 19, 0.4);
    }

    .fab:active {
        transform: translateY(0);
    }

    .fab .icon-wrapper {
        width: 18px;
        height: 18px;
    }

    @media (max-width: 374px) {
        main {
            padding-bottom: 6.5rem;
        }

        .top-bar {
            padding: 0.875rem 1rem;
        }

        .top-bar h1 {
            font-size: 1rem;
        }

        .top-bar-button {
            width: 2.5rem;
            height: 2.5rem;
        }

        .profile-header,
        .stats-grid,
        .filter-tabs,
        .rewards-list {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .section-header {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .profile-image {
            width: 4rem;
            height: 4rem;
        }

        .profile-info h2 {
            font-size: 1.125rem;
        }

        .profile-info p {
            font-size: 0.875rem;
        }

        .stat-value {
            font-size: 1.25rem;
        }

        .reward-icon {
            width: 3rem;
            height: 3rem;
        }

        .reward-icon img {
            width: 2rem;
            height: 2rem;
        }

        .fab-container {
            padding: 1rem;
        }
    }

    @media (min-width: 640px) {
        .top-bar {
            padding: 1.125rem 1.5rem;
        }

        .top-bar h1 {
            font-size: 1.25rem;
        }

        .top-bar-button {
            width: 3rem;
            height: 3rem;
        }

        .profile-header,
        .stats-grid,
        .filter-tabs,
        .rewards-list {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .section-header {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .profile-image {
            width: 5rem;
            height: 5rem;
        }

        .profile-info h2 {
            font-size: 1.375rem;
        }

        .stat-card {
            padding: 1.25rem;
        }

        .stat-value {
            font-size: 1.5rem;
        }

        .reward-card {
            padding: 1.25rem;
        }

        .reward-icon {
            width: 4rem;
            height: 4rem;
        }

        .reward-icon img {
            width: 2.5rem;
            height: 2.5rem;
        }

        .reward-title {
            font-size: 1rem;
        }

        .reward-subtitle {
            font-size: 0.875rem;
        }

        .reward-points-value {
            font-size: 1rem;
        }

        .reward-points .icon-wrapper {
            width: 1.125rem;
            height: 1.125rem;
        }
    }

    @media (min-width: 768px) {
        main {
            padding-bottom: 8rem;
        }

        .container {
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
        }

        :host(.dark) .container {
            background-color: #1a1a1a;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
        }

        .top-bar {
            padding: 1.25rem 2rem;
        }

        .top-bar h1 {
            font-size: 1.375rem;
        }

        .profile-header,
        .stats-grid,
        .filter-tabs,
        .rewards-list {
            padding-left: 2rem;
            padding-right: 2rem;
        }

        .section-header {
            padding-left: 2rem;
            padding-right: 2rem;
            font-size: 1.25rem;
        }

        .profile-header {
            padding-top: 1.5rem;
        }

        .profile-image {
            width: 5.5rem;
            height: 5.5rem;
        }

        .profile-info h2 {
            font-size: 1.5rem;
        }

        .profile-info p {
            font-size: 1rem;
        }

        .stats-grid {
            gap: 1rem;
        }

        .stat-card {
            min-width: calc(50% - 0.5rem);
            padding: 1.5rem;
        }

        .stat-label {
            font-size: 1rem;
        }

        .stat-value {
            font-size: 1.75rem;
        }

        .stat-breakdown {
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .stat-breakdown span {
            font-size: 0.9375rem;
        }

        .rewards-list {
            gap: 1rem;
        }

        .reward-card {
            padding: 1.5rem;
        }

        .reward-icon {
            width: 4.5rem;
            height: 4.5rem;
        }

        .reward-icon img {
            width: 2.75rem;
            height: 2.75rem;
        }

        .reward-title {
            font-size: 1.0625rem;
        }

        .reward-subtitle {
            font-size: 0.9375rem;
        }

        .fab-container {
            padding: 1.5rem 2rem;
        }

        .fab {
            height: 3.75rem;
            font-size: 1.0625rem;
            border-radius: 18px;
            max-width: 500px;
        }
    }

    @media (min-width: 1024px) {
        main {
            padding-bottom: 9rem;
        }

        .top-bar {
            padding: 1.5rem 3rem;
            position: static;
        }

        .top-bar h1 {
            font-size: 1.5rem;
        }

        .profile-header,
        .filter-tabs,
        .rewards-list {
            padding-left: 3rem;
            padding-right: 3rem;
        }

        .stats-grid {
            padding: 1.25rem 3rem;
            gap: 1.25rem;
        }

        .section-header {
            padding: 1.5rem 3rem 1rem;
            font-size: 1.375rem;
        }

        .profile-header {
            padding-top: 2rem;
        }

        .profile-content {
            gap: 1.5rem;
        }

        .profile-image {
            width: 6rem;
            height: 6rem;
        }

        .profile-info h2 {
            font-size: 1.625rem;
        }

        .stat-card {
            padding: 1.75rem;
        }

        .stat-value {
            font-size: 2rem;
        }

        .reward-card {
            padding: 1.75rem;
            gap: 1.25rem;
        }

        .reward-icon {
            width: 5rem;
            height: 5rem;
        }

        .reward-icon img {
            width: 3rem;
            height: 3rem;
        }

        .reward-title {
            font-size: 1.125rem;
        }

        .reward-subtitle {
            font-size: 1rem;
        }

        .reward-points-value {
            font-size: 1.125rem;
        }

        .reward-points .icon-wrapper {
            width: 1.25rem;
            height: 1.25rem;
        }

        .fab-container {
            padding: 2rem 3rem;
            background: linear-gradient(
                to top,
                rgba(245, 247, 245, 1) 0%,
                rgba(245, 247, 245, 0.9) 30%,
                rgba(245, 247, 245, 0) 100%
            );
        }

        :host(.dark) .fab-container {
            background: linear-gradient(
                to top,
                rgba(18, 18, 18, 1) 0%,
                rgba(18, 18, 18, 0.9) 30%,
                rgba(18, 18, 18, 0) 100%
            );
        }

        .fab {
            max-width: 420px;
            height: 4rem;
            font-size: 1.125rem;
            border-radius: 20px;
        }

        .fab .icon-wrapper {
            width: 20px;
            height: 20px;
        }
    }

    @media (min-width: 1280px) {
        .top-bar {
            padding: 1.75rem 4rem;
        }

        .top-bar h1 {
            font-size: 1.625rem;
        }

        .profile-header,
        .filter-tabs {
            padding-left: 4rem;
            padding-right: 4rem;
        }

        .stats-grid {
            padding: 1.5rem 4rem;
            gap: 1.5rem;
        }

        .section-header {
            padding: 2rem 4rem 1rem;
            font-size: 1.5rem;
        }

        .rewards-list {
            padding-left: 4rem;
            padding-right: 4rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
        }

        .stat-card {
            padding: 2rem;
        }

        .stat-label {
            font-size: 1.0625rem;
        }

        .stat-value {
            font-size: 2.25rem;
        }

        .reward-card {
            padding: 2rem;
        }

        .fab-container {
            padding: 2rem 4rem;
        }

        .fab {
            max-width: 450px;
        }

        main {
            padding-bottom: 9.5rem;
        }
    }

    @media (min-width: 1536px) {
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }

        .stat-card {
            min-width: auto;
        }

        .stat-card.full-width {
            grid-column: span 4;
        }

        .stat-breakdown {
            justify-content: flex-start;
            gap: 2rem;
        }

        .rewards-list {
            grid-template-columns: repeat(3, 1fr);
        }

        main {
            padding-bottom: 10rem;
        }
    }

    @media (max-height: 600px) and (orientation: landscape) {
        main {
            padding-bottom: 5.5rem;
        }

        .fab-container {
            padding: 0.75rem 1.25rem;
        }

        .fab {
            height: 3rem;
        }
    }
    @media print {
        .top-bar,
        .fab-container,
        .filter-tabs {
            display: none;
        }

        main {
            padding-bottom: 0;
        }

        .reward-card,
        .stat-card {
            page-break-inside: avoid;
        }
    }

    .recent-requests-section {
        padding: 0 1.25rem 1rem;
    }

    .section-header-with-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 0 0.75rem;
    }

    .section-header-with-action .section-header {
        padding: 0;
        margin: 0;
    }

    .view-all-btn {
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 1px solid rgba(19, 236, 19, 0.3);
        border-radius: 8px;
        color: #13ec13;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
    }

    .view-all-btn:hover {
        background-color: rgba(19, 236, 19, 0.1);
        border-color: #13ec13;
    }

    :host(.dark) .view-all-btn {
        border-color: rgba(19, 236, 19, 0.4);
    }

    .requests-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .request-card {
        padding: 1rem;
        border-radius: 12px;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.2s ease;
    }

    :host(.dark) .request-card {
        background-color: #1e1e1e;
        border-color: rgba(255, 255, 255, 0.08);
    }

    .request-card:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    :host(.dark) .request-card:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .request-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .request-id {
        font-family: monospace;
        font-size: 0.875rem;
        font-weight: 600;
        color: #7a8a7a;
    }

    :host(.dark) .request-id {
        color: #8a8a8a;
    }

    .request-status {
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .status-pending {
        background-color: #fef3c7;
        color: #92400e;
    }

    :host(.dark) .status-pending {
        background-color: #78350f;
        color: #fef3c7;
    }

    .status-completed {
        background-color: #d1fae5;
        color: #065f46;
    }

    :host(.dark) .status-completed {
        background-color: #065f46;
        color: #d1fae5;
    }

    .status-canceled {
        background-color: #fee2e2;
        color: #991b1b;
    }

    :host(.dark) .status-canceled {
        background-color: #7f1d1d;
        color: #fee2e2;
    }

    .request-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .request-date {
        font-size: 0.875rem;
        color: #7a8a7a;
        margin: 0;
    }

    :host(.dark) .request-date {
        color: #8a8a8a;
    }

    .request-items {
        font-size: 0.8125rem;
        color: #1a1a1a;
        margin: 0;
    }

    :host(.dark) .request-items {
        color: #e4e4e4;
    }

    @media (min-width: 640px) {
        .recent-requests-section {
            padding: 0 1.5rem 1rem;
        }
    }

    @media (min-width: 768px) {
        .recent-requests-section {
            padding: 0 2rem 1rem;
        }

        .requests-list {
            gap: 1rem;
        }

        .request-card {
            padding: 1.25rem;
        }
    }

    @media (min-width: 1024px) {
        .recent-requests-section {
            padding: 0 3rem 1rem;
        }
    }

    @media (min-width: 1280px) {
        .recent-requests-section {
            padding: 0 4rem 1rem;
        }
    }
`;
