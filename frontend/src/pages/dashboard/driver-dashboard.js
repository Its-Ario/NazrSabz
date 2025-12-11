import { html } from 'lit';
import { BaseComponent } from '../../components/base-component';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faRightFromBracket,
    faMapMarkedAlt,
    faChartLine,
    faHistory,
    faUserCircle,
    faCheckCircle,
    faWeightHanging,
    faSun,
    faMoon,
    faTruck,
    faStar,
    faRoute,
    faBoxOpen,
    faMapMarkerAlt,
    faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
import { removeAuthToken } from '../../utils/auth';
import { driverDashboardStyles } from '../../styles/pages/driver-dashboard';
import { globalStyles } from '../../styles/global-styles';

library.add(
    faRightFromBracket,
    faMapMarkedAlt,
    faChartLine,
    faHistory,
    faUserCircle,
    faCheckCircle,
    faWeightHanging,
    faSun,
    faMoon,
    faTruck,
    faStar,
    faRoute,
    faBoxOpen,
    faMapMarkerAlt,
    faToggleOn
);

export class DriverDashboard extends BaseComponent {
    static properties = {
        activeTab: { type: String },
        isOnline: { type: Boolean },
        requests: { type: Array },
        acceptedRoutes: { type: Array },
        stats: { type: Object },
        driverProfile: { type: Object },
        loading: { type: Boolean },
        error: { type: String },
    };

    static styles = [globalStyles, driverDashboardStyles];

    constructor() {
        super();
        this.activeTab = 'requests';
        this.isOnline = false;
        this.loading = true;
        this.error = null;
        this.requests = [];
        this.acceptedRoutes = [];
        this.stats = {};
        this.driverProfile = null;
    }

    _renderIcon(name) {
        return icon({ prefix: 'fas', iconName: name }).node[0];
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.fetchDashboardData();
    }

    async fetchDashboardData() {
        this.loading = true;
        this.error = null;

        try {
            await new Promise((r) => setTimeout(r, 1000));

            this.driverProfile = {
                name: 'رضا احمدی',
                vehicle: 'کامیونت ایسوزو',
                rating: 4.8,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtS8igzazX251rvvOMexnu8XeDZvgFSOX-7drIVKtMRpk5hT8uGx7R_uvDE-bvZbA-pyrbIKJeaobHFxd5Y05alN5URl_HKidh00hc_bOxIxe30elZNCZvvvrdN6XPuf3pFpI7D9qVzZaQYdkpKfUp9_uhkylXYLWcjeGGcrT3O79NgY6n82qY88fE9w6wgl7kGn2p0cYLss7ML6uMpIckqKjsBvM06ZwatPN_ELn-gxhasNuT9xpn7oNW4RkDd29eRTZgl2sIUig',
            };

            this.stats = {
                todayCount: 12,
                weekWeight: 450,
                totalCount: 1280,
                distance: 45,
            };

            this.requests = [
                {
                    id: 1,
                    type: 'plastic',
                    title: 'ضایعات پلاستیک و پت',
                    address: 'تهران، سعادت‌آباد، خیابان سرو غربی',
                    dist: '2.5 km',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChkXjuwu00dJ3DJRI_4qfMc1Jf4xBAFLs6GAlzurrrmHY1FdsUn8EaF75oGl2SaNIDb-WshN_AeYk-fsTOQVHM0rA3tGLh7FS7S1q9tqdrDooJq_x5HuFdDUTMNtjBxtXlhvhGu2qya6TDXgbz8unWqUg2MRuW7lnLK53SyIuRlDN4c26H26h04bXBxDHsKriEoJrzaoXBd6J8uFSf6zWIrFl9B2YSrP0TCOD2rkDZiezt1iysGNn5oAbboA7SvFjlx1mFwDPZGI4',
                },
                {
                    id: 2,
                    type: 'metal',
                    title: 'آهن‌آلات و ضایعات ساختمانی',
                    address: 'تهران، آزادی، بلوار استاد معین',
                    dist: '4.1 km',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4j7X2-p--UNwe3SbTLRgtKAPKLvOHmipUrlVI7wPAP4JdJQOlHK0M3RNewhp1zBV9ZgcdCbLzQl9-3_tm-_F8mOUrEqNKmOFyDgdJRa26c1cFgR2bmkzYCwHqWa8br7JCpffbGN0S7_dZeHXm0VeP551f2lUHzaqNjsuzeB7HdYVbrDIDvvGle5fx16ygHvzOcgim35TPcdr9mTS0u_sHBuNmSSrL65HU9mQqc6_jnRPJHlBa-CJ13x610rnJNA0dXLrP7XQL4Y',
                },
                {
                    id: 3,
                    type: 'paper',
                    title: 'کاغذ و مقوای باطله',
                    address: 'تهران، ونک، خیابان ملاصدرا',
                    dist: '1.8 km',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChkXjuwu00dJ3DJRI_4qfMc1Jf4xBAFLs6GAlzurrrmHY1FdsUn8EaF75oGl2SaNIDb-WshN_AeYk-fsTOQVHM0rA3tGLh7FS7S1q9tqdrDooJq_x5HuFdDUTMNtjBxtXlhvhGu2qya6TDXgbz8unWqUg2MRuW7lnLK53SyIuRlDN4c26H26h04bXBxDHsKriEoJrzaoXBd6J8uFSf6zWIrFl9B2YSrP0TCOD2rkDZiezt1iysGNn5oAbboA7SvFjlx1mFwDPZGI4',
                },
            ];
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            this.error = error.message || 'خطا در بارگذاری اطلاعات';
        } finally {
            this.loading = false;
        }
    }

