import driverService from '../services/driverService.js';
import { throwError } from '../utils/AppError.js';

const getProfile = async (req, res, next) => {
    try {
        const result = await driverService.getDriverProfile(req.user.id);
        res.status(200).json({
            ok: true,
            result,
        });
    } catch (error) {
        next(error);
    }
};

const getRequests = async (req, res, next) => {
    try {
        const lat = parseFloat(req.query.lat);
        const lng = parseFloat(req.query.lng);

        if (isNaN(lat) || isNaN(lng)) {
            throwError('Invalid Latitude or Longitude', 400, {
                code: 'ERR_INVALID_COORDS',
            });
        }

        const { nearbyRaw, activeRoutes } = await driverService.getNearbyRequests(
            req.user.id,
            lat,
            lng
        );

        // Map Raw DB data to Clean JSON for Frontend
        const nearby = nearbyRaw.map((req) => {
            const mainItem = req.items && req.items[0] ? req.items[0] : { type: 'unknown' };
            const addrString =
                req.address && req.address.fullAddress
                    ? req.address.fullAddress
                    : 'Address not set';

            return {
                id: req.id,
                type: mainItem.type || 'general',
                title: `Pick up ${mainItem.type || 'Waste'}`,
                address: addrString,
                dist: `${req.distance_km} km`,
                image: null,
            };
        });

        console.log(nearby, nearbyRaw);

        res.status(200).json({
            ok: true,
            result: {
                nearby,
                activeRoutes,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!['ONLINE', 'OFFLINE', 'BUSY'].includes(status)) {
            throwError('Invalid status value', 400, { code: 'ERR_INVALID_STATUS' });
        }

        await driverService.updateStatus(req.user.id, status);
        res.status(200).json({ ok: true });
    } catch (error) {
        next(error);
    }
};

const acceptRequest = async (req, res, next) => {
    try {
        const route = await driverService.acceptRequest(req.user.id, req.params.id);
        res.status(200).json({ ok: true, result: route });
    } catch (error) {
        next(error);
    }
};

const completeRequest = async (req, res, next) => {
    try {
        await driverService.completeRequest(req.user.id, req.params.id);
        res.status(200).json({ ok: true });
    } catch (error) {
        next(error);
    }
};

export { getProfile, getRequests, updateStatus, acceptRequest, completeRequest };
