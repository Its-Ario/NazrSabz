import { css, html } from 'lit';
import { globalStyles } from '../styles/global-styles.js';
import { saveAuthToken, removeAuthToken, getAuthToken } from '../utils/auth.js';

import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faMobile,
    faLock,
    faSun,
    faMoon,
    faUser,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../components/base-component.js';

library.add(faMobile, faLock, faSun, faMoon, faUser, faEnvelope);

class LoginPage extends BaseComponent {
    static styles = [
        globalStyles,
        css`
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

            /* Form Groups */
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

            /* Forgot Password */
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

            /* Primary Button */
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

            /* Divider */
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
        `,
    ];

    static properties = {
        loading: { type: Boolean },
        error: { type: String },
        successMessage: { type: String },
        isRegistering: { type: Boolean },
    };

    constructor() {
        super();
        this.loading = false;
        this.error = '';
        this.successMessage = '';
        this.isRegistering = false;
    }

    render() {
        const userIcon = icon({ prefix: 'fas', iconName: 'user' }).node[0];
        const mobileIcon = icon({ prefix: 'fas', iconName: 'mobile' }).node[0];
        const lockIcon = icon({ prefix: 'fas', iconName: 'lock' }).node[0];
        const emailIcon = icon({ prefix: 'fas', iconName: 'envelope' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];

        return html`
            <div class="auth-page">
                <button class="dark-mode-toggle" @click="${this.toggleTheme}">
                    <span class="icon-wrapper"> ${this.darkMode ? sunIcon : moonIcon} </span>
                </button>

                <div class="auth-container">
                    <h1 class="auth-title">به <strong>نذر سبز</strong> خوش آمدید!</h1>
                    <p class="auth-subtitle">
                        ${this.isRegistering
                            ? 'اطلاعات خود را برای ساخت حساب کاربری وارد کنید.'
                            : 'برای مشارکت در بازیافت، وارد شوید یا حساب کاربری جدید بسازید.'}
                    </p>

                    <div class="toggle-container">
                        <label class="toggle-option">
                            <input
                                type="radio"
                                name="auth-toggle"
                                .checked=${!this.isRegistering}
                                @change=${() => this.switchMode(false)}
                            />
                            <span>ورود</span>
                        </label>
                        <label class="toggle-option">
                            <input
                                type="radio"
                                name="auth-toggle"
                                .checked=${this.isRegistering}
                                @change=${() => this.switchMode(true)}
                            />
                            <span>ثبت‌نام</span>
                        </label>
                    </div>

                    ${this.error
                        ? html`<div class="message-box error-msg">${this.error}</div>`
                        : ''}
                    ${this.successMessage
                        ? html`<div class="message-box success-msg">${this.successMessage}</div>`
                        : ''}

                    <form class="auth-form" @submit=${this.handleSubmit}>
                        <!-- Name (Register only) -->
                        ${this.isRegistering
                            ? html`
                                  <div class="form-group">
                                      <label>نام و نام خانوادگی</label>
                                      <div class="input-wrapper">
                                          <input
                                              type="text"
                                              id="fullName"
                                              placeholder="مثال: علی محمدی"
                                          />
                                          <span class="icon-wrapper">${userIcon}</span>
                                      </div>
                                  </div>
                              `
                            : ''}

                        <!-- Username -->
                        <div class="form-group">
                            <label>نام کاربری</label>
                            <div class="input-wrapper">
                                <input type="text" id="username" placeholder="user123" />
                                <span class="icon-wrapper">${userIcon}</span>
                            </div>
                        </div>

                        ${this.isRegistering
                            ? html`
                                  <div class="form-group">
                                      <label>ایمیل</label>
                                      <div class="input-wrapper">
                                          <input
                                              type="email"
                                              id="email"
                                              placeholder="email@example.com"
                                          />
                                          <span class="icon-wrapper">${emailIcon}</span>
                                      </div>
                                  </div>

                                  <div class="form-group">
                                      <label>شماره موبایل</label>
                                      <div class="input-wrapper">
                                          <input
                                              type="tel"
                                              id="phoneNumber"
                                              placeholder="0912..."
                                          />
                                          <span class="icon-wrapper">${mobileIcon}</span>
                                      </div>
                                  </div>
                              `
                            : ''}

                        <!-- Password -->
                        <div class="form-group">
                            <label>رمز عبور</label>
                            <div class="input-wrapper">
                                <input type="password" id="password" placeholder="••••••••" />
                                <span class="icon-wrapper">${lockIcon}</span>
                            </div>
                        </div>

                        ${!this.isRegistering
                            ? html`
                                  <div class="forgot-password">
                                      <a href="#">فراموشی رمز عبور؟</a>
                                  </div>
                              `
                            : ''}

                        <button type="submit" class="primary-btn" ?disabled=${this.loading}>
                            ${this.loading
                                ? 'لطفا صبر کنید...'
                                : this.isRegistering
                                  ? 'ایجاد حساب کاربری'
                                  : 'ورود به حساب کاربری'}
                        </button>
                    </form>

                    <div class="divider">
                        <hr />
                        <p>یا ${this.isRegistering ? 'ثبت‌نام' : 'ورود'} از طریق</p>
                        <hr />
                    </div>
                    <button
                        type="button"
                        class="google-btn"
                        @click=${() => (window.location.href = '/api/login/google')}
                        aria-label="ورود با گوگل"
                    >
                        <img
                            class="g-icon"
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt=""
                            aria-hidden="true"
                        />
                        <span>ورود با گوگل</span>
                    </button>

                    <p class="footer-text">
                        با ورود یا ثبت‌نام، شما با
                        <a href="#">شرایط و قوانین</a>
                        ما موافقت می‌کنید.
                    </p>
                </div>
            </div>
        `;
    }

    switchMode(isRegistering) {
        this.isRegistering = isRegistering;
        this.error = '';
        this.successMessage = '';
    }

    connectedCallback() {
        super.connectedCallback();
        const params = new URLSearchParams(window.location.search);
        const googleToken = params.get('googleToken');

        if (googleToken) {
            saveAuthToken(googleToken);
            this.dispatchEvent(
                new CustomEvent('login-success', {
                    detail: { user: null, via: 'google' },
                    bubbles: true,
                    composed: true,
                })
            );
            const url = new URL(window.location.href);
            url.search = '';
            window.history.replaceState({}, '', url);
        }
        this.attemptAutoLogin();
    }

    async attemptAutoLogin() {
        const token = getAuthToken();
        if (!token) return;

        try {
            const res = await fetch(`api/verify-token`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Token invalid');

            const data = await res.json();
            this.dispatchEvent(
                new CustomEvent('login-success', {
                    detail: { user: data.user },
                    bubbles: true,
                    composed: true,
                })
            );
            this.dispatchEvent(
                new CustomEvent('navigate', {
                    detail: { to: '/dashboard' },
                    bubbles: true,
                    composed: true,
                })
            );
        } catch (err) {
            console.error('Auto-login failed', err);
            removeAuthToken();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.loading = true;
        this.error = '';
        this.successMessage = '';

        const username = this.renderRoot.querySelector('#username')?.value.trim();
        const password = this.renderRoot.querySelector('#password')?.value.trim();

        try {
            if (this.isRegistering) {
                const name = this.renderRoot.querySelector('#fullName')?.value.trim();
                const email = this.renderRoot.querySelector('#email')?.value.trim();
                const phoneNumber = this.renderRoot.querySelector('#phoneNumber')?.value.trim();

                if (!name || !username || !password) {
                    throw new Error('لطفا تمام فیلدهای ضروری را پر کنید.');
                }
                if (!email && !phoneNumber) {
                    throw new Error('لطفا ایمیل یا شماره موبایل را وارد کنید.');
                }

                const payload = {
                    name,
                    username,
                    password,
                    email,
                    phoneNumber,
                };

                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Registration failed');

                this.successMessage = 'حساب کاربری با موفقیت ساخته شد. لطفا وارد شوید.';
                this.loading = false;

                setTimeout(() => {
                    this.switchMode(false);
                }, 2000);
            } else {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (!res.ok) throw new Error('نام کاربری یا رمز عبور اشتباه است');

                const data = await res.json();
                saveAuthToken(data.token);

                this.dispatchEvent(
                    new CustomEvent('login-success', {
                        detail: { user: data.user },
                        bubbles: true,
                        composed: true,
                    })
                );

                this.dispatchEvent(
                    new CustomEvent('navigate', {
                        detail: { to: '/dashboard' },
                        bubbles: true,
                        composed: true,
                    })
                );
            }
        } catch (err) {
            this.error = err.message;
            console.error(err);
        } finally {
            this.loading = false;
        }
    }
}

customElements.define('login-page', LoginPage);
