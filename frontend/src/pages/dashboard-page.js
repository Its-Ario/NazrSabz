import { html, css } from 'lit';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faRightFromBracket,
    faStar,
    faRecycle,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../components/base-component';
import { removeAuthToken } from '../utils/auth';

library.add(faRightFromBracket, faStar, faRecycle, faSun, faMoon);

export class DashboardPage extends BaseComponent {
    static properties = {
        user: { type: Object },
        activeTab: { type: String },
    };

    static styles = css`
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
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

        /* Top App Bar */
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
            padding-bottom: 6rem;
        }

        /* Profile Header */
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

        /* Circular Progress */
        .progress-section {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem 1.25rem;
            align-items: center;
        }

        .circular-progress {
            position: relative;
            width: 11rem;
            height: 11rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .circular-progress svg {
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
        }

        .progress-bg {
            stroke: #e2e8f0;
            fill: transparent;
        }

        :host(.dark) .progress-bg {
            stroke: #334155;
        }

        .progress-bar {
            stroke: #13ec13;
            fill: transparent;
            stroke-linecap: round;
            transition: stroke-dashoffset 0.5s ease;
        }

        .progress-content {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
        }

        .progress-value {
            font-size: 1.75rem;
            font-weight: 600;
        }

        .progress-label {
            font-size: 0.875rem;
            color: #7a8a7a;
        }

        :host(.dark) .progress-label {
            color: #8a8a8a;
        }

        .progress-text {
            font-size: 0.9375rem;
            font-weight: 500;
            text-align: center;
        }

        .progress-description {
            font-size: 0.875rem;
            color: #7a8a7a;
            text-align: center;
            max-width: 90%;
            line-height: 1.5;
        }

        :host(.dark) .progress-description {
            color: #8a8a8a;
        }

        /* Stats */
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

        /* Section Header */
        .section-header {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0;
            padding: 1.25rem 1.25rem 0.75rem;
            letter-spacing: -0.01em;
        }

        /* Filter Tabs */
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

        /* Reward Cards */
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

        /* Floating Action Button */
        .fab-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.25rem;
            background: linear-gradient(
                to top,
                rgba(245, 247, 245, 1) 0%,
                rgba(245, 247, 245, 0) 100%
            );
            pointer-events: none;
            display: flex;
            justify-content: center;
        }

        :host(.dark) .fab-container {
            background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
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

        /* Small Mobile (320px - 374px) */
        @media (max-width: 374px) {
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
            .progress-section,
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

            .circular-progress {
                width: 10rem;
                height: 10rem;
            }

            .progress-value {
                font-size: 1.5rem;
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

        /* Medium Mobile (375px - 639px) */
        @media (min-width: 375px) and (max-width: 639px) {
            .circular-progress {
                width: 11rem;
                height: 11rem;
            }
        }

        /* Large Mobile / Small Tablet (640px - 767px) */
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
            .progress-section,
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

            .circular-progress {
                width: 12rem;
                height: 12rem;
            }

            .progress-value {
                font-size: 2rem;
            }

            .progress-text {
                font-size: 1rem;
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

        /* Tablet (768px - 1023px) */
        @media (min-width: 768px) {
            .container {
                max-width: 768px;
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
            .progress-section,
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

            .circular-progress {
                width: 13rem;
                height: 13rem;
            }

            .progress-value {
                font-size: 2.25rem;
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

            .fab {
                height: 3.75rem;
                font-size: 1.0625rem;
            }
        }

        /* Desktop (1024px - 1279px) */
        @media (min-width: 1024px) {
            .container {
                max-width: 1024px;
            }

            main {
                padding-bottom: 2rem;
            }

            .top-bar {
                padding: 1.5rem 3rem;
                position: static;
            }

            .top-bar h1 {
                font-size: 1.5rem;
            }

            .profile-header,
            .progress-section,
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

            .circular-progress {
                width: 14rem;
                height: 14rem;
            }

            .progress-value {
                font-size: 2.5rem;
            }

            .progress-label {
                font-size: 1rem;
            }

            .progress-text {
                font-size: 1.0625rem;
            }

            .progress-description {
                font-size: 1rem;
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

            /* Desktop FAB - not fixed */
            .fab-container {
                position: static;
                padding: 2rem 3rem;
                background: transparent;
            }

            .fab {
                max-width: 400px;
                height: 4rem;
                font-size: 1.125rem;
            }
        }

        /* Large Desktop (1280px+) */
        @media (min-width: 1280px) {
            .container {
                max-width: 1280px;
            }

            .top-bar {
                padding: 1.75rem 4rem;
            }

            .top-bar h1 {
                font-size: 1.625rem;
            }

            .profile-header,
            .progress-section,
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
                padding: 2rem 4rem 2.5rem;
            }
        }

        /* Extra Large Desktop (1536px+) */
        @media (min-width: 1536px) {
            .container {
                max-width: 1536px;
            }

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
        }

        /* Landscape Mobile */
        @media (max-height: 600px) and (orientation: landscape) {
            main {
                padding-bottom: 5.5rem;
            }

            .circular-progress {
                width: 9rem;
                height: 9rem;
            }

            .progress-section {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }

            .fab-container {
                padding: 0.75rem 1.25rem;
            }

            .fab {
                height: 3rem;
            }
        }

        /* Print Styles */
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
    `;

