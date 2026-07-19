import fs from 'fs';
import path from 'path';

const appPath = path.join(process.cwd(), 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf-8');

function extractSection(startComment, endComment) {
    const startIndex = appContent.indexOf(startComment);
    const endIndex = appContent.indexOf(endComment);
    
    if (startIndex !== -1 && endIndex !== -1) {
        const section = appContent.substring(startIndex, endIndex);
        return { section, startIndex, endIndex };
    }
    return null;
}

// Extract Footer
const footerExt = extractSection('// Footer Component', '// ScrollToTop helper component');
if (footerExt) {
    appContent = appContent.substring(0, footerExt.startIndex) + '\n\n' + appContent.substring(footerExt.endIndex);
    const importStr = "import Footer from './components/layout/Footer';\n";
    appContent = appContent.replace("import React, {", importStr + "import React, {");
    
    const footerCode = `import React, { useState } from 'react';\nimport { Link } from 'react-router-dom';\n\n` + footerExt.section;
    fs.writeFileSync(path.join(process.cwd(), 'src', 'components', 'layout', 'Footer.tsx'), footerCode, 'utf-8');
    console.log("Footer extracted to components/layout/Footer.tsx");
}

fs.writeFileSync(appPath, appContent, 'utf-8');
console.log('App.tsx updated for Footer.');
