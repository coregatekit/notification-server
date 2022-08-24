import express, { Router, Request, Response } from 'express';
import { sendNotificationToSpecificDevice } from '../firebase';
import User from '../models/User';

const router: Router = express.Router();

router.post('/send-single', async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Could not find a user' });
    }
    sendNotificationToSpecificDevice(username, user.token);
    return res.status(200).json({ message: `Sending a notification to ${username}`});
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as NotificationRouter };