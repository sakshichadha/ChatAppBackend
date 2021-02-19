const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const app = express();
dotenv.config();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

// Connect Database
connectDB();

// Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
  
  res.send('working');
});
io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/messages'));
const PORT = process.env.PORT || 5000;
//io.listen(PORT);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));