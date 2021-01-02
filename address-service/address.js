const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

const app = express();

app.use(bodyParser.json());
app.use(morgan('[AddressService] :method :url :status :response-time ms'));

const addresses = [
  {
    id: 1,
    address: 'Address of 1',
  },
  {
    id: 2,
    address: 'Address of 2',
  },
];

app.get('/ping', (req, res) => {
  return res.json({
    message: 'Yay it works! 🏓',
  });
});

app.get('/v1/addresses', (req, res) => {
  res.json(addresses);
});

app.get('/v1/address/:id', (req, res) => {
  console.log('req.params.id', req.params.id);
  const addr = addresses.find(x => x.id == req.params.id);
  console.log(addr);
  res.json(addr);
});

app.listen(PORT, () => {
  console.log(`Address Service running on port ${PORT}`);
});
