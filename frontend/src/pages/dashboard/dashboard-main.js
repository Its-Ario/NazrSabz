import { html, css } from 'lit';
import { BaseComponent } from '../../components/base-component.js';

class DashboardPage extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            height: 100vh;
        }
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    `;

    static properties = {
        user: { type: Object },
        activeView: { type: Object },
    };

    async firstUpdated() {
        await this.loadRoleView();
    }

    async loadRoleView() {
        if (!this.user) {
            window.location.href = '/';
            return;
        }

        const role = this.user.role;
        console.log(this.user);

        try {
            switch (role) {
                case 'ADMIN':
                    await import('./admin-dashboard.js');
                    this.activeView = html`<admin-dashboard .user=${this.user}></admin-dashboard>`;
                    break;
                case 'MANAGER':
                    // await import('./views/manager-view.js');
                    // this.activeView = html`<manager-view .user=${this.user}></manager-view>`;
                    break;
                case 'DRIVER':
                    await import('./driver-dashboard.js');
                    this.activeView = html`<driver-dashboard
                        .user=${this.user}
                    ></driver-dashboard>`;
                    break;
                case 'USER':
                default:
                    await import('./user-dashboard.js');
                    this.activeView = html`<user-dashboard .user=${this.user}></user-dashboard>`;
                    break;
            }
        } catch (err) {
            console.error('Failed to load dashboard view', err);
            this.activeView = html`<div>Error loading dashboard.</div>`;
        }
    }

    render() {
        if (!this.activeView) {
            return html`<div class="loading">Loading Dashboard...</div>`;
        }
        return this.activeView;
    }
}
customElements.define('dashboard-page', DashboardPage);
