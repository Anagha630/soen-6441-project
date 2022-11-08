import http from 'http'
import fs from 'fs'
import path from 'path'
import {executeQuery} from './dbconnection.js';
import Collection from '../model/collection.js';

function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Resource not found.');
  response.end();
}

const mimeLookup = {
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/css'
};
var collectionList = [];
const server = http.createServer(async (req, res) => {
  if(req.method == 'GET'){

    let fileurl;
    if(req.url == '/'){
        fileurl = 'pages/homepage.html';
    }
    else if(req.url == '/collections'){
        fileurl = 'pages/collections.html'
        const collectionResults = await executeQuery("SELECT * FROM collection;");
        collectionResults.forEach((collection)=> collectionList.push(new Collection(collection.collection_id,collection.name,collection.view_url,collection.price)))
    }
    else{
      fileurl = req.url;
    }
    let filepath = path.resolve('../' + fileurl);

    let fileExt = path.extname(filepath);
    let mimeType = mimeLookup[fileExt];

    if(!mimeType) {
      send404(res);
      return;
    }

    fs.exists(filepath, (exists) => {
      if(!exists){
        send404(res);
        return;
      }

      res.writeHead(200, {'Content-Type': mimeType});
      fs.createReadStream(filepath).pipe(res);

    });

  }
}).listen(5000);
console.log("Server running at port 5000");

export default collectionList