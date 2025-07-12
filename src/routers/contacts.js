import { Router } from 'express';
import {
  getAllContactsController,
  createContactController,
  getContactByIdController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.post('/', ctrlWrapper(createContactController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

export default router;
