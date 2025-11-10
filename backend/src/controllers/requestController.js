import requestService from '../services/requestService.js';

function isSafeObject(obj) {
    if (!obj || typeof obj !== 'object' || obj.constructor !== Object) return false;

    for (const key in obj) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') return false;

        const value = obj[key];

        if (typeof value === 'function' || typeof value === 'symbol') return false;

        if (
            value &&
            typeof value === 'object' &&
            value.constructor !== Object &&
            !Array.isArray(value)
        )
            return false;
    }

    return true;
}

export const createRequest = async (req, res) => {
    const {
        requesterId,
        items,
        scheduledAt = null,
        priority = 'normal',
        metadata,
        address,
    } = req.body;

    if (!requesterId || typeof requesterId !== 'string') {
        return res.status(400).json({ ok: false, message: 'Invalid Requester ID' });
    }

    if (!items || typeof items !== 'object' || !isSafeObject(items)) {
        return res.status(400).json({ ok: false, message: 'Invalid Items' });
    }

    if (typeof metadata !== 'object' && typeof metadata !== 'undefined') {
        return res.status(400).json({ ok: false, message: 'Invalid Metadata' });
    }

    if (typeof address !== 'object' && typeof address !== 'undefined') {
        return res.status(400).json({ ok: false, message: 'Invalid Address' });
    }

    const result = await requestService.createRequest({
        requesterId,
        items,
        scheduledAt,
        priority,
        metadata,
        address,
    });

    res.json(result);
};

export const updateStatus = async (req, res) => {
    const { requestId, status } = req.body;

    if (typeof requestId !== 'string' || typeof status !== 'string') {
        return res.status(400).json({ ok: false, message: 'Invalid Input' });
    }

    const result = await requestService.updateStatus(requestId, status);

    res.json(result);
};

export const updateCollector = async (req, res) => {
    const { requestId, collectorId } = req.body;

    const result = await requestService.updateCollector(requestId, collectorId);

    res.json(result);
};

export const getRequestById = async (req, res) => {
    const { id } = req.query;

    const result = await requestService.getRequestById(id);

    res.json(result);
};
