const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const outputDir = path.join(__dirname, './');
const files = {
  solo: ['Mindset.pdf'],
  bonus1: ['Mindset.pdf', 'Productividad Extrema.pdf', 'Metas Efectivas.pdf'],
  bonus2: ['Mindset.pdf', 'Productividad Extrema.pdf'],
  bonus3: ['Mindset.pdf', 'Metas Efectivas.pdf'],
};

for (const tipo in files) {
  const zipPath = path.join(outputDir, `${tipo}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);

  files[tipo].forEach(file => {
    const filePath = path.join(outputDir, file);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: file });
    } else {
      console.warn(`⚠️ No encontrado: ${file}`);
    }
  });

  archive.finalize();
}
