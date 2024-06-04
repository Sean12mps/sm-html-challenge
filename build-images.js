import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';

// Define input and output directories
const sourceDir = 'app/assets/images';
const outputDir = 'dist/assets/images';

// Function to delete the images folder in the dist directory
async function deleteDistImagesFolder() {
  try {
    // Check if the images folder exists in the dist directory
    const imagesFolderExists = await fs.pathExists(outputDir);

    // If it exists, delete it
    if (imagesFolderExists) {
      await fs.remove(outputDir);
      console.log('Deleted the images folder in the dist directory.');
    }
  } catch (error) {
    console.error('Error deleting the images folder in the dist directory:', error);
  }
}

// Function to convert images
async function convertImages() {
  try {
    // Delete the images folder in the dist directory
    await deleteDistImagesFolder();

    // Get all image files recursively from the source directory
    const imageFiles = await new Promise((resolve, reject) => {
      glob('**/*.{jpg,png,svg}', { cwd: sourceDir, nodir: true }, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    // Process each image file
    for (const file of imageFiles) {
      const inputFilePath = path.join(sourceDir, file);
      const outputFilePath = path.join(outputDir, file);

      // Get the directory part of the file path
      const outputSubDir = path.dirname(outputFilePath);

      // Ensure the output subdirectory exists
      await fs.ensureDir(outputSubDir);

      // Minify and optimize image
      await imagemin([inputFilePath], {
        destination: outputSubDir,
        plugins: [
          imageminWebp({
            quality: 75 // adjust quality as needed
          })
        ]
      });

      console.log(`Converted: ${inputFilePath} -> ${outputFilePath}`);
    }

    console.log('All images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

// Run the function to convert images
convertImages();
