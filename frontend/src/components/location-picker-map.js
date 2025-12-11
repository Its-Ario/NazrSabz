import { html, css, unsafeCSS } from 'lit';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import leafletStyles from 'leaflet/dist/leaflet.css?inline';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from './base-component';

library.add(faXmark, faCheck, faLocationDot);

export class LocationPickerMap extends BaseComponent {
    static properties = {
        isOpen: { type: Boolean },
        selectedLocation: { type: Object },
        loading: { type: Boolean },
        darkMode: { type: Boolean },
    };

    static styles = [
        css`
            ${unsafeCSS(leafletStyles)}
        `,
        css`
            :host {
                display: block;
                font-family:
                    'Shabnam FD',
                    -apple-system,
                    BlinkMacSystemFont,
                    'Segoe UI',
                    sans-serif;
            }

            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                backdrop-filter: blur(4px);
            }

            .modal-overlay.hidden {
                display: none;
            }

            .modal-container {
                background-color: #ffffff;
                border-radius: 16px;
                width: 100%;
                max-width: 800px;
                height: 90vh;
                max-height: 700px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                overflow: hidden;
            }

            .modal-container.dark {
                background-color: #1e1e1e;
            }

            .modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.25rem 1.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

            .modal-container.dark .modal-header {
                border-bottom-color: rgba(255, 255, 255, 0.08);
            }

            .modal-title {
                font-size: 1.125rem;
                font-weight: 600;
                color: #1a1a1a;
                margin: 0;
            }

            .modal-container.dark .modal-title {
                color: #e4e4e4;
            }

            .close-button {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 10px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #7a8a7a;
                transition: all 0.2s ease;
            }

            .close-button:hover {
                background-color: rgba(0, 0, 0, 0.06);
                color: #1a1a1a;
            }

            .modal-container.dark .close-button {
                color: #8a8a8a;
            }

            .modal-container.dark .close-button:hover {
                background-color: rgba(255, 255, 255, 0.06);
                color: #e4e4e4;
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

            .map-container {
                flex: 1;
                position: relative;
                min-height: 400px;
                overflow: hidden;
            }

            #map {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
            }

            .loading-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.9);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 1rem;
            }

            .modal-container.dark .loading-overlay {
                background-color: rgba(30, 30, 30, 0.9);
            }

            .loading-spinner {
                width: 3rem;
                height: 3rem;
                border: 3px solid rgba(19, 236, 19, 0.2);
                border-top-color: #13ec13;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }

            .loading-text {
                font-size: 0.9375rem;
                color: #7a8a7a;
            }

            .modal-container.dark .loading-text {
                color: #8a8a8a;
            }

            .map-hint {
                position: absolute;
                top: 1rem;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(255, 255, 255, 0.95);
                padding: 0.75rem 1.5rem;
                border-radius: 12px;
                font-size: 0.875rem;
                color: #1a1a1a;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .modal-container.dark .map-hint {
                background-color: rgba(30, 30, 30, 0.95);
                color: #e4e4e4;
            }

            .map-hint .icon-wrapper {
                color: #13ec13;
                width: 18px;
                height: 18px;
            }

            .location-info {
                padding: 1rem 1.5rem;
                border-top: 1px solid rgba(0, 0, 0, 0.06);
                font-size: 0.875rem;
                color: #7a8a7a;
                font-family: monospace;
            }

            .modal-container.dark .location-info {
                border-top-color: rgba(255, 255, 255, 0.08);
                color: #8a8a8a;
            }

            .modal-footer {
                display: flex;
                gap: 0.75rem;
                padding: 1.25rem 1.5rem;
                border-top: 1px solid rgba(0, 0, 0, 0.06);
            }

            .modal-container.dark .modal-footer {
                border-top-color: rgba(255, 255, 255, 0.08);
            }

            .footer-button {
                flex: 1;
                height: 3rem;
                border-radius: 12px;
                font-size: 0.9375rem;
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.2s ease;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .cancel-button {
                background-color: rgba(0, 0, 0, 0.06);
                color: #1a1a1a;
            }

            .cancel-button:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }

            .modal-container.dark .cancel-button {
                background-color: rgba(255, 255, 255, 0.06);
                color: #e4e4e4;
            }

            .modal-container.dark .cancel-button:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            .confirm-button {
                background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
                color: #0a1a0a;
                box-shadow: 0 4px 12px rgba(19, 236, 19, 0.3);
            }

            .confirm-button:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(19, 236, 19, 0.4);
            }

            .confirm-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .footer-button .icon-wrapper {
                width: 18px;
                height: 18px;
            }

            .custom-marker-wrapper {
                background: transparent !important;
                border: none !important;
            }

            .location-marker {
                background-color: #13ec13;
                width: 24px;
                height: 24px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid #ffffff;
                box-shadow: 0 4px 12px rgba(19, 236, 19, 0.4);
                position: relative;
            }

            .location-marker::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
                width: 8px;
                height: 8px;
                background-color: #ffffff;
                border-radius: 50%;
            }

            .leaflet-control-zoom {
                border: none !important;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .leaflet-control-zoom a {
                background-color: #ffffff;
                color: #13ec13;
                font-weight: bold;
                border: none;
                width: 36px;
                height: 36px;
                line-height: 36px;
                transition: all 0.2s ease;
            }

            .modal-container.dark .leaflet-control-zoom a {
                background-color: #2a2a2a;
                color: #13ec13;
            }

            .leaflet-control-zoom a:hover {
                background-color: #13ec13;
                color: #ffffff;
            }

            .leaflet-control-zoom-in {
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }

            .modal-container.dark .leaflet-control-zoom-in {
                border-bottom-color: rgba(255, 255, 255, 0.1);
            }

            .modal-container.dark .leaflet-tile-pane {
                filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3)
                    brightness(0.7);
            }

            @media (max-width: 640px) {
                .modal-overlay {
                    padding: 0;
                    align-items: stretch;
                }

                .modal-container {
                    max-width: 100%;
                    height: 100vh;
                    max-height: 100vh;
                    border-radius: 0;
                }

                .map-container {
                    min-height: 50vh;
                }

                .map-hint {
                    font-size: 0.8125rem;
                    padding: 0.625rem 1rem;
                }
            }
        `,
    ];

