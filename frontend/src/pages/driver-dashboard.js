import { html, css } from 'lit';
import { BaseComponent } from '../components/base-component';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
    faUser,
    faMap,
    faChartLine,
    faHistory,
    faUserCircle,
    faCheckCircle,
    faWeightHanging,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faUser,
    faMap,
    faChartLine,
    faHistory,
    faUserCircle,
    faCheckCircle,
    faWeightHanging,
    faSun,
    faMoon
);

export class DriverDashboard extends BaseComponent {
    static properties = {
        activeTab: { type: String },
        requests: { type: Array },
        stats: { type: Object },
    };

    static styles = css`
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :host {
            display: block;
            font-family:
                'Shabnam FD',
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                sans-serif;
            direction: rtl;
            background-color: #f5f7f5;
            min-height: 100vh;
            color: #1a1a1a;
            transition:
                background-color 0.3s ease,
                color 0.3s ease;
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
        }

        /* Header Styles */
        .top-bar {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            backdrop-filter: blur(12px);
            background-color: rgba(255, 255, 255, 0.85);
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            padding: 1rem 1.25rem;
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
            color: #1a1a1a;
            letter-spacing: -0.01em;
        }

        :host(.dark) .top-bar h1 {
            color: #e4e4e4;
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

        .profile-btn {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 12px;
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3a7f3a;
            font-size: 1.25rem;
            transition: all 0.2s ease;
        }

        :host(.dark) .profile-btn {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.1);
            color: #b8b8b8;
        }

        .profile-btn:hover {
            background-color: rgba(19, 236, 19, 0.1);
        }

        :host(.dark) .profile-btn:hover {
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

        /* Main Content */
        .main {
            flex: 1;
            padding-bottom: 6rem;
        }

        /* Segmented Buttons */
        .segmented-container {
            padding: 0.75rem 1rem;
        }

        .segmented-buttons {
            display: flex;
            height: 3rem;
            background-color: #ffffff;
            border-radius: 14px;
            padding: 0.25rem;
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease;
        }

        :host(.dark) .segmented-buttons {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.08);
        }

        .segment-label {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-radius: 12px;
            padding: 0 0.5rem;
            cursor: pointer;
            color: #2d4a2d;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        :host(.dark) .segment-label {
            color: #b8b8b8;
        }

        .segment-label input {
            display: none;
        }

        .segment-label.active {
            background: linear-gradient(135deg, #13ec13 0%, #0fd60f 100%);
            color: #0a1a0a;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(19, 236, 19, 0.25);
        }

        :host(.dark) .segment-label.active {
            color: #0a1a0a;
            box-shadow: 0 2px 12px rgba(19, 236, 19, 0.35);
        }

        /* Cards Section */
        .cards-section {
            display: flex;
            flex-direction: column;
            gap: 0.875rem;
            padding: 1rem;
        }

        .request-card {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background-color: #ffffff;
            border-radius: 16px;
            padding: 1rem;
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease,
                transform 0.2s ease;
        }

        :host(.dark) .request-card {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.08);
        }

        .request-card:hover {
            transform: translateY(-2px);
        }

        .card-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            order: 2;
        }

        .card-info {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
        }

        .card-type {
            font-size: 0.875rem;
            font-weight: 500;
            color: #7a8a7a;
        }

        :host(.dark) .card-type {
            color: #8a8a8a;
        }

        .card-address {
            font-size: 0.9375rem;
            font-weight: 600;
            color: #1a1a1a;
            line-height: 1.6;
        }

        :host(.dark) .card-address {
            color: #e4e4e4;
        }

        .card-distance {
            font-size: 0.8125rem;
            color: #7a8a7a;
        }

        :host(.dark) .card-distance {
            color: #8a8a8a;
        }

        .accept-btn {
            width: 100%;
            height: 2.75rem;
            padding: 0 1.25rem;
            border-radius: 12px;
            background-color: rgba(19, 236, 19, 0.15);
            color: #15803d;
            border: 1px solid rgba(19, 236, 19, 0.3);
            font-size: 0.9375rem;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .accept-btn:hover {
            background-color: rgba(19, 236, 19, 0.25);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(19, 236, 19, 0.2);
        }

        .accept-btn:active {
            transform: translateY(0);
        }

        :host(.dark) .accept-btn {
            background-color: rgba(19, 236, 19, 0.2);
            color: #13ec13;
            border-color: rgba(19, 236, 19, 0.4);
        }

        :host(.dark) .accept-btn:hover {
            background-color: rgba(19, 236, 19, 0.3);
        }

        .card-image {
            width: 100%;
            height: 180px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            order: 1;
        }

        :host(.dark) .card-image {
            border-color: rgba(255, 255, 255, 0.08);
        }

        /* Map Button */
        .map-button-container {
            padding: 0.5rem 1rem 1rem;
        }

        .map-btn {
            width: 100%;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.625rem;
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 14px;
            color: #2d4a2d;
            font-size: 0.9375rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        :host(.dark) .map-btn {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.08);
            color: #b8b8b8;
        }

        .map-btn:hover {
            background-color: #f0f7f0;
            transform: translateY(-1px);
        }

        :host(.dark) .map-btn:hover {
            background-color: #2a2a2a;
        }

        /* Performance Stats */
        .stats-section {
            padding: 1rem 1rem 1.5rem;
        }

        .stats-title {
            font-size: 1.0625rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
        }

        :host(.dark) .stats-title {
            color: #e4e4e4;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.875rem;
        }

        .stat-card {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            background-color: #ffffff;
            border-radius: 16px;
            padding: 1rem;
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease,
                transform 0.2s ease;
        }

        :host(.dark) .stat-card {
            background-color: #1e1e1e;
            border-color: rgba(255, 255, 255, 0.08);
        }

        .stat-card:hover {
            transform: translateY(-2px);
        }

        .stat-icon {
            font-size: 1.375rem;
        }

        .stat-icon.success {
            color: #13ec13;
        }

        .stat-icon.info {
            color: #3b82f6;
        }

        .stat-value {
            font-size: 1.375rem;
            font-weight: 600;
            color: #1a1a1a;
        }

        :host(.dark) .stat-value {
            color: #e4e4e4;
        }

        .stat-unit {
            font-size: 0.875rem;
            font-weight: 400;
        }

        .stat-label {
            font-size: 0.8125rem;
            color: #7a8a7a;
        }

        :host(.dark) .stat-label {
            color: #8a8a8a;
        }

        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
            backdrop-filter: blur(12px);
            background-color: rgba(255, 255, 255, 0.85);
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            transition:
                background-color 0.3s ease,
                border-color 0.3s ease;
        }

        :host(.dark) .bottom-nav {
            background-color: rgba(30, 30, 30, 0.85);
            border-top-color: rgba(255, 255, 255, 0.08);
        }

        .nav-content {
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 4.5rem;
            max-width: 100%;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
            text-decoration: none;
            color: #7a8a7a;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0.5rem;
            border-radius: 12px;
            min-width: 60px;
        }

        :host(.dark) .nav-item {
            color: #8a8a8a;
        }

        .nav-item:hover {
            background-color: rgba(19, 236, 19, 0.05);
        }

        .nav-item.active {
            color: #13ec13;
        }

        .nav-item .icon-wrapper {
            width: 22px;
            height: 22px;
        }

        .nav-item span {
            font-size: 0.6875rem;
            font-weight: 500;
        }

        .nav-item.active span {
            font-weight: 600;
        }

        /* Small Mobile (320px - 374px) */
        @media (max-width: 374px) {
            .top-bar {
                padding: 0.875rem 1rem;
            }

            .top-bar h1 {
                font-size: 1rem;
            }

            .profile-btn {
                width: 2.5rem;
                height: 2.5rem;
            }

            .segmented-container {
                padding: 0.625rem 1rem;
            }

            .segment-label {
                font-size: 0.8125rem;
                padding: 0 0.375rem;
            }

            .cards-section {
                padding: 0.875rem;
            }

            .request-card {
                padding: 0.875rem;
            }

            .card-address {
                font-size: 0.875rem;
            }

            .nav-item span {
                font-size: 0.625rem;
            }

            .stat-value {
                font-size: 1.25rem;
            }

            .stat-icon {
                font-size: 1.25rem;
            }
        }

        /* Medium Mobile (375px - 639px) */
        @media (min-width: 375px) and (max-width: 639px) {
            .card-image {
                height: 200px;
            }
        }

        /* Large Mobile / Small Tablet (640px - 767px) */
        @media (min-width: 640px) {
            .top-bar {
                padding: 1.125rem 1.5rem;
            }

            .top-bar h1 {
                font-size: 1.25rem;
            }

            .profile-btn {
                width: 3rem;
                height: 3rem;
            }

            .main {
                padding-bottom: 5.5rem;
            }

            .segmented-container {
                padding: 1rem 1.5rem;
            }

            .segment-label {
                font-size: 0.9375rem;
            }

            .cards-section {
                padding: 1rem 1.5rem;
                gap: 1rem;
            }

            .request-card {
                flex-direction: row;
                padding: 1.25rem;
            }

            .card-content {
                flex: 2;
                order: 1;
            }

            .card-image {
                flex: 1;
                height: auto;
                min-height: 140px;
                aspect-ratio: 1;
                order: 2;
            }

            .accept-btn {
                width: fit-content;
                min-width: 100px;
            }

            .map-button-container {
                padding: 0.75rem 1.5rem 1rem;
            }

            .stats-section {
                padding: 1.25rem 1.5rem 1.5rem;
            }

            .stats-title {
                font-size: 1.125rem;
            }

            .stats-grid {
                gap: 1rem;
            }

            .stat-card {
                padding: 1.25rem;
            }

            .nav-content {
                height: 5rem;
                max-width: 640px;
                padding: 0 2rem;
            }

            .nav-item .icon-wrapper {
                width: 24px;
                height: 24px;
            }

            .nav-item span {
                font-size: 0.75rem;
            }
        }

        /* Tablet (768px - 1023px) */
        @media (min-width: 768px) {
            .container {
                max-width: 768px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
            }

            :host(.dark) .container {
                background-color: #1a1a1a;
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
            }

            .top-bar {
                padding: 1.25rem 2rem;
            }

            .top-bar h1 {
                font-size: 1.375rem;
            }

            .segmented-container {
                padding: 1rem 2rem;
            }

            .segmented-buttons {
                height: 3.5rem;
            }

            .cards-section {
                padding: 1rem 2rem;
                gap: 1.25rem;
            }

            .request-card {
                padding: 1.5rem;
            }

            .card-address {
                font-size: 1.0625rem;
            }

            .card-type {
                font-size: 0.9375rem;
            }

            .card-distance {
                font-size: 0.875rem;
            }

            .accept-btn {
                height: 3rem;
                font-size: 1rem;
                min-width: 120px;
            }

            .map-button-container {
                padding: 0.75rem 2rem 1.25rem;
            }

            .map-btn {
                font-family: inherit;
                height: 3.5rem;
                font-size: 1rem;
            }

            .stats-section {
                padding: 1.5rem 2rem 2rem;
            }

            .stats-title {
                font-size: 1.25rem;
                margin-bottom: 1.25rem;
            }

            .stats-grid {
                gap: 1.25rem;
            }

            .stat-card {
                padding: 1.5rem;
                gap: 0.75rem;
            }

            .stat-icon {
                font-size: 1.75rem;
            }

            .stat-value {
                font-size: 1.75rem;
            }

            .stat-unit {
                font-size: 1rem;
            }

            .stat-label {
                font-size: 0.9375rem;
            }

            .nav-content {
                max-width: 768px;
                padding: 0 2.5rem;
            }

            .nav-item {
                padding: 0.625rem 0.75rem;
            }
        }

        /* Desktop (1024px - 1279px) */
        @media (min-width: 1024px) {
            .container {
                max-width: 1024px;
            }

            .main {
                padding-bottom: 2rem;
            }

            .top-bar {
                padding: 1.5rem 3rem;
                position: static;
            }

            .top-bar h1 {
                font-size: 1.5rem;
            }

            .segmented-container {
                padding: 1.25rem 3rem;
            }

            .cards-section {
                padding: 1.25rem 3rem;
                gap: 1.5rem;
            }

            .request-card {
                padding: 1.75rem;
                gap: 1.5rem;
            }

            .card-image {
                min-height: 160px;
            }

            .map-button-container {
                padding: 1rem 3rem 1.5rem;
            }

            .stats-section {
                padding: 2rem 3rem 2.5rem;
            }

            .stats-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 1.5rem;
            }

            .stat-card {
                padding: 1.75rem;
            }

            /* Desktop Navigation - Horizontal with better spacing */
            .bottom-nav {
                position: static;
                border-top: none;
                border-radius: 0 0 16px 16px;
            }

            .nav-content {
                max-width: 1024px;
                height: 5.5rem;
                padding: 0 3rem;
                gap: 2rem;
            }

            .nav-item {
                flex-direction: row;
                gap: 0.625rem;
                padding: 0.75rem 1.25rem;
            }

            .nav-item .icon-wrapper {
                width: 24px;
                height: 24px;
            }

            .nav-item span {
                font-size: 0.9375rem;
            }
        }

        /* Large Desktop (1280px+) */
        @media (min-width: 1280px) {
            .container {
                max-width: 1280px;
            }

            .top-bar {
                padding: 1.75rem 4rem;
            }

            .top-bar h1 {
                font-size: 1.625rem;
            }

            .segmented-container {
                padding: 1.5rem 4rem;
            }

            .segmented-buttons {
                max-width: 600px;
                margin: 0 auto;
            }

            .cards-section {
                padding: 1.5rem 4rem;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.75rem;
            }

            .request-card {
                padding: 2rem;
            }

            .map-button-container {
                padding: 1rem 4rem 2rem;
            }

            .map-btn {
                max-width: 400px;
                margin: 0 auto;
                height: 3.75rem;
            }

            .stats-section {
                padding: 2.5rem 4rem 3rem;
            }

            .stats-title {
                font-size: 1.375rem;
                margin-bottom: 1.5rem;
            }

            .stats-grid {
                gap: 2rem;
            }

            .stat-card {
                padding: 2rem;
            }

            .stat-icon {
                font-size: 2rem;
            }

            .stat-value {
                font-size: 2rem;
            }

            .nav-content {
                max-width: 1280px;
                padding: 0 4rem;
            }
        }

        /* Extra Large Desktop (1536px+) */
        @media (min-width: 1536px) {
            .container {
                max-width: 1536px;
            }

            .cards-section {
                grid-template-columns: repeat(3, 1fr);
            }

            .stats-grid {
                max-width: 1200px;
                margin: 0 auto;
            }
        }

        /* Landscape Mobile */
        @media (max-height: 600px) and (orientation: landscape) {
            .main {
                padding-bottom: 5rem;
            }

            .nav-content {
                height: 4rem;
            }

            .top-bar {
                padding: 0.75rem 1rem;
            }

            .segmented-container {
                padding: 0.5rem 1rem;
            }

            .stats-section {
                padding: 1rem;
            }
        }

        /* Print Styles */
        @media print {
            .top-bar,
            .bottom-nav,
            .segmented-container,
            .map-button-container {
                display: none;
            }

            .main {
                padding-bottom: 0;
            }

            .request-card {
                page-break-inside: avoid;
            }
        }
    `;

