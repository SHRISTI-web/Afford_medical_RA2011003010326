const http = require('http');
const url = require('url');
const https = require('https');

const server = http.createServer((req, res) => {
    const queryParams = url.parse(req.url, true).query;
    const urls = queryParams.url || [];

    const mergedNumbers = new Set();

    const fetchNumbers = (url) => {
        return new Promise((resolve) => {
            https.get(url, { timeout: 500 }, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        mergedNumbers.add(...jsonData.numbers);
                    } catch (error) {
                        // JSON parsing error or other issues, ignore
                    }
                    resolve();
                });
            }).on('error', (error) => {
                // Request error, ignore
                resolve();
            });
        });
    };

    const fetchPromises = urls.map(fetchNumbers);

    Promise.all(fetchPromises).then(() => {
        const sortedNumbers = Array.from(mergedNumbers).sort((a, b) => a - b);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ numbers: sortedNumbers }));
    });
});

const PORT = 8008;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
