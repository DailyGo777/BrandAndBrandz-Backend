import express from 'express'
import { contacts } from '../controllers/contactController.js';

const router = express.Router();

router.post("/contacts", contacts);

export default router;