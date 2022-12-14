const compression = require('compression');
const express = require('express');

const app = express();
app.disable('x-powered-by');

const path = `${__dirname}/dist/`;
const port = process.env.PORT || 6784;

app.use(compression({ level: 9 }));
app.use(express.static(path));

const serveFile = (req, res) => {
  res.set('Cache-Control', `max-age=1, stale-while-revalidate=${60 * 60}`);
  res.sendFile(`${path}index.html`);
};

app.all('/*', serveFile);

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});

module.exports = app;
module.exports.serveFile = serveFile;
