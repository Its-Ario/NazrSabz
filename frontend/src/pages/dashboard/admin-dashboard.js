import { html } from 'lit';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faRightFromBracket,
    faSun,
    faMoon,
    faChartPie,
    faDownload,
    faUsers,
    faTruck,
    faClipboardList,
    faMoneyBillWave,
    faBell,
    faMapMarkedAlt,
    faUserPlus,
    faCheckCircle,
    faSearch,
    faCog,
    faChartLine,
    faUserShield,
    faReceipt,
    faBan,
    faArrowUp,
    faArrowDown,
    faBox,
    faCoins,
    faClock,
    faBars,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../../components/base-component';
import { removeAuthToken, getAuthToken } from '../../utils/auth';
import { adminDashboardStyles } from '../../styles/pages/admin-dashboard';
import { globalStyles } from '../../styles/global-styles';
import Chart from 'chart.js/auto';

library.add(
    faRightFromBracket,
    faSun,
    faMoon,
    faChartPie,
    faDownload,
    faUsers,
    faTruck,
    faClipboardList,
    faMoneyBillWave,
    faBell,
    faMapMarkedAlt,
    faUserPlus,
    faCheckCircle,
    faSearch,
    faCog,
    faChartLine,
    faUserShield,
    faReceipt,
    faBan,
    faArrowUp,
    faArrowDown,
    faBox,
    faCoins,
    faClock,
    faBars,
    faTimes
);

export class AdminDashboard extends BaseComponent {
    static properties = {
        admin: { type: Object },
        stats: { type: Object },
        activities: { type: Array },
        loading: { type: Boolean },
        error: { type: String },
        activeFilter: { type: String },
        searchQuery: { type: String },
        systemHealth: { type: Object },
        recentTransactions: { type: Array },
        chartData: { type: Object },
        sidebarOpen: { type: Boolean },
    };

    static styles = [globalStyles, adminDashboardStyles];

