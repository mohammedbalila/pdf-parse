import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse-v2';

// Example 1: Basic usage
async function basicExample() {
  try {
    // Load PDF file as buffer
    const dataBuffer = fs.readFileSync(path.join(__dirname, '../test/data/01-valid.pdf'));
    
    // Parse PDF
    const data = await pdfParse(dataBuffer);
    
    console.log('Number of pages:', data.numpages);
    console.log('Number of rendered pages:', data.numrender);
    console.log('PDF Info:', data.info);
    console.log('PDF Metadata:', data.metadata);
    console.log('PDF.js version:', data.version);
    console.log('Text excerpt:', data.text.slice(0, 500) + '...');
  } catch (error) {
    console.error('Error in basic example:', error);
  }
}

// Example 2: Custom page renderer
async function customRendererExample() {
  try {
    // Define custom page renderer
    const customPageRenderer = async (pageData: any): Promise<string> => {
      // Get text content options
      const renderOptions = {
        normalizeWhitespace: true,
        disableCombineTextItems: false
      };

      // Get text content
      const textContent = await pageData.getTextContent(renderOptions);
      
      // Return text in custom format (all uppercase)
      return textContent.items
        .map((item: any) => item.str.toUpperCase())
        .join(' ');
    };

    // Load PDF file
    const dataBuffer = fs.readFileSync(path.join(__dirname, '../test/data/01-valid.pdf'));
    
    // Parse with options
    const data = await pdfParse(dataBuffer, {
      pagerender: customPageRenderer,
      max: 2, // only process first 2 pages
      version: 'v1.10.100'
    });
    
    console.log('Custom renderer result (excerpt):', data.text.slice(0, 500) + '...');
  } catch (error) {
    console.error('Error in custom renderer example:', error);
  }
}

// Run examples
async function runExamples() {
  console.log('--- Running Basic Example ---');
  await basicExample();
  
  console.log('\n--- Running Custom Renderer Example ---');
  await customRendererExample();
}

runExamples().catch(console.error);
