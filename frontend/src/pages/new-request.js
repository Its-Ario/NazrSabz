import { html } from 'lit';
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
    faCog,
    faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import { getAuthToken } from '../utils/auth';
import '../components/location-picker-map.js';
import { globalStyles } from '../styles/global-styles.js';
import { newReqStyles } from '../styles/pages/new-request.js';

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
    faCog,
    faWeightHanging
);

export class NewRequestPage extends BaseComponent {
    static properties = {
        selectedWasteTypes: { type: Array },
        formData: { type: Object },
        isSubmitting: { type: Boolean },
        error: { type: String },
        user: { type: Object },
        showLocationPicker: { type: Boolean },
    };

    static styles = [globalStyles, newReqStyles];

    constructor() {
        super();
        this.selectedWasteTypes = [];
        this.formData = {
            items: {},
            date: '',
            timeSlot: '',
            street: '',
            city: '',
            postalCode: '',
            notes: '',
        };
        this.isSubmitting = false;
        this.error = null;

        this.showLocationPicker = false;

        this.wasteTypes = [
            { id: 'paper', name: 'کاغذ', description: 'مقوا، روزنامه', icon: 'file' },
            { id: 'plastic', name: 'پلاستیک', description: 'بطری، ظروف', icon: 'recycle' },
            { id: 'metal', name: 'فلز', description: 'قوطی، آهن', icon: 'cog' },
            { id: 'glass', name: 'شیشه', description: 'بطری، ظروف', icon: 'glass-water' },
        ];

        this.timeSlots = [
            { value: 'morning', label: 'صبح ۹-۱۲' },
            { value: 'afternoon', label: 'عصر ۱۴-۱۷' },
            { value: 'evening', label: 'عصر ۱۷-۲۰' },
        ];
    }

    _openLocationPicker() {
        this.showLocationPicker = true;
        this.requestUpdate();
    }

    _closeLocationPicker() {
        this.showLocationPicker = false;
    }

    _handleLocationSelected(event) {
        const { lat, lng } = event.detail;
        this.formData.location = {
            type: 'Point',
            coordinates: [lng, lat],
        };
        this.showLocationPicker = false;
        this.requestUpdate();
    }

    _toggleWasteType(typeId) {
        const index = this.selectedWasteTypes.indexOf(typeId);
        if (index > -1) {
            this.selectedWasteTypes.splice(index, 1);
            delete this.formData.items[typeId];
        } else {
            this.selectedWasteTypes.push(typeId);
            this.formData.items[typeId] = '';
        }
        this.requestUpdate();
    }

    _handleWeightChange(typeId, event) {
        this.formData.items[typeId] = event.target.value;
        this.requestUpdate();
    }

    _handleInputChange(field, event) {
        this.formData[field] = event.target.value;
        this.requestUpdate();
    }

    _validateForm() {
        if (this.selectedWasteTypes.length === 0) {
            return false;
        }

        for (const typeId of this.selectedWasteTypes) {
            if (!this.formData.items[typeId] || parseFloat(this.formData.items[typeId]) <= 0) {
                return false;
            }
        }

        if (
            !this.formData.date ||
            !this.formData.timeSlot ||
            !this.formData.street ||
            !this.formData.city ||
            !this.formData.postalCode
        ) {
            return false;
        }

        return true;
    }

    _prepareRequestData() {
        const items = {};
        for (const [type, weight] of Object.entries(this.formData.items)) {
            items[type] = {
                type: type,
                weight: parseFloat(weight),
            };
        }

        const date = new Date(this.formData.date);
        const timeSlotMap = {
            morning: 9,
            afternoon: 14,
            evening: 17,
        };
        const hour = timeSlotMap[this.formData.timeSlot] || 9;
        date.setHours(hour, 0, 0, 0);

        const address = {
            street: this.formData.street,
            city: this.formData.city,
            postalCode: this.formData.postalCode,
            location: this.formData.location,
        };

        return {
            requesterId: this.user?.id,
            items: items,
            scheduledAt: date.toISOString(),
            priority: 'NORMAL',
            address: address,
            metadata: {
                timeSlot: this.formData.timeSlot,
                notes: this.formData.notes || null,
            },
        };
    }

    async _handleSubmit() {
        if (!this._validateForm()) {
            this.error = 'لطفا تمام فیلدهای ضروری را پر کنید';
            return;
        }

        this.isSubmitting = true;
        this.error = null;

        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error('لطفا ابتدا وارد شوید');
            }

            const requestData = this._prepareRequestData();

            const response = await fetch('/api/requests/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'خطا در ثبت درخواست');
            }

