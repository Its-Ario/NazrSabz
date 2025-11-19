import { html, css } from 'lit';
import { globalStyles } from '../styles/global-styles';
import { BaseComponent } from '../components/base-component';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowRight,
    faRecycle,
    faGlassWater,
    faCalendar,
    faClock,
    faLocationDot,
    faMoon,
    faSun,
    faFile,
    faCoins,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faArrowRight,
    faRecycle,
    faGlassWater,
    faCalendar,
    faLocationDot,
    faClock,
    faMoon,
    faSun,
    faFile,
    faCoins
);

export class NewRequestPage extends BaseComponent {
    static styles = [
        globalStyles,
        css`
            :host {
                display: block;
                height: 100vh;
                direction: rtl;
                background-color: #f6f8f6;
                direction: rtl;
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

            .app-container {
                display: flex;
                flex-direction: column;
                min-height: 100dvh;
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
                padding: 1rem;
                padding-bottom: 0.5rem;
                background-color: #ffffff;
                border-bottom: 1px solid #dbe6db;
            }

            :host(.dark) .top-bar {
                background-color: rgba(30, 30, 30, 0.85);
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }

            .top-bar h1 {
                font-size: 1.125rem;
                font-weight: bold;
                text-align: center;
                flex: 1;
                letter-spacing: -0.015em;
            }

            .top-bar .icon-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3rem;
                height: 3rem;
                cursor: pointer;
                border-radius: 0.75rem;
            }

            /* Section Headers */
            h2 {
                font-size: 1.375rem;
                font-weight: bold;
                margin: 1.25rem 1rem 0.75rem;
            }

            /* Waste Type Grid */
            .waste-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
                gap: 0.75rem;
                padding: 0 1rem;
            }

            .waste-card {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                border-radius: 1rem;
                padding: 1rem;
                cursor: pointer;
                border: 2px solid transparent;
                transition: all 0.2s ease;
            }

            .waste-card.primary {
                background-color: rgba(46, 139, 87, 0.1);
                border-color: #2e8b57;
                color: #2e8b57;
            }

            .waste-card:not(.primary) {
                background-color: #ffffff;
                border: 1px solid #dbe6db;
                color: #111811;
            }

            :host(.dark) .waste-card:not(.primary) {
                background-color: rgba(30, 30, 30, 0.85);
                border-color: rgba(255, 255, 255, 0.08);
                color: #e3f3e3;
            }

            .waste-card h3 {
                font-weight: bold;
                font-size: 1rem;
            }

            .waste-card p {
                font-size: 0.875rem;
                color: #618961;
            }

            :host(.dark) .waste-card p {
                color: #9bc99b;
            }

            /* Inputs */
            .form-group {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                padding: 0 1rem;
                margin-bottom: 1rem;
            }

            label {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-width: 10rem;
            }

            input,
            select,
            textarea {
                padding: 0.875rem 0.9375rem;
                border-radius: 0.75rem;
                border: 1px solid #dbe6db;
                background-color: #ffffff;
                font-size: 1rem;
                color: #111811;
                outline: none;
                resize: none;
                height: 3.5rem;
            }

            :host(.dark) input,
            :host(.dark) select,
            :host(.dark) textarea {
                background-color: rgba(30, 30, 30, 0.85);
                border-color: rgba(255, 255, 255, 0.08);
                color: #e3f3e3;
            }

            input:focus,
            select:focus,
            textarea:focus {
                border-color: #2e8b57;
                box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.3);
            }

            textarea {
                min-height: 7rem;
                padding-left: 3rem;
            }

            .fab-container {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 1rem;
                background-color: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(10px);
                border-top: 1px solid #dbe6db;
                display: flex;
                justify-content: center;
            }

            :host(.dark) .fab-container {
                background-color: rgba(30, 30, 30, 0.85);
                border-color: rgba(255, 255, 255, 0.08);
            }

            .fab {
                max-width: 480px;
                width: 100%;
                height: 3.5rem;
                border-radius: 16px;
                background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
                color: #0a1a0a;
                display: flex;
                font-family: inherit;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 1rem;
                gap: 0.625rem;
                box-shadow: 0 4px 16px rgba(19, 236, 19, 0.3);
                cursor: pointer;
                border: none;
                transition: all 0.2s ease;
            }

            .fab:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(19, 236, 19, 0.4);
            }

            .fab:active {
                transform: translateY(0);
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
        `,
    ];

    render() {
        const backIcon = icon({ prefix: 'fas', iconName: 'arrow-right' }).node[0];
        const recyclingIcon = icon({ prefix: 'fa', iconName: 'recycle' }).node[0];
        const glassIcon = icon({ prefix: 'fa', iconName: 'glass-water' }).node[0];
        // const calenderIcon = icon({ prefix: 'fa', iconName: 'calendar' }).node[0];
        const fileIcon = icon({ prefix: 'fa', iconName: 'file' }).node[0];

        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];

        return html`
            <div class="app-container">
                <!-- Top Bar -->
                <div class="top-bar">
                    <div class="icon-button" @click=${this._onBackClick}>
                        <span class="icon-wrapper">${backIcon}</span>
                    </div>
                    <h1>ثبت درخواست جدید</h1>
                    <div @click="${super.toggleTheme}" class="icon-button">
                        <span class="icon-wrapper"> ${this.darkMode ? sunIcon : moonIcon} </span>
                    </div>
                </div>

                <h2>نوع پسماند خود را انتخاب کنید</h2>
                <div class="waste-grid">
                    <div class="waste-card primary">
                        <span class="icon-wrapper">${fileIcon}</span>
                        <h3>کاغذ</h3>
                        <p>مقوا، روزنامه</p>
                    </div>
                    <div class="waste-card">
                        <span class="icon-wrapper">${recyclingIcon}</span>
                        <h3>پلاستیک</h3>
                        <p>بطری، ظروف</p>
                    </div>
                    <div class="waste-card">
                        <span class="icon-wrapper">iron</span>
                        <h3>فلز</h3>
                        <p>قوطی، آهن</p>
                    </div>
                    <div class="waste-card">
                        <span class="icon-wrapper">${glassIcon}</span>
                        <h3>شیشه</h3>
                        <p>بطری، ظروف</p>
                    </div>
                </div>

                <!-- Request Details -->
                <h2>جزئیات درخواست</h2>
                <div class="form-group">
                    <label>
                        وزن تقریبی (کیلوگرم)
                        <input type="number" placeholder="مثلا: 5" />
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        تاریخ جمع‌آوری
                        <input type="text" placeholder="انتخاب کنید" />
                    </label>
                    <label>
                        بازه زمانی
                        <select>
                            <option>صبح ۹-۱۲</option>
                            <option>عصر ۱۴-۱۷</option>
                        </select>
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        آدرس شما
                        <textarea placeholder="آدرس دقیق خود را وارد کنید..."></textarea>
                    </label>
                </div>

                <!-- Floating Action Button -->
                <div class="fab-container">
                    <button class="fab">
                        <span class="icon-wrapper">${recyclingIcon}</span>
                        ثبت درخواست
                    </button>
                </div>
            </div>
        `;
    }

    _onBackClick() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/home' },
                bubbles: true,
                composed: true,
            })
        );
    }
}

customElements.define('new-request-page', NewRequestPage);
