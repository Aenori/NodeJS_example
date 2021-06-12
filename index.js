const server = require('./server');

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
