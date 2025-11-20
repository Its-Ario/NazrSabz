import { LitElement } from 'lit';

export class BaseComponent extends LitElement {
    static properties = {
        darkMode: { type: Boolean },
    };

    constructor() {
        super();

        const saved = localStorage.getItem('theme-mode');
        const prefers = window.matchMedia('(prefers-color-scheme: dark)');

        if (saved === 'dark') this.darkMode = true;
        else if (saved === 'light') this.darkMode = false;
        else this.darkMode = prefers.matches;

        prefers.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme-mode')) {
                this.darkMode = e.matches;
            }
        });

        this._handleStorageChange = this._handleStorageChange.bind(this);
        this._handleThemeChange = this._handleThemeChange.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        window.addEventListener('storage', this._handleStorageChange);

        window.addEventListener('theme-change', this._handleThemeChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('storage', this._handleStorageChange);
        window.removeEventListener('theme-change', this._handleThemeChange);
    }

    _handleStorageChange(e) {
        if (e.key === 'theme-mode' && e.newValue) {
            this.darkMode = e.newValue === 'dark';
        }
    }

    _handleThemeChange(e) {
        this.darkMode = e.detail.darkMode;
    }

    updated(changedProps) {
        if (changedProps.has('darkMode')) {
            this.classList.toggle('dark', this.darkMode);
        }
    }

    setTheme(mode) {
        this.darkMode = mode === 'dark';
        localStorage.setItem('theme-mode', mode);

        window.dispatchEvent(
            new CustomEvent('theme-change', {
                detail: { darkMode: this.darkMode },
            })
        );
    }

    toggleTheme() {
        const newMode = this.darkMode ? 'light' : 'dark';
        this.setTheme(newMode);
    }
}
