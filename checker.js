const fs = require('fs');
const path = require('path');

// Path to your components directory
const componentsDir = path.join(__dirname, 'components');

// Function to search for component usage
function searchComponentUsage(componentName) {
    const pagesDir = path.join(__dirname, 'pages');
    const files = fs.readdirSync(pagesDir);

    for (const file of files) {
        const filePath = path.join(pagesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        if (content.includes(componentName)) {
            return true;
        }
    }
    return false;
}

// Check each component
fs.readdirSync(componentsDir).forEach(file => {
    const componentName = path.basename(file, path.extname(file));
    if (!searchComponentUsage(componentName)) {
        console.log(`Component ${componentName} is not used in any page.`);
    }
});