import { Router } from 'express';
import { isValidID } from '../middlewares/isValidID.js';
import {
  getAllContactsController,
  createContactController,
  getContactByIdController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';

const router = Router();

const isValidContactID = isValidID('contactId');

router.get('/', ctrlWrapper(getAllContactsController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.get(
  '/:contactId',
  isValidContactID,
  ctrlWrapper(getContactByIdController),
);

router.delete(
  '/:contactId',
  isValidContactID,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/:contactId',
  isValidContactID,
  validateBody(patchContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
