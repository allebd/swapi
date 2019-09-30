import express from 'express';
import movie from './movie';
import character from './character';

const router = express.Router();

router.use('/', movie, character);

export default router;
