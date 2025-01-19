const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql'); 
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@001', 
    database: 'pincode_db', 
});

// DB connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// APIs
app.get('/api/search', async (req, res) => {
    const { type, query } = req.query;
    let apiUrl = ' https://api.postalpincode.in/pincode/';

    if (type === 'name') {
        apiUrl = `https://api.postalpincode.in/postoffice/${query}`;
    } else {
        apiUrl += query;
    }

    try {
        const response = await axios.get(apiUrl);
        console.log(response.data[0].Status)
        if (response.data[0].Status === 'Success') {
            res.json(response.data[0].PostOffice);
        } 
        else {
            res.status(404).json({ message: 'No results found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});


app.post('/api/favourites', (req, res) => {
    const { name, branchType, deliveryStatus, district, region, state } = req.body;
    const query = 'INSERT INTO favourites (name, branchType, deliveryStatus, district, region, state) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [name, branchType, deliveryStatus, district, region, state], (err) => {
        if (err) {
            res.status(500).json({ message: 'Error saving favorite' });
        } else {
            res.status(201).json({ message: 'Favorite saved successfully' });
        }
    });
});


app.get('/api/favourites', (req, res) => {
    const query = 'SELECT * FROM favourites';

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching favourites' });
        } else {
            res.json(results);
        }
    });
});
