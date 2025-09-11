/**
 * Service to convert PDF pages to images for flip book display
 * Uses PDF.js to render PDF pages to canvas and convert to images
 */

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker with CDN fallback for Vercel compatibility
const configurePDFWorker = () => {
  // Use CDN worker directly for Vercel deployment
  const cdnWorkerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  const jsdelivrWorkerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  
  // Set CDN worker as primary (more reliable on Vercel)
  pdfjsLib.GlobalWorkerOptions.workerSrc = cdnWorkerSrc;
  
  console.log('🔧 PDF.js worker configured for Vercel deployment');
  console.log('📡 Using CDN worker:', cdnWorkerSrc);
  
  // Test CDN worker and fallback if needed
  fetch(cdnWorkerSrc, { method: 'HEAD' })
    .then(response => {
      if (!response.ok) {
        console.warn('CDN worker failed, trying jsdelivr...');
        pdfjsLib.GlobalWorkerOptions.workerSrc = jsdelivrWorkerSrc;
        console.log('✅ PDF.js worker loaded from jsdelivr fallback');
      } else {
        console.log('✅ PDF.js worker loaded from CDN');
      }
    })
    .catch(() => {
      console.log('✅ PDF.js worker loaded from jsdelivr fallback');
    });
};

// Configure worker
configurePDFWorker();

// Add global error handler for unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection in PDF service:', event.reason);
    // Don't prevent default to allow other error handlers to work
  });
}

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
      
      // Add progress tracking
      loadingTask.onProgress = (progress) => {
        if (progress.total > 0) {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          console.log(`PDF loading progress: ${percent}%`);
        }
      };
      
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
          // Add a placeholder for failed pages to maintain page order
          pageImages.push({
            pageNumber: pageNum,
            imageUrl: `data:image/svg+xml;base64,${btoa(`
              <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16">
                  Page ${pageNum} - Error Loading
                </text>
              </svg>
            `)}`
          });
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

        page.render(renderContext).promise
          .then(() => {
            try {
              // Convert canvas to data URL
              const imageUrl = canvas.toDataURL('image/png', 0.9);
              console.log(`Page ${pageNumber} rendered successfully`);
              resolve(imageUrl);
            } catch (conversionError) {
              console.error(`Error converting page ${pageNumber} to image:`, conversionError);
              reject(conversionError);
            }
          })
          .catch((renderError: any) => {
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
