import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace all instances of IMPACT EVENT with IMPACT POSITIF
content = content.replaceAll('IMPACT EVENT', 'IMPACT POSITIF');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully replaced IMPACT EVENT with IMPACT POSITIF in App.tsx');
