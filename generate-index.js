import fs from 'fs';
import path from 'path';

const assetsDir = 'dist/client/assets';
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const mainJs = files.find(f => f.startsWith('main-') && f.endsWith('.js'));
  if (mainJs) {
    const html = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Idraulica Franceschina - Pronto Intervento Milano</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"></script>
</body>
</html>`;
    fs.writeFileSync('dist/client/index.html', html);
    console.log('Generated dist/client/index.html with', mainJs);
  } else {
    console.error('Could not find main JS bundle in', assetsDir);
  }
} else {
  console.error('Assets directory not found:', assetsDir);
}
