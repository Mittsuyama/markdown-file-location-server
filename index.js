const http = require('http');
const api = require('./api.js');

http.createServer((req, res) => {
  const ROOT = '/api/'

  let { url } = req;
  url = url.replace(ROOT, '');

  const returnValue = content => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write(JSON.stringify(content));
    res.end();
  };

  switch(url.replace(ROOT, '')) {
    case 'get-folder-list':
      returnValue(api.getFolderList());
      break;
    case 'get-folder-content':
      returnValue(api.getFolderContent(body));
      break;
    default:
      returnValue({ status: 0 });
  }

}).listen(7777);
