import fs from 'fs';
import path from 'path';

const appPath = path.join(process.cwd(), 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf-8');

// Helper to extract a component by its starting and ending comments
function extractSection(startComment, endComment) {
    const startIndex = appContent.indexOf(startComment);
    const endIndex = appContent.indexOf(endComment);
    
    if (startIndex !== -1 && endIndex !== -1) {
        const section = appContent.substring(startIndex, endIndex);
        return { section, startIndex, endIndex };
    }
    return null;
}

// 1. Extract Header
const headerExt = extractSection('// Header / Navigation Component', '// Helper animation component for fade-in and slide-up on scroll');
if (headerExt) {
    appContent = appContent.substring(0, headerExt.startIndex) + '\n\n' + appContent.substring(headerExt.endIndex);
    // Add import statement at the top after React imports
    const importStr = "import Header from './components/layout/Header';\n";
    appContent = appContent.replace("import React, {", importStr + "import React, {");
    console.log("Header removed from App.tsx and imported.");
}

fs.writeFileSync(appPath, appContent, 'utf-8');
console.log('App.tsx updated.');