    constructor() {
        super();
        this.activeTab = 'new-requests';
        this.requests = [
            {
                id: 1,
                type: 'پلاستیک و کاغذ',
                address: 'خیابان ولیعصر، کوچه سوم، پلاک ۴',
                distance: '۲ کیلومتر',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChkXjuwu00dJ3DJRI_4qfMc1Jf4xBAFLs6GAlzurrrmHY1FdsUn8EaF75oGl2SaNIDb-WshN_AeYk-fsTOQVHM0rA3tGLh7FS7S1q9tqdrDooJq_x5HuFdDUTMNtjBxtXlhvhGu2qya6TDXgbz8unWqUg2MRuW7lnLK53SyIuRlDN4c26H26h04bXBxDHsKriEoJrzaoXBd6J8uFSf6zWIrFl9B2YSrP0TCOD2rkDZiezt1iysGNn5oAbboA7SvFjlx1mFwDPZGI4',
            },
            {
                id: 2,
                type: 'فلزات',
                address: 'میدان آزادی، خیابان اصلی، جنب بانک',
                distance: '۳.۵ کیلومتر',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4j7X2-p--UNwe3SbTLRgtKAPKLvOHmipUrlVI7wPAP4JdJQOlHK0M3RNewhp1zBV9ZgcdCbLzQl9-3_tm-_F8mOUrEqNKmOFyDgdJRa26c1cFgR2bmkzYCwHqWa8br7JCpffbGN0S7_dZeHXm0VeP551f2lUHzaqNjsuzeB7HdYVbrDIDvvGle5fx16ygHvzOcgim35TPcdr9mTS0u_sHBuNmSSrL65HU9mQqc6_jnRPJHlBa-CJ13x610rnJNA0dXLrP7XQL4Y',
            },
        ];
        this.stats = {
            todayCollections: 12,
            weeklyWeight: 75,
        };
    }

