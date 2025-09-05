// Cloudinary Configuration
// Uses environment variables for security

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset',
  apiUrl: 'https://api.cloudinary.com/v1_1',
};

// Instructions for setup:
// 1. Go to https://cloudinary.com and create an account
// 2. Get your Cloud Name from the dashboard
// 3. Go to Settings > Upload and create an unsigned upload preset
// 4. Add the following to your .env file:
//    VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
//    VITE_CLOUDINARY_UPLOAD_PRESET=your_actual_upload_preset
// 5. Make sure your upload preset allows unsigned uploads for security
