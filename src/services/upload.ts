import { CLOUDINARY_CONFIG } from '../config/cloudinary';

export interface UploadResult {
  secure_url: string;
  public_id: string;
}

export const uploadService = {
  async uploadFile(file: File, folder: string = 'properties'): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', folder);

    try {
      const response = await fetch(
        `${CLOUDINARY_CONFIG.apiUrl}/${CLOUDINARY_CONFIG.cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload file');
    }
  },

  async uploadImage(file: File): Promise<string> {
    const result = await this.uploadFile(file, 'properties/images');
    return result.secure_url;
  },

  async uploadModel(file: File): Promise<string> {
    const result = await this.uploadFile(file, 'properties/models');
    return result.secure_url;
  },

  async uploadBrochure(file: File): Promise<string> {
    const result = await this.uploadFile(file, 'properties/brochures');
    return result.secure_url;
  },
};
