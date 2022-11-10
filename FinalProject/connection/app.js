import * as http from 'node:http'
import * as fs from 'fs'
import * as path from 'path'
import {displayCollection} from './utils.js';
import Controller from '../connection/controllers.js';

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
        res.setHeader('Content-type','text/html')
        var html = fs.readFileSync(path.resolve('../' + fileurl));
        res.end(html)
    }
    else if(req.url == '/collections'){
        fileurl = 'pages/collections.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getCollection()
        .then((allCollections)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayCollection(allCollections))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }
    else if(req.url == '/tracks'){
        fileurl = 'pages/tracks.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getAllTracks()
        .then((allTracks)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayCollection(allTracks))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }
    else if(req.url == '/artists'){
        fileurl = 'pages/artists.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getArtist()
        .then((allArtists)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayCollection(allArtists))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }
    // else if(req.url.match(/\/tracks\?collection_id=([0-9]+)/)){
    //     fileurl = 'pages/tracks.html'
    //     res.setHeader('Content-type', 'text/plain')
    //     await new Controller().tracksOfCollection(req.url.substring(22))
    //     .then((collectionTracks)=> {
    //         var html = fs.readFileSync(path.resolve('../' + fileurl));
    //         res.end(html+displayCollection(allCollections))
    //     })
    //     .catch((err)=> {
    //         console.log("Promise rejection error: "+err);
    //         res.end("<h1>ERROR</h1>")
    //     })
    // }
    else{
      fileurl = req.url;
    }
    //await readAllFiles(fileurl,res)
  }
}).listen(5000);

async function readAllFiles(fileurl,res){
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
    })
}
console.log("Server running at port 5000");