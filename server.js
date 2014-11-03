var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    app;

app = connect()

.use(connect.static('build'))

.use(function (req, res, next) {
  fs.readFile('./build/index.html', function (err, data) {
    res.write(data);
    res.end();
  });
});

http.createServer(app).listen(9527, function () {
  console.log('Running on http://localhost:9527');
});

