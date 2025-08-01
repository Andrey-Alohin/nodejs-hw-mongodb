import fs from 'fs/promises';
import path from 'path';
import { UPLOAD_DIR } from '../constants/index.js';

export const deletePhotoInUploadDir = async (fileName) => {
  try {
    const pathToFile = path.join(UPLOAD_DIR, fileName);
    await fs.unlink(pathToFile);
  } catch (error) {
    console.log('Error in delete file in uploads dir', error);
  }
};
