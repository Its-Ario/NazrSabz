import { html } from 'lit';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faRightFromBracket,
    faStar,
    faRecycle,
    faSun,
    faMoon,
    faWallet,
    faArrowUp,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../../components/base-component';
import { removeAuthToken, getAuthToken } from '../../utils/auth';
import { dashboardStyles } from '../../styles/pages/user-dashboard';
import { globalStyles } from '../../styles/global-styles';

library.add(faRightFromBracket, faStar, faRecycle, faSun, faMoon, faWallet, faArrowUp, faPlus);

export class UserDashboard extends BaseComponent {
    static properties = {
        user: { type: Object },
        activeTab: { type: String },
        userProfile: { type: Object },
        loading: { type: Boolean },
        error: { type: String },
    };

    static styles = [globalStyles, dashboardStyles];

    constructor() {
        super();
        this.activeTab = 'all';
        this.loading = true;
        this.error = null;
        this.userProfile = null;
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

    async fetchDashboardData() {
        this.loading = true;
        this.error = null;

        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error('لطفا ابتدا وارد شوید');
            }

            const response = await fetch('/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'خطا در دریافت اطلاعات');
            }

            if (data.ok) {
                this.userProfile = {
                    name: data.result.user.name,
                    username: data.result.user.username,
                    email: data.result.user.email,
                    walletBalance: data.result.walletBalance || 0,
                    totalWeight: data.result.totalWeight || 0,
                    successfulRequests: data.result.successfulRequests || 0,
                    pendingRequests: data.result.pendingRequests || 0,
                    canceledRequests: data.result.canceledRequests || 0,
                    totalRequests: data.result.totalRequests || 0,
                    recentRequests: data.result.recentRequests || [],
                    breakdown: data.result.breakdown || {
                        plastic: 0,
                        paper: 0,
                        glass: 0,
                        metal: 0,
                    },
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtS8igzazX251rvvOMexnu8XeDZvgFSOX-7drIVKtMRpk5hT8uGx7R_uvDE-bvZbA-pyrbIKJeaobHFxd5Y05alN5URl_HKidh00hc_bOxIxe30elZNCZvvvrdN6XPuf3pFpI7D9qVzZaQYdkpKfUp9_uhkylXYLWcjeGGcrT3O79NgY6n82qY88fE9w6wgl7kGn2p0cYLss7ML6uMpIckqKjsBvM06ZwatPN_ELn-gxhasNuT9xpn7oNW4RkDd29eRTZgl2sIUig',
                };
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }

    render() {
        const bracketIcon = icon({ prefix: 'fa', iconName: 'right-from-bracket' }).node[0];
        const starIcon = icon({ prefix: 'fas', iconName: 'star' }).node[0];
        const recycleIcon = icon({ prefix: 'fas', iconName: 'recycle' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];
        const walletIcon = icon({ prefix: 'fas', iconName: 'wallet' }).node[0];
        const arrowUpIcon = icon({ prefix: 'fas', iconName: 'arrow-up' }).node[0];
        const plusIcon = icon({ prefix: 'fas', iconName: 'plus' }).node[0];

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

                ${this.loading
                    ? html`
                          <div class="loading-container">
                              <div class="loading-spinner"></div>
                              <p class="loading-text">در حال بارگذاری...</p>
                          </div>
                      `
                    : this.error
                      ? html`
                            <div class="error-container">
                                <p class="error-message">${this.error}</p>
                                <button class="retry-button" @click="${this.fetchDashboardData}">
                                    تلاش مجدد
                                </button>
                            </div>
                        `
                      : this.userProfile
                        ? html`
                              <main>
                                  <div class="profile-header">
                                      <div class="profile-content">
                                          <div
                                              class="profile-image"
                                              style="background-image: url('${this.userProfile
                                                  .image}')"
                                          ></div>
                                          <div class="profile-info">
                                              <h2>${this.userProfile.name}</h2>
                                              <p>${this.userProfile.username}@</p>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="wallet-section">
                                      <div class="wallet-card">
                                          <div class="wallet-header">
                                              <span class="wallet-label">موجودی کیف پول</span>
                                              <div class="wallet-icon">
                                                  <span class="icon-wrapper">${walletIcon}</span>
                                              </div>
                                          </div>
                                          <div>
                                              <div class="wallet-balance">
                                                  ${this.userProfile.walletBalance.toLocaleString(
                                                      'fa-IR'
                                                  )}
                                              </div>
                                              <div class="wallet-currency">تومان</div>
                                          </div>
                                          <div class="wallet-actions">
                                              <button
                                                  class="wallet-btn"
                                                  @click="${this._onDeposit}"
                                              >
                                                  <span class="icon-wrapper">${plusIcon}</span>
                                                  <span>افزایش موجودی</span>
                                              </button>
                                              <button
                                                  class="wallet-btn"
                                                  @click="${this._onWithdraw}"
                                              >
                                                  <span class="icon-wrapper">${arrowUpIcon}</span>
                                                  <span>برداشت</span>
                                              </button>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="stats-grid">
                                      <div class="stat-card">
                                          <p class="stat-label">مجموع وزن</p>
                                          <p class="stat-value">
                                              ${this.userProfile.totalWeight} کیلوگرم
                                          </p>
                                      </div>
                                      <div class="stat-card">
                                          <p class="stat-label">درخواست موفق</p>
                                          <p class="stat-value">
                                              ${this.userProfile.successfulRequests}
                                          </p>
                                      </div>
                                      <div class="stat-card">
                                          <p class="stat-label">در انتظار</p>
                                          <p class="stat-value">
                                              ${this.userProfile.pendingRequests}
                                          </p>
                                      </div>
                                      <div class="stat-card">
                                          <p class="stat-label">کل درخواست‌ها</p>
                                          <p class="stat-value">
                                              ${this.userProfile.totalRequests}
                                          </p>
                                      </div>
                                      <div class="stat-card full-width">
                                          <p class="stat-label">تفکیک بازیافت</p>
                                          <div class="stat-breakdown">
                                              <span
                                                  >پلاستیک: ${this.userProfile.breakdown.plastic}
                                                  کیلوگرم</span
                                              >
                                              <span
                                                  >کاغذ: ${this.userProfile.breakdown.paper}
                                                  کیلوگرم</span
                                              >
                                              <span
                                                  >شیشه: ${this.userProfile.breakdown.glass}
                                                  کیلوگرم</span
                                              >
                                              <span
                                                  >فلز: ${this.userProfile.breakdown.metal}
                                                  کیلوگرم</span
                                              >
                                          </div>
                                      </div>
                                  </div>

                                  ${this.userProfile.recentRequests &&
                                  this.userProfile.recentRequests.length > 0
                                      ? html`
                                            <div class="recent-requests-section">
                                                <div class="section-header-with-action">
                                                    <h2 class="section-header">درخواست‌های اخیر</h2>
                                                    <button
                                                        class="view-all-btn"
                                                        @click="${this._onViewAllRequests}"
                                                    >
                                                        مشاهده همه
                                                    </button>
                                                </div>
                                                <div class="requests-list">
                                                    ${this.userProfile.recentRequests.map(
                                                        (request) => html`
                                                            <div class="request-card">
                                                                <div class="request-header">
                                                                    <span class="request-id"
                                                                        >#${request.id.slice(
                                                                            -8
                                                                        )}</span
                                                                    >
                                                                    <span
                                                                        class="request-status status-${request.status.toLowerCase()}"
                                                                    >
                                                                        ${this._getStatusText(
                                                                            request.status
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div class="request-info">
                                                                    <p class="request-date">
                                                                        ${this._formatDate(
                                                                            request.createdAt
                                                                        )}
                                                                    </p>
                                                                    <p class="request-items">
                                                                        ${this._getRequestItemsSummary(
                                                                            request.items
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        `
                                                    )}
                                                </div>
                                            </div>
                                        `
                                      : ''}

                                  <h2 class="section-header">جوایز و تخفیف‌ها</h2>

                                  <div class="filter-tabs">
                                      <div class="tabs-container">
                                          <button
                                              class="tab-button ${this.activeTab === 'all'
                                                  ? 'active'
                                                  : ''}"
                                              @click="${() => this.setActiveTab('all')}"
                                          >
                                              همه
                                          </button>
                                          <button
                                              class="tab-button ${this.activeTab === 'discounts'
                                                  ? 'active'
                                                  : ''}"
                                              @click="${() => this.setActiveTab('discounts')}"
                                          >
                                              تخفیف‌ها
                                          </button>
                                          <button
                                              class="tab-button ${this.activeTab === 'free'
                                                  ? 'active'
                                                  : ''}"
                                              @click="${() => this.setActiveTab('free')}"
                                          >
                                              کالای رایگان
                                          </button>
                                      </div>
                                  </div>

                                  <div class="rewards-list">
                                      ${this.rewards.map(
                                          (reward) => html`
                                              <div
                                                  class="reward-card"
                                                  @click="${() => this._onRewardClick(reward)}"
                                              >
                                                  <div class="reward-icon">
                                                      <img
                                                          src="${reward.icon}"
                                                          alt="${reward.title}"
                                                      />
                                                  </div>
                                                  <div class="reward-info">
                                                      <p class="reward-title">${reward.title}</p>
                                                      <p class="reward-subtitle">
                                                          ${reward.subtitle}
                                                      </p>
                                                  </div>
                                                  <div class="reward-points">
                                                      <span class="reward-points-value"
                                                          >${reward.points}</span
                                                      >
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
                          `
                        : ''}
            </div>
        `;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.fetchDashboardData();
    }

    _onRewardClick(reward) {
        console.log('Reward clicked:', reward);
    }

    _onDeposit() {
        console.log('Deposit clicked');
        // TODO: Implement deposit modal/page
    }

    _onWithdraw() {
        console.log('Withdraw clicked');
        // TODO: Implement withdraw modal/page
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

    _getStatusText(status) {
        const statusMap = {
            PENDING: 'در انتظار',
            COMPLETED: 'تکمیل شده',
            CANCELED: 'لغو شده',
        };
        return statusMap[status] || status;
    }

    _formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fa-IR', options);
    }

    _getRequestItemsSummary(items) {
        if (!items || typeof items !== 'object') return 'اطلاعاتی موجود نیست';

        const itemsArray = Array.isArray(items) ? items : Object.values(items);
        const summary = itemsArray
            .map((item) => {
                if (item && item.type && item.weight) {
                    const typeNames = {
                        plastic: 'پلاستیک',
                        paper: 'کاغذ',
                        glass: 'شیشه',
                        metal: 'فلز',
                    };
                    return `${typeNames[item.type] || item.type}: ${item.weight} کیلوگرم`;
                }
                return null;
            })
            .filter(Boolean)
            .join(' • ');

        return summary || 'اطلاعاتی موجود نیست';
    }

    _onViewAllRequests() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/requests' },
                bubbles: true,
                composed: true,
            })
        );
    }
}

customElements.define('user-dashboard', UserDashboard);
