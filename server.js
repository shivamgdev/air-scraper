const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const AIR_SCRAPER_API_URL = 'https://api.airscraper.com/v1';

// Endpoint to get nearby airports
app.get('/api/nearby-airports', async (req, res) => {
    const { lat, lng } = req.query;
    console.log(`Received lat: ${lat}, lng: ${lng}`);

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    try {
        const response = await axios.get(`${AIR_SCRAPER_API_URL}/flights/getNearByAirports`, {
            params: { lat, lng }
        });

        // Log the full response for debugging
        console.log('Response from Air Scraper API:', response.data);

        if (response.data && response.data.data && response.data.data.nearby) {
            res.json(response.data.data.nearby);
        } else {
            res.status(404).json({ error: 'No nearby airports found.' });
        }
    } catch (error) {
        // Log the error details
        console.error('Error fetching airports:', error.response ? error.response.data : error.message);
        
        // Return more detailed error response
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching data.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
