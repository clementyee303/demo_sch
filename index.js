const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const morgan = require('morgan');

const app = express();

// app.use(morgan('tiny'));
// app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/messages', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});