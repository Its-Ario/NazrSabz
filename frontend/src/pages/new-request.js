import { html, css } from 'lit';
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
    };

    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            direction: rtl;
            font-family:
                'Shabnam FD',
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                sans-serif;
            background-color: #f5f7f5;
            color: #1a1a1a;
            transition:
                background-color 0.3s ease,
                color 0.3s ease;
            margin: 0;
            padding: 0;
        }

        :host(.dark) {
            background-color: #121212;
            color: #e4e4e4;
        }
        .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            background-color: #f5f7f5;
            margin: 0;
            width: 100%;
        }

        :host(.dark) .container {
            background-color: #121212;
        }

        /* Top App Bar */
        .top-bar {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
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

        .top-bar h1 {
            flex: 1;
            text-align: center;
            font-size: 1.125rem;
            font-weight: 600;
            letter-spacing: -0.01em;
        }

        .top-bar-button {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 12px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3a7f3a;
            transition: all 0.2s ease;
        }

        :host(.dark) .top-bar-button {
            color: #b8b8b8;
        }

        .top-bar-button:hover {
            background-color: rgba(19, 236, 19, 0.1);
        }

        :host(.dark) .top-bar-button:hover {
            background-color: rgba(19, 236, 19, 0.15);
        }

        .icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
        }

        .icon-wrapper svg {
            width: 100%;
            height: 100%;
        }

        main {
            flex: 1;
            padding-bottom: 6rem;
        }

        /* Error Message */
        .error-banner {
            margin: 1rem 1.25rem;
            padding: 1rem;
            background-color: #fee;
            border: 1px solid #fcc;
            border-radius: 12px;
            color: #c00;
            font-size: 0.9375rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        :host(.dark) .error-banner {
            background-color: #4a1a1a;
            border-color: #7a2a2a;
            color: #ff6b6b;
        }

        .error-banner button {
            margin-left: auto;
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 1.25rem;
            padding: 0;
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Section Headers */
        .section-header {
            font-size: 1.0625rem;
            font-weight: 600;
            margin: 0;
            padding: 1.25rem 1.25rem 0.75rem;
            letter-spacing: -0.01em;
        }

        /* Waste Type Grid */
        .waste-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.875rem;
            padding: 0 1.25rem 1rem;
        }

        .waste-card {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            border-radius: 16px;
            padding: 1rem;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.06);
            background-color: #ffffff;
            transition: all 0.2s ease;
        }

        :host(.dark) .waste-card {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.08);
        }

        .waste-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        :host(.dark) .waste-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .waste-card.selected {
            background: linear-gradient(
                135deg,
                rgba(19, 236, 19, 0.15) 0%,
                rgba(15, 214, 15, 0.15) 100%
            );
            border-color: #13ec13;
            box-shadow: 0 2px 8px rgba(19, 236, 19, 0.25);
        }

        :host(.dark) .waste-card.selected {
            background: linear-gradient(
                135deg,
                rgba(19, 236, 19, 0.2) 0%,
                rgba(15, 214, 15, 0.2) 100%
            );
            box-shadow: 0 2px 12px rgba(19, 236, 19, 0.35);
        }

        .waste-card .icon-wrapper {
            width: 2rem;
            height: 2rem;
            color: #3a7f3a;
        }

        :host(.dark) .waste-card .icon-wrapper {
            color: #b8b8b8;
        }

        .waste-card.selected .icon-wrapper {
            color: #13ec13;
        }

        .waste-card h3 {
            font-weight: 600;
            font-size: 0.9375rem;
            color: #1a1a1a;
        }

        :host(.dark) .waste-card h3 {
            color: #e4e4e4;
        }

        .waste-card p {
            font-size: 0.8125rem;
            color: #7a8a7a;
        }

        :host(.dark) .waste-card p {
            color: #8a8a8a;
        }

        /* Form Groups */
        .form-section {
            padding: 0 1.25rem 1rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        label {
            font-size: 0.9375rem;
            font-weight: 500;
            color: #1a1a1a;
            margin-bottom: 0.375rem;
        }

        :host(.dark) label {
            color: #e4e4e4;
        }

        input,
        select,
        textarea {
            width: 100%;
            padding: 0.875rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            background-color: #ffffff;
            font-size: 0.9375rem;
            color: #1a1a1a;
            outline: none;
            transition: all 0.2s ease;
            font-family: inherit;
            box-sizing: border-box;
        }

        :host(.dark) input,
        :host(.dark) select,
        :host(.dark) textarea {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.08);
            color: #e4e4e4;
        }

        input:focus,
        select:focus,
        textarea:focus {
            border-color: #13ec13;
            box-shadow: 0 0 0 3px rgba(19, 236, 19, 0.1);
        }

        input::placeholder,
        textarea::placeholder {
            color: #7a8a7a;
        }

        :host(.dark) input::placeholder,
        :host(.dark) textarea::placeholder {
            color: #8a8a8a;
        }

        textarea {
            min-height: 7rem;
            resize: vertical;
        }

        .input-icon {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
        }

        .input-icon .icon-wrapper {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #7a8a7a;
            pointer-events: none;
            z-index: 1;
        }

        :host(.dark) .input-icon .icon-wrapper {
            color: #8a8a8a;
        }

        .input-icon input,
        .input-icon select,
        .input-icon textarea {
            padding-left: 2.75rem;
        }

        .input-icon textarea {
            padding-top: 0.875rem;
        }

        /* Weight Input with Items */
        .weight-inputs {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .weight-item {
            display: grid;
            grid-template-columns: 6rem 1fr;
            align-items: center;
            gap: 0.75rem;
        }

        .weight-item-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1a1a1a;
            text-align: right;
        }

        :host(.dark) .weight-item-label {
            color: #e4e4e4;
        }

        .weight-item input {
            flex: 1;
        }

        /* FAB Container */
        .fab-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.25rem;
            background: linear-gradient(
                to top,
                rgba(245, 247, 245, 1) 0%,
                rgba(245, 247, 245, 0) 100%
            );
            pointer-events: none;
            display: flex;
            justify-content: center;
        }

        :host(.dark) .fab-container {
            background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0) 100%);
        }

        .fab {
            max-width: 480px;
            width: 100%;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.625rem;
            border-radius: 16px;
            background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
            color: #0a1a0a;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(19, 236, 19, 0.3);
            transition: all 0.2s ease;
            pointer-events: auto;
            font-family: inherit;
        }

        .fab:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(19, 236, 19, 0.4);
        }

        .fab:active:not(:disabled) {
            transform: translateY(0);
        }

        .fab:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .fab .icon-wrapper {
            width: 18px;
            height: 18px;
        }

        /* Calendar Input */
        input[type='date'] {
            position: relative;
            cursor: pointer;
        }

        input[type='date']::-webkit-calendar-picker-indicator {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            opacity: 0;
            cursor: pointer;
        }

        input[type='date']::-webkit-inner-spin-button,
        input[type='date']::-webkit-clear-button {
            display: none;
        }

        input[type='date']::-webkit-datetime-edit {
            padding: 0;
        }

        /* Responsive Design */
        @media (max-width: 374px) {
            .top-bar {
                padding: 0.875rem 1rem;
            }

            .top-bar h1 {
                font-size: 1rem;
            }

            .top-bar-button {
                width: 2.5rem;
                height: 2.5rem;
            }

            .section-header {
                padding: 1rem 1rem 0.625rem;
                font-size: 1rem;
            }

            .waste-grid,
            .form-section {
                padding-left: 1rem;
                padding-right: 1rem;
            }

            .waste-card {
                padding: 0.875rem;
            }

            .fab-container {
                padding: 1rem;
            }

            .form-section {
                padding-left: 0.875rem;
                padding-right: 0.875rem;
            }

            .error-banner {
                margin: 1rem;
            }
        }

        @media (min-width: 640px) {
            .top-bar {
                padding: 1.125rem 1.5rem;
            }

            .top-bar h1 {
                font-size: 1.25rem;
            }

            .top-bar-button {
                width: 3rem;
                height: 3rem;
            }

            .section-header {
                padding: 1.5rem 1.5rem 1rem;
                font-size: 1.125rem;
            }

            .waste-grid {
                grid-template-columns: repeat(4, 1fr);
                padding: 0 1.5rem 1rem;
            }

            .form-section {
                padding: 0 1.5rem 1rem;
            }

            .form-row {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
            }

            .waste-card {
                padding: 1.25rem;
            }

            .weight-item {
                grid-template-columns: 8rem 1fr;
            }

            .weight-item-label {
                font-size: 0.9375rem;
            }

            .error-banner {
                margin: 1rem 1.5rem;
            }
        }

        @media (min-width: 768px) {
            .top-bar {
                padding: 1.25rem 2rem;
            }

            .top-bar h1 {
                font-size: 1.375rem;
            }

            .form-row {
                gap: 1.5rem;
            }

            .section-header {
                padding: 1.5rem 2rem 1rem;
                font-size: 1.25rem;
            }

            .waste-grid,
            .form-section {
                padding-left: 2rem;
                padding-right: 2rem;
            }

            .waste-card {
                padding: 1.5rem;
            }

            input,
            select,
            textarea {
                padding: 1rem 1.125rem;
            }

            .input-icon input,
            .input-icon select {
                padding-left: 3rem;
            }

            .fab {
                height: 3.75rem;
                font-size: 1.0625rem;
            }

            .error-banner {
                margin: 1rem 2rem;
            }

            .form-section {
                padding-left: 2rem;
                padding-right: 2rem;
            }

            .form-row {
                gap: 2rem;
            }

            input,
            select,
            textarea {
                padding: 1rem 1.125rem;
            }

            .input-icon input,
            .input-icon select {
                padding-left: 3rem;
            }
        }

        @media (min-width: 1024px) {
            main {
                padding-bottom: 2rem;
            }

            .top-bar {
                padding: 1.5rem 3rem;
                position: static;
            }

            .top-bar h1 {
                font-size: 1.5rem;
            }

            .form-section {
                padding-left: 3rem;
                padding-right: 3rem;
            }

            .form-row {
                gap: 2.5rem;
            }

            .section-header {
                padding: 2rem 3rem 1rem;
                font-size: 1.375rem;
            }

            .waste-grid,
            .form-section {
                padding-left: 3rem;
                padding-right: 3rem;
            }

            .fab-container {
                position: static;
                padding: 2rem 3rem;
                background: transparent;
            }

            .fab {
                max-width: 400px;
                height: 4rem;
                font-size: 1.125rem;
            }

            .error-banner {
                margin: 1rem 3rem;
            }
        }

        @media (min-width: 1280px) {
            .top-bar {
                padding: 1.75rem 4rem;
            }

            .top-bar h1 {
                font-size: 1.625rem;
            }

            .section-header {
                padding: 2rem 4rem 1rem;
                font-size: 1.5rem;
            }

            .waste-grid,
            .form-section {
                padding-left: 4rem;
                padding-right: 4rem;
            }

            .fab-container {
                padding: 2rem 4rem 2.5rem;
            }

            .error-banner {
                margin: 1rem 4rem;
            }

            .form-section {
                padding-left: 4rem;
                padding-right: 4rem;
            }

            .form-row {
                gap: 3rem;
            }
        }
        @media print {
            .top-bar,
            .fab-container {
                display: none;
            }

            main {
                padding-bottom: 0;
            }
        }
    `;

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
            location: {}, // SOON
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
                <!-- Top Bar -->
                <div class="top-bar">
                    <button class="top-bar-button" @click=${this._onBackClick}>
                        <span class="icon-wrapper">${backIcon}</span>
                    </button>
                    <h1>ثبت درخواست جدید</h1>
                    <button class="top-bar-button" @click="${super.toggleTheme}">
                        <span class="icon-wrapper">${this.darkMode ? sunIcon : moonIcon}</span>
                    </button>
                </div>

                <!-- Error Banner -->
                ${this.error
                    ? html`
                          <div class="error-banner">
                              <span>${this.error}</span>
                              <button @click=${this._dismissError}>✕</button>
                          </div>
                      `
                    : ''}

                <main>
                    <!-- Waste Type Selection -->
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

                    <!-- Weight Inputs -->
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

                    <!-- Request Details -->
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

                <!-- Floating Action Button -->
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
            </div>
        `;
    }
}

customElements.define('new-request-page', NewRequestPage);
