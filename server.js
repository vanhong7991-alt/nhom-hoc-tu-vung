const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8765;
const BASE = path.join(__dirname);
const mimeTypes = { 'html': 'text/html', 'js': 'application/javascript', 'png': 'image/png', 'jpg': 'image/jpeg', 'css': 'text/css', 'webp': 'image/webp' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/Kiemtratuvung_Fixed_FIXED_v2.html';
  const fp = path.join(BASE, p);
  try {
    const data = fs.readFileSync(fp);
    const ext = path.extname(fp).slice(1).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found: ' + fp);
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log('Server running at http://localhost:' + PORT);
});
