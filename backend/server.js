const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.post('/subscription/new', async (req, res) => {
    let subscription = req.body;
    axios.post('http://localhost:3001/api/subscriptions', subscription)
        .then(function (response) {
            console.log(response.data._id);
            res.status(200).send(response.data._id);
        })
});


app.listen(port, () => {
    console.log("public server connected");
})