import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.post('/', ctrlWrapper(createContactController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

export default router;
