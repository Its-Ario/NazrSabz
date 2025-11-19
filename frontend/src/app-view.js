import { LitElement, css, html } from 'lit';
import './components/login-view.js';
import './components/header-bar.js';
import './components/user-map.js';
import './components/user-list.js';
import './pages/login-page.js';
import './pages/home-page.js';
import './pages/new-request.js';
import './pages/rewards-page.js';
import { removeAuthToken } from './utils/auth.js';
import { Router } from '@lit-labs/router';

export class AppView extends LitElement {
    static properties = {
        currentUser: { type: Object },
        users: { type: Array },
        isTracking: { type: Boolean },
        showLocation: { type: Boolean },
        currentCoordinates: { type: Object },
        connectionStatus: { type: String },
    };

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100vh;
        }

        .app-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: var(--background, #f8fafc);
        }

        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
        }

        .map-container {
            flex: 2;
            min-height: 0;
            position: relative;
            border-radius: 12px;
            margin: 0.5rem;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--border, #e2e8f0);
        }

        user-map {
            width: 100%;
            height: 100%;
        }

        .user-list-container {
            flex: 1;
            min-height: 300px;
            max-height: 400px;
            margin: 0 0.5rem 0.5rem 0.5rem;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--border, #e2e8f0);
            background: var(--surface, white);
        }

        user-list {
            width: 100%;
            height: 100%;
        }

        @media (max-width: 768px) {
            .map-container {
                margin: 0.25rem;
            }

            .user-list-container {
                margin: 0 0.25rem 0.25rem 0.25rem;
                min-height: 250px;
                max-height: 300px;
            }
        }
    `;

    constructor() {
        super();
        this.currentUser = null;
        this.users = [];
        this.isTracking = false;
        this.showLocation = true;
        this.currentCoordinates = { lat: 0, lng: 0 };
        this.connectionStatus = 'disconnected';

        this.router = new Router(this, [
            { path: '/', render: () => html`<login-page></login-page>` },
            { path: '/home', render: () => html`<home-page></home-page>` },
            { path: '/new', render: () => html`<new-request-page></new-request-page>` },
            { path: '/rewards', render: () => html`<rewards-page></rewards-page>` },
        ]);
    }

    render() {
        return this.router.outlet();
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('navigate', (e) => this.router.goto(e.detail.to));
    }

    _onLogin(e) {
        this.currentUser = e.detail.user;
        this.dispatchEvent(
            new CustomEvent('login-success', {
                detail: { user: e.detail.user },
                bubbles: true,
                composed: true,
            })
        );

        window.history.pushState({}, '', '/home');
        window.dispatchEvent(new Event('location-changed'));
    }

    _onLogout() {
        removeAuthToken();
        this.currentUser = null;
        this.users = [];
        this.isTracking = false;
        this.connectionStatus = 'disconnected';

        this.dispatchEvent(
            new CustomEvent('logout', {
                bubbles: true,
                composed: true,
            })
        );
    }

    _onMapClick(e) {
        this.dispatchEvent(
            new CustomEvent('map-click', {
                detail: e.detail,
                bubbles: true,
                composed: true,
            })
        );
    }

    _onToggleTracking(e) {
        this.dispatchEvent(
            new CustomEvent('toggle-tracking', {
                detail: e.detail,
                bubbles: true,
                composed: true,
            })
        );
    }

    _onToggleShowLocation(e) {
        this.dispatchEvent(
            new CustomEvent('toggle-show-location', {
                detail: e.detail,
                bubbles: true,
                composed: true,
            })
        );
    }

    _onFocusUser(e) {
        const user = e.detail.user;
        if (user.lat !== undefined && user.lng !== undefined) {
            const map = this.map;
            if (map && map.focusLocation) {
                map.focusLocation(user.lat, user.lng, user.userDetails.id);
            }
        }
    }

    updateUsers(usersArr) {
        this.users = usersArr;
    }

    updateTracking(isTracking) {
        this.isTracking = isTracking;
    }

    updateShowLocation(showLocation) {
        this.showLocation = showLocation;
    }

    updateCoordinates(lat, lng) {
        this.currentCoordinates = { lat, lng };
    }

    updateConnectionStatus(status) {
        this.connectionStatus = status;
    }

    get map() {
        return this.renderRoot.querySelector('#map');
    }

    get userList() {
        return this.renderRoot.querySelector('#user-list');
    }
}

customElements.define('app-view', AppView);