    constructor() {
        super();
        this.loading = true;
        this.error = null;
        this.stats = null;
        this.activities = [];
        this.activeFilter = 'all';
        this.searchQuery = '';
        this.systemHealth = null;
        this.recentTransactions = [];
        this.chartData = null;
        this.charts = {};
        this.sidebarOpen = false;
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    closeSidebar() {
        this.sidebarOpen = false;
    }

    async fetchDashboardData() {
        this.loading = true;
        this.error = null;
        try {
            const token = getAuthToken();
            if (!token) throw new Error('لطفا ابتدا وارد شوید');

            await new Promise((r) => setTimeout(r, 800));

            this.stats = {
                totalWeight: 12450,
                activeUsers: 1280,
                activeDrivers: 42,
                pendingRequests: 15,
                todaysPayout: '2,500,000',
                totalRevenue: '125,000,000',
                monthlyGrowth: 12.5,
                completedToday: 48,
                avgResponseTime: '8 دقیقه',
                completedRequests: 856,
                canceledRequests: 23,
            };

            this.systemHealth = {
                status: 'operational',
                uptime: '99.9%',
                activeConnections: 342,
                serverLoad: 45,
                lastBackup: '2 ساعت پیش',
            };

            this.chartData = {
                weeklyRequests: [
                    { day: 'شنبه', value: 45 },
                    { day: 'یکشنبه', value: 52 },
                    { day: 'دوشنبه', value: 48 },
                    { day: 'سه‌شنبه', value: 61 },
                    { day: 'چهارشنبه', value: 55 },
                    { day: 'پنجشنبه', value: 58 },
                    { day: 'جمعه', value: 38 },
                ],
                recyclingBreakdown: {
                    plastic: 3500,
                    paper: 4200,
                    glass: 2100,
                    metal: 2650,
                },
                requestStatus: {
                    completed: 856,
                    pending: 15,
                    canceled: 23,
                },
                monthlyRevenue: [
                    { month: 'فروردین', value: 95 },
                    { month: 'اردیبهشت', value: 102 },
                    { month: 'خرداد', value: 98 },
                    { month: 'تیر', value: 108 },
                    { month: 'مرداد', value: 115 },
                    { month: 'شهریور', value: 125 },
                ],
            };

            this.activities = [
                {
                    id: 1,
                    title: 'راننده علی حسینی',
                    subtitle: 'درخواست #8821 را تکمیل کرد',
                    type: 'success',
                    icon: 'check-circle',
                    time: '2 دقیقه پیش',
                },
                {
                    id: 2,
                    title: 'کاربر جدید: مریم احمدی',
                    subtitle: 'ثبت‌نام در سیستم',
                    type: 'blue',
                    icon: 'user-plus',
                    time: '15 دقیقه پیش',
                },
                {
                    id: 3,
                    title: 'درخواست برداشت',
                    subtitle: 'منطقه 4 - نیاز به تخصیص راننده',
                    type: 'orange',
                    icon: 'clipboard-list',
                    time: '1 ساعت پیش',
                },
                {
                    id: 4,
                    title: 'راننده رضا محمدی',
                    subtitle: 'شروع شیفت کاری',
                    type: 'blue',
                    icon: 'truck',
                    time: '2 ساعت پیش',
                },
                {
                    id: 5,
                    title: 'برداشت موجودی',
                    subtitle: 'کاربر سارا کریمی - 500,000 تومان',
                    type: 'blue',
                    icon: 'money-bill-wave',
                    time: '3 ساعت پیش',
                },
                {
                    id: 6,
                    title: 'لغو درخواست',
                    subtitle: 'درخواست #8815 توسط کاربر لغو شد',
                    type: 'error',
                    icon: 'ban',
                    time: '4 ساعت پیش',
                },
            ];

            this.recentTransactions = [
                {
                    id: 1,
                    type: 'payout',
                    user: 'علی حسینی',
                    amount: '250,000',
                    status: 'completed',
                    date: '1403/09/15',
                },
                {
                    id: 2,
                    type: 'deposit',
                    user: 'مریم احمدی',
                    amount: '100,000',
                    status: 'completed',
                    date: '1403/09/15',
                },
                {
                    id: 3,
                    type: 'payout',
                    user: 'رضا محمدی',
                    amount: '180,000',
                    status: 'pending',
                    date: '1403/09/15',
                },
                {
                    id: 4,
                    type: 'deposit',
                    user: 'سارا کریمی',
                    amount: '75,000',
                    status: 'completed',
                    date: '1403/09/14',
                },
            ];
        } catch (error) {
            console.error('Failed to load admin data:', error);
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }

    setActiveFilter(filter) {
        this.activeFilter = filter;
    }

    handleSearch(e) {
        this.searchQuery = e.target.value;
    }

    get filteredActivities() {
        let filtered = this.activities;

        if (this.activeFilter !== 'all') {
            filtered = filtered.filter((activity) => activity.type === this.activeFilter);
        }

        if (this.searchQuery) {
            filtered = filtered.filter(
                (activity) =>
                    activity.title.includes(this.searchQuery) ||
                    activity.subtitle.includes(this.searchQuery)
            );
        }

        return filtered;
    }

    getChartColors() {
        const isDark = this.darkMode;
        return {
            gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            textColor: isDark ? '#8a8a8a' : '#7a8a7a',
            backgroundColor: isDark ? '#1a1f2e' : '#ffffff',
            fontFamily: 'Shabnam FD, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
        };
    }

    initLineChart() {
        const canvas = this.shadowRoot.getElementById('lineChart');
        if (!canvas) return;

        if (this.charts.lineChart) {
            this.charts.lineChart.destroy();
        }

        const colors = this.getChartColors();
        const ctx = canvas.getContext('2d');

        this.charts.lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.chartData.weeklyRequests.map((d) => d.day),
                datasets: [
                    {
                        label: 'درخواست‌ها',
                        data: this.chartData.weeklyRequests.map((d) => d.value),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: colors.backgroundColor,
                        titleColor: colors.textColor,
                        bodyColor: colors.textColor,
                        borderColor: colors.gridColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        titleFont: {
                            family: colors.fontFamily,
                        },
                        bodyFont: {
                            family: colors.fontFamily,
                        },
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + ' درخواست';
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: colors.gridColor,
                        },
                        ticks: {
                            color: colors.textColor,
                            font: {
                                family: colors.fontFamily,
                            },
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: colors.textColor,
                            font: {
                                family: colors.fontFamily,
                            },
                        },
                    },
                },
            },
        });
    }

    initBarChart() {
        const canvas = this.shadowRoot.getElementById('barChart');
        if (!canvas) return;

        if (this.charts.barChart) {
            this.charts.barChart.destroy();
        }

        const colors = this.getChartColors();
        const ctx = canvas.getContext('2d');
        const data = this.chartData.recyclingBreakdown;

        this.charts.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['پلاستیک', 'کاغذ', 'شیشه', 'فلز'],
                datasets: [
                    {
                        label: 'کیلوگرم',
                        data: [data.plastic, data.paper, data.glass, data.metal],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                        ],
                        borderColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
                        borderWidth: 2,
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: colors.backgroundColor,
                        titleColor: colors.textColor,
                        bodyColor: colors.textColor,
                        borderColor: colors.gridColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        titleFont: {
                            family: colors.fontFamily,
                        },
                        bodyFont: {
                            family: colors.fontFamily,
                        },
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y.toLocaleString('fa-IR') + ' کیلوگرم';
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: colors.gridColor,
                        },
                        ticks: {
                            color: colors.textColor,
                            font: {
                                family: colors.fontFamily,
                            },
                            callback: function (value) {
                                return value.toLocaleString('fa-IR');
                            },
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: colors.textColor,
                            font: {
                                family: colors.fontFamily,
                            },
                        },
                    },
                },
            },
        });
    }

    initDonutChart() {
        const canvas = this.shadowRoot.getElementById('donutChart');
        if (!canvas) return;

        if (this.charts.donutChart) {
            this.charts.donutChart.destroy();
        }

        const colors = this.getChartColors();
        const ctx = canvas.getContext('2d');
        const data = this.chartData.requestStatus;

        this.charts.donutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['تکمیل شده', 'در انتظار', 'لغو شده'],
                datasets: [
                    {
                        data: [data.completed, data.pending, data.canceled],
                        backgroundColor: [
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                        ],
                        borderColor: ['#10b981', '#f59e0b', '#ef4444'],
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.textColor,
                            padding: 15,
                            font: {
                                size: 12,
                                family: colors.fontFamily,
                            },
                            usePointStyle: true,
                            pointStyle: 'circle',
                        },
                    },
                    tooltip: {
                        backgroundColor: colors.backgroundColor,
                        titleColor: colors.textColor,
                        bodyColor: colors.textColor,
                        borderColor: colors.gridColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        titleFont: {
                            family: colors.fontFamily,
                        },
                        bodyFont: {
                            family: colors.fontFamily,
                        },
                        callbacks: {
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return (
                                    context.label + ': ' + context.parsed + ' (' + percentage + '٪)'
                                );
                            },
                        },
                    },
                },
            },
        });
    }

    initRevenueChart() {
        const canvas = this.shadowRoot.getElementById('revenueChart');
        if (!canvas) return;

        if (this.charts.revenueChart) {
            this.charts.revenueChart.destroy();
        }

        const colors = this.getChartColors();
        const ctx = canvas.getContext('2d');

        this.charts.revenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.chartData.monthlyRevenue.map((d) => d.month),
                datasets: [
                    {
                        label: 'میلیون تومان',
                        data: this.chartData.monthlyRevenue.map((d) => d.value),
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: colors.backgroundColor,
                        titleColor: colors.textColor,
                        bodyColor: colors.textColor,
                        borderColor: colors.gridColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        titleFont: {
                            family: colors.fontFamily,
                        },
                        bodyFont: {
                            family: colors.fontFamily,
                        },
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + ' میلیون تومان';
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: colors.gridColor,
                        },
                        ticks: {
                            color: colors.textColor,
                            font: {
                                family: colors.fontFamily,
                            },
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: colors.textColor,
                            font: {
                                family: colors.fontFamily,
                            },
                        },
                    },
                },
            },
        });
    }

    initAllCharts() {
        setTimeout(() => {
            this.initLineChart();
            this.initBarChart();
            this.initDonutChart();
            this.initRevenueChart();
        }, 100);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has('loading') && !this.loading && this.chartData) {
            this.initAllCharts();
        }

        if (changedProperties.has('darkMode')) {
            this.initAllCharts();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        Object.values(this.charts).forEach((chart) => {
            if (chart) chart.destroy();
        });
    }

    render() {
        const sunIcon = this.renderIcon('sun');
        const moonIcon = this.renderIcon('moon');
        const searchIcon = this.renderIcon('search');

        return html`
            <div class="dashboard-wrapper">
                <div class="top-bar">
                    <button class="top-bar-button menu-button" @click="${this.toggleSidebar}">
                        <span class="icon-wrapper">${this.renderIcon('bars')}</span>
                    </button>
                    <h1>پنل مدیریت</h1>
                    <button class="top-bar-button" @click="${this.toggleTheme}">
                        <span class="icon-wrapper"> ${this.darkMode ? sunIcon : moonIcon} </span>
                    </button>
                </div>

                ${this.loading
                    ? html`
                          <div class="loading-container">
                              <div class="loading-spinner"></div>
                              <p class="loading-text">در حال دریافت آمار...</p>
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
                            <div class="dashboard-container">
                                <aside class="sidebar ${this.sidebarOpen ? 'open' : ''}">
                                    <div
                                        class="sidebar-overlay"
                                        @click="${this.closeSidebar}"
                                    ></div>
                                    <div class="sidebar-content">
                                        <div class="sidebar-header">
                                            <h2>منو</h2>
                                            <button
                                                class="close-sidebar-btn"
                                                @click="${this.closeSidebar}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('times')}</span
                                                >
                                            </button>
                                        </div>

                                        <div class="profile-section">
                                            <div class="profile-image">
                                                ${this.user.image
                                                    ? html`<img
                                                          .src="${this.user.image}"
                                                          alt="${this.user.name}"
                                                      />`
                                                    : html`<span class="icon-wrapper"
                                                          >${this.renderIcon('user-shield')}</span
                                                      >`}
                                            </div>
                                            <h2 class="profile-name">${this.user.name}</h2>
                                            <p class="profile-username">${this.user.username}@</p>
                                        </div>

                                        <nav class="sidebar-nav">
                                            <button
                                                class="nav-item active"
                                                @click="${this._onDashboard}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('chart-line')}</span
                                                >
                                                <span>داشبورد</span>
                                            </button>
                                            <button
                                                class="nav-item"
                                                @click="${this._onManageUsers}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('users')}</span
                                                >
                                                <span>کاربران</span>
                                            </button>
                                            <button
                                                class="nav-item"
                                                @click="${this._onManageDrivers}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('truck')}</span
                                                >
                                                <span>رانندگان</span>
                                            </button>
                                            <button
                                                class="nav-item"
                                                @click="${this._onQuickAction}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('clipboard-list')}</span
                                                >
                                                <span>درخواست‌ها</span>
                                            </button>
                                            <button
                                                class="nav-item"
                                                @click="${this._onViewTransactions}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('receipt')}</span
                                                >
                                                <span>تراکنش‌ها</span>
                                            </button>
                                            <button
                                                class="nav-item"
                                                @click="${this._onViewReports}"
                                            >
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('chart-pie')}</span
                                                >
                                                <span>گزارش‌ها</span>
                                            </button>
                                            <button class="nav-item" @click="${this._onSettings}">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('cog')}</span
                                                >
                                                <span>تنظیمات</span>
                                            </button>
                                        </nav>

                                        <div class="sidebar-health">
                                            <h3 class="sidebar-health-title">وضعیت سیستم</h3>
                                            <div class="health-status">
                                                <span
                                                    class="status-indicator status-${this
                                                        .systemHealth.status}"
                                                ></span>
                                                <span
                                                    >${this._getHealthStatus(
                                                        this.systemHealth.status
                                                    )}</span
                                                >
                                            </div>
                                            <div class="health-detail">
                                                <span>آپتایم:</span>
                                                <span>${this.systemHealth.uptime}</span>
                                            </div>
                                            <div class="health-detail">
                                                <span>بار سرور:</span>
                                                <span>${this.systemHealth.serverLoad}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </aside>

                                <main class="main-content">
                                    <div class="hero-card">
                                        <div class="hero-content">
                                            <div class="hero-text">
                                                <span class="hero-label"
                                                    >کل بازیافت جمع‌آوری شده</span
                                                >
                                                <div class="hero-value">
                                                    ${this.stats.totalWeight.toLocaleString(
                                                        'fa-IR'
                                                    )}
                                                    <span class="hero-unit">کیلوگرم</span>
                                                </div>
                                                <div class="hero-growth">
                                                    <span class="icon-wrapper growth-positive"
                                                        >${this.renderIcon('arrow-up')}</span
                                                    >
                                                    <span
                                                        >${this.stats.monthlyGrowth}٪ نسبت به ماه
                                                        قبل</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="hero-actions">
                                                <button
                                                    class="hero-btn"
                                                    @click="${this._onExportReport}"
                                                >
                                                    <span class="icon-wrapper"
                                                        >${this.renderIcon('download')}</span
                                                    >
                                                    <span>گزارش اکسل</span>
                                                </button>
                                                <button
                                                    class="hero-btn"
                                                    @click="${this._onViewMap}"
                                                >
                                                    <span class="icon-wrapper"
                                                        >${this.renderIcon('map-marked-alt')}</span
                                                    >
                                                    <span>نقشه زنده</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="hero-icon">
                                            <span class="icon-wrapper"
                                                >${this.renderIcon('chart-pie')}</span
                                            >
                                        </div>
                                    </div>

                                    <div class="stats-grid">
                                        <div class="stat-card">
                                            <div class="stat-icon stat-icon-blue">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('users')}</span
                                                >
                                            </div>
                                            <div class="stat-content">
                                                <p class="stat-label">کاربران فعال</p>
                                                <p class="stat-value">${this.stats.activeUsers}</p>
                                            </div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-icon stat-icon-orange">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('truck')}</span
                                                >
                                            </div>
                                            <div class="stat-content">
                                                <p class="stat-label">رانندگان فعال</p>
                                                <p class="stat-value">
                                                    ${this.stats.activeDrivers}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-icon stat-icon-red">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('bell')}</span
                                                >
                                            </div>
                                            <div class="stat-content">
                                                <p class="stat-label">در انتظار</p>
                                                <p class="stat-value">
                                                    ${this.stats.pendingRequests}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-icon stat-icon-green">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('check-circle')}</span
                                                >
                                            </div>
                                            <div class="stat-content">
                                                <p class="stat-label">تکمیل شده امروز</p>
                                                <p class="stat-value">
                                                    ${this.stats.completedToday}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="stat-card stat-card-wide">
                                            <div class="stat-icon stat-icon-purple">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('coins')}</span
                                                >
                                            </div>
                                            <div class="stat-content">
                                                <p class="stat-label">درآمد کل</p>
                                                <p class="stat-value">
                                                    ${this.stats.totalRevenue} تومان
                                                </p>
                                            </div>
                                        </div>
                                        <div class="stat-card stat-card-wide">
                                            <div class="stat-icon stat-icon-teal">
                                                <span class="icon-wrapper"
                                                    >${this.renderIcon('clock')}</span
                                                >
                                            </div>
                                            <div class="stat-content">
                                                <p class="stat-label">میانگین زمان پاسخ</p>
                                                <p class="stat-value">
                                                    ${this.stats.avgResponseTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="charts-section">
                                        <div class="chart-row">
                                            <div class="chart-col-2">
                                                <div class="chart-container">
                                                    <h3 class="chart-title">درخواست‌های هفتگی</h3>
                                                    <canvas id="lineChart"></canvas>
                                                </div>
                                            </div>
                                            <div class="chart-col-2">
                                                <div class="chart-container">
                                                    <h3 class="chart-title">
                                                        روند درآمد ماهانه (میلیون تومان)
                                                    </h3>
                                                    <canvas id="revenueChart"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="chart-row">
                                            <div class="chart-col-2">
                                                <div class="chart-container">
                                                    <h3 class="chart-title">
                                                        تفکیک بازیافت (کیلوگرم)
                                                    </h3>
                                                    <canvas id="barChart"></canvas>
                                                </div>
                                            </div>
                                            <div class="chart-col-2">
                                                <div class="chart-container">
                                                    <h3 class="chart-title">وضعیت درخواست‌ها</h3>
                                                    <canvas id="donutChart"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="content-grid">
                                        <div class="content-card">
                                            <div class="section-header-with-action">
                                                <h2 class="section-header">تراکنش‌های اخیر</h2>
                                                <button
                                                    class="view-all-btn"
                                                    @click="${this._onViewAllTransactions}"
                                                >
                                                    مشاهده همه
                                                </button>
                                            </div>
                                            <div class="transactions-list">
                                                ${this.recentTransactions.map(
                                                    (transaction) => html`
                                                        <div class="transaction-card">
                                                            <div
                                                                class="transaction-icon transaction-${transaction.type}"
                                                            >
                                                                <span class="icon-wrapper"
                                                                    >${transaction.type === 'payout'
                                                                        ? this.renderIcon(
                                                                              'arrow-up'
                                                                          )
                                                                        : this.renderIcon(
                                                                              'arrow-down'
                                                                          )}</span
                                                                >
                                                            </div>
                                                            <div class="transaction-info">
                                                                <p class="transaction-user">
                                                                    ${transaction.user}
                                                                </p>
                                                                <p class="transaction-date">
                                                                    ${transaction.date}
                                                                </p>
                                                            </div>
                                                            <div class="transaction-amount">
                                                                <p
                                                                    class="amount-value ${transaction.type ===
                                                                    'payout'
                                                                        ? 'amount-negative'
                                                                        : 'amount-positive'}"
                                                                >
                                                                    ${transaction.type === 'payout'
                                                                        ? '-'
                                                                        : '+'}
                                                                    ${transaction.amount}
                                                                </p>
                                                                <span
                                                                    class="transaction-status status-${transaction.status}"
                                                                >
                                                                    ${this._getTransactionStatus(
                                                                        transaction.status
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    `
                                                )}
                                            </div>
                                        </div>

                                        <div class="content-card">
                                            <div class="section-header-with-action">
                                                <h2 class="section-header">فعالیت‌های اخیر</h2>
                                                <button
                                                    class="view-all-btn"
                                                    @click="${this._onViewAll}"
                                                >
                                                    مشاهده همه
                                                </button>
                                            </div>

                                            <div class="search-bar">
                                                <span class="search-icon">${searchIcon}</span>
                                                <input
                                                    type="text"
                                                    placeholder="جستجو در فعالیت‌ها..."
                                                    .value="${this.searchQuery}"
                                                    @input="${this.handleSearch}"
                                                />
                                            </div>

                                            <div class="filter-tabs">
                                                <button
                                                    class="filter-tab ${this.activeFilter === 'all'
                                                        ? 'active'
                                                        : ''}"
                                                    @click="${() => this.setActiveFilter('all')}"
                                                >
                                                    همه
                                                </button>
                                                <button
                                                    class="filter-tab ${this.activeFilter ===
                                                    'success'
                                                        ? 'active'
                                                        : ''}"
                                                    @click="${() =>
                                                        this.setActiveFilter('success')}"
                                                >
                                                    موفق
                                                </button>
                                                <button
                                                    class="filter-tab ${this.activeFilter === 'blue'
                                                        ? 'active'
                                                        : ''}"
                                                    @click="${() => this.setActiveFilter('blue')}"
                                                >
                                                    جدید
                                                </button>
                                                <button
                                                    class="filter-tab ${this.activeFilter ===
                                                    'orange'
                                                        ? 'active'
                                                        : ''}"
                                                    @click="${() => this.setActiveFilter('orange')}"
                                                >
                                                    هشدار
                                                </button>
                                                <button
                                                    class="filter-tab ${this.activeFilter ===
                                                    'error'
                                                        ? 'active'
                                                        : ''}"
                                                    @click="${() => this.setActiveFilter('error')}"
                                                >
                                                    خطا
                                                </button>
                                            </div>

                                            <div class="activities-list">
                                                ${this.filteredActivities.length > 0
                                                    ? this.filteredActivities.map(
                                                          (activity) => html`
                                                              <div class="activity-card">
                                                                  <div
                                                                      class="activity-icon bg-${this._getColorType(
                                                                          activity.type
                                                                      )}"
                                                                  >
                                                                      <span class="icon-wrapper"
                                                                          >${this.renderIcon(
                                                                              activity.icon
                                                                          )}</span
                                                                      >
                                                                  </div>
                                                                  <div class="activity-content">
                                                                      <p class="activity-title">
                                                                          ${activity.title}
                                                                      </p>
                                                                      <p class="activity-subtitle">
                                                                          ${activity.subtitle}
                                                                      </p>
                                                                  </div>
                                                                  <div class="activity-time">
                                                                      ${activity.time}
                                                                  </div>
                                                              </div>
                                                          `
                                                      )
                                                    : html`
                                                          <div class="empty-state">
                                                              <p>فعالیتی یافت نشد</p>
                                                          </div>
                                                      `}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        `}
            </div>
        `;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.fetchDashboardData();
    }

    _getColorType(type) {
        const map = { success: 'green', blue: 'blue', orange: 'orange', error: 'red' };
        return map[type] || 'blue';
    }

    _getHealthStatus(status) {
        const statusMap = {
            operational: 'عملیاتی',
            degraded: 'کاهش عملکرد',
            down: 'خارج از سرویس',
        };
        return statusMap[status] || status;
    }

    _getTransactionStatus(status) {
        const statusMap = {
            completed: 'تکمیل شده',
            pending: 'در انتظار',
            failed: 'ناموفق',
        };
        return statusMap[status] || status;
    }

    _onLogout() {
        removeAuthToken();
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onDashboard() {
        console.log('Dashboard');
    }

    _onSettings() {
        console.log('Settings');
    }

    _onExportReport() {
        console.log('Export Report');
    }

    _onViewMap() {
        console.log('View Live Map');
    }

    _onManageUsers() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/users' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onManageDrivers() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/drivers' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onViewReports() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/reports' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onViewTransactions() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/transactions' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onViewAllTransactions() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/transactions' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onViewAll() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/activities' },
                bubbles: true,
                composed: true,
            })
        );
    }

    _onQuickAction() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/admin/requests' },
                bubbles: true,
                composed: true,
            })
        );
    }
}

customElements.define('admin-dashboard', AdminDashboard);