            if (data.ok) {
                this.dispatchEvent(
                    new CustomEvent('navigate', {
                        detail: { to: '/dashboard' },
                        bubbles: true,
                        composed: true,
                    })
                );

                this.selectedWasteTypes = [];
                this.formData = {
                    items: {},
                    date: '',
                    timeSlot: '',
                    street: '',
                    city: '',
                    postalCode: '',
                    notes: '',
                    location: [],
                };
            }
        } catch (error) {
            console.error('Failed to submit request:', error);
            this.error = error.message || 'خطا در ثبت درخواست. لطفا دوباره تلاش کنید.';
        } finally {
            this.isSubmitting = false;
        }
    }

    _dismissError() {
        this.error = null;
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

    render() {
        const backIcon = icon({ prefix: 'fas', iconName: 'arrow-right' }).node[0];
        const recycleIcon = icon({ prefix: 'fa', iconName: 'recycle' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];
        const calendarIcon = icon({ prefix: 'fa', iconName: 'calendar' }).node[0];
        const clockIcon = icon({ prefix: 'fa', iconName: 'clock' }).node[0];

        const getWasteIcon = (iconName) => {
            return icon({ prefix: 'fa', iconName }).node[0];
        };

        const isFormValid = this._validateForm();

        return html`
            <div class="container">
                <div class="top-bar">
                    <button class="top-bar-button" @click=${this._onBackClick}>
                        <span class="icon-wrapper">${backIcon}</span>
                    </button>
                    <h1>ثبت درخواست جدید</h1>
                    <button class="top-bar-button" @click="${super.toggleTheme}">
                        <span class="icon-wrapper">${this.darkMode ? sunIcon : moonIcon}</span>
                    </button>
                </div>

                ${this.error
                    ? html`
                          <div class="error-banner">
                              <span>${this.error}</span>
                              <button @click=${this._dismissError}>✕</button>
                          </div>
                      `
                    : ''}

                <main>
                    <h2 class="section-header">نوع پسماند خود را انتخاب کنید</h2>
                    <div class="waste-grid">
                        ${this.wasteTypes.map(
                            (type) => html`
                                <div
                                    class="waste-card ${this.selectedWasteTypes.includes(type.id)
                                        ? 'selected'
                                        : ''}"
                                    @click=${() => this._toggleWasteType(type.id)}
                                >
                                    <span class="icon-wrapper">${getWasteIcon(type.icon)}</span>
                                    <h3>${type.name}</h3>
                                    <p>${type.description}</p>
                                </div>
                            `
                        )}
                    </div>

                    ${this.selectedWasteTypes.length > 0
                        ? html`
                              <h2 class="section-header">وزن تقریبی (کیلوگرم)</h2>
                              <div class="form-section">
                                  <div class="weight-inputs">
                                      ${this.selectedWasteTypes.map((typeId) => {
                                          const type = this.wasteTypes.find((t) => t.id === typeId);
                                          return html`
                                              <div class="weight-item">
                                                  <span class="weight-item-label"
                                                      >${type.name}:</span
                                                  >
                                                  <input
                                                      type="number"
                                                      min="0"
                                                      step="0.5"
                                                      placeholder="مثلا: 5 کیلوگرم"
                                                      .value=${this.formData.items[typeId] || ''}
                                                      @input=${(e) =>
                                                          this._handleWeightChange(typeId, e)}
                                                  />
                                              </div>
                                          `;
                                      })}
                                  </div>
                              </div>
                          `
                        : ''}

                    <h2 class="section-header">جزئیات درخواست</h2>
                    <div class="form-section">
                        <div class="form-row">
                            <div class="form-group">
                                <label>تاریخ جمع‌آوری</label>
                                <div class="input-icon">
                                    <input
                                        type="date"
                                        .value=${this.formData.date}
                                        @input=${(e) => this._handleInputChange('date', e)}
                                        min=${new Date().toISOString().split('T')[0]}
                                    />
                                    <span class="icon-wrapper">${calendarIcon}</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>بازه زمانی</label>
                                <div class="input-icon">
                                    <select
                                        .value=${this.formData.timeSlot}
                                        @change=${(e) => this._handleInputChange('timeSlot', e)}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        ${this.timeSlots.map(
                                            (slot) =>
                                                html`<option value=${slot.value}>
                                                    ${slot.label}
                                                </option>`
                                        )}
                                    </select>
                                    <span class="icon-wrapper">${clockIcon}</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>آدرس خیابان</label>
                            <input
                                type="text"
                                placeholder="نام خیابان و پلاک"
                                .value=${this.formData.street}
                                @input=${(e) => this._handleInputChange('street', e)}
                            />
                        </div>

                        <div class="form-group">
                            <label>موقعیت مکانی (اختیاری)</label>
                            <button
                                type="button"
                                class="location-button"
                                @click=${this._openLocationPicker}
                            >
                                ${this.formData.location
                                    ? 'تغییر موقعیت'
                                    : 'انتخاب موقعیت روی نقشه'}
                            </button>
                            ${this.formData.location
                                ? html`
                                      <p class="location-selected">
                                          موقعیت انتخاب شده:
                                          ${this.formData.location.coordinates[1].toFixed(4)},
                                          ${this.formData.location.coordinates[0].toFixed(4)}
                                      </p>
                                  `
                                : ''}
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>شهر</label>
                                <input
                                    type="text"
                                    placeholder="نام شهر"
                                    .value=${this.formData.city}
                                    @input=${(e) => this._handleInputChange('city', e)}
                                />
                            </div>

                            <div class="form-group">
                                <label>کد پستی</label>
                                <input
                                    type="text"
                                    placeholder="کد پستی ۱۰ رقمی"
                                    maxlength="10"
                                    .value=${this.formData.postalCode}
                                    @input=${(e) => this._handleInputChange('postalCode', e)}
                                />
                            </div>
                        </div>

                        <div class="form-group">
                            <label>توضیحات اضافی (اختیاری)</label>
                            <textarea
                                placeholder="توضیحات تکمیلی در مورد درخواست..."
                                .value=${this.formData.notes}
                                @input=${(e) => this._handleInputChange('notes', e)}
                            ></textarea>
                        </div>
                    </div>
                </main>

                <div class="fab-container">
                    <button
                        class="fab"
                        ?disabled=${!isFormValid || this.isSubmitting}
                        @click=${this._handleSubmit}
                    >
                        <span class="icon-wrapper">${recycleIcon}</span>
                        ${this.isSubmitting ? 'در حال ارسال...' : 'ثبت درخواست'}
                    </button>
                </div>

                <location-picker-map
                    .isOpen=${this.showLocationPicker}
                    @location-selected=${this._handleLocationSelected}
                    @location-picker-close=${this._closeLocationPicker}
                ></location-picker-map>
            </div>
        `;
    }
}

customElements.define('new-request-page', NewRequestPage);