    constructor() {
        super();
        this.isOpen = false;
        this.selectedLocation = null;
        this.loading = true;
        this.map = null;
        this.marker = null;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        const closeIcon = icon({ prefix: 'fas', iconName: 'xmark' }).node[0];
        const checkIcon = icon({ prefix: 'fas', iconName: 'check' }).node[0];
        const locationIcon = icon({ prefix: 'fas', iconName: 'location-dot' }).node[0];

        return html`
            <div class="modal-overlay ${this.isOpen ? '' : 'hidden'}">
                <div class="modal-container ${this.darkMode ? 'dark' : ''}">
                    <div class="modal-header">
                        <h2 class="modal-title">انتخاب موقعیت مکانی</h2>
                        <button class="close-button" @click=${this._onClose}>
                            <span class="icon-wrapper">${closeIcon}</span>
                        </button>
                    </div>

                    <div class="map-container">
                        ${this.loading
                            ? html`
                                  <div class="loading-overlay">
                                      <div class="loading-spinner"></div>
                                      <p class="loading-text">در حال بارگذاری نقشه...</p>
                                  </div>
                              `
                            : ''}
                        <div id="map"></div>
                        ${!this.loading
                            ? html`
                                  <div class="map-hint">
                                      <span class="icon-wrapper">${locationIcon}</span>
                                      روی نقشه کلیک کنید تا موقعیت را انتخاب کنید
                                  </div>
                              `
                            : ''}
                    </div>

                    ${this.selectedLocation
                        ? html`
                              <div class="location-info">
                                  عرض جغرافیایی: ${this.selectedLocation.lat.toFixed(6)} | طول
                                  جغرافیایی: ${this.selectedLocation.lng.toFixed(6)}
                              </div>
                          `
                        : ''}

                    <div class="modal-footer">
                        <button class="footer-button cancel-button" @click=${this._onClose}>
                            <span class="icon-wrapper">${closeIcon}</span>
                            انصراف
                        </button>
                        <button
                            class="footer-button confirm-button"
                            @click=${this._onConfirm}
                            ?disabled=${!this.selectedLocation}
                        >
                            <span class="icon-wrapper">${checkIcon}</span>
                            تایید موقعیت
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updated(changedProperties) {
        if (changedProperties.has('isOpen')) {
            if (this.isOpen) {
                if (!this.map) {
                    setTimeout(() => this._initializeMap(), 150);
                } else {
                    setTimeout(() => {
                        if (this.map) {
                            this.map.invalidateSize();
                        }
                    }, 100);
                }
            }
        }
    }

    _initializeMap() {
        const mapElement = this.shadowRoot.querySelector('#map');
        if (!mapElement || this.map) return;

        try {
            this.map = L.map(mapElement, {
                zoomControl: true,
                attributionControl: true,
                preferCanvas: true,
            }).setView([35.6892, 51.389], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(this.map);

            this.map.on('click', (e) => {
                this._setLocation(e.latlng.lat, e.latlng.lng);
            });

            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                    this.loading = false;
                    this.requestUpdate();
                }
            }, 100);

            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 300);
        } catch (error) {
            console.error('Failed to initialize map:', error);
            this.loading = false;
            this.requestUpdate();
        }
    }

    _setLocation(lat, lng) {
        this.selectedLocation = { lat, lng };

        if (this.marker) {
            this.map.removeLayer(this.marker);
        }

        const markerIcon = L.divIcon({
            className: 'custom-marker-wrapper',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            html: '<div class="location-marker"></div>',
        });

        this.marker = L.marker([lat, lng], { icon: markerIcon }).addTo(this.map);

        this.requestUpdate();
    }
    _onClose() {
        this.dispatchEvent(
            new CustomEvent('location-picker-close', {
                bubbles: true,
                composed: true,
            })
        );
    }

    _onConfirm() {
        if (this.selectedLocation) {
            this.dispatchEvent(
                new CustomEvent('location-selected', {
                    detail: this.selectedLocation,
                    bubbles: true,
                    composed: true,
                })
            );
        }
    }

    open() {
        this.isOpen = true;
        this.requestUpdate();
    }

    close() {
        this.isOpen = false;
        this.selectedLocation = null;
        if (this.marker) {
            this.map?.removeLayer(this.marker);
            this.marker = null;
        }
        this.requestUpdate();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }
}

customElements.define('location-picker-map', LocationPickerMap);
