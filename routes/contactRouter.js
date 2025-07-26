import express from 'express'
import { contacts } from '../controllers/contactController.js';
import { limiter } from '../middleware.js';

const router = express.Router();

router.post("/contacts", limiter, contacts);

export default router;