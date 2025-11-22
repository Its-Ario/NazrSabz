import { html } from 'lit';
import { globalStyles } from '../styles/global-styles.js';
import { saveAuthToken, removeAuthToken, getAuthToken } from '../utils/auth.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faMobile,
    faLock,
    faSun,
    faMoon,
    faUser,
    faEnvelope,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../components/base-component.js';
import { loginStyles } from '../styles/pages/login-page.js';

library.add(faMobile, faLock, faSun, faMoon, faUser, faEnvelope, faTimes);

class LoginPage extends BaseComponent {
    static styles = [globalStyles, loginStyles];

    static properties = {
        loading: { type: Boolean },
        error: { type: String },
        successMessage: { type: String },
        isRegistering: { type: Boolean },
        showTerms: { type: Boolean },
    };

    constructor() {
        super();
        this.loading = false;
        this.error = '';
        this.successMessage = '';
        this.isRegistering = false;
        this.showTerms = false;
    }

    render() {
        const moonIcon = this.renderIcon('moon');
        const sunIcon = this.renderIcon('sun');

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
                                          <span class="icon-wrapper"
                                              >${this.renderIcon('user')}</span
                                          >
                                      </div>
                                  </div>
                              `
                            : ''}

                        <div class="form-group">
                            <label>نام کاربری</label>
                            <div class="input-wrapper">
                                <input type="text" id="username" placeholder="user123" />
                                <span class="icon-wrapper">${this.renderIcon('user')}</span>
                            </div>
                        </div>

                        ${this.isRegistering
                            ? html`
                                  <div class="form-group">
                                      <label>ایمیل (اختیاری اگر شماره موبایل وارد شود)</label>
                                      <div class="input-wrapper">
                                          <input
                                              type="email"
                                              id="email"
                                              placeholder="email@example.com"
                                          />
                                          <span class="icon-wrapper"
                                              >${this.renderIcon('envelope')}</span
                                          >
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label>شماره موبایل (اختیاری اگر ایمیل وارد شود)</label>
                                      <div class="input-wrapper">
                                          <input
                                              type="tel"
                                              id="phoneNumber"
                                              placeholder="0912..."
                                          />
                                          <span class="icon-wrapper"
                                              >${this.renderIcon('mobile')}</span
                                          >
                                      </div>
                                  </div>
                              `
                            : ''}

                        <div class="form-group">
                            <label>رمز عبور</label>
                            <div class="input-wrapper">
                                <input type="password" id="password" placeholder="••••••••" />
                                <span class="icon-wrapper">${this.renderIcon('lock')}</span>
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
                    >
                        <img
                            class="g-icon"
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt=""
                        />
                        <span>ورود با گوگل</span>
                    </button>

                    <p class="footer-text">
                        با ورود یا ثبت‌نام، شما با
                        <a href="#" @click=${this.openTerms}>شرایط و قوانین</a>
                        ما موافقت می‌کنید.
                    </p>
                </div>

                ${this.showTerms
                    ? html`
                          <div class="modal-overlay" @click=${this.closeTerms}>
                              <div class="modal-container" @click=${(e) => e.stopPropagation()}>
                                  <div class="modal-header">
                                      <h3 class="modal-title">شرایط و قوانین</h3>
                                      <button class="close-icon-btn" @click=${this.closeTerms}>
                                          <span class="icon-wrapper" style="width:14px;height:14px;"
                                              >${this.renderIcon('times')}</span
                                          >
                                      </button>
                                  </div>
                                  <div class="modal-body">
                                      <p><strong>۱. تست</strong></p>
                                      <p>متن تست</p>
                                  </div>
                                  <div class="modal-footer">
                                      <button class="primary-btn" @click=${this.closeTerms}>
                                          متوجه شدم
                                      </button>
                                  </div>
                              </div>
                          </div>
                      `
                    : ''}
            </div>
        `;
    }

    openTerms(e) {
        e.preventDefault();
        this.showTerms = true;
    }

    closeTerms() {
        this.showTerms = false;
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

                if (!name || !username || !password)
                    throw new Error('لطفا تمام فیلدهای ضروری را پر کنید.');
                if (!email && !phoneNumber)
                    throw new Error('لطفا ایمیل یا شماره موبایل را وارد کنید.');

                const payload = { name, username, password, email, phoneNumber };

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
