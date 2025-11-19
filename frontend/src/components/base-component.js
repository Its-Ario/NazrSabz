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
    }

    updated(changedProps) {
        if (changedProps.has('darkMode')) {
            this.classList.toggle('dark', this.darkMode);
        }
    }

    setTheme(mode) {
        this.darkMode = mode === 'dark';
        localStorage.setItem('theme-mode', mode);
    }

    toggleTheme() {
        const newMode = this.darkMode ? 'light' : 'dark';
        this.setTheme(newMode);
    }
}
