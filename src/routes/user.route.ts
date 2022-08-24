import express, { Router, Request, Response } from 'express';
import User from '../models/User';

const router: Router = express.Router();

router.get('/:username', async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  console.log(`Found ${user.username}.`);
  return res.status(200).json(user);
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.username = req.body.username;
    user.token = req.body.token;
    user.save();
    console.log(`User ${user.username} has been saved.`);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch('/:username/token', async (req: Request, res: Response) => {
  const username = req.params.username;
  const { token } = req.body;
  const user = await User.findOneAndUpdate({ username }, { token }, { new: true });
  if (!user) {
    return res.status(404).json({ message: `Could not find a user with ${username}`});
  }
  console.log(`User ${username} has been updated.`);
  return res.status(200).json(user);
});

router.delete('/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  const user = await User.findOneAndDelete({ username });
  if (!user) {
    return res.status(404).json({ message: `Could not delete a user with ${username}`});
  }
  console.log(`User ${username} has been deleted.`);
  return res.status(204);
})

export { router as UserRouter };