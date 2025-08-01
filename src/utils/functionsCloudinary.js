import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return {
    url: response.secure_url,
    public_id: response.public_id,
  };
};

export const deleteFileOnCloudinary = async (public_id) => {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
    return true;
  } catch (error) {
    console.log('Error in delete cloudinary file', error);
    return false;
  }
};
