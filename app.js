const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tiviRoutes = require('./routes/tiviRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/tivi', tiviRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