    changeTab(tab) {
        this.activeTab = tab;
    }

    acceptRequest(requestId) {
        console.log('Request accepted:', requestId);
        // اینجا می‌توانید منطق پذیرش درخواست را پیاده‌سازی کنید
    }

    render() {
        const userIcon = icon({ prefix: 'fas', iconName: 'user' }).node[0];
        const mapIcon = icon({ prefix: 'fas', iconName: 'map' }).node[0];
        const chartIcon = icon({ prefix: 'fas', iconName: 'chart-line' }).node[0];
        const historyIcon = icon({ prefix: 'fas', iconName: 'history' }).node[0];
        const userCircleIcon = icon({ prefix: 'fas', iconName: 'user-circle' }).node[0];
        const checkCircleIcon = icon({ prefix: 'fas', iconName: 'check-circle' }).node[0];
        const weightIcon = icon({ prefix: 'fas', iconName: 'weight-hanging' }).node[0];
        const moonIcon = icon({ prefix: 'fa', iconName: 'moon' }).node[0];
        const sunIcon = icon({ prefix: 'fa', iconName: 'sun' }).node[0];

        return html`
            <div class="container">
                <!-- Header -->
                <div class="top-bar">
                    <button class="top-bar-button">
                        <span class="icon-wrapper">${userIcon}</span>
                    </button>
                    <h1>داشبورد راننده</h1>
                    <button class="top-bar-button" @click="${super.toggleTheme}">
                        <span class="icon-wrapper">${this.darkMode ? sunIcon : moonIcon}</span>
                    </button>
                </div>

                <!-- Main Content -->
                <main class="main">
                    <!-- Segmented Buttons -->
                    <div class="segmented-container">
                        <div class="segmented-buttons">
                            <label
                                class="segment-label ${this.activeTab === 'new-requests'
                                    ? 'active'
                                    : ''}"
                                @click="${() => this.changeTab('new-requests')}"
                            >
                                <span>درخواست‌های جدید</span>
                                <input type="radio" name="tab" value="new-requests" />
                            </label>
                            <label
                                class="segment-label ${this.activeTab === 'today-routes'
                                    ? 'active'
                                    : ''}"
                                @click="${() => this.changeTab('today-routes')}"
                            >
                                <span>مسیرهای امروز</span>
                                <input type="radio" name="tab" value="today-routes" />
                            </label>
                        </div>
                    </div>

                    <!-- Request Cards -->
                    <div class="cards-section">
                        ${this.requests.map(
                            (request) => html`
                                <div class="request-card">
                                    <div class="card-content">
                                        <div class="card-info">
                                            <p class="card-type">${request.type}</p>
                                            <p class="card-address">${request.address}</p>
                                            <p class="card-distance">فاصله: ${request.distance}</p>
                                        </div>
                                        <button
                                            class="accept-btn"
                                            @click="${() => this.acceptRequest(request.id)}"
                                        >
                                            پذیرش
                                        </button>
                                    </div>
                                    <div
                                        class="card-image"
                                        style="background-image: url('${request.image}')"
                                    ></div>
                                </div>
                            `
                        )}
                    </div>

                    <!-- Map Button -->
                    <div class="map-button-container">
                        <button class="map-btn">
                            <span class="icon-wrapper">${mapIcon}</span>
                            <span>مشاهده همه روی نقشه</span>
                        </button>
                    </div>

                    <!-- Performance Stats -->
                    <div class="stats-section">
                        <h2 class="stats-title">آمار عملکرد</h2>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="icon-wrapper stat-icon success"
                                    >${checkCircleIcon}</span
                                >
                                <p class="stat-value">${this.stats.todayCollections}</p>
                                <p class="stat-label">جمع‌آوری امروز</p>
                            </div>
                            <div class="stat-card">
                                <span class="icon-wrapper stat-icon info">${weightIcon}</span>
                                <p class="stat-value">
                                    ${this.stats.weeklyWeight}
                                    <span class="stat-unit">کیلوگرم</span>
                                </p>
                                <p class="stat-label">وزن این هفته</p>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Bottom Navigation -->
                <nav class="bottom-nav">
                    <div class="nav-content">
                        <a class="nav-item active" href="#">
                            <span class="icon-wrapper">${chartIcon}</span>
                            <span>داشبورد</span>
                        </a>
                        <a class="nav-item" href="#">
                            <span class="icon-wrapper">${historyIcon}</span>
                            <span>تاریخچه</span>
                        </a>
                        <a class="nav-item" href="#">
                            <span class="icon-wrapper">${userCircleIcon}</span>
                            <span>پروفایل</span>
                        </a>
                    </div>
                </nav>
            </div>
        `;
    }
}

customElements.define('driver-dashboard', DriverDashboard);
