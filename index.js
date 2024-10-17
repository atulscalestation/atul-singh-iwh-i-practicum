const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
*/
app.get('/', async (req, res) => {
    const petsURL = 'https://api.hubspot.com/crm/v3/objects/pets';  // URL to fetch "pets" custom object data
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    // Specify custom properties to retrieve (replace with actual property names)
    const params = {
        properties: ['species', 'name', 'bio'].join(',')  // Join the properties with commas
    };

    try {
        const resp = await axios.get(petsURL, { headers, params });
        const data = resp.data.results;  // Fetch the results from the API
        console.log(params);
        console.log(data);

        // Render the data to the template
        res.render('index', { title: 'Pets | HubSpot APIs', data });
    } catch (error) {
        console.error('Error fetching custom object "pets":', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching custom object "pets"');
    }
});

app.get('/update-cobj', (req, res) => {
    // Render the 'updates' Pug template with an empty form
    res.render('updates', {
        title: 'Update Pets | HubSpot APIs',
    });
});

app.post('/update-cobj', async (req, res) => {
    const { species, name, bio } = req.body;  // Capture data from form

    // API URL for creating a new custom object (pets)
    const petsURL = 'https://api.hubspot.com/crm/v3/objects/pets';
    
    // API request headers
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    // Data payload for creating a new custom object record
    const data = {
        properties: {
            species,
            name,
            bio,
        }
    };

    try {
        // Sending POST request to HubSpot API
        const resp = await axios.post(petsURL, data, { headers });
        
        // Check response and render success page or redirect
        res.render('success', {
            title: 'Pet Created',
            message: `Pet "${name}" created successfully.`,
        });
    } catch (error) {
        console.error('Error creating custom object "pets":', error.response ? error.response.data : error.message);
        res.status(500).send('Error creating custom object "pets"');
    }
});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));