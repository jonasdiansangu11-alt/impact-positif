import fs from 'fs';
import path from 'path';

// Fix index.html
const indexHtmlPath = path.join(process.cwd(), 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
indexHtml = indexHtml.replace(/IMPACT EVENT/g, 'IMPACT POSITIF');
indexHtml = indexHtml.replace(/impact event/gi, 'impact positif');
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf-8');

// Fix App.tsx (emails and handles)
const appTsxPath = path.join(process.cwd(), 'src', 'App.tsx');
let appTsx = fs.readFileSync(appTsxPath, 'utf-8');
appTsx = appTsx.replace(/impactevent\.com/g, 'impactpositif.com');
appTsx = appTsx.replace(/impacteventglobal/g, 'impactpositif');
appTsx = appTsx.replace(/impactevent/g, 'impactpositif');
fs.writeFileSync(appTsxPath, appTsx, 'utf-8');

console.log('Successfully updated all remaining references to impact positif.');
