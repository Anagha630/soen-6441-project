import * as http from 'node:http'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import {displayGrid, displayList} from './utils.js';
import Controller from '../connection/controllers.js';

var user_name = ""

const server = http.createServer(async (req, res) => {
  if(req.method == 'GET'){

    var user_id;
    let fileurl;
    if(req.url == '/'){
        fileurl = 'pages/homepage.html';
        res.setHeader('Content-type','text/html')
        var html = fs.readFileSync(path.resolve('../' + fileurl));
        res.end(html)
    }

    else if(req.url == '/allcollections'){
        fileurl = 'pages/collections.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getCollection()
        .then((allCollections)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayGrid(allCollections))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }

    else if(req.url == '/alltracks'){
        fileurl = 'pages/tracks.html'
        res.setHeader('Content-type', 'text/html')
        var queryString = "SELECT * FROM track;";
        await new Controller().getTracksByParams(queryString)
        .then((allTracks)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayGrid(allTracks))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }

    else if(req.url == '/allartists'){
        fileurl = 'pages/artists.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getArtist()
        .then((allArtists)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            res.end(html+displayGrid(allArtists))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }

    else if(req.url.match(/\/tracks\?/)){
        fileurl = 'pages/tracks.html'
        const queryObject = url.parse(req.url, true).query;
        res.setHeader('Content-type', 'text/html')
        if(req.url.includes("collection_id")){
            var queryString = "SELECT * FROM track WHERE fk_collection_id="+queryObject.collection_id+";"
            await new Controller().getTracksByParams(queryString)
            .then((collectionTracks)=> {
                var html = fs.readFileSync(path.resolve('../' + fileurl));
                res.end(html+displayGrid(collectionTracks))
            })
            .catch((err)=> {
                console.log("Promise rejection error: "+err);
                res.end("<h1>ERROR</h1>")
            })
        }
        else if(req.url.includes("artist_id")){
            var queryString = "SELECT * FROM track WHERE fk_artist_id="+queryObject.artist_id+";"
            await new Controller().getTracksByParams(queryString)
            .then((artistTracks)=> {
                var html = fs.readFileSync(path.resolve('../' + fileurl));
                res.end(html+displayGrid(artistTracks))
            })
            .catch((err)=> {
                console.log("Promise rejection error: "+err);
                res.end("<h1>ERROR</h1>")
            })
        }
    }

    else if(req.url.match(/\/placeOrders\?/)){
        fileurl = 'pages/place-order.html'
        const queryObject = url.parse(req.url, true).query;
        res.setHeader('Content-type', 'text/html')
        if(req.url.includes("collection_id")){
            var queryString = "SELECT * FROM track WHERE fk_collection_id="+queryObject.collection_id+";"
            await new Controller().getTracksByParams(queryString)
            .then((collectionTracks)=> {
                var html = fs.readFileSync(path.resolve('../' + fileurl));
                res.end(html+displayList(collectionTracks))
            })
            .catch((err)=> {
                console.log("Promise rejection error: "+err);
                res.end("<h1>ERROR</h1>")
            })
        }
        else if(req.url.includes("track_id")){
            var queryString = "SELECT * FROM track WHERE track_id="+queryObject.track_id+";"
            await new Controller().getTracksByParams(queryString)
            .then((tracks)=> {
                var html = fs.readFileSync(path.resolve('../' + fileurl));
                res.end(html+displayList(tracks))
            })
            .catch((err)=> {
                console.log("Promise rejection error: "+err);
                res.end("<h1>ERROR</h1>")
            })
        }
    }

    else if(req.url.match(/\/orders\?/)){
        const queryObject = url.parse(req.url, true).query;
        fileurl = 'pages/orders.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().getAllOrders(queryObject.username)
        .then((allTracksArray)=> {
            var html = fs.readFileSync(path.resolve('../' + fileurl));
            var tracks = allTracksArray[0]
            var totalPrice = allTracksArray[1]
            res.end(html+displayGrid(tracks,totalPrice))
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }

    else if(req.url.match(/\/addOrder\?/)){
        const queryObject = url.parse(req.url, true).query;
        fileurl = 'pages/place-order.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().addTrackToOrders(queryObject.track_id, queryObject.username)
        .then((msg)=> {
            if(msg=="success"){
                res.end(`<h1 style="color:green">Track successfully added to Orders!</h1>`)
            }
            else res.end(`<h1 style="color:red">Track is already in your Orders!</h1>`)
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }

    else if(req.url.match(/\/deleteOrder\?/)){
        const queryObject = url.parse(req.url, true).query;
        fileurl = 'pages/orders.html'
        res.setHeader('Content-type', 'text/html')
        await new Controller().deleteFromOrder(queryObject.track_id)
        .then((msg)=> {
            if(msg=="success"){
                res.end(`<h1 style="color:green">Track successfully deleted from Orders!</h1>`)
            }
            else res.end(`<h1 style="color:red">Something went wrong! Try again!`)
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
            res.end(html+displayGrid(allTracks));
        })
        .catch((err)=> {
            console.log("Promise rejection error: "+err);
            res.end("<h1>ERROR</h1>")
        })
    }
    else{
      fileurl = req.url;
    }
  }
}).listen(5000);

console.log("Server running at port 5000");