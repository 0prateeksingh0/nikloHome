/**
 * Service to convert PDF pages to images for flip book display
 * Uses PDF.js to render PDF pages to canvas and convert to images
 */

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFPageImage {
  pageNumber: number;
  imageUrl: string;
}

export class PDFToImagesService {
  /**
   * Convert PDF URL to array of page images using PDF.js
   * @param pdfUrl - The PDF URL (Cloudinary or direct)
   * @param maxPages - Maximum number of pages to convert (default: 20)
   * @returns Promise<PDFPageImage[]> - Array of page images
   */
  static async convertPDFToImages(
    pdfUrl: string, 
    maxPages: number = 20
  ): Promise<PDFPageImage[]> {
    try {
      console.log('Loading PDF from URL:', pdfUrl);
      
      // Load the PDF document with CORS configuration
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
        cMapPacked: true,
        withCredentials: false,
        httpHeaders: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      const actualPageCount = Math.min(totalPages, maxPages);
      
      console.log(`PDF loaded successfully. Total pages: ${totalPages}, Processing: ${actualPageCount}`);
      
      const pageImages: PDFPageImage[] = [];
      
      // Process each page
      for (let pageNum = 1; pageNum <= actualPageCount; pageNum++) {
        try {
          console.log(`Processing page ${pageNum}...`);
          const page = await pdf.getPage(pageNum);
          const imageUrl = await this.renderPageToImage(page, pageNum);
          
          pageImages.push({
            pageNumber: pageNum,
            imageUrl: imageUrl
          });
          console.log(`Page ${pageNum} processed successfully`);
        } catch (pageError) {
          console.error(`Error processing page ${pageNum}:`, pageError);
          // Continue with other pages even if one fails
        }
      }
      
      console.log(`Successfully processed ${pageImages.length} pages`);
      return pageImages;
    } catch (error) {
      console.error('Error converting PDF to images:', error);
      throw error;
    }
  }

  /**
   * Render a PDF page to an image URL
   */
  private static async renderPageToImage(page: any, pageNumber: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Set up canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate scale for high DPI displays
        const scale = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: 1 });
        
        // Set canvas dimensions
        canvas.width = viewport.width * scale;
        canvas.height = viewport.height * scale;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        
        // Scale the context
        context.scale(scale, scale);
        
        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderContext).promise.then(() => {
          // Convert canvas to data URL
          const imageUrl = canvas.toDataURL('image/png', 0.9);
          resolve(imageUrl);
        }).catch((renderError: any) => {
          console.error(`Error rendering page ${pageNumber}:`, renderError);
          reject(renderError);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Alternative method using Cloudinary transformations (if available)
   * This method creates image URLs using Cloudinary's PDF to image conversion
   */
  static async convertPDFToImagesCloudinary(
    pdfUrl: string, 
    maxPages: number = 20
  ): Promise<PDFPageImage[]> {
    try {
      // Check if it's a Cloudinary URL
      if (!pdfUrl.includes('cloudinary.com')) {
        throw new Error('Only Cloudinary PDFs are supported for this method');
      }

      // Extract public ID from Cloudinary URL
      const publicId = this.extractPublicId(pdfUrl);
      if (!publicId) {
        throw new Error('Invalid Cloudinary URL');
      }

      // For Cloudinary, we can generate URLs for each page
      // This assumes the PDF is uploaded to Cloudinary
      const pageImages: PDFPageImage[] = [];
      
      // We'll try to get page count first, but for now use a reasonable default
      const estimatedPages = Math.min(15, maxPages);
      
      for (let i = 1; i <= estimatedPages; i++) {
        const pageImageUrl = this.generateCloudinaryPageUrl(pdfUrl, i);
        pageImages.push({
          pageNumber: i,
          imageUrl: pageImageUrl
        });
      }
      
      return pageImages;
    } catch (error) {
      console.error('Error converting PDF to images (Cloudinary method):', error);
      throw error;
    }
  }

  /**
   * Extract public ID from Cloudinary URL
   */
  private static extractPublicId(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      
      // Cloudinary URL format: /v{version}/{public_id}.{format}
      if (pathParts.length >= 3) {
        const publicIdWithFormat = pathParts[pathParts.length - 1];
        // Remove file extension
        return publicIdWithFormat.replace(/\.(pdf|PDF)$/, '');
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Generate Cloudinary URL for specific page
   */
  private static generateCloudinaryPageUrl(originalUrl: string, pageNumber: number): string {
    try {
      const urlObj = new URL(originalUrl);
      const pathParts = urlObj.pathname.split('/');
      
      console.log('Original URL:', originalUrl);
      console.log('Hostname:', urlObj.hostname);
      console.log('Pathname:', urlObj.pathname);
      console.log('Path parts:', pathParts);
      
      // Extract cloud name from the hostname
      // Cloudinary URL format: {cloud_name}.cloudinary.com
      const hostParts = urlObj.hostname.split('.');
      let cloudName = hostParts[0]; // First part before .cloudinary.com
      
      // Handle case where hostname might be res.cloudinary.com
      if (hostParts[0] === 'res' && hostParts.length > 1) {
        cloudName = hostParts[1]; // Get the actual cloud name
      }
      
      // Get the public ID (last part of the path)
      const publicIdWithFormat = pathParts[pathParts.length - 1];
      const publicId = publicIdWithFormat.replace(/\.(pdf|PDF)$/, '');
      
      // Insert transformation parameters
      const transformations = [
        'f_png', // Format: PNG
        'q_auto', // Quality: auto
        'w_800', // Width: 800px
        'h_auto', // Height: auto (maintain aspect ratio)
        `pg_${pageNumber}`, // Page number
        'dpr_2' // Device pixel ratio for high DPI displays
      ].join(',');
      
      // Reconstruct URL with proper Cloudinary format
      // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.pdf
      const newPath = `/image/upload/${transformations}/${publicId}.pdf`;
      const finalUrl = `${urlObj.protocol}//res.cloudinary.com/${cloudName}${newPath}`;
      
      console.log('Generated Cloudinary URL:', finalUrl);
      console.log('Cloud name:', cloudName);
      console.log('Public ID:', publicId);
      console.log('Transformations:', transformations);
      
      return finalUrl;
    } catch (error) {
      console.error('Error generating Cloudinary page URL:', error);
      return originalUrl; // Fallback to original URL
    }
  }
}
