const express = require('express');
const app = express();
const router  = require("./routers/routes")

const PORT = 3001;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("Subscriptions api running on 3001")
});

module.exports = app;

