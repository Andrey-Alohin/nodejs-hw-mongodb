import { getContactById } from '../services/contacts.js';
import { deletePhotoInUploadDir } from './deletePhotoInUploadDir.js';
import { extractFileNameFromURL } from './extractFileNameFromURL.js';
import { getEnvVar } from './getEnvVar.js';
import {
  deleteFileOnCloudinary,
  saveFileToCloudinary,
} from './functionsCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';
import createHttpError from 'http-errors';

const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

const useDeleteFunctions = getEnvVar('ENABLE_DELETE_FILES') === 'true';

export const handleUploadFileOrUpdate = async (
  file,
  photo,
  contactData = {},
) => {
  const { _id, userId } = contactData;
  let oldPhoto = null;

  if (_id && userId) {
    const contact = await getContactById({ _id, userId });
    if (!contact) throw createHttpError(404, 'Contact not found');
    oldPhoto = contact.photo;
  }

  const deleteOldPhoto = async () => {
    if (!useDeleteFunctions) return;
    if (oldPhoto === null) return;

    if (useCloudinary && oldPhoto?.public_id) {
      await deleteFileOnCloudinary(oldPhoto.public_id);
    } else {
      const fileName = extractFileNameFromURL(oldPhoto?.url);
      if (fileName) await deletePhotoInUploadDir(fileName);
    }
  };

  if (file) {
    await deleteOldPhoto();

    return useCloudinary
      ? saveFileToCloudinary(file)
      : saveFileToUploadDir(file);
  }

  if (photo === 'null' || photo === '') {
    await deleteOldPhoto();
    return null;
  }
  return undefined;
};
