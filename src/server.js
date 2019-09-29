const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
 
app.use(bodyParser.json());

app.use(cors());

app.get('/project-settings', (req, res) => {
    axios.get('https://api.lassocrm.com/v1/projects/settings', { headers: { Authorization: req.header('Authorization') } })
        .then(response => {
            console.log(response);
            res.json(response.data);
        })
        .catch((error) => {
            if(error.response) {
                res.status(error.response.status)
                res.json(error.response.data);
            } else {
                res.status(500)
                res.json(error);
            }
        });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});


