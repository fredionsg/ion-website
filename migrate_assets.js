const fs = require('fs');
const https = require('https');
const path = require('path');

const targetFiles = ['start.html', 'preview.html', 'global.css'];
const assetDir = path.join(__dirname, 'assets', 'images');

if (!fs.existsSync(assetDir)) {
    fs.mkdirSync(assetDir, { recursive: true });
}

// Regex to find sitejet and site-media domains
const urlRegex = /https:\/\/(?:my\.sitejet\.io|cdn1\.site-media\.eu)\/[^\s\"\'\)]+/g;

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                // handle redirects if necessary (basic fallback)
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                }).on('error', err => reject(err));
            } else {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function migrate() {
    let mapping = {}; // url -> filename

    for (let currentFile of targetFiles) {
        if (!fs.existsSync(currentFile)) continue;
        
        console.log(`Scanning ${currentFile}...`);
        let content = fs.readFileSync(currentFile, 'utf8');
        let matches = content.match(urlRegex) || [];
        
        let uniqueUrls = [...new Set(matches)];
        
        for (let url of uniqueUrls) {
            if (!mapping[url]) {
                // Clean the URL, remove potential trailing quotes/parens accidentally matched
                let cleanUrl = url.replace(/["')]$/g, '');
                
                let filename = path.basename(cleanUrl);
                // avoid extremely long names or collisions
                let safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '');
                if (!safeName) safeName = 'image_' + Date.now() + '.png';
                
                let localPath = path.join(assetDir, safeName);
                
                try {
                    console.log(`Downloading: ${cleanUrl} -> assets/images/${safeName}`);
                    await downloadFile(cleanUrl, localPath);
                    mapping[cleanUrl] = `./assets/images/${safeName}`;
                } catch (e) {
                    console.error(e.message);
                }
            }
            
            // Rewrite in content
            content = content.replace(new RegExp(url.replace(/["')]$/g, '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), mapping[url.replace(/["')]$/g, '')]);
        }
        
        // Save the updated file
        fs.writeFileSync(currentFile, content, 'utf8');
        console.log(`Updated ${currentFile}.`);
    }
    console.log('Migration complete!');
}

migrate();
