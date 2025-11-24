import { Router } from 'express';
import userService from '../services/userService.js';
import auth, { isAdmin } from '../middleware/authMiddleware.js';
import authService from '../services/authService.js';
import si from 'systeminformation';

const router = Router();
router.use(auth, isAdmin);

router.get('/', (req, res) => {
    res.status(200).json('Hi, Admin');
});

router.post('/adduser', async (req, res) => {
    const { ...data } = req.body;
    const newUser = await authService.registerUser({
        ...data,
    });
    res.status(201).json(newUser);
});

router.patch('/changerole/:id', async (req, res) => {
    const user = await userService.getUserProfile(req.params.id);
    const newRole = req.body.role;
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });

    const validRoles = ['ADMIN', 'USER', 'MANAGER, DRIVER'];
    if (!validRoles.includes(newRole)) {
        return res.status('400').json({
            ok: false,
            message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
        });
    }

    const updatedUser = await userService.updateRole(req.params.id, newRole);

    res.json({
        ok: true,
        message: 'Role updated successfuly',
        username: updatedUser.username,
    });
});

router.get('/health', async (req, res) => {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const time = await si.time();

    const result = {
        status: 'operational',
        uptime: Math.floor(time.uptime / 3600),
        serverLoad: Math.round(cpu.currentLoad),
        memoryUsage: Math.round((mem.active / mem.total) * 100),
    };

    res.json({ ok: true, result });
});

export default router;