    constructor() {
        super();
        this.activeTab = 'all';
        this.rewards = [
            {
                id: 1,
                title: 'تخفیف ۲۰٪ دیجی‌کالا',
                subtitle: 'برای خریدهای بالای ۵۰۰ هزار تومان',
                points: 1500,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBnC-hgLEKetWI9eLsD4xtYc8VSkdo-cC4PV5dLaE06aX9TwEKemxkye30NyLlo4TfVB5Kbx8BLqp8QmLQDSqebgvjLFobB8sbz1ZEX6Bc2hGMj1etBuOy6FgsPkob1ergqTcoXJcXws6RgXZNJOWimEog4AGWHmEPAzCEzAIQRyd0sVZpI1029Edre5y2N6BECzUbphd6xsTsRSndzUsFzy8Z98M1-D-ppSu2PdfLBUptbGkpFSsVIbSXWelJhn-yRpjKHXGF_dg',
            },
            {
                id: 2,
                title: 'یک قهوه رایگان از کافه روما',
                subtitle: 'فقط برای شعبه مرکزی',
                points: 800,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJDxAgqLMCEw00JAqQ5Z6KLBMkw1CkMvscTBIEbKgNHok0DRaul0nAfx_dIpDHOHgIHIA74ihrFoyT4UIkv0MbbzAxXUqEt7W7-EjkWjPmT1w5Oe8IVrRaDh38wF-GrDz8xxJs8eJXZ9j0-ujq9R1_ly0IOgF10zuwYTm0XtaqkrlYD0S73amTVU1j1V8GiToI2YzfmlacemTugS85buCE4-aUKgRkuOxQor25DIKmnut6Ayw5YYpCTPPxLPiDoF9WHHCBHi7dtTg',
            },
            {
                id: 3,
                title: 'اشتراک ۱ ماهه فیدیبو',
                subtitle: 'دسترسی به هزاران کتاب',
                points: 2000,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjRT8-6mgt0jTX6m3WIeqZvRECIpGAsI2I-FL7klMax3mbN9M9u_QZEEVVNcEWw5dAdAz2xWgPo9fHPTdTlla7t7mbI6tmckksFljIFqd0ElapaqAA9ZOa_IunFRRHAx8f-GLmlc_z6YKNsB4dyekHNb2VQQKLTuL0CaS7oBOsIVMT39w84rXIoC2a1RKeo2CBW_STQ0fmMq4gIFVdyquVsn1aMHxNE8E1eVYJMsFgTYTOHrEJadR9Jl5kcnCblaswwNkgIYTWWiM',
            },
        ];
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }

    _calculateProgress() {
        const total = 10000; // Next level at 10000
        const current = this.userProfile.points;
        const percentage = (current / total) * 100;
        const circumference = 2 * Math.PI * 40; // r=40
        const offset = circumference - (percentage / 100) * circumference;
        return offset;
    }

