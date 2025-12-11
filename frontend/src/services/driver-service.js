import { getAuthToken } from '../utils/auth.js';

const API_BASE = '/api/driver';

export const DriverService = {
    async getProfile() {
        const token = getAuthToken();
        console.log(token);
        const res = await fetch(`${API_BASE}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error('Failed to load profile');
        return await res.json();
    },

    async getNearbyRequests(lat, lng) {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE}/requests?lat=${lat}&lng=${lng}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error('Failed to fetch requests');
        return await res.json();
    },

    async toggleStatus(isOnline) {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE}/status`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: isOnline ? 'ONLINE' : 'OFFLINE' }),
        });

        if (!res.ok) throw new Error('Failed to update status');
        return await res.json();
    },

    async acceptRequest(requestId) {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE}/requests/${requestId}/accept`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error('Request already taken');
        const data = await res.json();
        return data.route;
    },
};
