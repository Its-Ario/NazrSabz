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
import { DriverService } from '../../services/driver-service';

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
            const profileData = await DriverService.getProfile();

            this.driverProfile = {
                name: profileData.result.user.name,
                vehicle: profileData.result.vehicle.model,
                rating: profileData.result.rating,
                image: profileData.result.user.avatar || 'default-avatar-url',
            };

            this.stats = profileData.result.stats;
            this.isOnline = profileData.result.status === 'ONLINE';

            this._getCurrentLocation();
        } catch (error) {
            console.error('Dashboard load failed:', error);
            this.error = 'خطا در بارگذاری اطلاعات';
            this.loading = false;
        }
    }

    _getCurrentLocation() {
        if (!navigator.geolocation) {
            this.error = 'مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند';
            this.loading = false;
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const data = await DriverService.getNearbyRequests(latitude, longitude);

                    this.requests = data.result.nearby.map((req) => ({
                        id: req.id,
                        type: req.type,
                        title: req.title,
                        address: req.address,
                        dist: req.dist,
                        image: req.image || 'https://via.placeholder.com/150',
                    }));

                    this.acceptedRoutes = data.activeRoutes || [];
                } catch (err) {
                    console.error(err);
                } finally {
                    this.loading = false;
                }
            },
            async (err) => {
                console.error('GPS Error', err);
                const defaultLat = 35.6892;
                const defaultLng = 51.389;

                await this._fetchNearbyWithCoords(defaultLat, defaultLng);
            }
        );
    }

    async _fetchNearbyWithCoords(lat, lng) {
        try {
            const data = await DriverService.getNearbyRequests(lat, lng);

            this.requests = data.nearby.map((req) => ({
                id: req.id,
                type: req.type,
                title: req.title,
                address: req.address,
                dist: req.dist,
                image: req.image || 'https://via.placeholder.com/150',
            }));

            this.acceptedRoutes = data.activeRoutes || [];
        } catch (err) {
            console.error(err);
            this.error = 'خطا در ارتباط با سرور';
        } finally {
            this.loading = false;
        }
    }

    async toggleShift(e) {
        const newStatus = e.target.checked;
        this.isOnline = newStatus;

        try {
            await DriverService.toggleStatus(newStatus);
        } catch {
            this.isOnline = !newStatus;
            alert('خطا در تغییر وضعیت شیفت');
        }
    }

    async acceptRequest(req) {
        try {
            await DriverService.acceptRequest(req.id);

            this.requests = this.requests.filter((r) => r.id !== req.id);

            this.acceptedRoutes = [...this.acceptedRoutes, { ...req, status: 'accepted' }];

            this.activeTab = 'routes';
        } catch {
            alert('متاسفانه این درخواست توسط راننده دیگری پذیرفته شد.');
            this._getCurrentLocation();
        }
    }

    changeTab(tab) {
        this.activeTab = tab;
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
