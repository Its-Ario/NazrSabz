import { html } from 'lit';
import { BaseComponent } from '../../components/base-component.js';

class AdminDashboard extends BaseComponent {
    static properties = {
        user: { type: Object },
    };

    render() {
        return html`
            <div class="admin-panel">
                <h1>پنل مدیریت</h1>
                <div class="stats-grid">
                    <div class="card">Total Users: 5000</div>
                    <div class="card">System Health: Good</div>
                </div>
            </div>
        `;
    }
}
customElements.define('admin-dashboard', AdminDashboard);
