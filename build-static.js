import fs from 'fs-extra';

// Source and destination paths
const sourcePath = 'app/index.html';
const destinationPath = 'dist/index.html';
const sourceFontsDir = 'app/assets/fonts';
const destinationFontsDir = 'dist/assets/fonts';

// Function to delete the destination fonts directory
const deleteFontsDir = () => {
  return fs.remove(destinationFontsDir);
};

// Function to copy the HTML file
const copyHtmlFile = () => {
  return fs.copyFile(sourcePath, destinationPath);
};

// Function to copy the fonts directory
const copyFontsDir = () => {
  return fs.copy(sourceFontsDir, destinationFontsDir);
};

// Delete the destination fonts directory first
deleteFontsDir()
  .then(() => {
    console.log('Fonts directory deleted');
    // After deletion, copy the HTML file
    return copyHtmlFile();
  })
  .then(() => {
    console.log('index.html copied to dist');
    // After copying HTML, copy the fonts directory
    return copyFontsDir();
  })
  .then(() => {
    console.log('Fonts copied to dist');
  })
  .catch((err) => {
    console.error('Error:', err);
  });