    render() {
        const bracketIcon = icon({ prefix: 'fa', iconName: 'right-from-bracket' }).node[0];
        const starIcon = icon({ prefix: 'fas', iconName: 'star' }).node[0];
        const recycleIcon = icon({ prefix: 'fas', iconName: 'recycle' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];

        const progressOffset = this._calculateProgress();

        return html`
            <div class="container">
                <div class="top-bar">
                    <button class="top-bar-button" @click="${this._onLogout}">
                        <span class="icon-wrapper">${bracketIcon}</span>
                    </button>
                    <h1>پنل کاربری</h1>
                    <button class="top-bar-button" @click="${super.toggleTheme}">
                        <span class="icon-wrapper"> ${this.darkMode ? sunIcon : moonIcon} </span>
                    </button>
                </div>

                <main>
                    <div class="profile-header">
                        <div class="profile-content">
                            <div
                                class="profile-image"
                                style="background-image: url('${this.userProfile.image}')"
                            ></div>
                            <div class="profile-info">
                                <h2>${this.userProfile.name}</h2>
                                <p>${this.userProfile.level}</p>
                            </div>
                        </div>
                    </div>

                    <div class="progress-section">
                        <div class="circular-progress">
                            <svg viewBox="0 0 100 100">
                                <circle
                                    class="progress-bg"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke-width="10"
                                ></circle>
                                <circle
                                    class="progress-bar"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke-width="10"
                                    stroke-dasharray="251.2"
                                    stroke-dashoffset="${progressOffset}"
                                ></circle>
                            </svg>
                            <div class="progress-content">
                                <span class="progress-value">${this.userProfile.points}</span>
                                <span class="progress-label">امتیاز کل</span>
                            </div>
                        </div>
                        <p class="progress-text">
                            ${this.userProfile.pointsToNext} امتیاز تا سطح بعدی
                        </p>
                        <p class="progress-description">
                            با بازیافت ${this.userProfile.totalWeight} کیلوگرم زباله، به حفظ ۲ درخت
                            کمک کرده‌اید.
                        </p>
                    </div>

                    <div class="stats-grid">
                        <div class="stat-card">
                            <p class="stat-label">مجموع وزن</p>
                            <p class="stat-value">${this.userProfile.totalWeight} کیلوگرم</p>
                        </div>
                        <div class="stat-card">
                            <p class="stat-label">درخواست موفق</p>
                            <p class="stat-value">${this.userProfile.successfulRequests}</p>
                        </div>
                        <div class="stat-card full-width">
                            <p class="stat-label">تفکیک بازیافت</p>
                            <div class="stat-breakdown">
                                <span>پلاستیک: ${this.userProfile.breakdown.plastic} کیلوگرم</span>
                                <span>کاغذ: ${this.userProfile.breakdown.paper} کیلوگرم</span>
                                <span>شیشه: ${this.userProfile.breakdown.glass} کیلوگرم</span>
                            </div>
                        </div>
                    </div>

                    <h2 class="section-header">جوایز و تخفیف‌ها</h2>

                    <div class="filter-tabs">
                        <div class="tabs-container">
                            <button
                                class="tab-button ${this.activeTab === 'all' ? 'active' : ''}"
                                @click="${() => this.setActiveTab('all')}"
                            >
                                همه
                            </button>
                            <button
                                class="tab-button ${this.activeTab === 'discounts' ? 'active' : ''}"
                                @click="${() => this.setActiveTab('discounts')}"
                            >
                                تخفیف‌ها
                            </button>
                            <button
                                class="tab-button ${this.activeTab === 'free' ? 'active' : ''}"
                                @click="${() => this.setActiveTab('free')}"
                            >
                                کالای رایگان
                            </button>
                        </div>
                    </div>

                    <!-- Rewards List -->
                    <div class="rewards-list">
                        ${this.rewards.map(
                            (reward) => html`
                                <div
                                    class="reward-card"
                                    @click="${() => this._onRewardClick(reward)}"
                                >
                                    <div class="reward-icon">
                                        <img src="${reward.icon}" alt="${reward.title}" />
                                    </div>
                                    <div class="reward-info">
                                        <p class="reward-title">${reward.title}</p>
                                        <p class="reward-subtitle">${reward.subtitle}</p>
                                    </div>
                                    <div class="reward-points">
                                        <span class="reward-points-value">${reward.points}</span>
                                        <span class="icon-wrapper">${starIcon}</span>
                                    </div>
                                </div>
                            `
                        )}
                    </div>
                </main>

                <div class="fab-container">
                    <button class="fab" @click="${this._onNewRequest}">
                        <span class="icon-wrapper">${recycleIcon}</span>
                        ثبت درخواست جدید
                    </button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        this.userProfile = {
            name: this.user?.name,
            level: 'سطح ۳: قهرمان بازیافت',
            points: 7500,
            pointsToNext: 2500,
            totalWeight: 120,
            successfulRequests: 45,
            breakdown: {
                plastic: 50,
                paper: 45,
                glass: 25,
            },
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtS8igzazX251rvvOMexnu8XeDZvgFSOX-7drIVKtMRpk5hT8uGx7R_uvDE-bvZbA-pyrbIKJeaobHFxd5Y05alN5URl_HKidh00hc_bOxIxe30elZNCZvvvrdN6XPuf3pFpI7D9qVzZaQYdkpKfUp9_uhkylXYLWcjeGGcrT3O79NgY6n82qY88fE9w6wgl7kGn2p0cYLss7ML6uMpIckqKjsBvM06ZwatPN_ELn-gxhasNuT9xpn7oNW4RkDd29eRTZgl2sIUig',
        };
    }

    _onRewardClick(reward) {
        console.log('Reward clicked:', reward);
    }

    _onNewRequest() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/new' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onLogout() {
        removeAuthToken();
        this.user = null;

        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/' },
                bubbles: true,
                composed: true,
            })
        );
    }
}

customElements.define('dashboard-page', DashboardPage);