    toggleShift(e) {
        this.isOnline = e.target.checked;
    }

    changeTab(tab) {
        this.activeTab = tab;
    }

    acceptRequest(req) {
        this.requests = this.requests.filter((r) => r.id !== req.id);
        this.acceptedRoutes = [...this.acceptedRoutes, { ...req, status: 'accepted' }];
    }

    rejectRequest(req) {
        this.requests = this.requests.filter((r) => r.id !== req.id);
    }

    completeRoute(req) {
        this.acceptedRoutes = this.acceptedRoutes.filter((r) => r.id !== req.id);
    }

    render() {
        return html`
            <div class="container">
                <div class="top-bar">
                    <button
                        class="icon-btn"
                        @click="${this._onLogout}"
                        aria-label="خروج از حساب کاربری"
                    >
                        <span class="icon-wrapper">${this._renderIcon('right-from-bracket')}</span>
                    </button>
                    <h1>پنل رانندگان</h1>
                    <button
                        class="icon-btn"
                        @click="${this.toggleTheme}"
                        aria-label="${this.darkMode ? 'حالت روز' : 'حالت شب'}"
                    >
                        <span class="icon-wrapper">
                            ${this.darkMode ? this._renderIcon('sun') : this._renderIcon('moon')}
                        </span>
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
                      : html`
                            <div class="sidebar-section">
                                <div class="status-header">
                                    <div class="driver-card">
                                        <div
                                            class="driver-img"
                                            style="background-image: url('${this.driverProfile
                                                .image}')"
                                            role="img"
                                            aria-label="${this.driverProfile.name}"
                                        ></div>
                                        <div class="driver-info">
                                            <h2>${this.driverProfile.name}</h2>
                                            <div class="driver-meta">
                                                <span>${this.driverProfile.vehicle}</span>
                                                <div class="rating-badge">
                                                    <span class="icon-wrapper"
                                                        >${this._renderIcon('star')}</span
                                                    >
                                                    <span>${this.driverProfile.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="shift-toggle">
                                        <div class="shift-info">
                                            <div class="shift-label">وضعیت شیفت کاری</div>
                                            <div class="shift-sub">
                                                ${this.isOnline
                                                    ? 'شما آنلاین هستید و درخواست دریافت می‌کنید'
                                                    : 'آفلاین - درخواستی ارسال نمی‌شود'}
                                            </div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input
                                                type="checkbox"
                                                ?checked=${this.isOnline}
                                                @change=${this.toggleShift}
                                                aria-label="تغییر وضعیت شیفت کاری"
                                            />
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div class="stats-section">
                                    <h3 class="section-title">آمار امروز</h3>
                                    <div class="stats-grid">
                                        <div class="stat-box">
                                            <span class="stat-val"
                                                >${this.stats.todayCount || 0}</span
                                            >
                                            <span class="stat-lbl">جمع‌آوری</span>
                                        </div>
                                        <div class="stat-box">
                                            <span class="stat-val"
                                                >${this.stats.weekWeight || 0} kg</span
                                            >
                                            <span class="stat-lbl">وزن هفته</span>
                                        </div>
                                        <div class="stat-box">
                                            <span class="stat-val"
                                                >${this.stats.distance || 0} km</span
                                            >
                                            <span class="stat-lbl">مسافت</span>
                                        </div>
                                        <div class="stat-box">
                                            <span class="stat-val"
                                                >${this.stats.totalCount || 0}</span
                                            >
                                            <span class="stat-lbl">کل سفارشات</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="main-content">
                                <div class="tabs-container">
                                    <div class="tabs-bg" role="tablist">
                                        <button
                                            class="tab-btn ${this.activeTab === 'requests'
                                                ? 'active'
                                                : ''}"
                                            @click="${() => this.changeTab('requests')}"
                                            role="tab"
                                            aria-selected="${this.activeTab === 'requests'}"
                                        >
                                            درخواست‌های جدید
                                            ${this.requests.length > 0
                                                ? `(${this.requests.length})`
                                                : ''}
                                        </button>
                                        <button
                                            class="tab-btn ${this.activeTab === 'routes'
                                                ? 'active'
                                                : ''}"
                                            @click="${() => this.changeTab('routes')}"
                                            role="tab"
                                            aria-selected="${this.activeTab === 'routes'}"
                                        >
                                            مسیرهای من
                                            ${this.acceptedRoutes.length > 0
                                                ? `(${this.acceptedRoutes.length})`
                                                : ''}
                                        </button>
                                    </div>
                                </div>

                                <div class="list-area" role="tabpanel">
                                    ${this._renderListContent()}
                                </div>
                            </div>
                        `}

                <nav class="bottom-nav" aria-label="منوی اصلی">
                    <button class="nav-item active" aria-label="کارتابل">
                        <span class="icon-wrapper">${this._renderIcon('truck')}</span>
                        <span>کارتابل</span>
                    </button>
                    <button class="nav-item" aria-label="نقشه">
                        <span class="icon-wrapper">${this._renderIcon('map-marked-alt')}</span>
                        <span>نقشه</span>
                    </button>
                    <button class="nav-item" aria-label="تاریخچه">
                        <span class="icon-wrapper">${this._renderIcon('history')}</span>
                        <span>تاریخچه</span>
                    </button>
                    <button class="nav-item" aria-label="پروفایل">
                        <span class="icon-wrapper">${this._renderIcon('user-circle')}</span>
                        <span>پروفایل</span>
                    </button>
                </nav>
            </div>
        `;
    }

    _renderListContent() {
        const list = this.activeTab === 'requests' ? this.requests : this.acceptedRoutes;
        const isRequests = this.activeTab === 'requests';

        if (list.length === 0) {
            return html`
                <div class="empty-state">
                    <div class="empty-icon">
                        <span class="icon-wrapper">${this._renderIcon('box-open')}</span>
                    </div>
                    <p>
                        ${isRequests
                            ? 'درخواست جدیدی وجود ندارد. به محض ثبت درخواست در منطقه شما، اینجا نمایش داده می‌شود.'
                            : 'مسیری انتخاب نکرده‌اید. از تب درخواست‌های جدید، سفارشات را قبول کنید.'}
                    </p>
                </div>
            `;
        }

        return list.map(
            (req) => html`
                <article class="req-card">
                    <div class="req-header">
                        <span class="req-type-badge type-${req.type}"
                            >${this._getMaterialName(req.type)}</span
                        >
                        <span class="req-dist">
                            <span class="icon-wrapper">${this._renderIcon('map-marker-alt')}</span>
                            ${req.dist}
                        </span>
                    </div>
                    <div class="req-body">
                        <img class="req-img" src="${req.image}" alt="${req.title}" loading="lazy" />
                        <div class="req-details">
                            <h3>${req.title}</h3>
                            <p>${req.address}</p>
                        </div>
                    </div>
                    <div class="req-actions">
                        ${isRequests
                            ? html`
                                  <button
                                      class="btn btn-primary"
                                      @click="${() => this.acceptRequest(req)}"
                                  >
                                      <span class="icon-wrapper"
                                          >${this._renderIcon('check-circle')}</span
                                      >
                                      <span>قبول درخواست</span>
                                  </button>
                                  <button
                                      class="btn btn-outline"
                                      @click="${() => this.rejectRequest(req)}"
                                  >
                                      رد کردن
                                  </button>
                              `
                            : html`
                                  <button class="btn btn-primary">
                                      <span class="icon-wrapper">${this._renderIcon('route')}</span>
                                      <span>مسیریابی</span>
                                  </button>
                                  <button
                                      class="btn btn-outline"
                                      @click="${() => this.completeRoute(req)}"
                                  >
                                      تکمیل
                                  </button>
                              `}
                    </div>
                </article>
            `
        );
    }

    _getMaterialName(type) {
        const map = {
            plastic: 'پلاستیک',
            metal: 'فلزات',
            paper: 'کاغذ',
            glass: 'شیشه',
        };
        return map[type] || type;
    }

    _onLogout() {
        removeAuthToken();
        this.dispatchEvent(
            new CustomEvent('navigate', { detail: { to: '/' }, bubbles: true, composed: true })
        );
    }
}

customElements.define('driver-dashboard', DriverDashboard);
