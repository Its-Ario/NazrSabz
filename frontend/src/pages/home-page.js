import { html, css } from 'lit';
import '../components/user-map';

import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faBell,
    faRecycle,
    faMoon,
    faSun,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../components/base-component';
import { removeAuthToken } from '../utils/auth';

library.add(faBell, faRecycle, faMoon, faSun, faRightFromBracket);

export class HomePage extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            height: 100vh;
            width: 100%;
            font-family: 'Shabnam FD';
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
            height: 100%;
            overflow: hidden;
        }

        /* Top Bar Styling */
        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
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

        .top-bar button {
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
        }

        :host(.dark) .top-bar button {
            color: #b8b8b8;
        }

        .top-bar button:hover {
            background-color: rgba(19, 236, 19, 0.1);
        }

        :host(.dark) .top-bar button:hover {
            background-color: rgba(19, 236, 19, 0.15);
        }

        .top-bar h2 {
            font-weight: 600;
            font-size: 1.125rem;
            text-align: center;
            flex: 1;
            letter-spacing: -0.01em;
        }

        .search-bar {
            padding: 0.75rem 1.25rem;
            margin-bottom: 0.25rem;
        }

        .search-input {
            font-family: inherit;
            width: 100%;
            border-radius: 14px;
            padding: 0.875rem 1.125rem;
            border: 1px solid rgba(0, 0, 0, 0.08);
            outline: none;
            font-size: 0.9375rem;
            background-color: #ffffff;
            color: #1a1a1a;
            transition: all 0.2s ease;
        }

        :host(.dark) .search-input {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.1);
            color: #e4e4e4;
        }

        .search-input::placeholder {
            color: #7a8a7a;
        }

        :host(.dark) .search-input::placeholder {
            color: #8a8a8a;
        }

        .search-input:focus {
            border-color: #13ec13;
            box-shadow: 0 0 0 3px rgba(19, 236, 19, 0.1);
        }

        /* Filter Chips Styling */
        .filter-chips {
            display: flex;
            gap: 0.625rem;
            padding: 0.75rem 1.25rem;
            overflow-x: auto;
            scrollbar-width: none;
        }

        .filter-chips::-webkit-scrollbar {
            display: none;
        }

        .filter-chip {
            padding: 0.625rem 1.125rem;
            border-radius: 12px;
            white-space: nowrap;
            font-weight: 500;
            font-size: 0.9375rem;
            background-color: #ffffff;
            color: #2d4a2d;
            cursor: pointer;
            flex-shrink: 0;
            border: 1px solid rgba(0, 0, 0, 0.08);
            transition: all 0.2s ease;
        }

        :host(.dark) .filter-chip {
            background-color: #1e1e1e;
            color: #b8b8b8;
            border-color: rgba(255, 255, 255, 0.1);
        }

        .filter-chip:hover {
            background-color: #f0f7f0;
            transform: translateY(-1px);
        }

        :host(.dark) .filter-chip:hover {
            background-color: #2a2a2a;
        }

        .filter-chip.active {
            background-color: #13ec13;
            color: #0a1a0a;
            font-weight: 600;
            border-color: #13ec13;
            box-shadow: 0 2px 8px rgba(19, 236, 19, 0.25);
        }

        :host(.dark) .filter-chip.active {
            box-shadow: 0 2px 12px rgba(19, 236, 19, 0.35);
        }

        .map-container {
            flex: 1;
            position: relative;
            border-radius: 20px 20px 0 0;
            overflow: hidden;
            min-height: 0;
            margin-top: 0.5rem;
        }

        .fab-container {
            padding: 1.25rem;
            display: flex;
            justify-content: center;
            background: linear-gradient(
                to top,
                rgba(245, 247, 245, 1) 0%,
                rgba(245, 247, 245, 0) 100%
            );
        }

        :host(.dark) .fab-container {
            background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
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
    `;

    static properties = {
        activeFilter: { type: String },
        currentUser: { type: Object },
    };

    constructor() {
        super();
        this.activeFilter = 'همه';
        this.users = [];
    }

    setFilter(filter) {
        this.activeFilter = filter;
    }

    render() {
        const bellIcon = icon({ prefix: 'fas', iconName: 'bell' }).node[0];
        const recyclingIcon = icon({ prefix: 'fa', iconName: 'recycle' }).node[0];
        const bracketIcon = icon({ prefix: 'fa', iconName: 'right-from-bracket' }).node[0];

        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];

        return html`
            <div class="app-container">
                <div class="top-bar">
                    <button @click="${super.toggleTheme}">
                        <span class="icon-wrapper"> ${this.darkMode ? sunIcon : moonIcon} </span>
                    </button>
                    <h2>نذر سبز</h2>
                    <button @click="${this._onLogout}">
                        <span class="icon-wrapper">${bracketIcon}</span>
                    </button>
                    <button>
                        <span class="icon-wrapper">${bellIcon}</span>
                    </button>
                </div>

                <div class="search-bar">
                    <input class="search-input" type="text" placeholder="جستجوی آدرس" />
                </div>

                <div class="filter-chips">
                    ${['همه', 'پلاستیک', 'کاغذ', 'فلزات', 'شیشه', 'الکترونیکی'].map(
                        (filter) => html`
                            <div
                                class="filter-chip ${this.activeFilter === filter ? 'active' : ''}"
                                @click="${() => this.setFilter(filter)}"
                            >
                                ${filter}
                            </div>
                        `
                    )}
                </div>

                <div class="map-container">
                    <user-map .users="${this.users}"></user-map>
                </div>

                <div class="fab-container">
                    <button class="fab">
                        <span class="icon-wrapper">${recyclingIcon}</span>

                        درخواست جدید
                    </button>
                </div>
            </div>
        `;
    }

    _onLogout() {
        removeAuthToken();
        this.currentUser = null;

        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/' },
                bubbles: true,
                composed: true,
            })
        );
    }
}

customElements.define('home-page', HomePage);
