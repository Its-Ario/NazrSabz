import { LitElement, css, html } from 'lit';
import { globalStyles } from '../styles/global-styles.js';

import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMobile, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(faMobile, faLock);
class LoginPage extends LitElement {
    static styles = [
        globalStyles,
        css`
            .auth-page {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                align-items: center;
                justify-content: center;
                background-color: #f8fafc;
            }

            .auth-container {
                width: 100%;
                max-width: 400px;
                background-color: transparent;
                padding: 1rem;
            }

            .auth-image {
                display: flex;
                justify-content: center;
                padding-bottom: 1.5rem;
            }

            .auth-image img {
                width: 96px;
                height: 96px;
                object-fit: contain;
            }

            .auth-title {
                font-size: 28px;
                font-weight: 700;
                text-align: center;
                margin-bottom: 0.5rem;
                color: #1e293b;
            }

            .auth-subtitle {
                text-align: center;
                color: #64748b;
                font-size: 16px;
                margin-bottom: 1.5rem;
            }

            .toggle-container {
                display: flex;
                background-color: rgba(0, 0, 0, 0.05);
                border-radius: 9999px;
                height: 48px;
                padding: 4px;
                margin-bottom: 1rem;
            }

            .toggle-option {
                flex: 1;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 9999px;
                cursor: pointer;
                font-size: 14px;
                color: #6b7280;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            .toggle-option input {
                display: none;
            }

            .toggle-option input:checked + span {
                background-color: #fff;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                color: #0f172a;
                padding: 0.25rem 1rem;
                border-radius: 9999px;
            }

            .form-group {
                margin-bottom: 1rem;
            }

            .form-group label {
                font-size: 14px;
                color: #334155;
                font-weight: 500;
                margin-bottom: 0.5rem;
                display: block;
            }

            .input-wrapper {
                position: relative;
            }

            .input-wrapper input {
                width: 100%;
                height: 56px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 0 3rem 0 1rem;
                font-size: 16px;
                color: #1e293b;
                background-color: #fff;
                outline: none;
                transition:
                    border-color 0.2s,
                    box-shadow 0.2s;
            }

            .input-wrapper input:focus {
                border-color: #22c55e;
                box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
            }

            .input-wrapper span {
                position: absolute;
                right: 1rem;
                color: #9ca3af;
                top: 50%;
                transform: translateY(-50%);
            }

            .forgot-password {
                text-align: left;
                margin-top: -0.5rem;
            }

            .forgot-password a {
                font-size: 14px;
                color: #16a34a;
                text-decoration: none;
            }

            .forgot-password a:hover {
                text-decoration: underline;
            }

            .primary-btn {
                width: 100%;
                height: 56px;
                background-color: #22c55e;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                border: none;
                border-radius: 8px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 1rem;
            }

            .primary-btn:hover {
                background-color: #16a34a;
            }

            .divider {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 1.5rem 0;
            }

            .divider hr {
                flex-grow: 1;
                border: none;
                border-top: 1px solid #d1d5db;
            }

            .divider p {
                font-size: 14px;
                color: #6b7280;
            }

            .google-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
                width: 100%;
                height: 56px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                background-color: #fff;
                color: #1e293b;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .google-btn:hover {
                background-color: #f9fafb;
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
            }

            .footer-text a {
                color: #16a34a;
                font-weight: 500;
                text-decoration: none;
            }

            .footer-text a:hover {
                text-decoration: underline;
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
        const phoneIcon = icon({ prefix: 'fas', iconName: 'mobile' }).node[0];
        const lockIcon = icon({ prefix: 'fas', iconName: 'lock' }).node[0];

        return html`
            <div class="auth-page">
                <div class="auth-container">
                    <!-- Headline -->
                    <h1 class="auth-title">به <strong>نذر سبز</strong> خوش آمدید!</h1>
                    <p class="auth-subtitle">
                        برای مشارکت در بازیافت، وارد شوید یا حساب کاربری جدید بسازید.
                    </p>

                    <!-- Toggle Buttons -->
                    <div class="toggle-container">
                        <label class="toggle-option">
                            <input type="radio" name="auth-toggle" value="ورود" checked />
                            <span>ورود</span>
                        </label>
                        <label class="toggle-option">
                            <input type="radio" name="auth-toggle" value="ثبت‌نام" />
                            <span>ثبت‌نام</span>
                        </label>
                    </div>

                    <!-- Form Fields -->
                    <form class="auth-form" @submit=${this.handleSubmit}>
                        <div class="form-group">
                            <label>نام کاربری</label>
                            <div class="input-wrapper">
                                <input type="text" placeholder="test" id="username" />
                                <span class="icon-wrapper">${phoneIcon}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>رمز عبور</label>
                            <div class="input-wrapper">
                                <input type="password" id="password" placeholder="••••••••" />
                                <span class="icon-wrapper">${lockIcon}</span>
                            </div>
                        </div>

                        <div class="forgot-password">
                            <a href="#">فراموشی رمز عبور؟</a>
                        </div>

                        <button type="submit" class="primary-btn">ورود به حساب کاربری</button>
                    </form>

                    <!-- Social login -->
                    <div class="divider">
                        <hr />
                        <p>یا ورود از طریق</p>
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

        async handleSubmit(e) {
            e.preventDefault();
            this.loading = true;
            this.error = '';
    
            const username = this.renderRoot.querySelector('#username')?.value.trim();
            const password = this.renderRoot.querySelector('#password')?.value.trim();

            console.log(username)
            console.log(password)
    
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
    
                if (!res.ok) throw new Error('Invalid username or password');
    
                const data = await res.json();
    
                if (data.token) saveAuthToken(data.token);
    
                this.dispatchEvent(
                    new CustomEvent('login-success', {
                        detail: { user: data.user },
                        bubbles: true,
                        composed: true,
                    })
                );
            } catch (err) {
                this.error = err.message;
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
}
customElements.define('login-page', LoginPage);
