import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

function adminApiPlugin() {
  return {
    name: 'admin-api',
    configureServer(server) {
      // Helper to read JSON body manually since we don't use express middleware
      const readBody = (req) => new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
          try { resolve(JSON.parse(body || '{}')); }
          catch (e) { reject(e); }
        });
      });

      server.middlewares.use('/api/save-content', async (req, res) => {
        if (req.method !== 'POST') return res.end();
        try {
          const data = await readBody(req);
          const contentPath = path.resolve(__dirname, 'src/data/content.json');
          
          // data should be the full content object (hero, projects, awards)
          fs.writeFileSync(contentPath, JSON.stringify(data, null, 2));

          // Auto-push to GitHub so Vercel updates automatically
          exec('git add . && git commit -m "CMS Auto-Update" && git push', (error, stdout, stderr) => {
            if (error) {
              console.error('Auto-push failed or nothing to commit:', error.message);
            } else {
              console.log('Auto-push successful! Vercel will rebuild now.');
            }
          });

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          console.error('Save error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/login', async (req, res) => {
        if (req.method !== 'POST') return res.end();
        try {
          const { email, password } = await readBody(req);
          const credsPath = path.resolve(__dirname, 'src/data/admin-credentials.json');
          
          let validEmail = 'admin@example.com';
          let validPass = 'admin123';

          if (fs.existsSync(credsPath)) {
            const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
            validEmail = creds.email;
            validPass = creds.password;
          }

          if (email === validEmail && password === validPass) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid credentials' }));
          }
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/update-credentials', async (req, res) => {
        if (req.method !== 'POST') return res.end();
        try {
          const { email, password } = await readBody(req);
          const credsPath = path.resolve(__dirname, 'src/data/admin-credentials.json');
          
          fs.writeFileSync(credsPath, JSON.stringify({ email, password }, null, 2));

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/upload', async (req, res) => {
        if (req.method !== 'POST') return res.end();
        try {
          const data = await readBody(req);
          if (data.base64 && data.name) {
             const base64Data = data.base64.replace(/^data:image\/\w+;base64,/, "");
             // Replace spaces with underscores to prevent URL issues
             const safeName = Date.now() + '_' + data.name.replace(/\s+/g, '_');
             const publicPath = path.resolve(__dirname, 'public/uploads', safeName);
             
             fs.writeFileSync(publicPath, base64Data, 'base64');
             
             res.setHeader('Content-Type', 'application/json');
             res.end(JSON.stringify({ url: `/uploads/${safeName}` }));
          } else {
             res.statusCode = 400;
             res.end(JSON.stringify({ error: 'Missing base64 or name' }));
          }
        } catch (err) {
          console.error('Upload error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  base: '/',
})
