import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// The new logo HTML
const newLogo = `<span className="text-red-600 font-extrabold drop-shadow-md">IMPACT</span>\n              <span className="text-white font-extrabold drop-shadow-md ml-1">POSITIF</span>`;
const newLogoSingleLine = `<span className="text-red-600 font-extrabold drop-shadow-md">IMPACT</span><span className="text-white font-extrabold drop-shadow-md ml-1">POSITIF</span>`;

// Replace all variations of the logo that still say "IMPACT</span> EVENT" or "IMPACT</span> POSITIF"
// Note: Some have <span className="text-red-500">IMPACT</span> EVENT
// Some have <span className="text-red-500">IMPACT</span>\n              <span className="text-foreground-950"> POSITIF</span>
content = content.replace(/<span className="text-red-500">IMPACT<\/span>\s*EVENT/g, newLogoSingleLine);
content = content.replace(/<span className="text-red-500">IMPACT<\/span>\s*<span[^>]*>\s*POSITIF<\/span>/g, newLogoSingleLine);
content = content.replace(/<span className="text-red-500">IMPACT<\/span>\s*POSITIF/g, newLogoSingleLine);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully fixed all logo variations in App.tsx');
