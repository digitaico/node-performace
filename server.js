const express = require('express');
const cluster = require('cluster');
const os = require('os');

const NUM_WORKERS = os.cpus().length;

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // blocked event loop
  }
}

app.get('/', (req, res) => {
  res.send(`Performance Example ${process.pid}`)
})

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Ring! ...Ring! ...Ring! ${process.pid}`);
});

if (cluster.isMaster) {
  console.log('Master initiated...');

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log('Worker initiated...');
  app.listen(3000);
}

