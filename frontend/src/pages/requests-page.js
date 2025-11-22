import { html } from 'lit';
import { BaseComponent } from '../components/base-component';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowRight,
    faCheck,
    faClock,
    faXmark,
    faTruck,
    faRecycle,
    faMoon,
    faSun,
} from '@fortawesome/free-solid-svg-icons';
import { getAuthToken } from '../utils/auth';
import { globalStyles } from '../styles/global-styles';
import { requestsStyles } from '../styles/pages/requests-page';

library.add(faArrowRight, faCheck, faClock, faXmark, faTruck, faRecycle, faMoon, faSun);

export class RequestsPage extends BaseComponent {
    static properties = {
        requests: { type: Array },
        loading: { type: Boolean },
        error: { type: String },
        activeFilter: { type: String },
        pagination: { type: Object },
    };

    static styles = [globalStyles, requestsStyles];

    constructor() {
        super();
        this.requests = [];
        this.loading = true;
        this.error = null;
        this.activeFilter = 'all';
        this.pagination = {
            page: 1,
            limit: 20,
            total: 0,
            pages: 1,
        };
    }

    async fetchRequests() {
        this.loading = true;
        this.error = null;

        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error('لطفا ابتدا وارد شوید');
            }

            const params = new URLSearchParams({
                status: this.activeFilter,
                page: this.pagination.page,
                limit: this.pagination.limit,
            });

            const response = await fetch(`/api/requests/history?${params}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'خطا در دریافت درخواست‌ها');
            }

            if (data.ok) {
                this.requests = data.result.requests || [];
                this.pagination = data.result.pagination || this.pagination;
            }
        } catch (error) {
            console.error('Failed to load requests:', error);
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.fetchRequests();
    }

    _setFilter(filter) {
        this.activeFilter = filter;
        this.pagination.page = 1;
        this.fetchRequests();
    }

    _changePage(page) {
        this.pagination.page = page;
        this.fetchRequests();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    _onBackClick() {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { to: '/dashboard' },
                bubbles: true,
                composed: true,
            })
        );
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

    _getStatusText(status) {
        const statusMap = {
            PENDING: 'در انتظار',
            COMPLETED: 'تکمیل شده',
            CANCELED: 'لغو شده',
        };
        return statusMap[status] || status;
    }

    _getStatusClass(status) {
        return status.toLowerCase();
    }

    _getStatusIcon(status) {
        const iconMap = {
            PENDING: icon({ prefix: 'fas', iconName: 'clock' }).node[0],
            COMPLETED: icon({ prefix: 'fas', iconName: 'check' }).node[0],
            CANCELED: icon({ prefix: 'fas', iconName: 'xmark' }).node[0],
        };
        return iconMap[status] || iconMap.PENDING;
    }

    _formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
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

    render() {
        const backIcon = icon({ prefix: 'fas', iconName: 'arrow-right' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];
        const recycleIcon = icon({ prefix: 'fas', iconName: 'recycle' }).node[0];

        return html`
            <div class="container">
                <div class="top-bar">
                    <div class="top-bar-header">
                        <button class="top-bar-button" @click=${this._onBackClick}>
                            <span class="icon-wrapper">${backIcon}</span>
                        </button>
                        <h1>درخواست‌های من</h1>
                        <button class="top-bar-button" @click="${super.toggleTheme}">
                            <span class="icon-wrapper">${this.darkMode ? sunIcon : moonIcon}</span>
                        </button>
                    </div>

                    <div class="filter-tabs">
                        <div class="tabs-container">
                            <button
                                class="tab-button ${this.activeFilter === 'all' ? 'active' : ''}"
                                @click="${() => this._setFilter('all')}"
                            >
                                همه
                            </button>
                            <button
                                class="tab-button ${this.activeFilter === 'PENDING'
                                    ? 'active'
                                    : ''}"
                                @click="${() => this._setFilter('PENDING')}"
                            >
                                در انتظار
                            </button>
                            <button
                                class="tab-button ${this.activeFilter === 'COMPLETED'
                                    ? 'active'
                                    : ''}"
                                @click="${() => this._setFilter('COMPLETED')}"
                            >
                                تکمیل شده
                            </button>
                            <button
                                class="tab-button ${this.activeFilter === 'CANCELED'
                                    ? 'active'
                                    : ''}"
                                @click="${() => this._setFilter('CANCELED')}"
                            >
                                لغو شده
                            </button>
                        </div>
                    </div>
                </div>

                <main>
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
                                    <button class="retry-button" @click="${this.fetchRequests}">
                                        تلاش مجدد
                                    </button>
                                </div>
                            `
                          : this.requests.length === 0
                            ? html`
                                  <div class="empty-state">
                                      <div class="empty-icon">
                                          <span class="icon-wrapper">${recycleIcon}</span>
                                      </div>
                                      <h2 class="empty-title">
                                          ${this.activeFilter === 'all'
                                              ? 'هنوز درخواستی ثبت نکرده‌اید'
                                              : 'درخواستی یافت نشد'}
                                      </h2>
                                      <p class="empty-description">
                                          ${this.activeFilter === 'all'
                                              ? 'برای شروع، یک درخواست جدید برای جمع‌آوری پسماند خشک خود ایجاد کنید.'
                                              : 'هیچ درخواستی با این وضعیت وجود ندارد.'}
                                      </p>
                                      ${this.activeFilter === 'all'
                                          ? html`
                                                <button
                                                    class="empty-action"
                                                    @click="${this._onNewRequest}"
                                                >
                                                    ثبت درخواست جدید
                                                </button>
                                            `
                                          : ''}
                                  </div>
                              `
                            : html`
                                  <div class="requests-list">
                                      ${this.requests.map(
                                          (request) => html`
                                              <div class="request-card">
                                                  <div
                                                      class="request-icon ${this._getStatusClass(
                                                          request.status
                                                      )}"
                                                  >
                                                      <span class="icon-wrapper"
                                                          >${this._getStatusIcon(
                                                              request.status
                                                          )}</span
                                                      >
                                                  </div>
                                                  <div class="request-content">
                                                      <div class="request-header">
                                                          <p class="request-date">
                                                              ${this._formatDate(request.createdAt)}
                                                          </p>
                                                          <span class="request-id"
                                                              >#${request.id.slice(-8)}</span
                                                          >
                                                      </div>
                                                      <p class="request-status">
                                                          <span class="status-label">وضعیت:</span>
                                                          <span
                                                              class="status-value ${this._getStatusClass(
                                                                  request.status
                                                              )}"
                                                          >
                                                              ${this._getStatusText(request.status)}
                                                          </span>
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

                                  ${this.pagination.pages > 1
                                      ? html`
                                            <div class="pagination">
                                                <button
                                                    class="pagination-button"
                                                    @click="${() =>
                                                        this._changePage(this.pagination.page - 1)}"
                                                    ?disabled="${this.pagination.page === 1}"
                                                >
                                                    قبلی
                                                </button>
                                                <span class="pagination-info">
                                                    صفحه ${this.pagination.page} از
                                                    ${this.pagination.pages}
                                                </span>
                                                <button
                                                    class="pagination-button"
                                                    @click="${() =>
                                                        this._changePage(this.pagination.page + 1)}"
                                                    ?disabled="${this.pagination.page ===
                                                    this.pagination.pages}"
                                                >
                                                    بعدی
                                                </button>
                                            </div>
                                        `
                                      : ''}
                              `}
                </main>
            </div>
        `;
    }
}

customElements.define('requests-page', RequestsPage);
