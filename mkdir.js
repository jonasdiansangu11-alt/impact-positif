import fs from 'fs';
import path from 'path';

const dirs = [
  'src/components',
  'src/components/layout',
  'src/components/sections',
  'src/components/ui',
  'src/pages',
  'src/data'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});
console.log('Directories created');
