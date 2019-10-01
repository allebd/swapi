import express from 'express';
import movie from './movie';
import character from './character';
import comment from './comment';

const router = express.Router();

router.use('/', movie, character, comment);

export default router;
