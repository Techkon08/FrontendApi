require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
  const stock = req.body.stock;
  const date = req.body.date;
  const apiid = process.env.POLYGON_API_KEY;
  const url = `https://api.polygon.io/v1/open-close/${stock}/${date}?adjusted=true&apiKey=${apiid}`;

  try {
    const response = await axios.get(url);
    const stockdata = response.data;
    const symbol = stockdata.symbol;
    const open = stockdata.open;
    const high = stockdata.high;
    const low = stockdata.low;
    const close = stockdata.close;
    const volume = stockdata.volume;
    res.status(200).json({ symbol, open, high, low, close, volume });
  } catch (error) {
    console.error(`Error: ${error}`);

    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Stock data not found for the given symbol and date.' });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching stock data.' });
    }
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));