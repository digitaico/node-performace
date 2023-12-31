const express = require('express');

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

console.log('Master initiated...');
console.log('Worker initiated...');
app.listen(3000);
