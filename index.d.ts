/// <reference types="node" />

declare module 'pdf-parse-v2' {
  /**
   * PDF.js version to use
   */
  export type PdfVersion = 'default' | 'v1.9.426' | 'v1.10.100' | 'v1.10.88' | 'v2.0.550' | string;

  /**
   * Options for the PDF parsing
   */
  export interface PDFOptions {
    /**
     * Callback for custom page rendering. If not provided, the built-in renderer is used.
     */
    pagerender?: (pageData: any) => Promise<string>;
    
    /**
     * Max number of page to parse. If the value is less than or equal to 0, parser renders all pages.
     */
    max?: number;
    
    /**
     * PDF.js version to use
     */
    version?: PdfVersion;
  }

  /**
   * Result of PDF parsing
   */
  export interface PDFData {
    /**
     * Total number of pages in the PDF document
     */
    numpages: number;
    
    /**
     * Number of pages that were rendered
     */
    numrender: number;
    
    /**
     * PDF document info, such as title, author, subject, etc.
     */
    info: Record<string, any> | null;
    
    /**
     * PDF document metadata
     */
    metadata: Record<string, any> | null;
    
    /**
     * Extracted text from the PDF
     */
    text: string;
    
    /**
     * PDF.js version used for parsing
     */
    version: string | null;
  }

  /**
   * Parse PDF data from a buffer
   * @param dataBuffer - The PDF data as a Buffer
   * @param options - Parsing options
   * @returns A promise that resolves to the parsed PDF data
   */
  function PDFParse(dataBuffer: Buffer, options?: PDFOptions): Promise<PDFData>;

  export default PDFParse;
}
