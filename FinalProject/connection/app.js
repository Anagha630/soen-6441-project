import * as http from 'node:http'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
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
    }
    else if(req.url.match(/\/search\?*/)){
      const params = url.parse(req.url, true).query;
      var queryString = "SELECT * FROM track WHERE ";
      var paramLength = Object.keys(params).length;
      var i = 1;
      if(params.track!=""){
        if(i!=1){
          queryString = queryString + " AND ";
        }
        queryString = queryString+"name = '" + params.track + "'";
        i++;
      }
      if(params.artist!=""){
        if(i!=1){
          queryString = queryString + " AND ";
        }
        queryString = queryString+"fk_artist_id = (SELECT artist_id FROM artist where name = '"+params.artist+"')";
        i++;
      }
      if(params.collection!=""){
        if(i!=1){
          queryString = queryString + " AND ";
        }
        queryString = queryString+"fk_collection_id = (SELECT collection_id FROM collection where name = '"+params.collection+"')";
        i++;
      }
      if(params.year!=""){
        if(i!=1){
          queryString = queryString + " AND ";
        }
        queryString = queryString+"release_date BETWEEN '" + params.year + "/01/01' AND '"+ params.year + "/12/31'";
        i++;
      }
      queryString = queryString + ";";

      fileurl = 'pages/tracks.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getTracksByParams(queryString)
        .then((allTracks)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayCollection(allTracks));
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