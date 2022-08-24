import express, { Router } from 'express';
import { NotificationRouter } from './noti.route';
import { UserRouter } from './user.route';

const router: Router = express.Router();

router.use('/api/users', UserRouter);
router.use('/api/notifications', NotificationRouter);

export default router;