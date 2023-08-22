const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;

    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid or missing URL parameter' });
    }

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, { timeout: 500 });
            if (response.status === 200) {
                return response.data.numbers || [];
            }
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error.message}`);
            return [];
        }
    };

    const mergedNumbers = [];
    const fetchPromises = urls.map(fetchData);

    await Promise.all(fetchPromises).then((results) => {
        results.forEach((numbers) => {
            mergedNumbers.push(...numbers);
        });
    });

    const uniqueSortedNumbers = Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);

    res.json({ numbers: uniqueSortedNumbers });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
