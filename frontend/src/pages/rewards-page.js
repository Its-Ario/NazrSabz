import { html, css } from 'lit';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowRight,
    faShare,
    faStar,
    faRecycle,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../components/base-component';

library.add(faArrowRight, faShare, faStar, faRecycle, faSun, faMoon);

export class RewardsPage extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            font-family: 'Shabnam FD', 'Work Sans', sans-serif;
            direction: rtl;
            background-color: #f5f5f5;
            color: #424242;
            transition:
                background-color 0.3s ease,
                color 0.3s ease;
        }

        :host(.dark) {
            background-color: #121212;
            color: #e4e4e4;
        }

        * {
            box-sizing: border-box;
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
            padding: 1rem 1rem 0.5rem;
            backdrop-filter: blur(12px);
            background-color: rgba(245, 245, 245, 0.8);
            transition: background-color 0.3s ease;
        }

        :host(.dark) .top-bar {
            background-color: rgba(30, 30, 30, 0.85);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .top-bar-button {
            width: 3rem;
            height: 2.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #424242;
            transition:
                background-color 0.2s ease,
                color 0.2s ease;
        }

        :host(.dark) .top-bar-button {
            color: #e0e0e0;
        }

        .top-bar-button:hover {
            background-color: rgba(76, 175, 80, 0.1);
        }

        .top-bar h1 {
            flex: 1;
            text-align: center;
            font-size: 1.125rem;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.015em;
        }

        .icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
        }

        .icon-wrapper svg {
            width: 100%;
            height: 100%;
        }

        main {
            flex: 1;
            padding-bottom: 7rem;
        }

        /* Profile Header */
        .profile-header {
            padding: 1rem;
        }

        .profile-content {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .profile-image {
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            flex-shrink: 0;
        }

        .profile-info h2 {
            font-size: 1.375rem;
            font-weight: 700;
            margin: 0 0 0.25rem 0;
            letter-spacing: -0.015em;
        }

        .profile-info p {
            font-size: 1rem;
            font-weight: 500;
            margin: 0;
            color: #2e7d32;
        }

        :host(.dark) .profile-info p {
            color: #4caf50;
        }

        /* Circular Progress */
        .progress-section {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem;
            align-items: center;
        }

        .circular-progress {
            position: relative;
            width: 12rem;
            height: 12rem;
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
            stroke: #e0e0e0;
            fill: transparent;
        }

        :host(.dark) .progress-bg {
            stroke: #384338;
        }

        .progress-bar {
            stroke: #4caf50;
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
            font-size: 1.875rem;
            font-weight: 700;
        }

        .progress-label {
            font-size: 0.875rem;
            opacity: 0.7;
        }

        .progress-text {
            font-size: 1rem;
            font-weight: 500;
            text-align: center;
        }

        .progress-description {
            font-size: 0.875rem;
            opacity: 0.7;
            text-align: center;
            max-width: 90%;
        }

        /* Stats */
        .stats-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            padding: 1rem;
        }

        .stat-card {
            flex: 1;
            min-width: 158px;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
            border-radius: 1rem;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease;
        }

        :host(.dark) .stat-card {
            background-color: rgba(30, 30, 30, 0.85);
            border-color: rgba(255, 255, 255, 0.08);
            color: #e3f3e3;
        }

        .stat-card.full-width {
            min-width: 100%;
        }

        .stat-label {
            font-size: 1rem;
            font-weight: 500;
            opacity: 0.8;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .stat-breakdown {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .stat-breakdown span {
            font-size: 0.875rem;
        }

        /* Section Header */
        .section-header {
            font-size: 1.375rem;
            font-weight: 700;
            margin: 0;
            padding: 1.25rem 1rem 0.75rem;
            letter-spacing: -0.015em;
        }

        /* Filter Tabs */
        .filter-tabs {
            padding: 0 1rem 1rem;
        }

        .tabs-container {
            display: flex;
            gap: 0.5rem;
        }

        .tab-button {
            flex: 1;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            border: 1px solid #e0e0e0;
            background-color: #ffffff;
            color: rgba(66, 66, 66, 0.8);
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
        }

        :host(.dark) .tab-button {
            background-color: rgba(30, 30, 30, 0.85);
            border-color: rgba(255, 255, 255, 0.08);
            color: #e3f3e3;
        }

        .tab-button:hover {
            background-color: #f5f5f5;
        }

        :host(.dark) .tab-button:hover {
            background-color: #2a3a2a;
        }

        .tab-button.active {
            background-color: #4caf50;
            color: #ffffff;
            font-weight: 700;
            border-color: #4caf50;
            box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
        }

        /* Reward Cards */
        .rewards-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 0 1rem;
        }

        .reward-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 1rem;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            transition: all 0.2s ease;
        }

        :host(.dark) .reward-card {
            background-color: rgba(30, 30, 30, 0.85);
            border-color: rgba(255, 255, 255, 0.08);
            color: #e3f3e3;
        }

        .reward-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        :host(.dark) .reward-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .reward-icon {
            width: 4rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            background-color: #f5f5f5;
            flex-shrink: 0;
        }

        :host(.dark) .reward-icon {
            background-color: #2a3a2a;
        }

        .reward-icon img {
            width: 2.5rem;
            height: 2.5rem;
            object-fit: contain;
        }

        .reward-info {
            flex: 1;
        }

        .reward-title {
            font-weight: 700;
            margin: 0 0 0.25rem 0;
            font-size: 1rem;
        }

        .reward-subtitle {
            font-size: 0.875rem;
            opacity: 0.7;
            margin: 0;
        }

        .reward-points {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            flex-shrink: 0;
        }

        .reward-points-value {
            font-weight: 700;
            color: #ffc107;
            font-size: 1rem;
        }

        .reward-points .icon-wrapper {
            width: 1.125rem;
            height: 1.125rem;
            color: #ffc107;
        }

        /* Floating Action Button */
        .fab-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1rem;
            background: linear-gradient(
                to top,
                rgba(245, 245, 245, 1) 0%,
                rgba(245, 245, 245, 0) 100%
            );
            pointer-events: none;
        }

        :host(.dark) .fab-container {
            background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
        }

        .fab {
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem 1.5rem;
            border-radius: 9999px;
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            color: #ffffff;
            font-size: 1.125rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
            transition: all 0.2s ease;
            pointer-events: auto;
            font-family: inherit;
        }

        .fab:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }

        .fab:active {
            transform: translateY(0);
        }

        @media (min-width: 768px) {
            .stats-grid {
                max-width: 768px;
                margin: 0 auto;
            }

            .rewards-list {
                max-width: 768px;
                margin: 0 auto;
            }
        }
    `;

    static properties = {
        activeTab: { type: String },
    };

    constructor() {
        super();
        this.activeTab = 'all';

        this.userProfile = {
            name: 'علی رضایی',
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
        const arrowIcon = icon({ prefix: 'fas', iconName: 'arrow-right' }).node[0];
        const shareIcon = icon({ prefix: 'fas', iconName: 'share' }).node[0];
        const starIcon = icon({ prefix: 'fas', iconName: 'star' }).node[0];
        const recycleIcon = icon({ prefix: 'fas', iconName: 'recycle' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];

        const progressOffset = this._calculateProgress();

        return html`
            <div class="container">
                <!-- Top Bar -->
                <div class="top-bar">
                    <button class="top-bar-button" @click="${this._onBack}">
                        <span class="icon-wrapper">${arrowIcon}</span>
                    </button>
                    <h1>امتیازات و جوایز من</h1>
                    <button class="top-bar-button" @click="${this._onShare}">
                        <span class="icon-wrapper">${shareIcon}</span>
                    </button>
                    <button class="top-bar-button" @click="${super.toggleTheme}">
                        <span class="icon-wrapper"> ${this.darkMode ? sunIcon : moonIcon} </span>
                    </button>
                </div>

                <main>
                    <!-- Profile Header -->
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

                    <!-- Circular Progress -->
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

                    <!-- Stats -->
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

                    <!-- Section Header -->
                    <h2 class="section-header">جوایز و تخفیف‌ها</h2>

                    <!-- Filter Tabs -->
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

                <!-- Floating Action Button -->
                <div class="fab-container">
                    <button class="fab" @click="${this._onNewRequest}">
                        <span class="icon-wrapper">${recycleIcon}</span>
                        ثبت درخواست جدید
                    </button>
                </div>
            </div>
        `;
    }

    _onBack() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/home' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onShare() {
        console.log('Share clicked');
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
}

customElements.define('rewards-page', RewardsPage);
